(() => {
	const form = document.querySelector('#paid-landing-form');
	const success = document.querySelector('#paid-landing-success');
	const error = document.querySelector('#paid-landing-error');
	const submit = document.querySelector('.gut-form__submit');
	const panes = Array.from(document.querySelectorAll('[data-form-step]'));
	const nextButton = document.querySelector('[data-step-next]');
	const backButton = document.querySelector('[data-step-back]');

	if (!(form instanceof HTMLFormElement)) return;

	const leadNotifyUrl = '/api/lead-notify';
	let currentStep = 0;

	const showStep = (index) => {
		currentStep = index;
		panes.forEach((pane, paneIndex) => {
			if (!(pane instanceof HTMLElement)) return;
			const isActive = paneIndex === index;
			pane.hidden = !isActive;
			pane.classList.toggle('is-active', isActive);
		});
	};

	const getStepInputs = (index) => {
		const pane = panes[index];
		if (!(pane instanceof HTMLElement)) return [];
		return Array.from(pane.querySelectorAll('input, select, textarea')).filter((field) => {
			return field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement;
		});
	};

	nextButton?.addEventListener('click', () => {
		const fields = getStepInputs(0);
		const firstInvalid = fields.find((field) => {
			return !(field instanceof HTMLInputElement && (field.type === 'url' || field.type === 'checkbox') && !field.required && field.value === '')
				&& !field.checkValidity();
		});

		if (firstInvalid) {
			firstInvalid.reportValidity();
			return;
		}

		showStep(1);
		const nextFocus = getStepInputs(1)[0];
		nextFocus?.focus();
	});

	backButton?.addEventListener('click', () => {
		showStep(0);
		const nextFocus = getStepInputs(0)[0];
		nextFocus?.focus();
	});

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(form);
		const helpWith = formData.getAll('help_with').map((value) => String(value).trim()).filter(Boolean);

		const payload = {
			source: String(formData.get('source') ?? 'Paid Landing Page').trim(),
			firstName: String(formData.get('first_name') ?? '').trim(),
			lastName: String(formData.get('last_name') ?? '').trim(),
			businessName: String(formData.get('business_name') ?? '').trim(),
			email: String(formData.get('email') ?? '').trim(),
			phone: String(formData.get('phone') ?? '').trim(),
			smsOptIn: formData.get('sms_opt_in') === 'yes' ? 'Yes' : 'No',
			websiteUrl: String(formData.get('website_url') ?? '').trim(),
			helpWith: helpWith.join(', '),
			budget: String(formData.get('budget') ?? '').trim(),
			biggestImprovement: String(formData.get('biggest_improvement') ?? '').trim(),
			pageUrl: window.location.href,
			pageTitle: document.title,
			submittedAt: new Date().toISOString(),
		};

		error?.setAttribute('hidden', '');

		if (submit instanceof HTMLButtonElement) {
			submit.disabled = true;
			submit.textContent = 'Sending...';
		}

		try {
			const response = await fetch(leadNotifyUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(`Lead request failed with ${response.status}`);
			}

			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: 'form-submit-event',
				formName: 'paid-landing-form',
				formSource: String(formData.get('source') ?? '').trim(),
				pageUrl: window.location.href,
			});

			form.hidden = true;
			success?.removeAttribute('hidden');
			form.reset();
			showStep(0);
		} catch (submissionError) {
			console.error('Paid landing form submission failed', submissionError);
			error?.removeAttribute('hidden');
		} finally {
			if (submit instanceof HTMLButtonElement) {
				submit.disabled = false;
				submit.textContent = 'Schedule My Free Gut Check';
			}
		}
	});

	showStep(0);
})();
