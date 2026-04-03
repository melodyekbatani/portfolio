/* Play page — media from ../../Play/, pan/zoom canvas */

const PLAY_BASE = '../../Play/';

/** All image and video files in the Play folder (paths relative to PLAY_BASE). */
const PLAY_FILES = [
	'Anzza Brand Illustrations-1.png',
	'Anzza Brand Illustrations-2.png',
	'Anzza Brand Illustrations.png',
	'Architectural rendering.jpg',
	'Architectural visualization.jpg',
	'Arcteryx.jpg',
	'Forage - 3D Hardware Design.png',
	'Forage.jpg',
	'Forage.png',
	'Giannone Petricone - deck design.png',
	'LOAM - Illustrations-1.png',
	'LOAM - Illustrations-2.png',
	'LOAM - Illustrations.png',
	'MySun App.png',
	'Mysun - marketing site.png',
	'Reel-Giannone Petricone associates.mp4',
	'Sephora Laneige.jpg',
	'Short film documenting an architectural project.mp4',
	'Speedstac module design.jpg',
	'Superyama-animation design.jpg',
	'Uber eats campaign visualizations.jpg',
	'mySUN 2.png',
	'mySUN 3.png',
	'mySUN.mp4',
	'mySUN.png',
];

function playUrl(filename) {
	return PLAY_BASE + encodeURIComponent(filename);
}

function captionFromFilename(filename) {
	return filename.replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim();
}

function isVideo(filename) {
	return /\.(mp4|webm|mov)$/i.test(filename);
}

function randomBetween(min, max) {
	return min + Math.random() * (max - min);
}

function initPlayground() {
	const grid = document.getElementById('playgroundGrid');
	if (!grid) return;

	const gridW = grid.offsetWidth;
	const gridH = grid.offsetHeight;

	PLAY_FILES.forEach((filename) => {
		const size = Math.round(randomBetween(160, 300));
		const x = Math.random() * Math.max(1, gridW - size);
		const y = Math.random() * Math.max(1, gridH - size);
		const rotation = randomBetween(-32, 32);

		const itemEl = document.createElement('div');
		itemEl.className = 'playground-item';
		itemEl.style.width = `${size}px`;
		itemEl.style.height = `${size}px`;
		itemEl.style.left = `${x}px`;
		itemEl.style.top = `${y}px`;
		itemEl.style.transform = `rotate(${rotation}deg)`;
		itemEl.style.zIndex = String(Math.floor(randomBetween(1, 50)));

		const captionText = captionFromFilename(filename);

		if (isVideo(filename)) {
			const video = document.createElement('video');
			video.className = 'playground-item-media';
			video.src = playUrl(filename);
			video.muted = true;
			video.loop = true;
			video.playsInline = true;
			video.setAttribute('playsinline', '');
			video.autoplay = true;
			itemEl.appendChild(video);
			video.play().catch(() => {});
		} else {
			const img = document.createElement('img');
			img.className = 'playground-item-media';
			img.src = playUrl(filename);
			img.alt = captionText;
			img.loading = 'lazy';
			itemEl.appendChild(img);
		}

		const caption = document.createElement('div');
		caption.className = 'playground-caption';
		caption.textContent = captionText;
		itemEl.appendChild(caption);

		grid.appendChild(itemEl);
	});
}

const canvas = document.querySelector('.play-canvas');
const surface = document.querySelector('.play-canvas-surface');
const grid = document.getElementById('playgroundGrid');

let zoomLevel = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragStartPanX = 0;
let dragStartPanY = 0;

const MIN_ZOOM = 0.35;
const MAX_ZOOM = 6;
const ZOOM_SPEED = 0.12;

function updateSurfaceTransform() {
	if (surface) {
		surface.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
	}
}

function centerViewportOnCanvas() {
	if (!canvas || !grid) return;
	const rect = canvas.getBoundingClientRect();
	const gw = grid.offsetWidth;
	const gh = grid.offsetHeight;
	panX = rect.width / 2 - (gw / 2) * zoomLevel;
	panY = rect.height / 2 - (gh / 2) * zoomLevel;
	updateSurfaceTransform();
}

function onReady() {
	initPlayground();
	centerViewportOnCanvas();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onReady);
} else {
	onReady();
}

if (canvas) {
	canvas.addEventListener(
		'wheel',
		(e) => {
			if (e.ctrlKey || e.metaKey) {
				e.preventDefault();
				const rect = canvas.getBoundingClientRect();
				const mx = e.clientX - rect.left;
				const my = e.clientY - rect.top;
				const oldZoom = zoomLevel;
				zoomLevel = Math.max(
					MIN_ZOOM,
					Math.min(MAX_ZOOM, zoomLevel + (e.deltaY > 0 ? -ZOOM_SPEED : ZOOM_SPEED)),
				);
				if (Math.abs(zoomLevel - oldZoom) < 1e-9) return;
				const wx = (mx - panX) / oldZoom;
				const wy = (my - panY) / oldZoom;
				panX = mx - wx * zoomLevel;
				panY = my - wy * zoomLevel;
				updateSurfaceTransform();
			}
		},
		{ passive: false },
	);

	canvas.addEventListener('mousedown', (e) => {
		if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
			isDragging = true;
			dragStartX = e.clientX;
			dragStartY = e.clientY;
			dragStartPanX = panX;
			dragStartPanY = panY;
			canvas.style.cursor = 'grabbing';
		}
	});
}

document.addEventListener('mousemove', (e) => {
	if (isDragging && canvas) {
		const deltaX = e.clientX - dragStartX;
		const deltaY = e.clientY - dragStartY;
		panX = dragStartPanX + deltaX;
		panY = dragStartPanY + deltaY;
		updateSurfaceTransform();
	}
});

document.addEventListener('mouseup', () => {
	if (isDragging && canvas) {
		isDragging = false;
		canvas.style.cursor = 'grab';
	}
});

let touchStartX = 0;
let touchStartY = 0;
let touchStartPanX = 0;
let touchStartPanY = 0;

if (canvas) {
	canvas.addEventListener('touchstart', (e) => {
		if (e.touches.length === 1) {
			touchStartX = e.touches[0].clientX;
			touchStartY = e.touches[0].clientY;
			touchStartPanX = panX;
			touchStartPanY = panY;
		}
	});

	canvas.addEventListener(
		'touchmove',
		(e) => {
			if (e.touches.length === 1) {
				e.preventDefault();
				const deltaX = e.touches[0].clientX - touchStartX;
				const deltaY = e.touches[0].clientY - touchStartY;
				panX = touchStartPanX + deltaX;
				panY = touchStartPanY + deltaY;
				updateSurfaceTransform();
			} else if (e.touches.length === 2) {
				e.preventDefault();
				const touch1 = e.touches[0];
				const touch2 = e.touches[1];
				const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
				if (window.lastTouchDistance) {
					const oldZoom = zoomLevel;
					const zoomDelta = (distance - window.lastTouchDistance) * 0.008;
					zoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel + zoomDelta));
					const rect = canvas.getBoundingClientRect();
					const mx = (touch1.clientX + touch2.clientX) / 2 - rect.left;
					const my = (touch1.clientY + touch2.clientY) / 2 - rect.top;
					if (Math.abs(zoomLevel - oldZoom) > 1e-9) {
						const wx = (mx - panX) / oldZoom;
						const wy = (my - panY) / oldZoom;
						panX = mx - wx * zoomLevel;
						panY = my - wy * zoomLevel;
					}
					updateSurfaceTransform();
				}
				window.lastTouchDistance = distance;
			}
		},
		{ passive: false },
	);

	canvas.addEventListener('touchend', () => {
		window.lastTouchDistance = null;
	});

	function resetView() {
		zoomLevel = 1;
		centerViewportOnCanvas();
	}

	canvas.addEventListener('dblclick', resetView);
}
