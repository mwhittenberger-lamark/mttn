(() => {
	const progress = document.querySelector('.progress-bar');
	const siteNav = document.querySelector('#site-nav');
	const navToggle = document.querySelector('.nav-toggle');
	const primaryNav = document.querySelector('#primary-nav');
	const heroVisual = document.querySelector('.hero-visual');
	const offerModal = document.querySelector('#offer-modal');
	const offerTriggers = document.querySelectorAll('[data-offer-trigger]');
	const offerPanels = document.querySelectorAll('[data-offer-panel]');
	const offerCloseTargets = document.querySelectorAll('[data-offer-close]');
	const offerLeadTriggers = document.querySelectorAll('[data-offer-lead-trigger]');

	if (!siteNav || !primaryNav) return;

	const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
	let lastOfferTrigger = null;
	let parallaxFrame = 0;

	const revealTargets = [];
	const parallaxItems = [];
	const heroMouseItems = [];

	const updateProgress = () => {
		if (!progress) return;
		const scrollTop = window.scrollY;
		const height = document.documentElement.scrollHeight - window.innerHeight;
		const ratio = height > 0 ? scrollTop / height : 0;
		progress.style.transform = `scaleX(${ratio})`;
	};

	const registerRevealTargets = (selector, options = {}) => {
		const { step = 80, className = 'reveal-on-scroll', groupByRow = false } = options;
		const elements = Array.from(document.querySelectorAll(selector)).filter(
			(element) => element instanceof HTMLElement
		);
		const classes = className.split(/\s+/).filter(Boolean);
		const rowOffsets = new Map();
		let rowIndex = -1;
		let previousTop = null;

		if (groupByRow) {
			elements.forEach((element) => {
				const top = Math.round(element.getBoundingClientRect().top);
				if (previousTop === null || Math.abs(top - previousTop) > 18) {
					rowIndex += 1;
					previousTop = top;
				}
				rowOffsets.set(element, rowIndex);
			});
		}

		elements.forEach((element, index) => {
			element.classList.add(...classes);
			const delayIndex = groupByRow ? rowOffsets.get(element) ?? index : index;
			element.style.setProperty('--reveal-delay', `${Math.min(delayIndex * step, 420)}ms`);
			revealTargets.push(element);
		});
	};

	const setupMotion = () => {
		const heroElements = document.querySelectorAll('.hero-copy > *, .hero-card, .hero-logo-wrap');
		heroElements.forEach((element, index) => {
			if (!(element instanceof HTMLElement)) return;
			element.classList.add('reveal-on-load');
			element.style.setProperty('--reveal-delay', `${index * 90}ms`);
			requestAnimationFrame(() => element.classList.add('is-visible'));
		});

		const introElements = document.querySelectorAll(
			'.intro h2, .intro-copy, .statement-pill, .intro-panel, .intro-cta'
		);
		introElements.forEach((element, index) => {
			if (!(element instanceof HTMLElement)) return;
			element.classList.add('reveal-on-load');
			element.style.setProperty('--reveal-delay', `${240 + index * 100}ms`);
			requestAnimationFrame(() => element.classList.add('is-visible'));
		});

		registerRevealTargets('.problems .section-head > *, .problem-card', { step: 70 });
		registerRevealTargets('.services-band .section-split > *', { step: 80 });
		registerRevealTargets('.service-card', {
			step: 110,
			className: 'reveal-on-scroll reveal-scale',
			groupByRow: true,
		});
		registerRevealTargets('.process-band h2, .process-card', { step: 80 });
		registerRevealTargets('.leverage h2, .leverage .center-intro, .leverage-item', { step: 80 });
		registerRevealTargets('.triangle-copy > *, .triangle-map', { step: 90 });
		registerRevealTargets('.packages .section-head > *, .package-card', {
			step: 80,
			className: 'reveal-on-scroll reveal-scale',
		});
		registerRevealTargets('.about-logo, .about-copy > *', { step: 90 });
		registerRevealTargets('.faq-inner h2, .faq-item', { step: 60 });
		registerRevealTargets('.cta-panel, .footer-inner, .footer-services, .footer-note', {
			step: 90,
		});

		if (motionPreference.matches || !('IntersectionObserver' in window)) {
			revealTargets.forEach((element) => element.classList.add('is-visible'));
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				});
			},
			{
				threshold: 0.16,
				rootMargin: '0px 0px -8% 0px',
			}
		);

		revealTargets.forEach((element) => {
			const rect = element.getBoundingClientRect();
			if (rect.top < window.innerHeight * 1.18) {
				element.classList.add('is-visible');
				return;
			}
			observer.observe(element);
		});
	};

	const setupParallax = () => {
		const parallaxConfig = [
			['.orb-left', -0.08],
			['.orb-right', 0.1],
			['.hero-logo-wrap', -0.05],
			['.hero-card-services', -0.12],
			['.hero-card-users', 0.11],
			['.hero-card-growth', -0.09],
			['.hero-card-local', 0.08],
			['.statement-pill', -0.04],
			['.triangle-map', 0.06],
		];

		parallaxConfig.forEach(([selector, speed]) => {
			document.querySelectorAll(selector).forEach((element) => {
				if (!(element instanceof HTMLElement)) return;
				element.classList.add('parallax-item');
				parallaxItems.push({ element, speed });
			});
		});

		const heroMouseConfig = [
			['.hero-logo-wrap', 18, 14],
			['.hero-card-services', 24, 18],
			['.hero-card-users', 20, 16],
			['.hero-card-growth', 26, 20],
			['.hero-card-local', 18, 14],
		];

		heroMouseConfig.forEach(([selector, xSpeed, ySpeed]) => {
			const element = document.querySelector(selector);
			if (!(element instanceof HTMLElement)) return;
			element.classList.add('parallax-item');
			heroMouseItems.push({ element, xSpeed, ySpeed });
		});
	};

	const updateParallax = () => {
		if (motionPreference.matches || window.innerWidth < 900) {
			parallaxItems.forEach(({ element }) => element.style.setProperty('--parallax-shift', '0px'));
			return;
		}

		parallaxItems.forEach(({ element, speed }) => {
			const rect = element.getBoundingClientRect();
			const centerOffset = window.innerHeight * 0.5 - (rect.top + rect.height * 0.5);
			const shift = Math.max(Math.min(centerOffset * speed, 34), -34);
			element.style.setProperty('--parallax-shift', `${shift.toFixed(2)}px`);
		});
	};

	const resetHeroMouseParallax = () => {
		heroMouseItems.forEach(({ element }) => {
			element.style.setProperty('--mouse-shift-x', '0px');
			element.style.setProperty('--mouse-shift-y', '0px');
		});
	};

	const setupHeroMouseParallax = () => {
		if (!(heroVisual instanceof HTMLElement)) return;

		const updateMouseParallax = (event) => {
			if (motionPreference.matches || window.innerWidth < 1024) {
				resetHeroMouseParallax();
				return;
			}

			const rect = heroVisual.getBoundingClientRect();
			const xRatio = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
			const yRatio = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

			heroMouseItems.forEach(({ element, xSpeed, ySpeed }) => {
				element.style.setProperty('--mouse-shift-x', `${(-xRatio * xSpeed).toFixed(2)}px`);
				element.style.setProperty('--mouse-shift-y', `${(-yRatio * ySpeed).toFixed(2)}px`);
			});
		};

		heroVisual.addEventListener('pointermove', updateMouseParallax);
		heroVisual.addEventListener('pointerleave', resetHeroMouseParallax);
		window.addEventListener('resize', () => {
			if (window.innerWidth < 1024) {
				resetHeroMouseParallax();
			}
		});
	};

	const queueParallaxUpdate = () => {
		if (parallaxFrame || motionPreference.matches) return;
		parallaxFrame = window.requestAnimationFrame(() => {
			parallaxFrame = 0;
			updateParallax();
		});
	};

	const openNav = () => {
		if (!siteNav || !navToggle) return;
		siteNav.classList.add('is-open');
		navToggle.setAttribute('aria-expanded', 'true');
		navToggle.setAttribute('aria-label', 'Close navigation menu');
	};

	const closeNav = () => {
		if (!siteNav || !navToggle) return;
		siteNav.classList.remove('is-open');
		navToggle.setAttribute('aria-expanded', 'false');
		navToggle.setAttribute('aria-label', 'Open navigation menu');
	};

	const toggleNav = () => {
		if (!siteNav.classList.contains('is-open')) {
			openNav();
			return;
		}
		closeNav();
	};

	const openOfferModal = (trigger) => {
		if (!offerModal || !(trigger instanceof HTMLElement)) return;
		lastOfferTrigger = trigger;
		const offerId = trigger.dataset.offerTrigger;
		let hasVisiblePanel = false;

		offerPanels.forEach((panel) => {
			if (!(panel instanceof HTMLElement)) return;
			const matches = panel.dataset.offerPanel === offerId;
			panel.hidden = !matches;
			if (matches) hasVisiblePanel = true;
		});

		if (!hasVisiblePanel) return;

		offerModal.hidden = false;
		document.body.style.overflow = 'hidden';
		offerModal.querySelector('button:not([data-offer-close])')?.focus();
	};

	const closeOfferModal = () => {
		if (!offerModal) return;
		offerModal.hidden = true;
		document.body.style.overflow = '';
		if (lastOfferTrigger instanceof HTMLElement) {
			lastOfferTrigger.focus();
		}
	};

	setupMotion();
	setupParallax();
	setupHeroMouseParallax();
	updateProgress();
	updateParallax();

	window.addEventListener('scroll', updateProgress, { passive: true });
	window.addEventListener('scroll', queueParallaxUpdate, { passive: true });

	navToggle?.addEventListener('click', () => toggleNav());

	primaryNav.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => closeNav());
	});

	offerTriggers.forEach((trigger) => {
		trigger.addEventListener('click', () => {
			closeNav();
			openOfferModal(trigger);
		});
	});

	offerCloseTargets.forEach((target) => {
		target.addEventListener('click', () => closeOfferModal());
	});

	offerLeadTriggers.forEach((trigger) => {
		trigger.addEventListener('click', () => {
			closeOfferModal();
			if (typeof window.openLeadModal === 'function') {
				window.openLeadModal(trigger);
			}
		});
	});

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
			closeNav();
		}
		if (event.key === 'Escape' && offerModal && !offerModal.hidden) {
			closeOfferModal();
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > 780) {
			closeNav();
		}
		queueParallaxUpdate();
	});
})();
