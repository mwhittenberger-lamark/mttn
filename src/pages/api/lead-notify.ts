import type { APIRoute } from 'astro';

export const prerender = false;

const TWILIO_ACCOUNT_SID = import.meta.env.TWILIO_ACCOUNT_SID?.trim();
const TWILIO_AUTH_TOKEN = import.meta.env.TWILIO_AUTH_TOKEN?.trim();
const TWILIO_API_KEY_SID = import.meta.env.TWILIO_API_KEY_SID?.trim();
const TWILIO_API_KEY_SECRET = import.meta.env.TWILIO_API_KEY_SECRET?.trim();
const TWILIO_FROM_NUMBER = import.meta.env.TWILIO_FROM_NUMBER?.trim();
const TWILIO_TO_NUMBER = import.meta.env.TWILIO_TO_NUMBER?.trim() || '+16465301840';

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

const isTwilioAccountSid = (value?: string) => Boolean(value && /^AC[0-9a-fA-F]{32}$/.test(value));

const isTwilioApiKeySid = (value?: string) => Boolean(value && /^SK[0-9a-fA-F]{32}$/.test(value));

const encodeBasicAuth = (username: string, password: string) => btoa(`${username}:${password}`);

const getTwilioConfig = () => {
	if (!TWILIO_FROM_NUMBER) {
		return { error: 'TWILIO_FROM_NUMBER is missing.' };
	}

	if (!TWILIO_ACCOUNT_SID) {
		return { error: 'TWILIO_ACCOUNT_SID is missing.' };
	}

	if (!isTwilioAccountSid(TWILIO_ACCOUNT_SID)) {
		if (isTwilioApiKeySid(TWILIO_ACCOUNT_SID) && !TWILIO_API_KEY_SID) {
			return {
				error:
					'TWILIO_ACCOUNT_SID must be the AC-prefixed account SID. Move the SK-prefixed value to TWILIO_API_KEY_SID.',
			};
		}

		return { error: 'TWILIO_ACCOUNT_SID must be an AC-prefixed account SID.' };
	}

	if (TWILIO_API_KEY_SID || TWILIO_API_KEY_SECRET) {
		if (!TWILIO_API_KEY_SID || !TWILIO_API_KEY_SECRET) {
			return {
				error: 'TWILIO_API_KEY_SID and TWILIO_API_KEY_SECRET must both be set together.',
			};
		}

		if (!isTwilioApiKeySid(TWILIO_API_KEY_SID)) {
			return { error: 'TWILIO_API_KEY_SID must be an SK-prefixed API key SID.' };
		}

		return {
			accountSid: TWILIO_ACCOUNT_SID,
			authorization: `Basic ${encodeBasicAuth(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET)}`,
		};
	}

	if (!TWILIO_AUTH_TOKEN) {
		return {
			error: 'TWILIO_AUTH_TOKEN is missing. Set it, or configure TWILIO_API_KEY_SID and TWILIO_API_KEY_SECRET.',
		};
	}

	return {
		accountSid: TWILIO_ACCOUNT_SID,
		authorization: `Basic ${encodeBasicAuth(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)}`,
	};
};

export const POST: APIRoute = async ({ request }) => {
	const twilioConfig = getTwilioConfig();

	if ('error' in twilioConfig) {
		console.error('Twilio env vars are invalid.', twilioConfig.error);
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
			`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.accountSid}/Messages.json`,
			{
				method: 'POST',
				headers: {
					Authorization: twilioConfig.authorization,
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
