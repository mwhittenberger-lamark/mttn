(() => {
	const leadModal = document.querySelector('#lead-modal');
	const leadForm = document.querySelector('#lead-form');
	const leadSource = document.querySelector('#lead-source');
	const leadSuccess = document.querySelector('#lead-success');
	const leadError = document.querySelector('#lead-error');
	const leadSubmit = document.querySelector('.lead-form__submit');
	const leadCloseTargets = document.querySelectorAll('[data-lead-close]');

	if (!(leadModal instanceof HTMLElement) || !(leadForm instanceof HTMLFormElement)) return;

	const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/21390310/4oe12xb/';
	let lastLeadTrigger = null;

	const resetLeadFeedback = () => {
		leadForm.hidden = false;
		leadForm.removeAttribute('aria-hidden');
		leadSuccess?.setAttribute('hidden', '');
		leadError?.setAttribute('hidden', '');
		if (leadSubmit instanceof HTMLButtonElement) {
			leadSubmit.disabled = false;
			leadSubmit.textContent = 'Request My Callback';
		}
	};

	const openLeadModal = (triggerOrSource) => {
		lastLeadTrigger = triggerOrSource instanceof HTMLElement ? triggerOrSource : null;
		resetLeadFeedback();

		const sourceLabel =
			triggerOrSource instanceof HTMLElement
				? triggerOrSource.dataset?.leadTrigger ||
					triggerOrSource.dataset?.offerLeadTrigger ||
					triggerOrSource.getAttribute('data-lead-source') ||
					'Lead Form'
				: typeof triggerOrSource === 'string' && triggerOrSource.trim()
					? triggerOrSource.trim()
					: 'Lead Form';

		if (leadSource) {
			leadSource.value = sourceLabel;
		}

		leadModal.hidden = false;
		document.body.style.overflow = 'hidden';
		leadModal.querySelector('input[name="first_name"]')?.focus();
	};

	const closeLeadModal = () => {
		leadModal.hidden = true;
		document.body.style.overflow = '';
		if (lastLeadTrigger instanceof HTMLElement) {
			lastLeadTrigger.focus();
		}
	};

	window.openLeadModal = openLeadModal;
	window.closeLeadModal = closeLeadModal;

	document.addEventListener('click', (event) => {
		const target = event.target;
		if (!(target instanceof Element)) return;

		const closeTarget = target.closest('[data-lead-close]');
		if (closeTarget) {
			event.preventDefault();
			closeLeadModal();
			return;
		}

		const leadTrigger = target.closest('[data-lead-trigger]');
		if (leadTrigger instanceof HTMLElement) {
			event.preventDefault();
			openLeadModal(leadTrigger);
			return;
		}

		const linkTrigger = target.closest('a[href="#contact"], a[href="/#contact"]');
		if (linkTrigger instanceof HTMLAnchorElement) {
			event.preventDefault();
			openLeadModal(linkTrigger);
		}
	});

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && !leadModal.hidden) {
			closeLeadModal();
		}
	});

	leadForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(leadForm);
		const payload = new URLSearchParams({
			firstName: String(formData.get('first_name') ?? '').trim(),
			lastName: String(formData.get('last_name') ?? '').trim(),
			email: String(formData.get('email') ?? '').trim(),
			phone: String(formData.get('phone') ?? '').trim(),
			source: String(formData.get('source') ?? '').trim(),
			pageUrl: window.location.href,
			pageTitle: document.title,
			submittedAt: new Date().toISOString(),
		});

		leadError?.setAttribute('hidden', '');

		if (leadSubmit instanceof HTMLButtonElement) {
			leadSubmit.disabled = true;
			leadSubmit.textContent = 'Sending...';
		}

		try {
			const response = await fetch(zapierWebhookUrl, {
				method: 'POST',
				body: payload,
			});

			if (!response.ok) {
				throw new Error(`Webhook request failed with ${response.status}`);
			}

			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: 'form-submit-event',
				formName: 'lead-form',
				formSource: String(formData.get('source') ?? '').trim(),
				pageUrl: window.location.href,
			});

			leadForm.hidden = true;
			leadForm.setAttribute('aria-hidden', 'true');
			leadSuccess?.removeAttribute('hidden');
			leadForm.reset();
			if (leadSource) {
				leadSource.value = '';
			}
		} catch (error) {
			console.error('Lead submission failed', error);
			leadError?.removeAttribute('hidden');
		} finally {
			if (leadSubmit instanceof HTMLButtonElement) {
				leadSubmit.disabled = false;
				leadSubmit.textContent = 'Request My Callback';
			}
		}
	});
})();
