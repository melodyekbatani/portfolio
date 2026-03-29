(function () {
	if (typeof IntersectionObserver === "undefined") return;

	const videos = document.querySelectorAll("video.aeri-video-autoplay");
	if (!videos.length) return;

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (prefersReducedMotion) {
		videos.forEach((v) => {
			v.setAttribute("controls", "");
		});
		return;
	}

	function revealTarget(v) {
		const li = v.closest(".aeri-video-grid li");
		if (li) return li;
		const fig = v.closest("figure.aeri-video-figure");
		if (fig) return fig;
		return v;
	}

	function playInView(v) {
		v.muted = true;
		v.play().catch(() => {});
	}

	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const v = entry.target;
				if (!(v instanceof HTMLVideoElement)) return;

				const el = revealTarget(v);

				if (entry.isIntersecting) {
					el.classList.add("is-in-view");
					playInView(v);
				} else {
					el.classList.remove("is-in-view");
					v.pause();
				}
			});
		},
		{
			threshold: [0, 0.15, 0.35, 0.55, 0.85, 1],
			root: null,
			rootMargin: "-6% 0px -10% 0px",
		},
	);

	const h = window.innerHeight;
	videos.forEach((v) => {
		const rect = v.getBoundingClientRect();
		const inView = rect.top < h * 0.9 && rect.bottom > h * 0.1;
		if (inView) revealTarget(v).classList.add("is-in-view");
	});

	document.documentElement.classList.add("aeri-videos-ready");

	videos.forEach((v) => io.observe(v));

	requestAnimationFrame(() => {
		videos.forEach((v) => {
			if (revealTarget(v).classList.contains("is-in-view")) playInView(v);
		});
	});

	// Band, impacts, pitch and insights scroll animation
	const band = document.querySelector(".aeri-band");
	const impacts = document.querySelector(".aeri-impacts");
	const pitch = document.querySelector(".aeri-pitch");
	const insights = document.querySelector(".aeri-insights");
	
	const observeElement = (el) => {
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in-view");
					} else {
						entry.target.classList.remove("in-view");
					}
				});
			},
			{
				threshold: [0],
				rootMargin: "0px",
			},
		);
		observer.observe(el);
	};

	observeElement(band);
	observeElement(impacts);
	observeElement(pitch);
	observeElement(insights);
})();
