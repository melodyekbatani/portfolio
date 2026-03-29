(function () {
	const nav = document.getElementById("aeri-toc");
	if (!nav) return;

	const links = [...nav.querySelectorAll('a[href^="#"]')];
	const ids = links.map((a) => a.getAttribute("href").slice(1));
	const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

	function setActive(id) {
		links.forEach((a) => {
			const match = a.getAttribute("href") === "#" + id;
			a.classList.toggle("is-active", match);
			if (match) {
				a.setAttribute("aria-current", "location");
			} else {
				a.removeAttribute("aria-current");
			}
		});
	}

	function clearActive() {
		links.forEach((a) => {
			a.classList.remove("is-active");
			a.removeAttribute("aria-current");
		});
	}

	function updateActive() {
		const doc = document.documentElement;
		const nearBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 48;
		if (nearBottom && ids.length) {
			setActive(ids[ids.length - 1]);
			return;
		}

		const marker = window.innerHeight * 0.28;
		let activeId = null;
		for (let i = sections.length - 1; i >= 0; i--) {
			const el = sections[i];
			if (el.getBoundingClientRect().top <= marker) {
				activeId = el.id;
				break;
			}
		}
		if (activeId) {
			setActive(activeId);
		} else {
			clearActive();
		}
	}

	let ticking = false;
	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				updateActive();
				ticking = false;
			});
			ticking = true;
		}
	}

	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", updateActive, { passive: true });
	updateActive();
})();
