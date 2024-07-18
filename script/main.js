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
	ease: "power1.out",
});

welcomeTextRandomize(15, 40);

// Prevent Scroll before Entering Main Page

const preventScroll = (event) => {
	event.preventDefault();
};

document.addEventListener("wheel", preventScroll, { passive: false });

// Songs appear and hide

const songsAppearAndHide = () => {
	// Get all container elements
	const allOverallLevels = document.querySelectorAll(".overall-level");
	const allNonSubjectiveLevelContainers = document.querySelectorAll(".non-subjective-level-container");
	const allSubjectiveSongContainers = document.querySelectorAll(".subjective-song-container");
	const allContainers = [...allOverallLevels, ...allNonSubjectiveLevelContainers, ...allSubjectiveSongContainers];

	//
	let pageHeight = window.innerHeight;
	allContainers.forEach((element) => {
		let rect = element.getBoundingClientRect();
		if (rect.top < pageHeight && rect.bottom > 0) {
			gsap.to(element, 0, {
				x: 48,
				opacity: 1,
				ease: "power1.out",
			});
		} else {
			gsap.to(element, 0, {
				x: 0,
				opacity: 0,
				ease: "power1.out",
			});
		}
	});
};

// Enter Main Page Animation & Enable Scroll

let mainPageEntered = false;

const welcomePage = document.getElementById("welcome-page");
const particitants = document.getElementById("participants");
const menu = document.getElementById("menu");
const allSubjectives = document.getElementsByClassName("subjective");

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
			); // Menu Animation

		setTimeout(() => {
			mainPageEntered = true;
			menu.style.display = "block";
			resetPaddings();
			songsAppearAndHide();
			Array.from(allSubjectives).forEach((element) => {
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
			document.removeEventListener("click", clickControlsEntering);
		}
	})
);
document.addEventListener(
	"click",
	(clickControlsEntering = () => {
		window.scrollTo(0, 0);
		enteringAnimation();
		document.removeEventListener("wheel", clickControlsEntering);
		document.removeEventListener("click", clickControlsEntering);
	})
);

// Number bar positioning

const numBarPositioning = () => {
	const allNumberBars = document.querySelectorAll(".num-bar");
	const allTransparentNumberBars = document.querySelectorAll(".transparent-num-bar");
	const allSubjectiveContainers = document.querySelectorAll(".subjective-container");

	allSubjectiveContainers.forEach((element, index) => {
		let rect = element.getBoundingClientRect();
		if (rect.top > 36) {
			allNumberBars[index].style.position = "relative";
			allTransparentNumberBars[index].style.display = "none";
			allNumberBars[index].style.top = "0";
		} else if (rect.top <= 36 && rect.bottom > 36) {
			allNumberBars[index].style.position = "fixed";
			allTransparentNumberBars[index].style.display = "block";
			allNumberBars[index].style.top = "0";
		} else if (rect.bottom <= 36) {
			allNumberBars[index].style.position = "fixed";
			allTransparentNumberBars[index].style.display = "block";
			allNumberBars[index].style.top = "-36px";
		}
	});
};

// Prevent subjective songs overflow

const preventSubjectiveSongsOverflow = () => {
	const allNonSubjectives = document.querySelectorAll(".non-subjective");
	let pageWidth = window.innerWidth;
	let maxSongsPerLine = Math.floor((pageWidth - 170) / 152);
	let calculateWidth = 170 + maxSongsPerLine * 152 + 42;
	allNonSubjectives.forEach((element) => {
		element.style.width = calculateWidth + "px";
	});
};

window.addEventListener("DOMContentLoaded", preventSubjectiveSongsOverflow);
window.addEventListener("resize", () => {
	preventSubjectiveSongsOverflow();
	if (mainPageEntered) {
		songsAppearAndHide();
		numBarPositioning();
		footerPositioning();
	}
});

document.addEventListener("scroll", () => {
	if (mainPageEntered) {
		songsAppearAndHide();
		numBarPositioning();
		footerPositioning();
	}
});

const numBarPositioningAfterButtonAndSearch = () => {
	const allNumberBars = document.querySelectorAll(".num-bar");
	allNumberBars.forEach((element) => {
		element.style.transition = "all 0s";
	});
	numBarPositioning();
	allNumberBars.forEach((element) => {
		element.style.transition = "all 0.4s ease-out";
	});
};

// Difficulty buttons

const difficultyButtonContainer = document.getElementById("difficulty");
const allDifficultyButtons = difficultyButtonContainer.getElementsByTagName("button");
let difficultyButtonsActive = Array(6).fill(true);
Array.from(allDifficultyButtons).forEach((button, index) => {
	button.addEventListener("click", () => {
		// Get document contents
		const allOverallLevels = document.querySelectorAll(".overall-level");
		const allNonSubjectives = document.querySelectorAll(".non-subjective");

		// Click to change style
		difficultyButtonsActive[index] = !difficultyButtonsActive[index];
		button.dataset.active = difficultyButtonsActive[index].toString();

		// Click to appear and hide contents
		if (!difficultyButtonsActive[index]) {
			allOverallLevels[5 - index].style.display = "none";
			allNonSubjectives[5 - index].style.display = "none";
			allSubjectives[5 - index].style.display = "none";
		} else {
			allOverallLevels[5 - index].style.display = "flex";
			allNonSubjectives[5 - index].style.display = "block";
			allSubjectives[5 - index].style.display = "block";
		}

		searchFunction();
	});
});

// Search engine

// Get search bar
const searchBar = document.getElementById("search");

// Flitering songs
const songFliter = () => {
	// Get all songs
	const allNonSubjectiveSongs = document.querySelectorAll(".non-subjective-song");
	const allSubjectiveSongs = document.querySelectorAll(".subjective-song-container");
	const allSongs = [...allNonSubjectiveSongs, ...allSubjectiveSongs];

	// Get search bar contents
	let searchText = searchBar.value;

	// Songs flitering judgement
	allSongs.forEach((element) => {
		// Get song title
		let songTitle = undefined;
		if (element.getElementsByClassName("song-tail").length == 0) {
			songTitle = element.textContent;
		} else {
			songTitle = element.getElementsByClassName("subjective-song")[0].textContent;
		}

		if (songTitle.toLowerCase().includes(searchText.toLowerCase())) {
			element.style.display = "flex";
		} else {
			element.style.display = "none";
		}
	});
};

// Flitering song containers
const songContainerFliter = () => {
	const allNonSubjectiveLevelContainers = document.querySelectorAll(".non-subjective-level-container");

	allNonSubjectiveLevelContainers.forEach((element) => {
		element.style.display = "none";
		let songs = element.querySelectorAll(".non-subjective-song");
		for (let i = 0; i < songs.length; i++) {
			if (songs[i].style.display == "flex") {
				element.style.display = "flex";
				break;
			}
		}
	});
};

// Flitering non-subjectives
const nonSubjectiveFliter = () => {
	const allNonSubjectives = document.querySelectorAll(".non-subjective");

	allNonSubjectives.forEach((element, index) => {
		element.style.display = "none";
		let nonSubjectiveContainers = element.querySelectorAll(".non-subjective-level-container");
		for (let i = 0; i < nonSubjectiveContainers.length; i++) {
			if (nonSubjectiveContainers[i].style.display == "flex" && difficultyButtonsActive[5 - index]) {
				element.style.display = "block";
				break;
			}
		}
	});
};

// Flitering subjectives
const subjectiveFliter = () => {
	const allSubjectives = document.querySelectorAll(".subjective");

	allSubjectives.forEach((element, index) => {
		element.style.display = "none";
		let subjectiveSongContainers = element.querySelectorAll(".subjective-song-container");
		for (let i = 0; i < subjectiveSongContainers.length; i++) {
			if (subjectiveSongContainers[i].style.display == "flex" && difficultyButtonsActive[5 - index]) {
				element.style.display = "block";
				break;
			}
		}
	});
};

// Flitering overall levels
const overallLevelFliter = () => {
	const allOverallLevels = document.querySelectorAll(".overall-level");
	const allNonSubjectives = document.querySelectorAll(".non-subjective");
	const allSubjectives = document.querySelectorAll(".subjective");
	allOverallLevels.forEach((element, index) => {
		element.style.display = "none";
		if ((allNonSubjectives[index].style.display == "block" || allSubjectives[index].style.display == "block") && difficultyButtonsActive[5 - index]) {
			element.style.display = "flex";
		}
	});
};

// Padding reset
const resetPaddings = () => {
	const allNonSubjectives = document.querySelectorAll(".non-subjective");
	allNonSubjectives.forEach((nonSubjective) => {
		const nonSubjectiveLevelContainers = nonSubjective.querySelectorAll(".non-subjective-level-container");
		nonSubjectiveLevelContainers.forEach((element) => {
			element.style.paddingTop = "";
			element.style.paddingBottom = "";
		});
		const nonSubjectiveLevelContainersRemain = [];
		nonSubjectiveLevelContainers.forEach((element) => {
			if (element.style.display !== "none") {
				nonSubjectiveLevelContainersRemain.push(element);
			}
		});
		let remainCount = nonSubjectiveLevelContainersRemain.length;
		if (remainCount > 0) {
			nonSubjectiveLevelContainersRemain[0].style.paddingTop = "8px";
			nonSubjectiveLevelContainersRemain[remainCount - 1].style.paddingBottom = "8px";
		}
	});

	const allSubjectives = document.querySelectorAll(".subjective");
	allSubjectives.forEach((subjective) => {
		const subjectiveSongContainers = subjective.querySelectorAll(".subjective-song-container");
		subjectiveSongContainers.forEach((element) => {
			element.style.paddingTop = "";
			element.style.paddingBottom = "";
		});
		const subjectiveLevelContainersRemain = [];
		subjectiveSongContainers.forEach((element) => {
			if (element.style.display !== "none") {
				subjectiveLevelContainersRemain.push(element);
			}
		});
		let remainCount = subjectiveLevelContainersRemain.length;
		if (remainCount > 0) {
			subjectiveLevelContainersRemain[0].style.paddingTop = "16px";
			subjectiveLevelContainersRemain[remainCount - 1].style.paddingBottom = "16px";
		}
	});
};

const searchFunction = () => {
	songFliter();
	songContainerFliter();
	nonSubjectiveFliter();
	subjectiveFliter();
	overallLevelFliter();
	resetPaddings();
	songsAppearAndHide();
	numBarPositioningAfterButtonAndSearch();
	footerPositioning();
};

// Using IME While Inputing
let usingIME = false;

searchBar.addEventListener("compositionstart", () => {
	usingIME = true;
});

searchBar.addEventListener("compositionend", () => {
	usingIME = false;
	searchFunction();
});

// Not Using IME While Inputing
searchBar.addEventListener("input", () => {
	if (!usingIME) {
		searchFunction();
	}
});

// Footer positioning

const footerPositioning = () => {
	const pageHeight = window.innerHeight;
	const main = document.getElementById("main");
	const footer = document.getElementById("footer");
	let rect = main.getBoundingClientRect();
	let footerHeight = footer.offsetHeight + 2;
	if (pageHeight - rect.bottom - 4 <= footerHeight) {
		footer.style.position = "";
	} else {
		footer.style.position = "fixed";
	}
};
footerPositioning();

// Pointer

fetch("../json/subjective-list.json")
	.then((response) => {
		return response.json();
	})
	.then((subjectiveData) => {
		const allSubjectives = document.getElementsByClassName("subjective");
		const allNumKeys = Object.keys(subjectiveData);
		Array.from(allSubjectives)
			.slice(1)
			.forEach((subjective, outerIndex) => {
				let subjectiveContainer = subjective.getElementsByClassName("subjective-container")[0];
				let numBar = subjective.getElementsByClassName("num-bar")[0];
				let num = allNumKeys[outerIndex];
				let songsData = subjectiveData[num];
				let songs = subjective.querySelectorAll(".subjective-song-container");
				songs.forEach((element, innerIndex) => {
					element.addEventListener("mouseenter", () => {
						// Remove old pointer
						let pointer = document.getElementById("pointer");
						if (pointer) {
							numBar.removeChild(pointer);
						}

						let lower = songsData[innerIndex].lower;
						let upper = songsData[innerIndex].upper;

						// Create new pointer
						const newPointer = document.createElement("span");
						newPointer.id = "pointer";
						let steps = 10 * (upper - lower) + 1;
						newPointer.style.left = "calc(128px + " + lower.toString() + " * 10 * (100% - 256px) / 11 - 4px)";
						newPointer.style.width = "calc(" + steps.toString() + " * (100% - 256px) / 11)";
						numBar.appendChild(newPointer);

						// New pointer animation
						pointer = document.getElementById("pointer");
						gsap.to(pointer, 0.25, {
							clipPath: "inset(0 0% 0 0)",
							opacity: 1,
							ease: "power1.out",
						});

						// Number bar text animation
						let nums = numBar.querySelectorAll(".num");
						nums.forEach((num) => {
							num.style.color = "";
							num.style.textShadow = "";
						});
						for (i = 10 * lower; i < 10 * upper + 1; i++) {
							if (i == 10) {
								nums[i].style.color = "rgba(255, 0, 0, 1)";
								nums[i].style.textShadow = "0 0 8px rgba(255, 0, 0, 0.8)";
							} else {
								nums[i].style.color = "rgba(255, 255, 255, 1)";
								nums[i].style.textShadow = "0 0 4px rgba(255, 255, 255, 0.4)";
							}
						}
					});
				});
				subjectiveContainer.addEventListener("mouseleave", () => {
					let pointer = document.getElementById("pointer");
					if (pointer) {
						numBar.removeChild(pointer);
					}
					let nums = numBar.querySelectorAll(".num");
					nums.forEach((num) => {
						num.style.color = "";
						num.style.textShadow = "";
					});
				});
			});
	});
