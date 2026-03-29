// Theme Switch Button
const themeSwitch = document.getElementById('theme-switch')
const menuToggle = document.getElementById('menu-toggle')
const menu = document.querySelector('nav .menu')
const themes = ['light', 'dark']

// SVG Icons
const themeIcons = {
	light: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path></svg>',
	dark: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"></path></svg>',
}

const getCurrentTheme = () => {
	const saved = localStorage.getItem('theme')
	if (saved && themes.includes(saved)) return saved
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
	return 'light'
}

const updateFavicon = (theme) => {
	const link = document.getElementById('theme-favicon')
	if (!link) return
	const href = link.getAttribute('href') || ''
	const dir = href.includes('/') ? href.replace(/[^/]+$/, '') : ''
	const isDark = theme === 'dark'
	link.href = dir + (isDark ? 'Favicon-dark.svg' : 'Favicon.ico')
	link.type = isDark ? 'image/svg+xml' : 'image/x-icon'
}

const applyTheme = (theme) => {
	document.documentElement.setAttribute('data-theme', theme)
	document.documentElement.style.colorScheme = theme
	if (themeSwitch) themeSwitch.innerHTML = themeIcons[theme]
	updateFavicon(theme)
	localStorage.setItem('theme', theme)
}

applyTheme(getCurrentTheme())

// Hamburger menu toggle
if (menuToggle && menu) {
	const syncMenuUi = () => {
		const open = menu.classList.contains('active')
		menuToggle.textContent = open ? '×' : '☰'
		menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false')
	}

	syncMenuUi()

	menuToggle.addEventListener('click', () => {
		menu.classList.toggle('active')
		syncMenuUi()
	})

	menu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			menu.classList.remove('active')
			syncMenuUi()
		})
	})

	const wideEnoughForHorizontalNav = window.matchMedia('(min-width: 48rem)')
	const closeMenuIfDesktop = () => {
		if (!wideEnoughForHorizontalNav.matches) return
		menu.classList.remove('active')
		syncMenuUi()
	}
	wideEnoughForHorizontalNav.addEventListener('change', closeMenuIfDesktop)
}

// Theme switch
if (themeSwitch) {
	themeSwitch.addEventListener('click', () => {
		const current = document.documentElement.getAttribute('data-theme')
		const nextTheme = themes[(themes.indexOf(current) + 1) % themes.length]
		applyTheme(nextTheme)
	})
}

// Sticky nav scroll state
const headerNav = document.querySelector('header nav')
const scrollThreshold = 50

if (headerNav) {
	window.addEventListener('scroll', () => {
		headerNav.classList.toggle('scrolled', window.scrollY > scrollThreshold)
	})
}
