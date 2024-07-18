const tabBar = document.getElementById("tab-bar");
const tabBarBtns = tabBar.getElementsByTagName("button");

// CHANGELOG

const getChangelogCountUpdate = () => {
	const getStoredChangelogCardCount = () => {
		return parseInt(localStorage.getItem("storedChangelogCardCount"), 10) || 0;
	};

	let storedChangelogCardCount = getStoredChangelogCardCount();

	if (storedChangelogCardCount !== cardCount) {
		localStorage.setItem("storedChangelogCardCount", cardCount.toString());
		localStorage.setItem("changelogChecked", "false");
		console.log("HAS NEW CHANGELOG");
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
		checkAllBtnDatasetRead();
	});

// Btn functions

// Update localStorage and btn style after click
const initializeBtnStyle = (localStorageName, btn) => {
	if (localStorage.getItem(localStorageName) == "false") {
		btn.dataset.read = "false";
	}
};

const updateLocalStorageAfterClick = (localStorageName, btn) => {
	localStorage.setItem(localStorageName, "true");
	btn.dataset.read = "true";
};

const checkAllBtnDatasetRead = () => {
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
				checkAllBtnDatasetRead();
			});
		}
	});
};
