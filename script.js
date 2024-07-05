// Welcome Page Animation

const welcomeText = document.getElementById("welcome-text");

const welcomeTextString = welcomeText.textContent || welcomeText.innerText;
const welcomeTextStringSplit = welcomeTextString.split("");

welcomeText.innerHTML = "";

welcomeTextStringSplit.forEach((letter) => {
	const span = document.createElement("span");
	span.textContent = letter;
	span.className = "welcome-text-letter";
	welcomeText.appendChild(span);
});

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const welcomeTextRandomLetter = () => {
	const randomIndex = Math.floor(Math.random() * alphabet.length);
	return alphabet[randomIndex];
};

const welcomeTextRandomize = (iterations, delay) => {
	let i = 0;
	const intervalId = setInterval(() => {
		const welcomeTextCreatedLetters = welcomeText.getElementsByClassName("welcome-text-letter");

		Array.from(welcomeTextCreatedLetters).forEach((letter) => {
			if (letter.textContent.trim() !== "") {
				letter.textContent = welcomeTextRandomLetter();
			}
		});

		if (++i >= iterations) {
			Array.from(welcomeTextCreatedLetters).forEach((letter, j) => {
				letter.textContent = welcomeTextStringSplit[j];
			});
			clearInterval(intervalId);
		}
	}, delay);
};

gsap.to(welcomeText, 1, {
	css: {
		filter: "blur(0px)",
		transform: "scaleX(100%)",
		opacity: 1,
	},
	ease: "power2.out",
});

welcomeTextRandomize(15, 40);

// Prevent Scroll before Entering Main Page

const preventScroll = (event) => {
	event.preventDefault();
};

document.addEventListener("wheel", preventScroll, { passive: false });

// Songs Come into Window Judgement

const rLevelOverall = document.getElementsByClassName("r-level-overall");
const rLevel = document.getElementsByClassName("r-level");
const dSongBody = document.getElementsByClassName("d-song-body");
const exceptDiffCollections = [rLevelOverall, rLevel, dSongBody];

let exceptDiffCount = 0;
exceptDiffCollections.forEach((collection) => {
	exceptDiffCount += collection.length;
});

const songsAppearAndHide = () => {
	if (mainPageEntered) {
		exceptDiffCollections.forEach((collection) => {
			Array.from(collection).forEach((element) => {
				let rect = element.getBoundingClientRect();
				let tl = gsap.timeline();

				if (rect.top <= window.innerHeight && rect.bottom >= 0) {
					tl.to(element, 0.4, {
						opacity: 1,
						x: 48,
						ease: "power1.out",
					});
				} else {
					tl.to(element, 0, {
						opacity: 0,
						x: 0,
					});
				}
			});
		});
	}
};

// Songs Appear and Hide While Scrolling

document.addEventListener("scroll", songsAppearAndHide);

// Enter Main Page Animation & Enable Scroll

let mainPageEntered = false;

const welcomePage = document.getElementById("welcome-page");
const particitants = document.getElementById("participants");
const menu = document.getElementById("menu");
const diffRanked = document.getElementsByClassName("diff-ranked");

const enteringAnimation = () => {
	if (!mainPageEntered) {
		const tl = gsap.timeline();

		tl.to(welcomePage, 1, {
			clipPath: "inset(0 0 100% 0)",
			ease: "power1.out",
		}) // Welcome Page Shutdown

			.to(
				particitants,
				0.4,
				{
					opacity: 1,
					ease: "power1.out",
				},
				"welcomePage.-=0.3"
			) // Participants Fade in

			.to(
				menu,
				0.4,
				{
					opacity: 1,
					x: -32,
					ease: "power1.out",
				},
				"welcomePage.-=0.3"
			); // Participants Animation

		setTimeout(() => {
			mainPageEntered = true;
			menu.style.display = "block";
			songsAppearAndHide();
			Array.from(diffRanked).forEach((element) => {
				element.style.opacity = 1;
			});
		}, 700); // Contents Appearance Animation

		setTimeout(() => {
			welcomePage.remove();
		}, 1000); // Remove Welcome Page from DOM

		// Enable Scroll
		const enableScroll = () => {
			document.removeEventListener("wheel", preventScroll);
		};
		setTimeout(enableScroll, 700);
	}
};

document.addEventListener(
	"wheel",
	(whellControlsEntering = (event) => {
		if (event.deltaY > 0) {
			window.scrollTo(0, 0);
			enteringAnimation();
			document.removeEventListener("wheel", whellControlsEntering);
		}
	})
);
document.addEventListener(
	"click",
	(clickControlsEntering = () => {
		enteringAnimation();
		document.removeEventListener("wheel", clickControlsEntering);
	})
);

// Number Bar Positioning

const diffSongContainer = document.getElementsByClassName("d-song-container");
const diffNumContainer = document.getElementsByClassName("diff-num-container");
const transparentNumContainer = document.getElementsByClassName("transparent-num-container");

let isAbove = Array(diffSongContainer.length).fill(false);

const numberBarPositioning = () => {
	Array.from(diffSongContainer).forEach((element, i) => {
		let rect = element.getBoundingClientRect();

		if (diffRanked[i + 1].style.display != "none") {
			if (rect.top >= 42 && rect.bottom >= 42) {
				diffNumContainer[i].style.position = "relative";
				diffNumContainer[i].style.top = "";
				gsap.to(diffNumContainer[i], 0, {
					y: 0,
					ease: "power1.out",
				});
				transparentNumContainer[i].style.display = "none";
				isAbove[i] = false;
			} else if (rect.top <= 42 && rect.bottom >= 42) {
				diffNumContainer[i].style.position = "fixed";
				diffNumContainer[i].style.top = 0;
				if (isAbove[i]) {
					gsap.to(diffNumContainer[i], 0.4, {
						y: 0,
						ease: "power1.out",
					});
				}
				transparentNumContainer[i].style.display = "block";
				isAbove[i] = false;
			} else {
				diffNumContainer[i].style.position = "fixed";
				diffNumContainer[i].style.top = 0;
				if (!isAbove[i]) {
					gsap.to(diffNumContainer[i], 0.4, {
						y: -50,
						ease: "power1.out",
					});
				}
				transparentNumContainer[i].style.display = "block";
				isAbove[i] = true;
			}
		}
	});
	console.log(isAbove);
};

numberBarPositioning();

document.addEventListener("scroll", numberBarPositioning);
document.addEventListener("resize", numberBarPositioning);

// Footer Positioning

const mainContant = document.getElementById("main");
const footer = document.getElementById("footer");
const footerPositioning = () => {
	const mainRect = main.getBoundingClientRect();
	top;

	let contentHeightOverflowWindow = window.innerHeight - mainRect.bottom < footer.offsetHeight + 2;

	if (contentHeightOverflowWindow) {
		footer.style.position = "relative";
	} else {
		footer.style.position = "fixed";
	}
};

footerPositioning();

// Prevent Ranked Song Wrap While Hovering

const rSongContainer = document.getElementsByClassName("r-song-container");

const preventRankedSongOverflow = () => {
	let pageWidth = window.innerWidth || document.documentElement.clientWidth;

	const rSongToGetSize = document.getElementsByClassName("r-song-giga")[0];
	const rSongSize = window.getComputedStyle(rSongToGetSize);
	const rSongWidth = parseInt(rSongSize.marginLeft, 10) + rSongToGetSize.offsetWidth + parseInt(rSongSize.marginRight, 10);

	const rNumToGetSize = document.getElementsByClassName("r-num-container")[0];
	const rNumSize = window.getComputedStyle(rNumToGetSize);
	const rNumContainerWidth = parseInt(rNumSize.marginLeft, 10) + rNumToGetSize.offsetWidth + parseInt(rNumSize.marginRight, 10);

	// Space Increase While Hovering a Song (unit = "px")
	const spaceForRSongTransform = 42;

	Array.from(rSongContainer).forEach((element) => {
		element.style.minWidth = String(Math.floor((pageWidth - rNumContainerWidth - spaceForRSongTransform) / rSongWidth) * rSongWidth + spaceForRSongTransform) + "px";
	});
};

preventRankedSongOverflow();

window.addEventListener("resize", preventRankedSongOverflow);

// Contents Rearrangement

const contentsRearrangement = () => {
	// Songs Come into Window Judgement
	songsAppearAndHide();
	// Number Bars Positioning
	numberBarPositioning();
	// Footer Positioning
	footerPositioning();
};

// Difficulty Buttons

const difficultyBar = document.getElementById("difficulty");
const difficultyButtons = difficultyBar.getElementsByTagName("button");
const ranked = document.getElementsByClassName("ranked");

let active = Array(difficultyButtons.length).fill(true);

Array.from(difficultyButtons).forEach((button, i) => {
	button.addEventListener("click", () => {
		// Switch the Button
		if (active[i]) {
			Array.from(rLevelOverall)[difficultyButtons.length - i - 1].style.display = "none";
			button.className = "btn-inactive";
			Array.from(ranked)[difficultyButtons.length - i - 1].style.display = "none";
			Array.from(diffRanked)[difficultyButtons.length - i - 1].style.display = "none";
		} else {
			Array.from(rLevelOverall)[difficultyButtons.length - i - 1].style.display = "flex";
			button.className = "btn-active";
			Array.from(ranked)[difficultyButtons.length - i - 1].style.display = "block";
			Array.from(diffRanked)[difficultyButtons.length - i - 1].style.display = "block";
		}
		active[i] = !active[i];

		searchFunction();
		contentsRearrangement();
	});
});

// Search Engine

// Push All the Ranked Songs Into a Matrix
let allRankedSongTitles = [];
Array.from(ranked).forEach((rankedElement) => {
	let rLevels = rankedElement.getElementsByClassName("r-level");

	let songTitlesInSingleRanked = [];
	Array.from(rLevels).forEach((rLevelElement) => {
		let songLists = rLevelElement.getElementsByTagName("li");

		let songTitlesInARLevel = [];
		Array.from(songLists).forEach((songElement) => {
			songTitlesInARLevel.push(songElement.innerText.toLowerCase().replace(/,/g, "X"));
		});

		songTitlesInSingleRanked.push(songTitlesInARLevel);
	});

	allRankedSongTitles.push(songTitlesInSingleRanked);
});

// Push All the Differently Ranked Songs Into a Matrix
let allDiffSongTitles = [];
Array.from(diffRanked).forEach((diffRankedElement) => {
	let diffSongLists = diffRankedElement.getElementsByClassName("d-song-title");

	let songTitlesInSingleDiffRanked = [];
	Array.from(diffSongLists).forEach((diffSongElement) => {
		songTitlesInSingleDiffRanked.push(diffSongElement.innerText.toLowerCase().replace(/,/g, "X"));
	});

	allDiffSongTitles.push(songTitlesInSingleDiffRanked);
});

// Song List Output

console.log("All the Ranked Songs: ", allRankedSongTitles);
console.log("All the Differently Ranked Songs: ", allDiffSongTitles);

//Search Judgement

const searchInput = document.getElementById("search");

const searchFunction = () => {
	let searchText = searchInput.value.toLowerCase();

	let rankedHidden = Array(ranked.length).fill(false);
	let diffRankedHidden = Array(diffRanked.length).fill(false);

	// Ranked Songs Searching Judgement
	allRankedSongTitles.forEach((songTitlesInSingleRanked, i) => {
		// Needs to Ensure the Button is Already Activated
		if (active[difficultyButtons.length - i - 1]) {
			if (songTitlesInSingleRanked.join(",").replace(/,/g, "\n").replace(/X/g, ",").includes(searchText)) {
				ranked[i].style.display = "block";

				let rLevelElements = ranked[i].getElementsByClassName("r-level");

				songTitlesInSingleRanked.forEach((songTitlesInARLevel, j) => {
					if (songTitlesInARLevel.join(",").replace(/,/g, "\n").replace(/X/g, ",").includes(searchText)) {
						rLevelElements[j].style.display = "flex";

						let rSongElement = rLevelElements[j].getElementsByTagName("li");

						songTitlesInARLevel.forEach((rSongContent, k) => {
							if (String(rSongContent).replace(/X/g, ",").includes(searchText)) {
								rSongElement[k].style.display = "block";
							} else {
								rSongElement[k].style.display = "none";
							}
						});
					} else {
						rLevelElements[j].style.display = "none";
					}
				});
				rankedHidden[i] = false;
			} else {
				ranked[i].style.display = "none";
				rankedHidden[i] = true;
			}
		}
	});

	// Differently Ranked Songs Judgement
	allDiffSongTitles.forEach((songTitlesInSingleDiffRanked, i) => {
		// Needs to Ensure the Button is Already Activated
		if (active[difficultyButtons.length - i - 1]) {
			if (songTitlesInSingleDiffRanked.join(",").replace(/,/g, "\n").replace(/X/g, ",").includes(searchText)) {
				diffRanked[i].style.display = "block";

				let diffSongElements = diffRanked[i].getElementsByTagName("li");

				songTitlesInSingleDiffRanked.forEach((diffSongContent, j) => {
					if (String(diffSongContent).replace(/X/g, ",").includes(searchText)) {
						diffSongElements[j].style.display = "list-item";
					} else {
						diffSongElements[j].style.display = "none";
					}
				});
				diffRankedHidden[i] = false;
			} else {
				diffRanked[i].style.display = "none";
				diffRankedHidden[i] = true;
			}
		}
	});

	// Overall Level Judgement
	rankedHidden.forEach((boolean, i) => {
		// Needs to Ensure the Button is Already Activated
		if (active[difficultyButtons.length - i - 1]) {
			if (!boolean || !diffRankedHidden[i]) {
				rLevelOverall[i].style.display = "flex";
			} else {
				rLevelOverall[i].style.display = "none";
			}
		}
	});
	contentsRearrangement();
};

// Using IME While Inputing
let usingIME = false;

searchInput.addEventListener("compositionstart", () => {
	usingIME = true;
});

searchInput.addEventListener("compositionend", () => {
	usingIME = false;
	searchFunction();
});

// Not Using IME While Inputing
searchInput.addEventListener("input", () => {
	if (!usingIME) {
		searchFunction();
	}
});

// Differently Ranked Song Range Database

let diffSongRangeDatabase = [
	// Lv.15
	[
		[15.5, 15.8], // [M] MEGA　POP
		[15.4, 15.8], // [G] Euouae
		[15.4, 15.7], // [G] Hauynite
		[15.3, 15.7], // [G] Red Horse Massacre
		[15.3, 15.6], // [G] GIFT
		[15.3, 15.6], // [G] Evoltex (poppi'n mix)
		[15.1, 15.5], // [G] アリス失格
		[15.1, 15.5], // [G] Lucid Trigger
		[15.0, 15.4], // [G] Before Sunrise
	],
	// Lv.14
	[
		[14.5, 14.8], // [G] RE:IGNITE-Republic of Gamers
		[14.4, 14.7], // [G] Dead Soul
		[14.3, 14.9], // [G] GOEMON
		[14.3, 14.8], // [G] Mechanismós ton Antikythíron
		[14.3, 14.8], // [M] Viatores
		[14.3, 14.7], // [M] Dement ～After Legend～
		[14.2, 14.5], // [M] 天照
		[14.1, 14.6], // [G] 天照
		[14.1, 14.5], // [M] Unsung Hero
	],
	// Lv.13
	[
		[13.7, 14.0], // [M] Black Horse Famine
		[13.6, 14.0], // [M] Raving in Halloween
		[13.4, 13.8], // [M] Metheus
		[13.4, 13.7], // [M] HYPER-NOVA
		[13.3, 13.7], // [M] Wonderful Days
		[13.3, 13.7], // [M] Soul Army
		[13.3, 13.7], // [M] Anökumene
		[13.2, 13.5], // [G] The Dystopia's Tomorrow
		[13.2, 13.5], // [M] Stardust
	],
	// Lv.12
	[
		[12.6, 13.0], // [M] soar to Ø
		[12.5, 12.9], // [M] Black : Magnam
		[12.5, 12.8], // [M] Necroxus
		[12.4, 12.7], // [M] Reborn
	],
	// Lv.11
	[
		[11.6, 11.9], // [M] 风屿
		[11.5, 11.8], // [M] Mechanical Jäger
	],
];

// Number Bar Pointers

const newPointer = document.createElement("div");
newPointer.id = "pointer";

let stepFromLeftMargin = null;
let stepFromBeginning = null;
let difficulty = null;

const addPointer = (begin, end) => {
	// Set Pointer Difficulty, Begins and Ends
	const numberBarPadding = window.getComputedStyle(diffNumContainer[0]);

	if (Math.floor(begin) <= 16 && Math.floor(begin) >= 11 && Math.floor(end) - Math.floor(begin) <= 1) {
		difficulty = Math.floor(begin);
		stepFromLeftMargin = 10 * (begin - difficulty);
		stepFromBeginning = 10 * (end - begin) + 1;
	}

	let pageWidth = window.innerWidth || document.documentElement.clientWidth;

	let numberBarWidthUnit = (pageWidth - parseFloat(numberBarPadding.paddingLeft) - parseFloat(numberBarPadding.paddingRight)) / 11;

	newPointer.style.left = parseFloat(numberBarPadding.paddingLeft) + stepFromLeftMargin * numberBarWidthUnit - 12 + "px";

	newPointer.style.width = stepFromBeginning * numberBarWidthUnit + "px";

	// Create a Pointer
	diffNumContainer[15 - difficulty].appendChild(newPointer);

	let tl = gsap.timeline();
	tl.to(newPointer, 0, { clipPath: "inset(0 0 0 0)" }).from(newPointer, 0.4, {
		clipPath: "inset(0 100% 0 0)",
		ease: "power1.out",
	});
};

// Create a Pointer While Hovering

let indexMemory = null;
Array.from(diffRanked).forEach((diffRankedElement, i) => {
	let diffRankedSongsInEachDifficulty = diffRankedElement.getElementsByClassName("d-song-body");
	Array.from(diffRankedSongsInEachDifficulty).forEach((element, j) => {
		element.addEventListener("mouseover", () => {
			let range = diffSongRangeDatabase[i - 1][j];
			if (j != indexMemory) {
				indexMemory = j;
				addPointer(range[0], range[1]);
			}
		});
		element.addEventListener("mouseleave", () => {
			if (document.getElementById("pointer")) {
				indexMemory = null;
				pointer.remove();
			}
		});
	});
});
