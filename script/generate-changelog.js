// Generate changelog

// Get changelog.json
let versions = [];
let dates = [];
let contents = [];
fetch("../json/changelog.json")
	.then((response) => {
		return response.json();
	})
	.then((changelogData) => {
		const allVersionKeys = Object.keys(changelogData);
		allVersionKeys.forEach((release) => {
			changelogData[release].forEach((update) => {
				versions.push(update.version);
				dates.push(update.date);
				contents.push(update.contents);
			});
		});
	});

// Generate function
const generateCards = () => {
	// 	Get first script in body
	const firstScript = document.body.getElementsByTagName("script")[0];

	// Generate changelog page
	const newChangelogPage = document.createElement("div");
	newChangelogPage.id = "changelog-page";
	document.body.insertBefore(newChangelogPage, firstScript);

	// Generate changelog header
	const newChangelogHeader = document.createElement("div");
	newChangelogHeader.id = "changelog-header";
	newChangelogPage.appendChild(newChangelogHeader);

	// Generate back btn
	const newBackBtn = document.createElement("button");
	newBackBtn.className = "back-btn";
	const backBtnImg = document.createElement("img");
	backBtnImg.src = "images/back.svg";
	backBtnImg.alt = "back";
	newBackBtn.appendChild(backBtnImg);
	newChangelogHeader.appendChild(newBackBtn);

	// Generate dynamix logo
	const newDynamixLogo = document.createElement("img");
	newDynamixLogo.src = "images/dynamix.png";
	newDynamixLogo.alt = "logo";
	newChangelogHeader.appendChild(newDynamixLogo);

	// Generate text below dynamix logo
	const newLogoText = document.createElement("div");
	newLogoText.style = "color: white; font-family: dynamix; letter-spacing: 1px";
	newLogoText.textContent = "CHANGELOG";
	newChangelogHeader.appendChild(newLogoText);

	// Generate scroll bar container
	const newScrollBarContainer = document.createElement("div");
	newScrollBarContainer.id = "scroll-bar-container";
	newChangelogHeader.appendChild(newScrollBarContainer);

	// Generate scroll bar
	const newScrollBar = document.createElement("span");
	newScrollBar.id = "scroll-bar";
	const newScrollBarMixer = document.createElement("img");
	newScrollBarMixer.src = "images/mixer.svg";
	newScrollBarMixer.alt = "mixer";
	newScrollBarMixer.dataset.grabbing = "false";
	newScrollBarMixer.style.left = "0px";
	newScrollBar.appendChild(newScrollBarMixer);
	newScrollBarContainer.appendChild(newScrollBar);

	// Generate scroll bar lower
	const newScrollLower = document.createElement("span");
	newScrollLower.id = "scroll-lower";
	newScrollLower.textContent = 1;
	newScrollBarContainer.insertBefore(newScrollLower, newScrollBar);

	// Generate scroll bar upper
	const newScrollUpper = document.createElement("span");
	newScrollUpper.id = "scroll-upper";
	newScrollUpper.textContent = cardCount;
	newScrollBarContainer.appendChild(newScrollUpper);

	// Generate changelog body with card container
	const newChangelogBody = document.createElement("div");
	newChangelogBody.id = "changelog-body";
	const newCardContainer = document.createElement("div");
	newCardContainer.id = "card-container";
	newChangelogBody.appendChild(newCardContainer);
	newChangelogPage.appendChild(newChangelogBody);

	// Generate cards
	for (let i = 0; i < cardCount; i++) {
		const newCard = document.createElement("div");
		newCard.className = "card";
		newCardContainer.appendChild(newCard);

		const newCardBody = document.createElement("div");
		newCardBody.className = "card-body";
		newCard.appendChild(newCardBody);

		// Generate card buttons
		const newBtns = document.createElement("div");
		newBtns.className = "buttons";
		for (let j = 0; j < 2; j++) {
			const newBtn = document.createElement("button");
			newBtn.type = "button";
			newBtn.className = "left-arrow";
			if (j == 1) {
				newBtn.className = "right-arrow";
			}
			const newBtnArrow = document.createElement("img");
			newBtnArrow.src = "images/arrow.svg";
			newBtnArrow.alt = "arrow";
			newBtn.appendChild(newBtnArrow);
			newBtns.appendChild(newBtn);
		}
		newCardBody.appendChild(newBtns);

		// Generate card date
		const newDate = document.createElement("div");
		newDate.className = "date";
		newDate.textContent = dates[i];
		newCardBody.insertBefore(newDate, newBtns);

		// Generate card contents
		const newCardPageContainer = document.createElement("ul");
		newCardPageContainer.className = "card-page-container";
		const newCardPage = document.createElement("li");
		newCardPage.className = "card-page";
		newCardPageContainer.appendChild(newCardPage);
		newCardBody.insertBefore(newCardPageContainer, newDate);
		let cardContents = contents[i];
		cardContents.forEach((element) => {
			const newContentsTitle = document.createElement("h2");
			newContentsTitle.innerHTML = element.title.replace(" ", "&nbsp;");
			newCardPage.appendChild(newContentsTitle);

			let contentArr = element.item.split(". ");
			contentArr.forEach((content, index) => {
				const newContent = document.createElement("div");
				newContent.className = "content";
				const newContentP = document.createElement("p");
				newContentP.innerHTML = content + ".";
				if (index == contentArr.length - 1) {
					newContentP.innerHTML = content;
				}
				newContent.appendChild(newContentP);
				newCardPage.appendChild(newContent);
			});
		});

		// Generate card title
		const newCardTitle = document.createElement("h1");
		newCardTitle.textContent = "[ " + versions[i] + " ] Update";
		newCardBody.insertBefore(newCardTitle, newCardPageContainer);
	}

	// Generate Nothing More...
	const nothingMore = document.createElement("div");
	nothingMore.style = "color: rgba(255, 255, 255, 0.7); font-family: dynamix; font-size: 16px; text-shadow: 0 5px 8px rgba(0, 0, 0, 0.5); width: 136px; margin-left: 24px";
	nothingMore.textContent = "Nothing More...";
	newCardContainer.appendChild(nothingMore);
};

// Entering animation

const changelogAnimation = () => {
	const changelogPage = document.getElementById("changelog-page");
	const changelogHeader = document.getElementById("changelog-header");
	const changelogBody = document.getElementById("changelog-body");
	changelogPage.style.display = "block";
	gsap.to(changelogPage, 0.5, {
		opacity: 1,
		ease: "power1.out",
	});
	gsap.to(changelogHeader, 0.5, {
		y: 100,
		ease: "power1.out",
	});
	gsap.to(changelogBody, 0.5, {
		y: -100,
		ease: "power1.out",
	});
};

// Import changelog.js

const importChangelogJs = () => {
	const changelogJs = document.createElement("script");
	changelogJs.src = "script/changelog.js";
	changelogJs.id = "changelog-javascript";
	document.head.appendChild(changelogJs);
};

const enterChangelog = () => {
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
		document.documentElement.dataset.scroll = "false";
		generateCards();
		changelogAnimation();
	}, 400);
	setTimeout(() => {
		document.removeEventListener("wheel", preventScroll);
		importChangelogJs();
	}, 900);
};

// Enter changelog

const tabBar = document.getElementById("tab-bar");
const tabBarButtons = tabBar.getElementsByTagName("button");

Array.from(tabBarButtons).forEach((button) => {
	if (button.textContent.toLowerCase() == "changelog") {
		button.addEventListener("click", enterChangelog);
	}
});
