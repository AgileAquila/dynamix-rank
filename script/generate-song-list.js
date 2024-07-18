const main = document.getElementById("main");

// Generate list framework

const generateListFramework = (lower, upper) => {
	const iterations = upper - lower + 1; // Creating counts
	for (let i = 0; i < iterations; i++) {
		// Generate overall level
		const newOverallLevel = document.createElement("div");
		newOverallLevel.className = "overall-level";
		newOverallLevel.innerHTML = "<span>Lv." + (upper - i) + "</span>";
		main.appendChild(newOverallLevel);

		// Generate non-subjective
		const newNonSubjective = document.createElement("ul");
		newNonSubjective.className = "non-subjective";
		main.appendChild(newNonSubjective);

		// Generate subjective
		const newSubjective = document.createElement("div");
		newSubjective.className = "subjective";
		main.appendChild(newSubjective);
	}
};
generateListFramework(11, 16);

// Generate non-subjective level containers

const generateAllNonSubjectiveLevelContainers = (decimalLower, decimalUpper, isHighlight) => {
	const allNonSubjectives = main.getElementsByClassName("non-subjective");
	Array.from(allNonSubjectives).forEach((nonSubjective, index) => {
		// Generate non-subjective level container
		const generateNonSubjectiveLevel = () => {
			const newNonSubjectiveLevelContainer = document.createElement("li");
			newNonSubjectiveLevelContainer.className = "non-subjective-level-container";
			nonSubjective.appendChild(newNonSubjectiveLevelContainer);
		};

		// Generate all non-subjective level containers in single non-subjective
		let iterations = index == 0 ? 1 : 10 * (decimalUpper - decimalLower) + 1; // Create counts
		for (let i = 0; i < iterations; i++) {
			generateNonSubjectiveLevel();
		}

		// Highlight judgement
		if (isHighlight) {
			let nonSubjectiveSongContainersInSingleNonSubjective = nonSubjective.getElementsByClassName("non-subjective-level-container");
			nonSubjectiveSongContainersInSingleNonSubjective[0].dataset.highlight = "true";
		}
	});

	// Ignore the highest .9+
	const allNonSubjectiveSongContainers = main.getElementsByClassName("non-subjective-level-container");
	allNonSubjectiveSongContainers[1].remove();
};
generateAllNonSubjectiveLevelContainers(0.0, 1.0, true);

// Generate all non-subjective numbers and all non-subjective song containers

const generateAllNonSubjectiveNumbers = () => {
	const allOverallLevels = main.getElementsByClassName("overall-level");
	const allNonSubjectives = main.getElementsByClassName("non-subjective");
	Array.from(allNonSubjectives).forEach((nonSubjective, outerIndex) => {
		// Get all non-subjective level containers in single non-subjective
		let nonSubjectiveLevelContainersInSingleNonSubjective = nonSubjective.getElementsByClassName("non-subjective-level-container");

		// Get overall level number
		let overallLevelContents = allOverallLevels[outerIndex].textContent;
		let overallLevelNum = parseInt(overallLevelContents.replace(/[^\d]/g, ""), 10);

		// Generate non-subjective number and non-subjective song container for non-subjective level container
		Array.from(nonSubjectiveLevelContainersInSingleNonSubjective).forEach((nonSubjectiveLevelContainer, innerIndex) => {
			// Concatenate non-subjective number
			let decimalNum = (nonSubjectiveLevelContainersInSingleNonSubjective.length - 1 - innerIndex) / 10;
			let concatenateNonSubjectiveNum = overallLevelNum + decimalNum;

			// Set non-subjective number contents
			let nonSubjectiveNumStr = undefined;
			if (outerIndex == 0) {
				// Set the highest non-subjective number decimal part to X
				nonSubjectiveNumStr = overallLevelNum.toString() + ".X";
			} else {
				nonSubjectiveNumStr = concatenateNonSubjectiveNum < overallLevelNum + 1 ? concatenateNonSubjectiveNum.toFixed(1) : overallLevelNum.toString() + ".9+";
			}

			// Generate non-subjective number
			const newNonSubjectiveNum = document.createElement("span");
			newNonSubjectiveNum.className = "non-subjective-num";
			newNonSubjectiveNum.textContent = nonSubjectiveNumStr;
			nonSubjectiveLevelContainer.appendChild(newNonSubjectiveNum);

			// Generate non-subjective song container for non-subjective level container
			const newNonSubjectiveSongContainer = document.createElement("ul");
			newNonSubjectiveSongContainer.className = "non-subjective-song-container";
			nonSubjectiveLevelContainer.appendChild(newNonSubjectiveSongContainer);
		});
	});
};
generateAllNonSubjectiveNumbers();

// Generate all non-subjective songs

fetch("../json/non-subjective-list.json")
	.then((response) => {
		return response.json();
	})
	.then((nonSubjectiveData) => {
		const allNonSubjectiveSongContainers = main.getElementsByClassName("non-subjective-song-container");
		const allNumKeys = Object.keys(nonSubjectiveData);

		let allSongTitles = []; // Get all non-subjective song srcs
		let allSongHyphenatedTitles = []; // Get all non-subjective song hyphenated titles

		// Generate all non-subjective song frameworks
		Array.from(allNonSubjectiveSongContainers).forEach((nonSubjectiveSongContainer, index) => {
			const generateAllSongFrameworks = () => {
				// Get all non-subjective song datas in single num
				let allModesInSingleNum = [];
				let num = allNumKeys[index];
				let allSongsInSingleNum = nonSubjectiveData[num];
				allSongsInSingleNum.forEach((songInSingleNum) => {
					allSongTitles.push(songInSingleNum.title);
					allSongHyphenatedTitles.push(songInSingleNum.hyphenatedTitle);
					allModesInSingleNum.push(songInSingleNum.mode);
				});

				// Generate all non-subjective song frameworks in single non-subjective song container
				for (i = 0; i < allModesInSingleNum.length; i++) {
					// Set song framework properties
					const newSongFramework = document.createElement("li");
					newSongFramework.className = "non-subjective-song";

					// Set non-subjective song framework mode
					newSongFramework.dataset.mode = allModesInSingleNum[i].toString();
					nonSubjectiveSongContainer.appendChild(newSongFramework);
				}
			};
			if (index < allNumKeys.length) {
				generateAllSongFrameworks(); // Generate
			} // Prevent overflow
		});

		// Generate all non-subjective song bgs and titles
		const allNonSubjectiveSongFrameworks = main.getElementsByClassName("non-subjective-song");

		Array.from(allNonSubjectiveSongFrameworks).forEach((nonSubjectiveSongFramework, index) => {
			// Generate all non-subjective song bgs
			const newSongBg = document.createElement("img");
			newSongBg.className = "song-bg";
			newSongBg.src = "../song-bg/" + allSongHyphenatedTitles[index] + ".webp";
			newSongBg.alt = allSongHyphenatedTitles[index];
			nonSubjectiveSongFramework.appendChild(newSongBg);

			// Generate all non-subjective song titles
			const newSongTitle = document.createElement("span");
			newSongTitle.className = "song-title";
			newSongTitle.textContent = allSongTitles[index];
			nonSubjectiveSongFramework.appendChild(newSongTitle);
		});
	});

// Generate all subjective number bar

const generateSubjectiveNumBar = (lower, upper, isHighlight) => {
	const allSubjectives = main.getElementsByClassName("subjective");
	Array.from(allSubjectives)
		.slice(1) // Ignore top
		.forEach((subjective, index) => {
			// Generate num bar framework in single subjective
			const newNumBarFramework = document.createElement("div");
			newNumBarFramework.className = "num-bar";
			if (index == 0) {
				newNumBarFramework.style.padding = "5px 128px 3px 128px";
			}
			subjective.appendChild(newNumBarFramework);

			// Get generated num bar framework
			let latestNumBarFramework = main.getElementsByClassName("num-bar")[index];

			// Get overall level number
			const allOverallLevels = main.getElementsByClassName("overall-level");
			let overallLevelContents = allOverallLevels[index + 1].textContent;
			let overallLevelNum = parseInt(overallLevelContents.replace(/[^\d]/g, ""), 10);

			// Generate nums in single subjective
			iterations = 10 * (upper - lower) + 1;
			for (i = 0; i < iterations; i++) {
				// Text content in num bar
				let numTextContent = undefined;

				// Keep integer part jusgement
				if (i == 0 || i == iterations - 1) {
					numTextContent = lower + i / 10 < 1 ? (overallLevelNum + lower + i / 10).toFixed(1) : overallLevelNum.toString() + ".9+";
				} else {
					numTextContent = (10 * lower + i).toString();
				}

				// Replace highest decimal part 9+ to X
				if (index == 0 && i == iterations - 1) {
					numTextContent = (overallLevelNum + 1).toString() + ".X";
				}

				// Set single num properties
				const newNum = document.createElement("span");
				newNum.className = "num";
				newNum.textContent = numTextContent;

				// Highlight judgement
				if (isHighlight && i == iterations - 1) {
					newNum.dataset.highlight = "true";
				}

				// Generate single num
				latestNumBarFramework.appendChild(newNum);
			}

			// Generate transparent num bar in single subjective
			const newTransparentNumBar = document.createElement("div");
			newTransparentNumBar.className = "transparent-num-bar";
			subjective.appendChild(newTransparentNumBar);
		});
};
generateSubjectiveNumBar(0.0, 1.0, true);

// Generate all subjective songs

fetch("../json/subjective-list.json")
	.then((response) => {
		return response.json();
	})
	.then((subjectiveData) => {
		const allSubjectives = main.getElementsByClassName("subjective");
		const allNumKeys = Object.keys(subjectiveData);

		let allLowers = []; // Get all song lower bounds
		let allUppers = []; // Get all song upper bounds
		let allTitles = []; // Get all song titles
		let allHyphenatedTitles = []; // Get all song hyphenated titles

		// Generate all subjective song containers
		Array.from(allSubjectives)
			.slice(1) // Ignore top
			.forEach((subjective, outerIndex) => {
				// Generate all subjective container
				const newSubjectiveContainer = document.createElement("div");
				newSubjectiveContainer.className = "subjective-container";
				subjective.appendChild(newSubjectiveContainer);

				let subjectiveContainer = subjective.getElementsByClassName("subjective-container")[0];

				// Get all subjective song datas in single num
				let allLowersInSingleNum = [];
				let allUppersInSingleNum = [];
				let allModesInSingleNum = [];
				let num = allNumKeys[outerIndex];
				let songsInSingleNum = subjectiveData[num];

				songsInSingleNum.forEach((song) => {
					allTitles.push(song.title);
					allHyphenatedTitles.push(song.hyphenatedTitle);
					allLowers.push(song.lower);
					allLowersInSingleNum.push(song.lower);
					allUppers.push(song.upper);
					allUppersInSingleNum.push(song.upper);
					allModesInSingleNum.push(song.mode);
				});

				// Generate all subjective song containers in single num
				songsInSingleNum.forEach((song, innerIndex) => {
					// Generate single subjective song container
					const newSubjectiveSongContainer = document.createElement("div");
					newSubjectiveSongContainer.className = "subjective-song-container";
					newSubjectiveSongContainer.dataset.mode = allModesInSingleNum[innerIndex];
					newSubjectiveSongContainer.style.paddingLeft = "calc(128px + 10 * " + allLowersInSingleNum[innerIndex] + " * (100% - 256px) / 11";
					subjectiveContainer.appendChild(newSubjectiveSongContainer);
				});

				// Get overall level number
				const allOverallLevels = main.getElementsByClassName("overall-level");
				let overallLevelContents = allOverallLevels[outerIndex + 1].textContent;
				let overallLevelNum = parseInt(overallLevelContents.replace(/[^\d]/g, ""), 10);

				// Generate all subjective song frameworks and song tails in single subjective
				const allSubjectiveSongContainers = subjective.getElementsByClassName("subjective-song-container");
				Array.from(allSubjectiveSongContainers).forEach((subjectiveSongContainer, innerIndex) => {
					// Generate subjective song framework
					const newSubjectiveSong = document.createElement("span");
					newSubjectiveSong.className = "subjective-song";
					subjectiveSongContainer.appendChild(newSubjectiveSong);

					// Set song tail properties
					const newSongTail = document.createElement("span");
					newSongTail.className = "song-tail";

					// Set song tail long
					let tailStep = 10 * (allUppersInSingleNum[innerIndex] - allLowersInSingleNum[innerIndex]);
					let tailLong = "calc((" + tailStep.toString() + " + 0.25) * (100% - 256px) / 11 - 170px)";
					newSongTail.style.width = tailLong;

					// Set song tail contents
					let tailContentUpper = Number(allUppersInSingleNum[innerIndex]) < 1 ? (Number(allUppersInSingleNum[innerIndex]) + overallLevelNum).toString() : overallLevelNum.toString() + ".9+";
					if (outerIndex == 0 && Number(allUppersInSingleNum[innerIndex]) >= 1) {
						tailContentUpper = (overallLevelNum + 1).toString() + ".X";
					}
					let tailContent = (Number(allLowersInSingleNum[innerIndex]) + overallLevelNum).toFixed(1) + "&nbsp-&nbsp <span>" + tailContentUpper + "</span>";

					newSongTail.innerHTML = tailContent;

					// Highlight judgement
					let isHighlight = true; // Default
					if (isHighlight && Number(allUppersInSingleNum[innerIndex]) >= 1) {
						newSongTail.dataset.highlight = "true";
					}

					// Generate song tail
					subjectiveSongContainer.appendChild(newSongTail);
				});
			});

		const allSubjectiveSongs = main.getElementsByClassName("subjective-song");
		Array.from(allSubjectiveSongs).forEach((song, index) => {
			// Generate all subjective song bgs
			const newSongBg = document.createElement("img");
			newSongBg.className = "song-bg";
			newSongBg.src = "../song-bg/" + allHyphenatedTitles[index] + ".webp";
			newSongBg.alt = allHyphenatedTitles[index];
			song.appendChild(newSongBg);

			// Generate all subjective song titles
			const newSongTitle = document.createElement("span");
			newSongTitle.className = "song-title";
			newSongTitle.textContent = allTitles[index];
			song.appendChild(newSongTitle);
		});
	});
