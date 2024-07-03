// Start Page Animation

const start = document.getElementById("start");
const startText = start.textContent || start.innerText;
const startLetters = startText.split("");

start.innerHTML = "";

startLetters.forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    start.appendChild(span);
});

function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
};

function loopWithDelay(iterations, delay) {
    let i = 0;
    let intervalId = setInterval(function () {
        if (i < iterations) {
            console.log("Iteration " + i);
            const spans = start.getElementsByTagName("span");
            for (let i = 0; i < spans.length; i++) {
                const span = spans[i];

                if (span.textContent.trim() !== "") {
                    span.textContent = getRandomLetter();
                };
            };
            i++;
        } else {
            const spans = start.getElementsByTagName("span");
            for (let i = 0; i < spans.length; i++) {
                const span = spans[i];
                span.textContent = startLetters[i];
            };
            clearInterval(intervalId);
        };
    }, delay);
};

loopWithDelay(15, 40);

gsap.to(
    start, {
    css: {
        filter: "blur(0px)",
        transform: "scaleX(100%)",
        opacity: 1,
    },
    duration: 1,
    ease: "power2.out",
},
);

// Enter Animation

let tabActivated = 0;
const startPage = document.getElementById("start-page");
const diffRanked = document.querySelectorAll(".diff-ranked");
const footer = document.getElementById("footer");
const searchContainer = document.getElementById("search-box");
const participants = document.getElementById("participants");

function enterAnimation() {
    if (tabActivated == 0) {
        gsap.to(
            startPage, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1,
            ease: "power1.out",
        },
        );
        const tabBar = document.getElementById("tab-bar");
        function enter() {
            startPage.remove();
            appearance();
            mainEnter();

            gsap.to(
                diffRanked, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out",
            }
            );

            gsap.to(
                footer, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out",
            }
            );

            gsap.to(
                searchContainer, {
                x: -36,
                opacity: 1,
                delay: 0.2,
                duration: 0.4,
                ease: "power1.out",
            }
            );

            gsap.to(
                participants, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out",
            }
            );

            gsap.to(
                tabBar, {
                x: -36,
                opacity: 1,
                duration: 0.4,
                ease: "power1.out",
            },
            );
        };
        setTimeout(tabActivated = 1, 700);
        setTimeout(enter, 700);
        window.scrollTo(0,0);
    };
};

function preventScroll(event) {
    event.preventDefault();
}

function enableScroll() {
    document.removeEventListener('wheel', preventScroll);
}

window.onload = function () {
    document.addEventListener('wheel', preventScroll, { passive: false });

    document.addEventListener('wheel', function (event) {
        if (event.deltaY > 0) {
            enterAnimation();
            setTimeout(enableScroll, 700);
        }
    });

    document.addEventListener('click', function () {
        enterAnimation();
        setTimeout(enableScroll, 700);
    });
};
// Song Animation

const rLevels = document.querySelectorAll(".r-level");
const dLevels = document.querySelectorAll(".d-song-body");
const rLevelsOverall = document.querySelectorAll(".r-level-overall");

function appearanceAnimation(appearanceElement) {
    let rect = appearanceElement.getBoundingClientRect();
    let inViewport = rect.bottom > 0 && rect.top < window.innerHeight;

    if (inViewport) {
        gsap.to(
            appearanceElement, {
            x: 100,
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
        },
        );
    } else {
        gsap.to(
            appearanceElement, {
            x: 0,
            opacity: 0,
            duration: 0,
        },
        );
    };
};

function dAppearanceAnimation(appearanceElement) {
    let rect = appearanceElement.getBoundingClientRect();
    let inViewport = rect.bottom > 0 && rect.top < window.innerHeight;

    if (inViewport) {
        gsap.to(
            appearanceElement, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
        },
        );
    } else {
        gsap.to(
            appearanceElement, {
            x: -100,
            opacity: 0,
            duration: 0,
        },
        );
    };
}

function appearance() {
    if (tabActivated == 1) {
        rLevels.forEach(appearanceAnimation);
        rLevelsOverall.forEach(appearanceAnimation);
        dLevels.forEach(dAppearanceAnimation);
    };
};

function mainEnter() {
    document.addEventListener("scroll", handleScroll);
    document.addEventListener("resize", appearance);
};

// Buttons

let difficulty = document.getElementById("difficulty");
let difficultyButtons = difficulty.getElementsByTagName("button");
let rankedContainers = document.querySelectorAll(".ranked");
let dRankedContainers = document.querySelectorAll(".diff-ranked");

document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener("click", function () {
            const specialButton = difficultyButtons[i].getAttribute("id");
            let buttonStatus = difficultyButtons[i].getAttribute("class");

            if (specialButton == "special") {
                if (buttonStatus == "inactive") {
                    difficultyButtons[i].setAttribute("style", "");
                    difficultyButtons[i].className = "active";

                    rankedContainers[rankedContainers.length - i - 1].style.display = "";
                    dRankedContainers[dRankedContainers.length - i - 1].style.display = "";

                    searchFunction();
                } else {
                    difficultyButtons[i].setAttribute("style", "border: 3px solid rgba(131, 0, 0, 0.5); background-color: rgba(131, 0, 0, 0.35); box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.5); color: rgba(210, 0, 0, 0.7); text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);");
                    difficultyButtons[i].className = "inactive";

                    rankedContainers[rankedContainers.length - i - 1].style.display = "none";
                    dRankedContainers[dRankedContainers.length - i - 1].style.display = "none";

                    searchFunction();
                };
            } else {
                if (buttonStatus == "inactive") {
                    difficultyButtons[i].setAttribute("style", "");
                    difficultyButtons[i].className = "active";

                    rankedContainers[rankedContainers.length - i - 1].style.display = "";
                    dRankedContainers[dRankedContainers.length - i - 1].style.display = "";

                    searchFunction();
                } else {
                    difficultyButtons[i].setAttribute("style", "border: 3px solid rgba(0, 131, 118, 0.5); background-color: rgba(0, 131, 118, 0.35); box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.5); color: rgba(0, 219, 197, 0.5); text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);");
                    difficultyButtons[i].className = "inactive";

                    rankedContainers[rankedContainers.length - i - 1].style.display = "none";
                    dRankedContainers[dRankedContainers.length - i - 1].style.display = "none";

                    searchFunction();
                };
            };

            let diffNumContainer = document.getElementsByClassName("diff-num-container");

            for (j = 0; j < diffNumContainer.length; j++) {
                diffNumContainer[j].style.position = "relative";

                gsap.to(
                    diffNumContainer[j], {
                    y: 0,
                    duration: 0,
                },
                );
            };
            diffScrollRefresh();
            console.log(isAbove);
            footerIsHigherThanPageFix();
        });
    };
});

// Diff Ranked Songs

// 15

let diffSongContainer15 = document.getElementById("d-song-container-15");
let diffNumContainer15 = document.getElementById("d-num-container-15");


function createPointer15(begin, end) {
    let newPointer = document.createElement("div");
    newPointer.classList.add("pointer");
    newPointer.id = "pointer15";
    const pointerContainer15 = document.getElementById("d-num-container-15");
    pointerContainer15.appendChild(newPointer);
    newPointer.style.left = `calc((100% - 256px) / 11 * ${begin} + 128px)`;
    newPointer.style.width = `calc((100% - 256px) / 11 * (${end} - ${begin} + 1) - 32px)`;

    gsap.from(
        newPointer, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.4,
        ease: "power1.out",
    },
    );
};

const unrSongs15 = diffSongContainer15.getElementsByClassName("d-song-body");
for (let i = 0; i < unrSongs15.length; i++) {
    let titleString = "";
    unrSongs15[i].addEventListener("mouseover", function () {
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function (title) {
            if (title.id !== titleString) {
                const pointer15 = document.getElementById("pointer15");

                if (title.id == "mega-pop") {
                    pointer15.remove();
                    createPointer15(5, 8);
                } else if (title.id == "euouae") {
                    pointer15.remove();
                    createPointer15(4, 8);
                } else if (title.id == "red-horse-massacre") {
                    pointer15.remove();
                    createPointer15(3, 7);
                } else if (title.id == "hauynite") {
                    pointer15.remove();
                    createPointer15(4, 7);
                } else if (title.id == "evoltex-poppi-n-mix") {
                    pointer15.remove();
                    createPointer15(3, 6);
                } else if (title.id == "arisu-sikkaku") {
                    pointer15.remove();
                    createPointer15(1, 5);
                } else if (title.id == "lucid-trigger") {
                    pointer15.remove();
                    createPointer15(1, 5);
                } else if (title.id == "before-sunrise") {
                    pointer15.remove();
                    createPointer15(0, 4);
                } else if (title.id == "gift") {
                    pointer15.remove();
                    createPointer15(3, 6);
                } else {
                    pointer15.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs15[i].addEventListener("mouseleave", function () {
        titleString = "";
        pointer15.remove();
        let newPointer = document.createElement("div");
        const pointerContainer15 = document.getElementById("d-num-container-15");
        newPointer.id = "pointer15";
        pointerContainer15.appendChild(newPointer);
        newPointer.style.display = "none";
    }
    )
};

// 14

let diffSongContainer14 = document.getElementById("d-song-container-14");
let diffNumContainer14 = document.getElementById("d-num-container-14");

function createPointer14(begin, end) {
    let newPointer = document.createElement("div");
    newPointer.classList.add("pointer");
    newPointer.id = "pointer14";
    const pointerContainer14 = document.getElementById("d-num-container-14");
    pointerContainer14.appendChild(newPointer);
    newPointer.style.left = `calc((100% - 256px) / 11 * ${begin} + 128px)`;
    newPointer.style.width = `calc((100% - 256px) / 11 * (${end} - ${begin} + 1) - 32px)`;

    gsap.from(
        newPointer, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.4,
        ease: "power1.out",
    },
    );
};

const unrSongs14 = diffSongContainer14.getElementsByClassName("d-song-body");
for (let i = 0; i < unrSongs14.length; i++) {
    let titleString = "";
    unrSongs14[i].addEventListener("mouseover", function () {
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function (title) {
            if (title.id !== titleString) {
                const pointer14 = document.getElementById("pointer14");

                if (title.id == "goemon") {
                    pointer14.remove();
                    createPointer14(3, 9);
                } else if (title.id == "re-ignite-republic-of-gamers") {
                    pointer14.remove();
                    createPointer14(5, 8);
                } else if (title.id == "viatores") {
                    pointer14.remove();
                    createPointer14(3, 8);
                } else if (title.id == "mechanismos-ton-antikythiron") {
                    pointer14.remove();
                    createPointer14(3, 8);
                } else if (title.id == "dead-soul") {
                    pointer14.remove();
                    createPointer14(4, 7);
                } else if (title.id == "dement-after-legend") {
                    pointer14.remove();
                    createPointer14(3, 7);
                } else if (title.id == "tianzhao-giga") {
                    pointer14.remove();
                    createPointer14(1, 6);
                } else if (title.id == "tianzhao-mega") {
                    pointer14.remove();
                    createPointer14(2, 5);
                } else if (title.id == "unsung-hero") {
                    pointer14.remove();
                    createPointer14(1, 5);
                } else {
                    pointer14.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs14[i].addEventListener("mouseleave", function () {
        titleString = "";
        pointer14.remove();
        let newPointer = document.createElement("div");
        const pointerContainer14 = document.getElementById("d-num-container-14");
        newPointer.id = "pointer14";
        pointerContainer14.appendChild(newPointer);
        newPointer.style.display = "none";
    }
    )
};

// 13

let diffSongContainer13 = document.getElementById("d-song-container-13");
let diffNumContainer13 = document.getElementById("d-num-container-13");


function createPointer13(begin, end) {
    let newPointer = document.createElement("div");
    newPointer.classList.add("pointer");
    newPointer.id = "pointer13";
    const pointerContainer13 = document.getElementById("d-num-container-13");
    pointerContainer13.appendChild(newPointer);
    newPointer.style.left = `calc((100% - 256px) / 11 * ${begin} + 128px)`;
    newPointer.style.width = `calc((100% - 256px) / 11 * (${end} - ${begin} + 1) - 32px)`;

    gsap.from(
        newPointer, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.4,
        ease: "power1.out",
    },
    );
};

const unrSongs13 = diffSongContainer13.getElementsByClassName("d-song-body");
for (let i = 0; i < unrSongs13.length; i++) {
    let titleString = "";
    unrSongs13[i].addEventListener("mouseover", function () {
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function (title) {
            if (title.id !== titleString) {
                const pointer13 = document.getElementById("pointer13");

                if (title.id == "black-horse-famine") {
                    pointer13.remove();
                    createPointer13(7, 10);
                } else if (title.id == "raving-in-halloween") {
                    pointer13.remove();
                    createPointer13(6, 10);
                } else if (title.id == "metheus") {
                    pointer13.remove();
                    createPointer13(4, 8);
                } else if (title.id == "wonderful-days") {
                    pointer13.remove();
                    createPointer13(3, 7);
                } else if (title.id == "soul-army") {
                    pointer13.remove();
                    createPointer13(3, 7);
                } else if (title.id == "stardust") {
                    pointer13.remove();
                    createPointer13(2, 5);
                } else if (title.id == "hyper-nova") {
                    pointer13.remove();
                    createPointer13(4, 7);
                } else if (title.id == "anokumene") {
                    pointer13.remove();
                    createPointer13(3, 7);
                } else if (title.id == "the-dystopia-s-tomorrow") {
                    pointer13.remove();
                    createPointer13(2, 5);
                }

                titleString = title.id;
            };
        });
    });
    unrSongs13[i].addEventListener("mouseleave", function () {
        titleString = "";
        pointer13.remove();
        let newPointer = document.createElement("div");
        const pointerContainer13 = document.getElementById("d-num-container-13");
        newPointer.id = "pointer13";
        pointerContainer13.appendChild(newPointer);
        newPointer.style.display = "none";
    }
    )
};

// 12

let diffSongContainer12 = document.getElementById("d-song-container-12");
let diffNumContainer12 = document.getElementById("d-num-container-12");


function createPointer12(begin, end) {
    let newPointer = document.createElement("div");
    newPointer.classList.add("pointer");
    newPointer.id = "pointer12";
    const pointerContainer12 = document.getElementById("d-num-container-12");
    pointerContainer12.appendChild(newPointer);
    newPointer.style.left = `calc((100% - 256px) / 11 * ${begin} + 128px)`;
    newPointer.style.width = `calc((100% - 256px) / 11 * (${end} - ${begin} + 1) - 32px)`;

    gsap.from(
        newPointer, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.4,
        ease: "power1.out",
    },
    );
};

const unrSongs12 = diffSongContainer12.getElementsByClassName("d-song-body");
for (let i = 0; i < unrSongs12.length; i++) {
    let titleString = "";
    unrSongs12[i].addEventListener("mouseover", function () {
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function (title) {
            if (title.id !== titleString) {
                const pointer12 = document.getElementById("pointer12");

                if (title.id == "soar-to") {
                    pointer12.remove();
                    createPointer12(6, 10);
                } else if (title.id == "black-magnam") {
                    pointer12.remove();
                    createPointer12(5, 9);
                } else if (title.id == "necroxus") {
                    pointer12.remove();
                    createPointer12(5, 8);
                } else if (title.id == "reborn") {
                    pointer12.remove();
                    createPointer12(4, 7);
                } else {
                    pointer12.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs12[i].addEventListener("mouseleave", function () {
        titleString = "";
        pointer12.remove();
        let newPointer = document.createElement("div");
        const pointerContainer12 = document.getElementById("d-num-container-12");
        newPointer.id = "pointer12";
        pointerContainer12.appendChild(newPointer);
        newPointer.style.display = "none";
    }
    )
};

// 11

let diffSongContainer11 = document.getElementById("d-song-container-11");
let diffNumContainer11 = document.getElementById("d-num-container-11");


function createPointer11(begin, end) {
    let newPointer = document.createElement("div");
    newPointer.classList.add("pointer");
    newPointer.id = "pointer11";
    const pointerContainer11 = document.getElementById("d-num-container-11");
    pointerContainer11.appendChild(newPointer);
    newPointer.style.left = `calc((100% - 256px) / 11 * ${begin} + 128px)`;
    newPointer.style.width = `calc((100% - 256px) / 11 * (${end} - ${begin} + 1) - 32px)`;

    gsap.from(
        newPointer, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.4,
        ease: "power1.out",
    },
    );
};

const unrSongs11 = diffSongContainer11.getElementsByClassName("d-song-body");
for (let i = 0; i < unrSongs11.length; i++) {
    let titleString = "";
    unrSongs11[i].addEventListener("mouseover", function () {
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function (title) {
            if (title.id !== titleString) {
                const pointer11 = document.getElementById("pointer11");

                if (title.id == "fengyu") {
                    pointer11.remove();
                    createPointer11(6, 9);
                } else if (title.id == "mechanical-jager") {
                    pointer11.remove();
                    createPointer11(5, 8);
                } else {
                    pointer11.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs11[i].addEventListener("mouseleave", function () {
        titleString = "";
        pointer11.remove();
        let newPointer = document.createElement("div");
        const pointerContainer11 = document.getElementById("d-num-container-11");
        newPointer.id = "pointer11";
        pointerContainer11.appendChild(newPointer);
        newPointer.style.display = "none";
    }
    )
};

//Footer

function footerIsHigherThanPageFix() {
    let main = document.getElementById("main");
    let mainBoundary = main.getBoundingClientRect();

    if (window.innerHeight - mainBoundary.bottom > 74 + 24) {
        footer.style.position = "fixed";
        footer.style.bottom = "0";
    } else {
        footer.style.position = "";
        footer.style.bottom = "";
    };
};

// Search Bar

let inputBox = document.getElementById("search");
let searchAllRanked = document.getElementsByClassName("r-song-container");
let searchAllRankedLevel = document.getElementsByClassName("r-level");

let searchAllUnanked = document.getElementsByClassName("d-song-container");

function searchFunction() {
    let inputValue = inputBox.value;
    let difficultyButtons = difficulty.getElementsByTagName("button");
    let searchAllRankedContainer = document.getElementsByClassName("ranked");

    // Ranked Search
    for (let k = 0; k < searchAllRankedContainer.length; k++) {
        if (difficultyButtons[difficultyButtons.length - k - 1].className == "inactive") {
            continue;
        };

        for (let i = 0; i < searchAllRanked.length; i++) {
            let searchRanked = searchAllRanked[i].getElementsByTagName("li");

            for (let j = 0; j < searchRanked.length; j++) {
                if (searchRanked[j].innerText.toLowerCase().includes(inputValue.toLowerCase())) {
                    searchRanked[j].style.display = "";
                } else {
                    searchRanked[j].style.display = "none";
                };
            };

            let displayCounter = 0;
            for (let j = 0; j < searchRanked.length; j++) {
                if (searchRanked[j].style.display == "none") {
                    displayCounter++;
                };
            };
            if (displayCounter == searchRanked.length) {
                searchAllRankedLevel[i].style.display = "none";
            } else {
                searchAllRankedLevel[i].style.display = "";
            };
        };
    };

    let rankedJudgement = [false, false, false, false, false, false];
    for (let i = 0; i < searchAllRankedContainer.length; i++) {
        if (difficultyButtons[difficultyButtons.length - i - 1].className == "inactive") {
            continue;
        };

        let displayCounter = 0;
        let searchRLevels = searchAllRankedContainer[i].getElementsByClassName("r-level");

        for (let j = 0; j < searchRLevels.length; j++) {
            if (searchRLevels[j].style.display == "none") {
                displayCounter++;
            };
        };
        if (displayCounter == searchRLevels.length) {
            rankedJudgement[i] = true;
        } else {
            rankedJudgement[i] = false;
        };
    };
    // Unanked Search

    let searchAllUnankedContainer = document.getElementsByClassName("diff-ranked");

    for (let k = 0; k < searchAllRankedContainer.length; k++) {
        if (difficultyButtons[difficultyButtons.length - k - 1].className == "inactive") {
            continue;
        };

        for (let i = 0; i < searchAllUnanked.length; i++) {
            let searchUnanked = searchAllUnanked[i].getElementsByTagName("li");
            let searchUnrankedText = searchAllUnanked[i].querySelectorAll(".d-song-bg");

            for (let j = 0; j < searchUnanked.length; j++) {
                if (searchUnrankedText[j].innerText.toLowerCase().includes(inputValue.toLowerCase())) {
                    searchUnanked[j].style.display = "";
                } else {
                    searchUnanked[j].style.display = "none";
                };
            };
        };
    };

    for (let i = 0; i < searchAllUnankedContainer.length; i++) {
        if (difficultyButtons[difficultyButtons.length - i - 1].className == "inactive") {
            continue;
        };

        let displayCounter = 0;
        let searchDLevels = searchAllUnankedContainer[i].getElementsByTagName("li");

        for (let j = 0; j < searchDLevels.length; j++) {
            if (searchDLevels[j].style.display == "none") {
                displayCounter++;
            };
        };
        if (displayCounter == searchDLevels.length) {
            searchAllUnankedContainer[i].style.display = "none";
        } else {
            searchAllUnankedContainer[i].style.display = "";
        };

        if (rankedJudgement[i] == true && searchAllUnankedContainer[i].style.display == "none") {
            searchAllRankedContainer[i].style.display = "none";
        } else {
            searchAllRankedContainer[i].style.display = "";
        };
    };

    appearance();

    diffNumContainer15.style.position = "relative";
    gsap.to(
        diffNumContainer15, {
        y: 0,
        duration: 0,
    },
    );
    diffNumContainer14.style.position = "relative";
    gsap.to(
        diffNumContainer14, {
        y: 0,
        duration: 0,
    },
    );
    diffNumContainer13.style.position = "relative";
    gsap.to(
        diffNumContainer13, {
        y: 0,
        duration: 0,
    },
    );
    diffNumContainer12.style.position = "relative";
    gsap.to(
        diffNumContainer12, {
        y: 0,
        duration: 0,
    },
    );
    diffNumContainer11.style.position = "relative";
    gsap.to(
        diffNumContainer11, {
        y: 0,
        duration: 0,
    },
    );

    footerIsHigherThanPageFix();
};

footerIsHigherThanPageFix();

inputBox.addEventListener("input", searchFunction);

function rSongContainerWidthChanges() {
    let pageWidth = window.innerWidth || document.documentElement.clientWidth;

    let rankedSongWidth = 128 + 16 + 8;
    let spaceForRankedSongTransforming = 42;

    let maxRankedSongCountPerLine = Math.floor((pageWidth - spaceForRankedSongTransforming - 178 - 8) / rankedSongWidth);
    let parentWidth = maxRankedSongCountPerLine * rankedSongWidth + spaceForRankedSongTransforming;

    for (let i = 0; i < searchAllRanked.length; i++) {
        searchAllRanked[i].style.width = parentWidth + "px";
    };

    console.log(maxRankedSongCountPerLine);
};

rSongContainerWidthChanges();

window.addEventListener("resize", rSongContainerWidthChanges);

let isAbove = [false, false, false, false, false];

function diffScrollRefresh() {
    let diffSongContainer = document.getElementsByClassName("d-song-container");
    let diffNumContainer = document.getElementsByClassName("diff-num-container");
    let transparentNumContainer = document.getElementsByClassName("transparent-num-container");

    for (i = 0; i < diffSongContainer.length; i++) {
        let rect = diffSongContainer[i].getBoundingClientRect();

        let diffRankedStyle = document.getElementsByClassName("diff-ranked");

        if (diffRankedStyle[i + 1].style.display == ! "none") {
            if (rect.top > 42 && rect.bottom > window.innerHeight) {
                diffNumContainer[i].style.position = "relative";
                diffNumContainer[i].style.left = "";
                diffNumContainer[i].style.top = "";
                diffNumContainer[i].style.width = "";
                diffNumContainer[i].style.zIndex = "";
                transparentNumContainer[i].style.display = "none";
                isAbove[i] = false;
            } else if (rect.top <= 42 && rect.bottom >= 42) {
                diffNumContainer[i].style.position = "fixed";
                diffNumContainer[i].style.left = "0";
                diffNumContainer[i].style.top = "0";
                diffNumContainer[i].style.width = "calc(100% - 256px)";
                transparentNumContainer[i].style.display = "block";
                if (isAbove[i] == true) {
                    gsap.to(
                        diffNumContainer[i], {
                        y: 0,
                        duration: 0.4,
                        ease: "power1.out",
                    },
                    );
                };
                isAbove[i] = false;
            } else if (rect.bottom <= 42) {
                gsap.to(
                    diffNumContainer[i], {
                    y: -50,
                    duration: 0.4,
                    ease: "power1.out",
                },
                );
                isAbove[i] = true;
            };
        };
    };
};

diffScrollRefresh();

document.addEventListener("scroll", diffScrollRefresh);
document.addEventListener("resize", diffScrollRefresh);

function throttle(func, limit) {
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
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        };
    };
};

const handleScroll = throttle(appearance, 50);