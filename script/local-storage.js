const tabBarBtns = tabBar.getElementsByTagName("button");

// Changelog

const getChangelogCountUpdate = () => {
	const getStoredChangelogCardCount = () => {
		return parseInt(localStorage.getItem("storedChangelogCardCount"), 10) || 0;
	};

	let storedChangelogCardCount = getStoredChangelogCardCount();

	if (storedChangelogCardCount !== cardCount) {
		localStorage.setItem("storedChangelogCardCount", cardCount.toString());
		localStorage.setItem("changelogChecked", "false");
		console.log("Output: has new changelogs");
	}
};

let cardCount = 0;
fetch("../json/changelog.json")
	.then((response) => {
		return response.json();
	})
	.then((changelogData) => {
		const allVersionKeys = Object.keys(changelogData);
		allVersionKeys.forEach((release) => {
			changelogData[release].forEach(() => {
				++cardCount;
			});
		});
		getChangelogCountUpdate();
		buttonStoringFunctionAfterClick();
		toggleAllBtnDatasetRead();
	});

// Download

const screenshotsDates = [];
const fileDates = screenshotsBody.querySelectorAll(".date");
fileDates.forEach((element) => {
	screenshotsDates.push(element.textContent);
});
const stringifiedDates = screenshotsDates.join();

const storedDates = localStorage.getItem("storedScreenshotsFileDates").split(",") || Array(labels.length).fill(0);
screenshotsDates.forEach((date, index) => {
	if (storedDates[index] !== date) {
		labels[index].dataset.read = "false";
	}
});

const clearScreenshotLabelsLocalStorage = () => {
	Array.from(labels).forEach((element) => {
		element.dataset.read = "true";
	});
};

const getScreenshotsUpdate = () => {
	const getStoredScreenshotsFileDates = () => {
		return localStorage.getItem("storedScreenshotsFileDates") || Array(labels.length).fill(0).join();
	};

	let storedScreenshotsFileDates = getStoredScreenshotsFileDates();

	if (storedScreenshotsFileDates !== stringifiedDates) {
		localStorage.setItem("storedScreenshotsFileDates", stringifiedDates);
		localStorage.setItem("screenshotsChecked", "false");
		console.log("Output: has new screenshots");
	}
};
getScreenshotsUpdate();

// Btn functions

// Update localStorage and btn style before and after click
const initializeBtnStyle = (localStorageName, btn) => {
	if (localStorage.getItem(localStorageName) == "false") {
		btn.dataset.read = "false";
	}
};

const updateLocalStorageAfterClick = (localStorageName, btn) => {
	localStorage.setItem(localStorageName, "true");
	btn.dataset.read = "true";
};

const toggleAllBtnDatasetRead = () => {
	tabBar.dataset.read = "true";
	Array.from(tabBarBtns).forEach((btn) => {
		if (btn.dataset.read == "false") {
			tabBar.dataset.read = "false";
		}
	});
};

const buttonStoringFunctionAfterClick = () => {
	Array.from(tabBarBtns).forEach((btn) => {
		// CHANGELOG btn
		if (btn.textContent.toLowerCase() == "changelog") {
			initializeBtnStyle("changelogChecked", btn);
			btn.addEventListener("click", () => {
				updateLocalStorageAfterClick("changelogChecked", btn);
				toggleAllBtnDatasetRead();
			});
		} else if (btn.textContent.toLowerCase() == "screenshots") {
			initializeBtnStyle("screenshotsChecked", btn);
			btn.addEventListener("click", () => {
				updateLocalStorageAfterClick("screenshotsChecked", btn);
				toggleAllBtnDatasetRead();
			});
		}
	});
};
