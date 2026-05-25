import type { APIRoute } from 'astro';

export const prerender = false;

const TWILIO_ACCOUNT_SID = import.meta.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = import.meta.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_NUMBER = import.meta.env.TWILIO_FROM_NUMBER;
const TWILIO_TO_NUMBER = import.meta.env.TWILIO_TO_NUMBER || '+16465301840';

const json = (body: Record<string, unknown>, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
		},
	});

const formatLabel = (key: string) =>
	key
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[_-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (character) => character.toUpperCase());

const buildMessageBody = (payload: Record<string, unknown>) => {
	const source = String(payload.source ?? 'Website Lead').trim() || 'Website Lead';
	const orderedKeys = [
		'firstName',
		'lastName',
		'businessName',
		'email',
		'phone',
		'smsOptIn',
		'websiteUrl',
		'helpWith',
		'budget',
		'biggestImprovement',
		'pageTitle',
		'pageUrl',
		'submittedAt',
	];

	const knownLines = orderedKeys
		.map((key) => {
			const rawValue = payload[key];
			if (rawValue === undefined || rawValue === null) return null;
			const value = String(rawValue).trim();
			if (!value) return null;
			return `${formatLabel(key)}: ${value}`;
		})
		.filter(Boolean) as string[];

	const extraLines = Object.entries(payload)
		.filter(([key]) => !orderedKeys.includes(key))
		.map(([key, rawValue]) => {
			if (rawValue === undefined || rawValue === null) return null;
			const value = String(rawValue).trim();
			if (!value) return null;
			return `${formatLabel(key)}: ${value}`;
		})
		.filter(Boolean) as string[];

	return [`New lead from ${source}`, ...knownLines, ...extraLines].join('\n');
};

export const POST: APIRoute = async ({ request }) => {
	if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
		console.error('Twilio env vars are missing.');
		return json(
			{
				ok: false,
				error: 'Twilio is not configured on the server.',
			},
			500,
		);
	}

	let payload: Record<string, unknown>;

	try {
		payload = (await request.json()) as Record<string, unknown>;
	} catch (error) {
		console.error('Failed to parse lead payload.', error);
		return json(
			{
				ok: false,
				error: 'Invalid request payload.',
			},
			400,
		);
	}

	const firstName = String(payload.firstName ?? '').trim();
	const lastName = String(payload.lastName ?? '').trim();
	const email = String(payload.email ?? '').trim();
	const phone = String(payload.phone ?? '').trim();

	if (!firstName || !lastName || !email || !phone) {
		return json(
			{
				ok: false,
				error: 'Missing required lead fields.',
			},
			400,
		);
	}

	const twilioBody = new URLSearchParams({
		To: TWILIO_TO_NUMBER,
		From: TWILIO_FROM_NUMBER,
		Body: buildMessageBody(payload),
	});

	try {
		const response = await fetch(
			`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
			{
				method: 'POST',
				headers: {
					Authorization: `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
				body: twilioBody.toString(),
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Twilio SMS failed.', response.status, errorText);
			return json(
				{
					ok: false,
					error: 'Twilio SMS request failed.',
				},
				502,
			);
		}

		return json({ ok: true });
	} catch (error) {
		console.error('Unexpected Twilio SMS error.', error);
		return json(
			{
				ok: false,
				error: 'Unexpected server error.',
			},
			500,
		);
	}
};
