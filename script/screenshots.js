// Menu Button

const screenshotsContainer = document.getElementById("screenshots-container");
const screenshotsWindow = document.getElementById("screenshots");

const enterScreenshots = () => {
	resetCheckbox(); // Reset checkbox

	// Contents disappearing
	const menu = document.getElementById("menu");
	const main = document.getElementById("main");
	const footer = document.getElementById("footer");
	menu.style.right = "-88px";
	menu.style.opacity = "0";
	main.style.marginLeft = "-64px";
	main.style.opacity = "0";
	footer.style.opacity = "0";

	document.addEventListener("wheel", preventScroll, { passive: false });
	setTimeout(() => {
		menu.style.display = "none";
		screenshotsContainer.style.display = "flex";
		gsap.to(screenshotsWindow, 0.25, {
			opacity: 1,
			ease: "power1.out",
		});
	}, 250);
};

Array.from(tabBarButtons).forEach((button) => {
	if (button.textContent.toLowerCase() == "screenshots") {
		button.addEventListener("click", enterScreenshots);
	}
});

// Screenshots list check

const screenshotsBody = document.getElementById("screenshots-body");
const labels = screenshotsBody.getElementsByTagName("label");
const checkBoxes = screenshotsBody.getElementsByTagName("input");

let labelsChecked = Array(labels.length).fill(false);
const toggleCheckboxAndLabel = (index) => {
	labels[index].dataset.checked = labelsChecked[index];
	checkBoxes[index].checked = labelsChecked[index];
};

const allSelectJudgement = () => {
	if (labelsChecked.every((element) => element == true)) {
		selectAll.dataset.checked = "true";
		selectAllCheckBox.checked = true;
	} else {
		selectAll.dataset.checked = "false";
		selectAllCheckBox.checked = false;
	}
};

Array.from(labels).forEach((element, index) => {
	element.addEventListener("click", () => {
		labelsChecked[index] = !labelsChecked[index];
		toggleCheckboxAndLabel(index);
		trackFileNamesChecked();
		setDownloadBtnActiveData();
		allSelectJudgement();
	});
});

// Select all button

const screenshotsFooter = document.getElementById("screenshots-footer");
const selectAll = screenshotsFooter.getElementsByTagName("label")[0];
const selectAllCheckBox = screenshotsFooter.getElementsByTagName("input")[0];

selectAll.addEventListener("click", () => {
	if (labelsChecked.every((element) => element == true)) {
		labelsChecked.fill(false);
		selectAll.dataset.checked = "false";
		selectAllCheckBox.checked = false;
	} else {
		labelsChecked.fill(true);
		selectAll.dataset.checked = "true";
		selectAllCheckBox.checked = true;
	}
	for (let i = 0; i < labels.length; i++) {
		toggleCheckboxAndLabel(i);
	}
	trackFileNamesChecked();
	setDownloadBtnActiveData();
});

// Download btn active

const setDownloadBtnActiveData = () => {
	if (filesDownloadReady.length > 0) {
		downloadBtn.dataset.active = "true";
	} else {
		downloadBtn.dataset.active = "false";
	}
};

// Click download btn to download

const downloadBtn = screenshotsFooter.getElementsByTagName("button")[0];
const downloadLinksContainer = document.getElementById("download-links-container");

const fileNames = ["lv15-16", "lv14", "lv13", "lv12", "lv11"];

let filesDownloadReady = undefined;
const trackFileNamesChecked = () => {
	filesDownloadReady = [];
	for (let i = 0; i < labels.length; i++) {
		if (labelsChecked[i] == true) {
			filesDownloadReady.push(fileNames[i]);
		}
	}
};

const downloadFile = (filenameReady) => {
	const link = document.createElement("a");
	link.href = "images/" + filenameReady + ".png";
	link.download = filenameReady + ".png";

	downloadLinksContainer.appendChild(link);
	link.click();
	downloadLinksContainer.removeChild(link);
};

downloadBtn.addEventListener("click", () => {
	if (downloadBtn.dataset.active == "true") {
		let confirmText = "Are you sure you want to download these screenshots?";
		if (filesDownloadReady.length == 1) {
			confirmText = "Are you sure you want to download this screenshot?";
		} else if (filesDownloadReady.length == fileNames.length) {
			confirmText = "Are you sure you want to download all these screenshots?";
		}
		if (confirm(confirmText)) {
			filesDownloadReady.forEach((filenameReady) => {
				downloadFile(filenameReady);
			});
		}
	}
});

// Close btn

const screenshotsTitle = document.getElementById("screenshots-title");
const closeBtn = screenshotsTitle.getElementsByClassName("close")[0];

closeBtn.addEventListener("click", () => {
	gsap.to(screenshotsWindow, 0.25, {
		opacity: 0,
		ease: "power1.out",
	});
	menu.style.display = "block";
	setTimeout(() => {
		screenshotsContainer.style.display = "none";
		menu.style.right = "";
		menu.style.opacity = "1";
		main.style.marginLeft = "";
		main.style.opacity = "";
		footer.style.opacity = "";
		document.removeEventListener("wheel", preventScroll);
	}, 100);
	clearScreenshotLabelsLocalStorage();
});

// Reset checkbox when initializing download screenshots page

const resetCheckbox = () => {
	labelsChecked = Array(labels.length).fill(false);
	Array.from(labels).forEach((element, index) => {
		toggleCheckboxAndLabel(index);
		trackFileNamesChecked();
		setDownloadBtnActiveData();
		allSelectJudgement();
	});
};
