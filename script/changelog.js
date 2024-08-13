function changelogFunction() {
	// Prevent all img default dragging
	const changelogPage = document.getElementById("changelog-page");
	Array.from(changelogPage.getElementsByTagName("img")).forEach((img) => {
		img.addEventListener(
			"dragstart",
			(preventMixerDefaultDrag = (event) => {
				event.preventDefault();
			})
		);
	});

	// Scroll bar
	const scrollBar = document.getElementById("scroll-bar");
	const scrollBarWidth = parseInt(window.getComputedStyle(scrollBar).width, 10);
	const mixer = scrollBar.getElementsByTagName("img")[0];

	const allCards = document.querySelectorAll(".card");

	// Initialized scroll bar
	mixer.style.left = 0;

	// Drag to move mixer
	let mouseDragging = false;
	mixer.addEventListener(
		"mousedown",
		(mixerMouseDown = (event) => {
			mouseDragging = true;
			mixer.style.filter = "brightness(1.5)";
			mixer.style.boxShadow = "0 0 6px 1px rgb(0, 238, 234)";
			mixer.dataset.grabbing = "true";
			document.body.style.cursor = "grabbing";
			let mouseX = event.clientX;
			let pageWidth = window.innerWidth;
			let scrollBarMarginBetween = (pageWidth - scrollBarWidth) / 2;
			let mixerStyleLeft = parseInt(window.getComputedStyle(mixer).left, 10);
			const mixerWidth = mixer.offsetWidth;
			let relativeMousePositionToMixer = mouseX - scrollBarMarginBetween - mixerStyleLeft;
			document.addEventListener(
				"mousemove",
				(scrollBarMouseMove = (event) => {
					mouseX = event.clientX;
					mixerStyleLeft = mouseX - scrollBarMarginBetween - relativeMousePositionToMixer;
					mixer.style.left = mixerStyleLeft + "px";
					if (mixerStyleLeft < 0) {
						mixer.style.left = 0;
					}
					if (mixerStyleLeft > scrollBarWidth - mixerWidth) {
						mixer.style.left = scrollBarWidth - mixerWidth + "px";
					}
					throttledMoveChangelog();
					throttledSetScrollBarLower();
				})
			);
		})
	);

	document.addEventListener(
		"mouseup",
		(documentMouseUp = () => {
			if (mouseDragging) {
				mixer.style.filter = "";
				mixer.style.boxShadow = "";
				mixer.dataset.grabbing = "false";
				document.body.style.cursor = "default";
				document.removeEventListener("mousemove", scrollBarMouseMove);
			}
			mouseDragging = false;
		})
	);

	// Touch to move mixer
	let touchDragging = false;
	mixer.addEventListener(
		"touchstart",
		(mixerTouchStart = (event) => {
			touchDragging = true;
			mixer.style.filter = "brightness(1.5)";
			mixer.style.boxShadow = "0 0 6px 1px rgb(0, 238, 234)";
			mixer.dataset.grabbing = "true";
			document.body.style.cursor = "grabbing";
			let touchX = event.touches[0].pageX;
			let pageWidth = window.innerWidth;
			let scrollBarMarginBetween = (pageWidth - scrollBarWidth) / 2;
			let mixerStyleLeft = parseInt(window.getComputedStyle(mixer).left, 10);
			const mixerWidth = mixer.offsetWidth;
			let relativeMousePositionToMixer = touchX - scrollBarMarginBetween - mixerStyleLeft;
			document.addEventListener(
				"touchmove",
				(scrollBarTouchMove = (event) => {
					touchX = event.touches[0].pageX;
					mixerStyleLeft = touchX - scrollBarMarginBetween - relativeMousePositionToMixer;
					mixer.style.left = mixerStyleLeft + "px";
					if (mixerStyleLeft < 0) {
						mixer.style.left = 0;
					}
					if (mixerStyleLeft > scrollBarWidth - mixerWidth) {
						mixer.style.left = scrollBarWidth - mixerWidth + "px";
					}
					throttledMoveChangelog();
					throttledSetScrollBarLower();
				})
			);
		})
	);

	document.addEventListener(
		"touchend",
		(documentTouchEnd = () => {
			if (touchDragging) {
				mixer.style.filter = "";
				mixer.style.boxShadow = "";
				mixer.dataset.grabbing = "false";
				document.body.style.cursor = "default";
				document.removeEventListener("touchmove", scrollBarTouchMove);
			}
			touchDragging = false;
		})
	);

	// Scroll to move mixer
	const throttle = (func, limit) => {
		let lastFunc;
		let lastRan;
		return function () {
			const context = this;
			const args = arguments;
			if (!lastRan) {
				func.apply(context, args);
				lastRan = Date.now();
			} else {
				clearTimeout(lastFunc);
				lastFunc = setTimeout(function () {
					if (Date.now() - lastRan >= limit) {
						func.apply(context, args);
						lastRan = Date.now();
					}
				}, limit - (Date.now() - lastRan));
			}
		};
	};

	const scrollBarWheel = (event) => {
		let mixerStyleLeft = parseInt(window.getComputedStyle(mixer).left, 10);
		const mixerWidth = mixer.offsetWidth;

		const cardContainer = document.getElementById("card-container");
		const cardContainerWidth = parseInt(window.getComputedStyle(cardContainer).width, 10) - 160;
		const scrollBar = document.getElementById("scroll-bar");
		const scrollBarWidth = parseInt(window.getComputedStyle(scrollBar).width, 10);

		const scrollPixelStep = ((scrollBarWidth - mixerWidth) * 256) / cardContainerWidth;

		let newLeft = mixerStyleLeft;

		if (event.deltaY > 0) {
			newLeft = Math.min(scrollBarWidth - mixerWidth, mixerStyleLeft + scrollPixelStep);
		} else if (event.deltaY < 0) {
			newLeft = Math.max(0, mixerStyleLeft - scrollPixelStep);
		}

		mixer.style.left = newLeft + "px";

		moveChangelog();
		setScrollBarLower();
	};

	const throttledScrollBarWheel = throttle(scrollBarWheel, 50);

	document.addEventListener("wheel", throttledScrollBarWheel);

	// Mixer position affecting changelog position
	const moveChangelog = () => {
		let mixerStyleLeft = parseInt(mixer.style.left, 10);
		const mixerWidth = mixer.offsetWidth;
		let scrollingProportion = mixerStyleLeft / (scrollBarWidth - mixerWidth);

		const cardContainer = document.getElementById("card-container");
		const cardContainerWidth = parseInt(window.getComputedStyle(cardContainer).width, 10) - 160;
		const cardOuterWidth = parseInt(window.getComputedStyle(cardContainer.getElementsByClassName("card")[0]).width, 10) + 48;

		// Set changelog position by scroll bar
		cardContainer.style.left = -scrollingProportion * (cardContainerWidth - cardOuterWidth) + "px";
	};
	const throttledMoveChangelog = throttle(moveChangelog, 50);

	// Set scroll bar lower

	const setScrollBarLower = () => {
		let mixerStyleLeft = parseInt(mixer.style.left, 10);
		const mixerWidth = mixer.offsetWidth;
		let scrollingProportion = mixerStyleLeft / (scrollBarWidth - mixerWidth); // 400 is the scroll bar pixel length

		const scrollLower = document.getElementById("scroll-lower");
		scrollLowerContent = Math.floor(scrollingProportion * (cardCount - 1)) + 1;
		scrollLower.textContent = scrollLowerContent;
		if (scrollLowerContent < 1) {
			scrollLower.textContent = 1;
		} else if (scrollLowerContent > cardCount) {
			scrollLower.textContent = cardCount;
		}
	};
	const throttledSetScrollBarLower = throttle(setScrollBarLower, 50);

	// Card container touchmove with inertia
	const changelogBody = document.getElementById("changelog-body");
	const cardContainer = document.getElementById("card-container");

	let touchX,
		cardContainerLeftStart = undefined;

	let inertiaArr = [0, 0];
	let endVelocity = 0;
	changelogBody.addEventListener(
		"touchstart",
		(changelogBodyTouchStart = (event) => {
			let touch = event.touches[0];
			touchX = touch.pageX;
			cardContainerLeftStart = parseInt(window.getComputedStyle(cardContainer).left, 10);
			inertiaArr.fill(cardContainerLeftStart);
			endVelocity = 0;
		})
	);

	// Set mixer position while touching
	const setMixerPositionWhileTouching = () => {
		const cardContainerWidth = parseInt(window.getComputedStyle(cardContainer).width, 10) - 160;
		const cardOuterWidth = parseInt(window.getComputedStyle(cardContainer.getElementsByClassName("card")[0]).width, 10) + 48;
		let cardContainerLeft = parseInt(cardContainer.style.left, 10);

		let cardContainerLeftProportion = -cardContainerLeft / (cardContainerWidth - cardOuterWidth);
		const mixerWidth = mixer.offsetWidth;
		mixer.style.left = cardContainerLeftProportion * (scrollBarWidth - mixerWidth) + "px";
	};

	const setMixerLimit = () => {
		const mixerWidth = mixer.offsetWidth;
		let mixerStyleLeft = parseInt(mixer.style.left, 10);
		const cardContainerWidth = parseInt(window.getComputedStyle(cardContainer).width, 10) - 160;
		const cardOuterWidth = parseInt(window.getComputedStyle(cardContainer.getElementsByClassName("card")[0]).width, 10) + 48;
		if (mixerStyleLeft < 0) {
			mixer.style.left = 0;
			cardContainer.style.left = "0px";
		}
		if (mixerStyleLeft > scrollBarWidth - mixerWidth) {
			mixer.style.left = scrollBarWidth - mixerWidth + "px";
			cardContainer.style.left = -(cardContainerWidth - cardOuterWidth) + "px";
		}
	};

	const touchToMoveCardContainer = (event) => {
		let touch = event.touches[0];
		let newTouchX = touch.pageX;
		let deltaX = newTouchX - touchX;
		cardContainer.style.left = cardContainerLeftStart + deltaX + "px";

		setMixerPositionWhileTouching();
		setMixerLimit();
		setScrollBarLower();

		// Save inertial velocity information
		inertiaArr.shift();
		inertiaArr.push(parseInt(cardContainer.style.left, 10));
		endVelocity = inertiaArr[1] - inertiaArr[0];
	};
	const throttledTouchToMoveCardContainer = throttle(touchToMoveCardContainer, 50);
	changelogBody.addEventListener("touchmove", throttledTouchToMoveCardContainer);

	// Card page inertia simulation
	let decreaseVelocity = null;
	const changelogBodyTouchEnd = () => {
		let i = 1;
		let velocity = endVelocity;
		const inertiaSimulation = () => {
			velocity = velocity * Math.pow(0.97, i);
			cardContainer.style.left = parseInt(cardContainer.style.left, 10) + velocity + "px";
			++i;
			setMixerPositionWhileTouching();
			setMixerLimit();
			setScrollBarLower();
		};
		if (endVelocity * velocity > 0) {
			decreaseVelocity = setInterval(inertiaSimulation, 50);
		}
	};

	const stopDecreaseVelocity = () => {
		if (decreaseVelocity !== null) {
			clearInterval(decreaseVelocity);
			decreaseVelocity = null;
		}
	};

	changelogBody.addEventListener("touchend", () => {
		stopDecreaseVelocity();
		changelogBodyTouchEnd();
	});

	// Cards Functions

	// Auto pagination

	const autoPagination = () => {
		allCards.forEach((card) => {
			// Put all contents to the first page
			let pageContainer = card.getElementsByClassName("card-page-container")[0];
			let pages = pageContainer.getElementsByClassName("card-page");
			let firstPage = pages[0];
			if (pages.length > 1) {
				for (let i = 1; i < pages.length; i = 1) {
					while (pages[i].firstChild) {
						firstPage.appendChild(pages[i].firstChild);
					}
					pageContainer.removeChild(pages[i]);
				}
			}

			// Put overflowed contents to the next page
			let pageContainerHeight = pageContainer.offsetHeight;
			let isOverflow = true;
			let i = 0;
			while (isOverflow) {
				let contents = pages[i].children;

				let totalHeight = 0;
				let overflowCount = 0;

				Array.from(contents).forEach((element) => {
					let elementHeight = parseInt(window.getComputedStyle(element).marginTop, 10) + parseInt(window.getComputedStyle(element).marginBottom, 10) + element.offsetHeight;
					totalHeight = totalHeight + elementHeight;
					if (totalHeight > pageContainerHeight) {
						++overflowCount;
					}
				});

				if (overflowCount > 0) {
					// Create a new page
					const newPage = document.createElement("li");
					newPage.className = "card-page";
					pageContainer.appendChild(newPage);

					for (j = 0; j < overflowCount; j++) {
						pages[pages.length - 1].appendChild(contents[contents.length - overflowCount + j]);
					}

					++i; // Check next page created just now
				} else {
					isOverflow = false;
				}
			}
		});
	};

	// Button turning page functions

	let cardCurrentPages = Array(allCards.length).fill(0); // Set default current pages are 0
	const buttonTurningPage = () => {
		allCards.forEach((card, index) => {
			let cardPageContainer = card.querySelectorAll(".card-page-container")[0];
			let cardPages = cardPageContainer.querySelectorAll(".card-page");

			// Buttons state set
			let lastPageBtn = card.getElementsByTagName("button")[0];
			let nextPageBtn = card.getElementsByTagName("button")[1];
			const buttonStateSet = () => {
				let cardPagesCount = cardPages.length;
				lastPageBtn.dataset.active = "true";
				nextPageBtn.dataset.active = "true";
				if (cardCurrentPages[index] == 0) {
					lastPageBtn.dataset.active = "false";
				}
				if (cardCurrentPages[index] == cardPagesCount - 1) {
					nextPageBtn.dataset.active = "false";
				}
			};
			buttonStateSet();
		});
	};

	autoPagination();
	buttonTurningPage();

	allCards.forEach((card, index) => {
		let cardPageContainer = card.querySelectorAll(".card-page-container")[0];
		let cardPages = cardPageContainer.querySelectorAll(".card-page");

		let singlePageWidth = cardPageContainer.offsetWidth; // Get page width

		// Buttons state set
		let lastPageBtn = card.getElementsByTagName("button")[0];
		let nextPageBtn = card.getElementsByTagName("button")[1];

		const buttonStateSet = () => {
			let cardPagesCount = cardPages.length;
			lastPageBtn.dataset.active = "true";
			nextPageBtn.dataset.active = "true";
			if (cardCurrentPages[index] == 0) {
				lastPageBtn.dataset.active = "false";
			}
			if (cardCurrentPages[index] == cardPagesCount - 1) {
				nextPageBtn.dataset.active = "false";
			}
		};
		// Button functions
		lastPageBtn.addEventListener(
			"click",
			(lastPageBtnClick = () => {
				if (lastPageBtn.dataset.active == "true") {
					--cardCurrentPages[index];
					singlePageWidth = cardPageContainer.offsetWidth;
					let movedPixelsFromDefault = cardCurrentPages[index] * singlePageWidth; // How many pixels does contents move?

					// Move contents
					cardPages = cardPageContainer.querySelectorAll(".card-page");
					cardPages.forEach((element) => {
						element.style.left = -movedPixelsFromDefault + "px";
					});
					buttonStateSet();
				}
			})
		);
		nextPageBtn.addEventListener(
			"click",
			(nextPageBtnClick = () => {
				if (nextPageBtn.dataset.active == "true") {
					++cardCurrentPages[index];
					singlePageWidth = cardPageContainer.offsetWidth;
					let movedPixelsFromDefault = cardCurrentPages[index] * singlePageWidth; // How many pixels does contents move?

					// Move contents
					cardPages = cardPageContainer.querySelectorAll(".card-page");
					cardPages.forEach((element) => {
						element.style.left = -movedPixelsFromDefault + "px";
					});
					buttonStateSet();
				}
			})
		);

		// Set page to 0 when mouse leave
		card.addEventListener(
			"mouseleave",
			(cardMouseLeave = () => {
				cardCurrentPages[index] = 0;
				cardPages.forEach((element) => {
					element.style.left = 0 + "px";
				});
				buttonStateSet();
			})
		);
	});

	// Back button

	const changelogHeader = document.getElementById("changelog-header");
	const backBtn = changelogPage.getElementsByClassName("back-btn")[0];
	backBtn.addEventListener(
		"click",
		(backBtnClick = () => {
			gsap.to(changelogPage, 0.5, {
				opacity: 0,
				ease: "power1.out",
			});
			gsap.to(changelogHeader, 0.5, {
				y: -100,
				ease: "power1.out",
			});
			gsap.to(changelogBody, 0.5, {
				y: 100,
				ease: "power1.out",
			});
			const menu = document.getElementById("menu");
			const main = document.getElementById("main");
			const footer = document.getElementById("footer");
			window.scrollTo(0, 1);
			window.scrollTo(0, 0);

			// Remove all event listener
			stopDecreaseVelocity();
			Array.from(changelogPage.getElementsByTagName("img")).forEach((img) => {
				img.removeEventListener("dragstart", preventMixerDefaultDrag);
			});
			mixer.removeEventListener("mousedown", mixerMouseDown);
			document.removeEventListener("mouseup", documentMouseUp);
			document.removeEventListener("wheel", throttledScrollBarWheel);
			allCards.forEach((card) => {
				let lastPageBtn = card.getElementsByTagName("button")[0];
				let nextPageBtn = card.getElementsByTagName("button")[1];
				lastPageBtn.removeEventListener("click", lastPageBtnClick);
				nextPageBtn.removeEventListener("click", nextPageBtnClick);
				card.removeEventListener("mouseleave", cardMouseLeave);
			});
			backBtn.removeEventListener("click", backBtnClick);
			changelogBody.removeEventListener("touchstart", changelogBodyTouchStart);
			changelogBody.removeEventListener("touchend", changelogBodyTouchEnd);
			mixer.removeEventListener("touchstart", mixerTouchStart);
			document.removeEventListener("touchend", documentTouchEnd);
			changelogBody.removeEventListener("touchmove", throttledTouchToMoveCardContainer);

			setTimeout(() => {
				document.documentElement.dataset.scroll = "true";
				document.body.removeChild(changelogPage);
				const changelogJs = document.getElementById("changelog-javascript");
				document.head.removeChild(changelogJs);
				menu.style.display = "block";
				setTimeout(() => {
					menu.style.right = "";
					menu.style.opacity = "1";
				}, 0);
				main.style.marginLeft = "";
				main.style.opacity = "";
				footer.style.opacity = "";
			}, 500);
		})
	);
}

changelogFunction();
