// Theme Switch Button
const themeSwitch = document.getElementById('theme-switch')

const getMoonSVG = () => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path></svg>`

const getSunSVG = () => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"></path></svg>`

const getPartySVG = () => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z"></path></svg>`

const themes = ['light', 'dark', 'party']
const themeIcons = {
	light: getMoonSVG(),
	dark: getSunSVG(),
	party: getPartySVG()
}

const getCurrentTheme = () => {
	const saved = localStorage.getItem('theme')
	if (saved && themes.includes(saved)) return saved
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const updateFavicon = (theme) => {
	// Remove existing favicon
	const existing = document.getElementById('theme-favicon')
	if (existing) {
		existing.remove()
	}
	
	// Create new favicon link
	const link = document.createElement('link')
	link.id = 'theme-favicon'
	link.rel = 'icon'
	link.type = 'image/x-icon'
	
	if (theme === 'dark') {
		link.href = 'favicons/Favicon-dark.svg'
		link.type = 'image/svg+xml'
	} else {
		link.href = 'favicons/Favicon.ico'
		link.type = 'image/x-icon'
	}
	
	document.head.appendChild(link)
}

const applyTheme = (theme) => {
	document.documentElement.setAttribute('data-theme', theme)
	if (theme === 'light' || theme === 'dark') {
		document.documentElement.style.colorScheme = theme
	} else {
		document.documentElement.style.colorScheme = 'light'
	}
	themeSwitch.innerHTML = themeIcons[theme]
	updateFavicon(theme)
	localStorage.setItem('theme', theme)
}

const currentTheme = getCurrentTheme()
applyTheme(currentTheme)

themeSwitch.addEventListener('click', () => {
	const current = document.documentElement.getAttribute('data-theme')
	const nextIndex = (themes.indexOf(current) + 1) % themes.length
	applyTheme(themes[nextIndex])
})
