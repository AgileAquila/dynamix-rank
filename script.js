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

function getRandomLetter(){
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
};

function loopWithDelay(iterations, delay){
    let i = 0;
    let intervalId = setInterval(function(){
        if(i < iterations){
            console.log("Iteration " + i);
            const spans = start.getElementsByTagName("span");
            for(let i = 0; i < spans.length; i++){
                const span = spans[i];

                if(span.textContent.trim() !== ""){
                    span.textContent = getRandomLetter();
                };
            };
        i++;
        }else{
            const spans = start.getElementsByTagName("span");
            for(let i = 0; i < spans.length; i++){
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

document.addEventListener("wheel", function preventScroll(wheelDown){
    if (wheelDown.deltaY > 0){
        gsap.to(
            startPage, {
                clipPath: "inset(0 0 100% 0)",
                duration: 1,
                ease: "power1.out",
            },
        );
        const tabBar = document.getElementById("tab-bar");
        gsap.to(
            tabBar, {
                x: -36,
                opacity: 1,
                delay: 0.9,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        function enter(){
            startPage.remove();
            appearance();
            mainEnter();
            document.removeEventListener('wheel', preventScroll, {passive: false});
            
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
                    delay: 0.3,
                    duration: 0.4,
                    ease: "power1.out",
                }
            );
        };
        setTimeout(tabActivated = 1, 700);
        setTimeout(enter, 700);
    };
    wheelDown.preventDefault();
}, {passive: false});

document.addEventListener("click", function preventScroll(){
    const tabBar = document.getElementById("tab-bar");
    gsap.to(
        tabBar, {
            x: -36,
            opacity: 1,
            delay: 0.9,
            duration: 0.4,
            ease: "power1.out",
        },
    );
    function enter(){
        startPage.remove();
        appearance();
        mainEnter();
        document.removeEventListener('wheel', preventScroll, {passive: false});
            
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
                delay: 0.3,
                duration: 0.4,
                ease: "power1.out",
            }
        );
    };
    setTimeout(tabActivated = 1, 700);
    setTimeout(enter, 700);
}, {passive: false});

// Song Animation

const rLevels = document.querySelectorAll(".r-level");
const dLevels = document.querySelectorAll(".d-song-body");
const rLevelsOverall = document.querySelectorAll(".r-level-overall");

function appearanceAnimation(appearanceElement){
    let rect = appearanceElement.getBoundingClientRect();
    let inViewport = rect.top <= window.innerHeight && rect.bottom >= 0;

    if(inViewport){
        gsap.to(
            appearanceElement, {
                x: 100,
                opacity: 1,
                duration: 0.5,
                ease: "power1.out",
            },
        );
    }else{
        gsap.to(
            appearanceElement, {
                x: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
            },
        );
    };
};

function dAppearanceAnimation(appearanceElement){
    let rect = appearanceElement.getBoundingClientRect();
    let inViewport = rect.top <= window.innerHeight && rect.bottom >= 0;

    if(inViewport){
        gsap.to(
            appearanceElement, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power1.out",
            },
        );
    }else{
        gsap.to(
            appearanceElement, {
                x: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power1.out",
            },
        );
    };
}

function appearance(){
    rLevels.forEach(appearanceAnimation);
    rLevelsOverall.forEach(appearanceAnimation);
    dLevels.forEach(dAppearanceAnimation);
};

function mainEnter(){
    if(tabActivated == 1){
        document.addEventListener("scroll", appearance);
        document.addEventListener("resize", appearance);
    };
};

// Buttons

const difficulty = document.getElementById("difficulty");

document.addEventListener("DOMContentLoaded", function(){
    let difficultyButtons = difficulty.getElementsByTagName("button");
    let rankedContainers = document.querySelectorAll(".ranked");
    let dRankedContainers = document.querySelectorAll(".diff-ranked");

    for(let i = 0; i < difficultyButtons.length; i++){
        difficultyButtons[i].addEventListener("click", function(){
            const specialButton = difficultyButtons[i].getAttribute("id");
            let buttonStatus = difficultyButtons[i].getAttribute("class");
    
            if(specialButton == "special"){
                if(buttonStatus == "inactive"){
                    difficultyButtons[i].setAttribute("style", "");
                    difficultyButtons[i].className = "active";

                    rankedContainers[rankedContainers.length - i - 1].style.display = "";
                    dRankedContainers[dRankedContainers.length - i - 1].style.display = "";
                    appearance();
                    searchJudgement();
                }else{
                    difficultyButtons[i].setAttribute("style", "border: 3px solid rgba(131, 0, 0, 0.5); background-color: rgba(131, 0, 0, 0.35); box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.5); color: rgba(210, 0, 0, 0.7); text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);");
                    difficultyButtons[i].className = "inactive";

                    rankedContainers[rankedContainers.length - i - 1].style.display = "none";
                    dRankedContainers[dRankedContainers.length - i - 1].style.display = "none";
                    appearance();
                };
            }else{
                if(buttonStatus == "inactive"){
                    difficultyButtons[i].setAttribute("style", "");
                    difficultyButtons[i].className = "active";

                    rankedContainers[rankedContainers.length - i - 1].style.display = "";
                    dRankedContainers[dRankedContainers.length - i - 1].style.display = "";
                    appearance();
                    searchJudgement();
                }else{
                    difficultyButtons[i].setAttribute("style", "border: 3px solid rgba(0, 131, 118, 0.5); background-color: rgba(0, 131, 118, 0.35); box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.5); color: rgba(0, 219, 197, 0.5); text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);");
                    difficultyButtons[i].className = "inactive";

                    rankedContainers[rankedContainers.length - i - 1].style.display = "none";
                    dRankedContainers[dRankedContainers.length - i - 1].style.display = "none";
                    appearance();
                };
            };
            let main = document.getElementById("main");
            let mainBoundary = main.getBoundingClientRect();
            if(mainBoundary.top >= 0 && mainBoundary.bottom <= window.innerHeight){
                footer.style.position = "fixed";
                footer.style.bottom = "0";
            }else{
                footer.style.position = "";
                footer.style.bottom = "";
            }

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
        });
    };
});

// Diff Ranked Songs

// 15

let diffSongContainer15 = document.getElementById("d-song-container-15");
let diffNumContainer15 = document.getElementById("d-num-container-15");


function createPointer15(begin,end){
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
for(let i = 0; i < unrSongs15.length; i++){
    let titleString = "";
    unrSongs15[i].addEventListener("mouseover", function(){
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function(title){
            if(title.id !== titleString){
                const pointer15 = document.getElementById("pointer15");

                if(title.id == "mega-pop"){
                    pointer15.remove();
                    createPointer15(5,7);
                }else if(title.id == "euouae"){
                    pointer15.remove();
                    createPointer15(5,7);
                }else if(title.id == "red-horse-massacre"){
                    pointer15.remove();
                    createPointer15(4,7);
                }else if(title.id == "hauynite"){
                    pointer15.remove();
                    createPointer15(4,7);
                }else if(title.id == "evoltex-poppi-n-mix"){
                    pointer15.remove();
                    createPointer15(3,6);
                }else if(title.id == "arisu-sikkaku"){
                    pointer15.remove();
                    createPointer15(2,5);
                }else if(title.id == "lucid-trigger"){
                    pointer15.remove();
                    createPointer15(1,5);
                }else if(title.id == "before-sunrise"){
                    pointer15.remove();
                    createPointer15(0,4);
                }else if(title.id == "gift"){
                    pointer15.remove();
                    createPointer15(3,6);
                }else{
                    pointer15.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs15[i].addEventListener("mouseleave", function(){
        titleString = "";
        pointer15.remove();
        let newPointer = document.createElement("div");
        const pointerContainer15 = document.getElementById("d-num-container-15");
        newPointer.id = "pointer15";
        pointerContainer15.appendChild(newPointer);
        newPointer.style.display = "none";
    }
)};

let leave15 = true;
document.addEventListener("scroll", function diffScrollRefresh15(){  

    let rect15 = diffSongContainer15.getBoundingClientRect();

    if(rect15.top <= 42 && rect15.bottom >= 0 && leave15 == false){
        diffNumContainer15.style.position = "fixed";
        diffNumContainer15.style.left = "0";
        diffNumContainer15.style.top = "0";
        diffNumContainer15.style.width = "calc(100% - 256px)";
    };
    if(rect15.top >= 42 && rect15.bottom >= 0 && leave15 == false){
        diffNumContainer15.style.position = "relative";  
        diffNumContainer15.style.left = "";  
        diffNumContainer15.style.top = "";  
        diffNumContainer15.style.width = "";  
        diffNumContainer15.style.zIndex = "";
    };
    if(rect15.bottom <= 42 && leave15 == false){
        gsap.to(
            diffNumContainer15, {
                y: -50,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave15 = true;
    };
    if(rect15.top <= 42 && rect15.bottom >= 42 && leave15 == true){
        gsap.to(
            diffNumContainer15, {
                y: 0,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave15 = false;
    };
});

// 14

let diffSongContainer14 = document.getElementById("d-song-container-14");
let diffNumContainer14 = document.getElementById("d-num-container-14");

function createPointer14(begin,end){
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
for(let i = 0; i < unrSongs14.length; i++){
    let titleString = "";
    unrSongs14[i].addEventListener("mouseover", function(){
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function(title){
            if(title.id !== titleString){
                const pointer14 = document.getElementById("pointer14");

                if(title.id == "goemon"){
                    pointer14.remove();
                    createPointer14(3,9);
                }else if(title.id == "re-ignite-republic-of-gamers"){
                    pointer14.remove();
                    createPointer14(5,8);
                }else if(title.id == "viatores"){
                    pointer14.remove();
                    createPointer14(3,8);
                }else if(title.id == "mechanismos-ton-antikythiron"){
                    pointer14.remove();
                    createPointer14(3,8);
                }else if(title.id == "dead-soul"){
                    pointer14.remove();
                    createPointer14(4,7);
                }else if(title.id == "dement-after-legend"){
                    pointer14.remove();
                    createPointer14(3,7);
                }else if(title.id == "tianzhao-giga"){
                    pointer14.remove();
                    createPointer14(1,6);
                }else if(title.id == "tianzhao-mega"){
                    pointer14.remove();
                    createPointer14(2,5);
                }else if(title.id == "unsung-hero"){
                    pointer14.remove();
                    createPointer14(1,5);
                }else{
                    pointer14.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs14[i].addEventListener("mouseleave", function(){
        titleString = "";
        pointer14.remove();
        let newPointer = document.createElement("div");
        const pointerContainer14 = document.getElementById("d-num-container-14");
        newPointer.id = "pointer14";
        pointerContainer14.appendChild(newPointer);
        newPointer.style.display = "none";
    }
)};

let leave14 = true;
document.addEventListener("scroll", function diffScrollRefresh14(){  

    let rect14 = diffSongContainer14.getBoundingClientRect();

    if(rect14.top <= 42 && rect14.bottom >= 0 && leave14 == false){
        diffNumContainer14.style.position = "fixed";
        diffNumContainer14.style.left = "0";
        diffNumContainer14.style.top = "0";
        diffNumContainer14.style.width = "calc(100% - 256px)";
    };
    if(rect14.top >= 42 && rect14.bottom >= 0 && leave14 == false){
        diffNumContainer14.style.position = "relative";  
        diffNumContainer14.style.left = "";  
        diffNumContainer14.style.top = "";  
        diffNumContainer14.style.width = "";  
        diffNumContainer14.style.zIndex = "";
    };
    if(rect14.bottom <= 42 && leave14 == false){
        gsap.to(
            diffNumContainer14, {
                y: -50,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave14 = true;
    };
    if(rect14.top <= 42 && rect14.bottom >= 42 && leave14 == true){
        gsap.to(
            diffNumContainer14, {
                y: 0,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave14 = false;
    };
});

// 13

let diffSongContainer13 = document.getElementById("d-song-container-13");
let diffNumContainer13 = document.getElementById("d-num-container-13");


function createPointer13(begin,end){
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
for(let i = 0; i < unrSongs13.length; i++){
    let titleString = "";
    unrSongs13[i].addEventListener("mouseover", function(){
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function(title){
            if(title.id !== titleString){
                const pointer13 = document.getElementById("pointer13");

                if(title.id == "black-horse-famine"){
                    pointer13.remove();
                    createPointer13(7,10);
                }else if(title.id == "raving-in-halloween"){
                    pointer13.remove();
                    createPointer13(6,10);
                }else if(title.id == "metheus"){
                    pointer13.remove();
                    createPointer13(4,8);
                }else if(title.id == "wonderful-days"){
                    pointer13.remove();
                    createPointer13(3,7);
                }else if(title.id == "soul-army"){
                    pointer13.remove();
                    createPointer13(3,7);
                }else if(title.id == "stardust"){
                    pointer13.remove();
                    createPointer13(2,5);
                }else{
                    pointer13.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs13[i].addEventListener("mouseleave", function(){
        titleString = "";
        pointer13.remove();
        let newPointer = document.createElement("div");
        const pointerContainer13 = document.getElementById("d-num-container-13");
        newPointer.id = "pointer13";
        pointerContainer13.appendChild(newPointer);
        newPointer.style.display = "none";
    }
)};

let leave13 = true;
document.addEventListener("scroll", function diffScrollRefresh13(){  

    let rect13 = diffSongContainer13.getBoundingClientRect();

    if(rect13.top <= 42 && rect13.bottom >= 0 && leave13 == false){
        diffNumContainer13.style.position = "fixed";
        diffNumContainer13.style.left = "0";
        diffNumContainer13.style.top = "0";
        diffNumContainer13.style.width = "calc(100% - 256px)";
    };
    if(rect13.top >= 42 && rect13.bottom >= 0 && leave13 == false){
        diffNumContainer13.style.position = "relative";  
        diffNumContainer13.style.left = "";  
        diffNumContainer13.style.top = "";  
        diffNumContainer13.style.width = "";  
        diffNumContainer13.style.zIndex = "";
    };
    if(rect13.bottom <= 42 && leave13 == false){
        gsap.to(
            diffNumContainer13, {
                y: -50,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave13 = true;
    };
    if(rect13.top <= 42 && rect13.bottom >= 42 && leave13 == true){
        gsap.to(
            diffNumContainer13, {
                y: 0,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave13 = false;
    };
});

// 12

let diffSongContainer12 = document.getElementById("d-song-container-12");
let diffNumContainer12 = document.getElementById("d-num-container-12");


function createPointer12(begin,end){
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
for(let i = 0; i < unrSongs12.length; i++){
    let titleString = "";
    unrSongs12[i].addEventListener("mouseover", function(){
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function(title){
            if(title.id !== titleString){
                const pointer12 = document.getElementById("pointer12");

                if(title.id == "soar-to"){
                    pointer12.remove();
                    createPointer12(6,10);
                }else if(title.id == "black-magnam"){
                    pointer12.remove();
                    createPointer12(5,9);
                }else if(title.id == "necroxus"){
                    pointer12.remove();
                    createPointer12(5,8);
                }else if(title.id == "reborn"){
                    pointer12.remove();
                    createPointer12(4,7);
                }else{
                    pointer12.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs12[i].addEventListener("mouseleave", function(){
        titleString = "";
        pointer12.remove();
        let newPointer = document.createElement("div");
        const pointerContainer12 = document.getElementById("d-num-container-12");
        newPointer.id = "pointer12";
        pointerContainer12.appendChild(newPointer);
        newPointer.style.display = "none";
    }
)};

let leave12 = true;
document.addEventListener("scroll", function diffScrollRefresh12(){  

    let rect12 = diffSongContainer12.getBoundingClientRect();

    if(rect12.top <= 42 && rect12.bottom >= 0 && leave12 == false){
        diffNumContainer12.style.position = "fixed";
        diffNumContainer12.style.left = "0";
        diffNumContainer12.style.top = "0";
        diffNumContainer12.style.width = "calc(100% - 256px)";
    };
    if(rect12.top >= 42 && rect12.bottom >= 0 && leave12 == false){
        diffNumContainer12.style.position = "relative";  
        diffNumContainer12.style.left = "";  
        diffNumContainer12.style.top = "";  
        diffNumContainer12.style.width = "";  
        diffNumContainer12.style.zIndex = "";
    };
    if(rect12.bottom <= 42 && leave12 == false){
        gsap.to(
            diffNumContainer12, {
                y: -50,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave12 = true;
    };
    if(rect12.top <= 42 && rect12.bottom >= 42 && leave12 == true){
        gsap.to(
            diffNumContainer12, {
                y: 0,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave12 = false;
    };
});

// 11

let diffSongContainer11 = document.getElementById("d-song-container-11");
let diffNumContainer11 = document.getElementById("d-num-container-11");


function createPointer11(begin,end){
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
for(let i = 0; i < unrSongs11.length; i++){
    let titleString = "";
    unrSongs11[i].addEventListener("mouseover", function(){
        const unrTitles = this.querySelectorAll(".d-song");
        unrTitles.forEach(function(title){
            if(title.id !== titleString){
                const pointer11 = document.getElementById("pointer11");

                if(title.id == "fengyu"){
                    pointer11.remove();
                    createPointer11(6,9);
                }else if(title.id == "mechanical-jager"){
                    pointer11.remove();
                    createPointer11(5,8);
                }else{
                    pointer11.remove();
                };

                titleString = title.id;
            };
        });
    });
    unrSongs11[i].addEventListener("mouseleave", function(){
        titleString = "";
        pointer11.remove();
        let newPointer = document.createElement("div");
        const pointerContainer11 = document.getElementById("d-num-container-11");
        newPointer.id = "pointer11";
        pointerContainer11.appendChild(newPointer);
        newPointer.style.display = "none";
    }
)};

let leave11 = true;
document.addEventListener("scroll", function diffScrollRefresh11(){  

    let rect11 = diffSongContainer11.getBoundingClientRect();

    if(rect11.top <= 42 && rect11.bottom >= 0 && leave11 == false){
        diffNumContainer11.style.position = "fixed";
        diffNumContainer11.style.left = "0";
        diffNumContainer11.style.top = "0";
        diffNumContainer11.style.width = "calc(100% - 256px)";
    };
    if(rect11.top >= 42 && rect11.bottom >= 0 && leave11 == false){
        diffNumContainer11.style.position = "relative";  
        diffNumContainer11.style.left = "";  
        diffNumContainer11.style.top = "";  
        diffNumContainer11.style.width = "";  
        diffNumContainer11.style.zIndex = "";
    };
    if(rect11.bottom <= 42 && leave11 == false){
        gsap.to(
            diffNumContainer11, {
                y: -50,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave11 = true;
    };
    if(rect11.top <= 42 && rect11.bottom >= 42 && leave11 == true){
        gsap.to(
            diffNumContainer11, {
                y: 0,
                duration: 0.4,
                ease: "power1.out",
            },
        );
        leave11 = false;
    };
});

// Search Bar

let inputBox = document.getElementById("search");
let searchAllRanked = document.getElementsByClassName("r-song-container");
let searchAllRankedLevel = document.getElementsByClassName("r-level");

let searchAllUnanked = document.getElementsByClassName("d-song-container");

function searchJudgement(){
    let inputValue = inputBox.value;

    // Ranked Search

    for(let i = 0; i < searchAllRanked.length; i++){
        let searchRanked = searchAllRanked[i].getElementsByTagName("li");
            
        for(let j = 0; j < searchRanked.length; j++){
            if(searchRanked[j].innerText.toLowerCase().includes(inputValue.toLowerCase())){  
                searchRanked[j].style.display = "";
            }else{
                searchRanked[j].style.display = "none";
            };
        };

        let displayCounter = 0;
        for(let j = 0; j < searchRanked.length; j++){
            if(searchRanked[j].style.display == "none"){
                displayCounter++;
            };
        };
        if(displayCounter == searchRanked.length){
            searchAllRankedLevel[i].style.display = "none";
        }else{
            searchAllRankedLevel[i].style.display = "";
        };
    };

    let searchAllRankedContainer = document.getElementsByClassName("ranked");

    for(let i = 0; i < searchAllRankedContainer.length; i++){
        let displayCounter = 0;
        let searchRLevels = searchAllRankedContainer[i].getElementsByClassName("r-level");

        for(let j = 0; j < searchRLevels.length; j++){
            if(searchRLevels[j].style.display == "none"){
                displayCounter++;
            };
        };
        if(displayCounter == searchRLevels.length){
            searchAllRankedContainer[i].style.display = "none";
        }else{
            searchAllRankedContainer[i].style.display = "";
        };
    };

    // Unanked Search

    for(let i = 0; i < searchAllUnanked.length; i++){
        let searchUnanked = searchAllUnanked[i].getElementsByTagName("li");

        for(let j = 0; j < searchUnanked.length; j++){
            if(searchUnanked[j].innerText.toLowerCase().includes(inputValue.toLowerCase())){  
                searchUnanked[j].style.display = "";
            }else{
                searchUnanked[j].style.display = "none";
            };
        };
    };

    let searchAllUnankedContainer = document.getElementsByClassName("diff-ranked");

    for(let i = 0; i < searchAllUnankedContainer.length; i++){
        let displayCounter = 0;
        let searchDLevels = searchAllUnankedContainer[i].getElementsByTagName("li");

        for(let j = 0; j < searchDLevels.length; j++){
            if(searchDLevels[j].style.display == "none"){
                displayCounter++;
            };
        };
        if(displayCounter == searchDLevels.length){
            searchAllUnankedContainer[i].style.display = "none";
        }else{
            searchAllUnankedContainer[i].style.display = "";
        };
    };

    let main = document.getElementById("main");
    let mainBoundary = main.getBoundingClientRect();

    if(mainBoundary.top >= 0 && mainBoundary.bottom <= window.innerHeight){
        footer.style.position = "fixed";
        footer.style.bottom = "0";
    }else{
        footer.style.position = "";
        footer.style.bottom = "";
    };
    
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
}

inputBox.addEventListener("input", searchJudgement);