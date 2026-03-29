// ─── Custom Cursor System ─── //
// Vanilla JS: pointer tracking, semantic hover via elementFromPoint (no nested flicker),
// touch / coarse pointer disabled, native cursor on text fields & form controls.

;(function () {
	'use strict'

	const CURSOR_ID = 'custom-cursor'
	// Phosphor Icons — ArrowUpRight (light) · MIT · https://phosphoricons.com
	const ARROW_SVG =
		'<svg class="cursor-arrow" viewBox="0 0 256 256" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="currentColor">' +
		'<path d="M198,64V168a6,6,0,0,1-12,0V78.48L68.24,196.24a6,6,0,0,1-8.48-8.48L177.52,70H88a6,6,0,0,1,0-12H192A6,6,0,0,1,198,64Z"/>' +
		'</svg>'

	const INTERACTIVE_SELECTOR = [
		'a[href]',
		'button',
		'[role="button"]',
		'[data-project]',
		'[data-clickable]',
		'label[for]',
		'input[type="button"]',
		'input[type="submit"]',
		'input[type="reset"]',
		'input[type="image"]',
		'input[type="checkbox"]',
		'input[type="radio"]',
		'summary',
	].join(',')

	const NON_TEXT_INPUT = new Set(['button', 'submit', 'reset', 'checkbox', 'radio', 'range', 'hidden', 'image'])

	const cursorEl = document.getElementById(CURSOR_ID)
	if (!cursorEl) return

	const coarseOnly =
		window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches
	if (coarseOnly) return

	if (!cursorEl.querySelector('.cursor-arrow')) cursorEl.insertAdjacentHTML('beforeend', ARROW_SVG)

	document.documentElement.classList.add('custom-cursor-active')

	let posX = 0
	let posY = 0
	let rafId = 0

	const isTextOrFormField = (el) => {
		if (!el || el.nodeType !== 1) return false
		const field = el.closest('input, textarea, select, [contenteditable="true"]')
		if (!field) return false
		if (field.matches('[contenteditable="true"]')) return true
		if (field.tagName === 'TEXTAREA' || field.tagName === 'SELECT') return true
		if (field.tagName !== 'INPUT') return false
		const t = (field.getAttribute('type') || 'text').toLowerCase()
		if (t === 'file' || t === 'color') return true
		return !NON_TEXT_INPUT.has(t)
	}

	const applyStateFromPoint = () => {
		const focused = document.activeElement
		if (focused && isTextOrFormField(focused)) {
			document.documentElement.classList.add('custom-cursor-native')
			cursorEl.classList.remove('active')
			return
		}

		let el = null
		try {
			el = document.elementFromPoint(posX, posY)
		} catch {
			return
		}

		if (!el) {
			document.documentElement.classList.remove('custom-cursor-native')
			cursorEl.classList.remove('active')
			return
		}

		if (isTextOrFormField(el)) {
			document.documentElement.classList.add('custom-cursor-native')
			cursorEl.classList.remove('active')
			return
		}

		document.documentElement.classList.remove('custom-cursor-native')
		cursorEl.classList.toggle('active', Boolean(el.closest(INTERACTIVE_SELECTOR)))
	}

	const updateTransform = () => {
		cursorEl.style.transform = `translate3d(${posX}px,${posY}px,0) translate(-50%,-50%)`
		rafId = 0
	}

	document.addEventListener(
		'mousemove',
		(e) => {
			posX = e.clientX
			posY = e.clientY
			if (!rafId) rafId = requestAnimationFrame(updateTransform)
			applyStateFromPoint()
		},
		{ passive: true }
	)

	document.documentElement.addEventListener('mouseleave', () => {
		cursorEl.classList.remove('active')
		cursorEl.classList.add('custom-cursor--away')
	})
	document.documentElement.addEventListener('mouseenter', () => {
		cursorEl.classList.remove('custom-cursor--away')
		applyStateFromPoint()
	})

	document.addEventListener('mousedown', () => cursorEl.classList.add('custom-cursor--pressed'), true)
	document.addEventListener('mouseup', () => cursorEl.classList.remove('custom-cursor--pressed'), true)

	document.addEventListener('focusin', (e) => {
		if (isTextOrFormField(e.target)) document.documentElement.classList.add('custom-cursor-native')
	})
	document.addEventListener('focusout', () => {
		requestAnimationFrame(() => {
			const a = document.activeElement
			if (!a || !isTextOrFormField(a)) document.documentElement.classList.remove('custom-cursor-native')
		})
	})

	updateTransform()
})()
