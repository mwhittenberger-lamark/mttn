(() => {
	const siteNav = document.querySelector('#site-nav')
	const navToggle = document.querySelector('.nav-toggle')
	const primaryNav = document.querySelector('#primary-nav')

	if (!(siteNav instanceof HTMLElement) || !(primaryNav instanceof HTMLElement)) return

	const openNav = () => {
		if (!(navToggle instanceof HTMLButtonElement)) return
		siteNav.classList.add('is-open')
		navToggle.setAttribute('aria-expanded', 'true')
		navToggle.setAttribute('aria-label', 'Close navigation menu')
	}

	const closeNav = () => {
		if (!(navToggle instanceof HTMLButtonElement)) return
		siteNav.classList.remove('is-open')
		navToggle.setAttribute('aria-expanded', 'false')
		navToggle.setAttribute('aria-label', 'Open navigation menu')
	}

	const toggleNav = () => {
		if (!siteNav.classList.contains('is-open')) {
			openNav()
			return
		}
		closeNav()
	}

	navToggle?.addEventListener('click', toggleNav)

	primaryNav.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', closeNav)
	})

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
			closeNav()
		}
	})

	window.addEventListener('resize', () => {
		if (window.innerWidth > 780) {
			closeNav()
		}
	})
})()
