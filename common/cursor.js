// ─── Custom Cursor System ─── //
// Vanilla JS: pointer tracking, semantic hover via elementFromPoint (no nested flicker),
// touch / coarse pointer disabled, native cursor on text fields & form controls.

;(function () {
	'use strict'

	const CURSOR_ID = 'custom-cursor'
	const ARROW_SVG =
		'<svg class="cursor-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
		'<path d="M7 17L17 7M17 7H11M17 7V13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
		'</svg>'

	/** Match interactive targets (extend with [data-clickable] on custom hit areas). */
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

	const cursorEl = document.getElementById(CURSOR_ID)

	// Failsafe: no DOM node → native cursor (no html class)
	if (!cursorEl) return

	// Enable when a fine pointer exists. Do not require (hover: hover) — it is false on many
	// hybrid / touch laptops and breaks the cursor; (hover: none) in CSS had the same issue.
	const canUseCustomCursor = () => {
		if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
			return false
		}
		return true
	}

	if (!canUseCustomCursor()) return

	if (!cursorEl.querySelector('.cursor-arrow')) {
		cursorEl.insertAdjacentHTML('beforeend', ARROW_SVG)
	}

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
		const nonText = ['button', 'submit', 'reset', 'checkbox', 'radio', 'range', 'hidden', 'image']
		return !nonText.includes(t)
	}

	const getInteractiveTarget = (el) => {
		if (!el || el.nodeType !== 1) return null
		if (isTextOrFormField(el)) return null
		return el.closest(INTERACTIVE_SELECTOR)
	}

	const setNativeMode = (on) => {
		document.documentElement.classList.toggle('custom-cursor-native', on)
	}

	const setHover = (on) => {
		cursorEl.classList.toggle('active', on)
	}

	const focusedField = () => {
		const a = document.activeElement
		return a && isTextOrFormField(a) ? a : null
	}

	const applyStateFromPoint = () => {
		if (focusedField()) {
			setNativeMode(true)
			setHover(false)
			return
		}

		let el = null
		try {
			el = document.elementFromPoint(posX, posY)
		} catch {
			return
		}

		if (!el) {
			setNativeMode(false)
			setHover(false)
			return
		}

		if (isTextOrFormField(el)) {
			setNativeMode(true)
			setHover(false)
			return
		}

		setNativeMode(false)
		setHover(!!getInteractiveTarget(el))
	}

	const updateTransform = () => {
		cursorEl.style.transform =
			'translate3d(' + posX + 'px,' + posY + 'px,0) translate(-50%,-50%)'
		rafId = 0
	}

	const onMove = (e) => {
		posX = e.clientX
		posY = e.clientY
		if (!rafId) rafId = requestAnimationFrame(updateTransform)
		applyStateFromPoint()
	}

	const onLeaveWindow = () => {
		setHover(false)
		cursorEl.classList.add('custom-cursor--away')
	}

	const onEnterWindow = () => {
		cursorEl.classList.remove('custom-cursor--away')
		applyStateFromPoint()
	}

	document.addEventListener('mousemove', onMove, { passive: true })
	document.documentElement.addEventListener('mouseleave', onLeaveWindow)
	document.documentElement.addEventListener('mouseenter', onEnterWindow)

	document.addEventListener(
		'mousedown',
		() => {
			cursorEl.classList.add('custom-cursor--pressed')
		},
		true
	)
	document.addEventListener(
		'mouseup',
		() => {
			cursorEl.classList.remove('custom-cursor--pressed')
		},
		true
	)

	document.addEventListener('focusin', (e) => {
		if (isTextOrFormField(e.target)) setNativeMode(true)
	})
	document.addEventListener('focusout', () => {
		requestAnimationFrame(() => {
			const a = document.activeElement
			if (!a || !isTextOrFormField(a)) setNativeMode(false)
		})
	})

	// Initial position (0,0) until first move
	updateTransform()
})()
