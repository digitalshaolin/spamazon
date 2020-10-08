//////////////// MAIN MENU ANIMATION ON MENU BUTTON CLICK

const buttonMenu = document.getElementById('button-menu');
const sideMenu = document.querySelector('.side-menu');
const sideMenuOverlay = document.querySelector('.overlay');
const allSubMenus = document.querySelectorAll('.sub-menu-section');
const menuHeader = document.querySelector('.side-menu__header');


const showMenu = () => {
    sideMenu.style.transform = "translateX(0)";
    sideMenu.style.transition = ".2s ease-in";
    body.style.overflow = "hidden";
    sideMenuOverlay.style.transition = ".2s ease-in";
    sideMenuOverlay.style.visibility = "visible";   
    sideMenuOverlay.style.opacity = "1";
    menuHeader.style.transform = "translateX(0)";
    menuHeader.style.transition = ".2s ease-in";
}

const hideSubmenu = () => {
    allSubMenus.forEach((el) => {
        if (el.dataset.indexNumber === currentSubmenu) {
            el.style.transform = "translateX(-730px)";
            setTimeout(() => {
                el.style.transform = "translateX(0)";
            }, 300)
        }       
    })
    subMenu.style.visibility = "hidden";
}


const hideMenu = () => {
    sideMenu.style.transform = "translateX(-365px)";
    sideMenuOverlay.style.opacity = "0";
    sideMenuOverlay.style.visibility = "hidden";
    menuHeader.style.transform = "translateX(-365px)";
    body.style.overflow = "auto";
    hideSubmenu();
};

buttonMenu.addEventListener('click', showMenu);
sideMenuOverlay.addEventListener('click', hideMenu);



///////////////// SUBMENU SLIDE ACTIVATIONS



const mainMenuSliderButtons = document.getElementsByClassName('main-menu__slide-button');
const subMenu = document.querySelector('.sub-menu-sections');
const subMenusReturnButton = document.querySelectorAll('.sub-menu__left-nav');

let currentSubmenu;
let currentSliderButton;

const createMainMenuSliderLink = (element) => {
    element.addEventListener('click', () => {
        currentSliderButton = element;
        showSubMenuOnclick();
    })
};

Array.from(mainMenuSliderButtons).forEach((el) => {
    createMainMenuSliderLink(el);
});

subMenusReturnButton.forEach((el) => {
    el.addEventListener('click', () => {
        allSubMenus.forEach((sub) => {
            if (sub.dataset.indexNumber === currentSubmenu) {
                sub.style.transform = "translateX(0)";
                sideMenu.style.transform = "translateX(0)";
                subMenu.style.visibility = "hidden";                
            }
        })
    })
});


const showSubMenuOnclick = () => {
    currentSubmenu = currentSliderButton.dataset.indexNumber;
    sideMenu.style.transform = "translateX(-365px)";
    sideMenu.style.transition = ".2s ease-in";
    subMenu.style.visibility = "visible";    
    allSubMenus.forEach((el) => {        
        if (el.dataset.indexNumber === currentSubmenu) {
            el.style.transform = "translateX(-365px)";
            el.style.transition = ".2s ease-in";
        }
    })
};


/////////////////// ADD ORANGE BORDER ON FOCUS TO SEARCH BAR


const search = document.querySelector('.nav__search');
const input = document.getElementById('input');

input.addEventListener('focus', () => {
    search.style.boxShadow = "rgb(255, 153, 0) 0 0 0 2.5px, rgba(255, 153, 0, 0.5) 0 0 0 3.5px";
    search.style.borderRadius = '4px';
    select.style.boxShadow = "";
});

window.addEventListener('mousedown', (e) => {
    if (e.target !== input) {
        search.style.boxShadow = "";
        search.style.borderRadius = "";
        select.style.boxShadow = "";
    }
});

//////////////////////////////// RESIZE SELECT ELEMENT DEPENDING ON INNER TEXT

const select = document.getElementById("select");
const selectHiddenOption = document.getElementById("select-hidden-option");
const selectHidden = document.getElementById("select-hidden");

select.addEventListener("change", () => { 
    selectHiddenOption.innerHTML = select.options[select.selectedIndex].textContent;    
    select.style.width = `${selectHidden.clientWidth + 8}px`; 
    search.style.boxShadow = "rgb(255, 153, 0) 0 0 0 2.5px, rgba(255, 153, 0, 0.5) 0 0 0 3.5px";
    select.style.boxShadow = "";
    input.focus();
});

select.addEventListener("focus", () => {
    select.style.boxShadow = "rgb(255, 153, 0) 0 0 0 2px, rgba(255, 153, 0, 0.5) 0 0 0 3px";
})



//////////////////////////////// HOVER FUNCTIONS FOR NAV BAR MODALS - ACCOUNT AND PRIME SECTIONS


const navOverlay = document.querySelector(".nav-overlay");
const accountLink = document.querySelector(".nav__account-menu");
const accountModal = document.querySelector(".account-modal__container");
const primeLink = document.querySelector(".nav__prime");
const primeModal = document.querySelector(".prime-modal__container");


accountLink.addEventListener("mouseover", () => {
    navOverlay.style.transitionDelay = ".2s";
    navOverlay.style.visibility = "visible";
    accountModal.style.transitionDelay = ".2s";
    accountModal.style.visibility = "visible";
});

accountLink.addEventListener("mouseleave", () => {
    navOverlay.style.transitionDelay = "0s";
    navOverlay.style.visibility = "hidden";
    accountModal.style.transitionDelay = "0s";
    accountModal.style.visibility = "hidden";
});

primeLink.addEventListener("mouseover", () => {
    navOverlay.style.transitionDelay = ".2s";
    navOverlay.style.visibility = "visible";
    primeModal.style.transitionDelay = ".2s";
    primeModal.style.visibility = "visible";
});

primeLink.addEventListener("mouseleave", () => {
    navOverlay.style.transitionDelay = "0s";
    navOverlay.style.visibility = "hidden";
    primeModal.style.transitionDelay = "0s";
    primeModal.style.visibility = "hidden";
});




/////////////////////////////////// MAIN SECTION IMAGE SLIDER


const mainSlideContainer = document.querySelector(".main-slider__container");
const slideRail = document.querySelector(".slide-rail");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 5300;
const body = document.querySelector('body');

let mainSlides = document.querySelectorAll(".slide");
let index = 1;
let slideId;

const firstClone = mainSlides[0].cloneNode(true);
const lastClone = mainSlides[mainSlides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.classList.add("active-slide");
lastClone.id = 'last-clone';

slideRail.append(firstClone);
slideRail.prepend(lastClone);

let slideWidth;
let simplebarContentWrapper1;


const startSlide = () => {
    slideId = setInterval(() => {
        moveToNextSlide();
    }, interval)
}

slideRail.addEventListener('transitionend', () => {
    mainSlides = document.querySelectorAll(".slide");   
    
    if (mainSlides[index].id === firstClone.id) {
        slideRail.style.transition = 'none';
        index = 1;
        slideRail.style.transform = `translateX(${-slideWidth * index}px)`;
        clearInterval(slideId);
    }
    if (mainSlides[index].id === lastClone.id) {
        slideRail.style.transition = 'none';
        index = 6;
        slideRail.style.transform = `translateX(${-slideWidth * index}px)`;        
    }
    
});

const moveToNextSlide = () => {
    if (document.visibilityState === 'hidden') {
        clearInterval(slideId);
    }
    index++;
    slideRail.style.transform = `translateX(${-slideWidth * index}px)`;
    slideRail.style.transition = '.2s';    
};

const moveToPrevSlide = () => {
    index--;
    slideRail.style.transform = `translateX(${-slideWidth * index}px)`;
    slideRail.style.transition = '.2s';  
}

nextBtn.addEventListener('click', () => {
    clearInterval(slideId);
    moveToNextSlide();
});

prevBtn.addEventListener('click', () => {
    clearInterval(slideId);
    moveToPrevSlide();
});

//////////////// Animation section for content area image slider, i.e., hovers and carousels

const buttonSlideRight1 = document.querySelector(".slide-right-1");
const buttonSlideLeft1 = document.querySelector(".slide-left-1");
const buttonSlideRight2 = document.querySelector(".slide-right-2");
const buttonSlideLeft2 = document.querySelector(".slide-left-2");
const buttonSlideRight3 = document.querySelector(".slide-right-3");
const buttonSlideLeft3 = document.querySelector(".slide-left-3");
const buttonSlideRight4 = document.querySelector(".slide-right-4");
const buttonSlideLeft4 = document.querySelector(".slide-left-4");
const buttonSlideRight5 = document.querySelector(".slide-right-5");
const buttonSlideLeft5 = document.querySelector(".slide-left-5");
const buttonSlideRight6 = document.querySelector(".slide-right-6");
const buttonSlideLeft6 = document.querySelector(".slide-left-6");
const buttonSlideRight7 = document.querySelector(".slide-right-7");
const buttonSlideLeft7 = document.querySelector(".slide-left-7");
const buttonSlideRight8 = document.querySelector(".slide-right-8");
const buttonSlideLeft8 = document.querySelector(".slide-left-8");
const buttonSlideRight9 = document.querySelector(".slide-right-9");
const buttonSlideLeft9 = document.querySelector(".slide-left-9");

let instance1;
let instance2;
let instance3;
let instance4;
let instance5;
let instance6;
let instance7;
let instance8;
let instance9;
    
const slideContainer1 = document.getElementById("slide-section-1");
const slideContainer2 = document.getElementById("slide-section-2");
const slideContainer3 = document.getElementById("slide-section-3");
const slideContainer4 = document.getElementById("slide-section-4");
const slideContainer5 = document.getElementById("slide-section-5");
const slideContainer6 = document.getElementById("slide-section-6");
const slideContainer7 = document.getElementById("slide-section-7");
const slideContainer8 = document.getElementById("slide-section-8");
const slideContainer9 = document.getElementById("slide-section-9");

const slideControlsLeft2 = document.querySelector(".slide-controls-left-div-2");
const slideControlsRight2 = document.querySelector(".slide-controls-right-div-2");
const slideControlsLeft3 = document.querySelector(".slide-controls-left-div-3");
const slideControlsRight3 = document.querySelector(".slide-controls-right-div-3");
const slideControlsLeft4 = document.querySelector(".slide-controls-left-div-4");
const slideControlsRight4 = document.querySelector(".slide-controls-right-div-4");
const slideControlsLeft5 = document.querySelector(".slide-controls-left-div-5");
const slideControlsRight5 = document.querySelector(".slide-controls-right-div-5");
const slideControlsLeft6 = document.querySelector(".slide-controls-left-div-6");
const slideControlsRight6 = document.querySelector(".slide-controls-right-div-6");
const slideControlsLeft7 = document.querySelector(".slide-controls-left-div-7");
const slideControlsRight7 = document.querySelector(".slide-controls-right-div-7");
const slideControlsLeft8 = document.querySelector(".slide-controls-left-div-8");
const slideControlsRight8 = document.querySelector(".slide-controls-right-div-8");
const slideControlsLeft9 = document.querySelector(".slide-controls-left-div-9");
const slideControlsRight9 = document.querySelector(".slide-controls-right-div-9");
    
let slideSectionRail = document.querySelector(".slide-section__slide-rail");
let slideScrollbar1;  
let slideScrollbar2;  
let slideScrollbar3;  
let slideScrollbar4;  
let slideScrollbar5;  
let slideScrollbar6;  
let slideScrollbar7;  
let slideScrollbar8;  
let slideScrollbar9;  

body.onload = () => {
    slideWidth = mainSlides[index].clientWidth;
    slideRail.style.transform = `translateX(${-slideWidth * index}px)`;
    startSlide();
}
    

const changeButtonOpacityOnScroll = (leftButton, rightButton, instanceData) => {
    if (instanceData.ratio.x < 1 && instanceData.ratio.x > 0) {
        leftButton.style.opacity = "1";
        rightButton.style.opacity = "1";
    } else if (instanceData.ratio.x === 1) {
        rightButton.style.opacity = ".5";
    } else if (instanceData.ratio.x === 0) {
        leftButton.style.opacity = ".5";
    }
};

document.addEventListener("DOMContentLoaded", () => {

    instance1 = OverlayScrollbars(slideContainer1, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance1.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft1, buttonSlideRight1, instanceData);               
            }
        }
    });

    instance2 = OverlayScrollbars(slideContainer2, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance2.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft2, buttonSlideRight2, instanceData);
            }
        }
    });

    instance3 = OverlayScrollbars(slideContainer3, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance3.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft3, buttonSlideRight3, instanceData);
            }
        }
    });

    instance4 = OverlayScrollbars(slideContainer4, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance4.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft4, buttonSlideRight4, instanceData);
            }
        }
    });

    instance5 = OverlayScrollbars(slideContainer5, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance5.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft5, buttonSlideRight5, instanceData);
            }
        }
    });

    instance6 = OverlayScrollbars(slideContainer6, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance6.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft6, buttonSlideRight6, instanceData);
            }
        }
    });

    instance7 = OverlayScrollbars(slideContainer7, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance7.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft7, buttonSlideRight7, instanceData);
            }
        }
    });

    instance8 = OverlayScrollbars(slideContainer8, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance8.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft8, buttonSlideRight8, instanceData);
            }
        }
    });

    instance9 = OverlayScrollbars(slideContainer9, {
        className: "os-theme-dark",
        callbacks: {
            onScroll: function () {
                let instanceData = instance9.scroll();
                changeButtonOpacityOnScroll(buttonSlideLeft9, buttonSlideRight9, instanceData);
            }
        }
    });

    slideScrollbar1 = document.querySelector("#slide-section-1 .os-scrollbar-handle");  
    slideScrollbar2 = document.querySelector("#slide-section-2 .os-scrollbar-handle");  
    slideScrollbar3 = document.querySelector("#slide-section-3 .os-scrollbar-handle");  
    slideScrollbar4 = document.querySelector("#slide-section-4 .os-scrollbar-handle");  
    slideScrollbar5 = document.querySelector("#slide-section-5 .os-scrollbar-handle");  
    slideScrollbar6 = document.querySelector("#slide-section-6 .os-scrollbar-handle");  
    slideScrollbar7 = document.querySelector("#slide-section-7 .os-scrollbar-handle");  
    slideScrollbar8 = document.querySelector("#slide-section-8 .os-scrollbar-handle");  
    slideScrollbar9 = document.querySelector("#slide-section-9 .os-scrollbar-handle");  

    addHoverTransitions(buttonSlideLeft2, buttonSlideRight2, slideScrollbar2, slideContainer2, slideControlsLeft2, slideControlsRight2);
    addHoverTransitions(buttonSlideLeft3, buttonSlideRight3, slideScrollbar3, slideContainer3, slideControlsLeft3, slideControlsRight3);
    addHoverTransitions(buttonSlideLeft4, buttonSlideRight4, slideScrollbar4, slideContainer4, slideControlsLeft4, slideControlsRight4);
    addHoverTransitions(buttonSlideLeft5, buttonSlideRight5, slideScrollbar5, slideContainer5, slideControlsLeft5, slideControlsRight5);
    addHoverTransitions(buttonSlideLeft6, buttonSlideRight6, slideScrollbar6, slideContainer6, slideControlsLeft6, slideControlsRight6);
    addHoverTransitions(buttonSlideLeft7, buttonSlideRight7, slideScrollbar7, slideContainer7, slideControlsLeft7, slideControlsRight7);
    addHoverTransitions(buttonSlideLeft8, buttonSlideRight8, slideScrollbar8, slideContainer8, slideControlsLeft8, slideControlsRight8);    
});

// Slide container hover functions
    
slideContainer1.addEventListener("mouseover", () => {      
    slideScrollbar1.style.transition = "opacity .3s .4s";
    slideScrollbar1.style.opacity = ".8";
});
    
slideContainer1.addEventListener("mouseleave", () => {    
    slideScrollbar1.style.opacity = "0";  
});

// Slide button hover functions

buttonSlideRight1.addEventListener("mouseover", () => {   
    slideScrollbar1.style.opacity = ".8";       
});

buttonSlideRight1.addEventListener("mouseleave", () => {   
    slideScrollbar1.style.transition = "opacity .3s .4s"
    slideScrollbar1.style.opacity = "0";      
});

buttonSlideLeft1.addEventListener("mouseover", () => {    
    slideScrollbar1.style.opacity = ".8";       
});

buttonSlideLeft1.addEventListener("mouseleave", () => {   
    slideScrollbar1.style.transition = "opacity .3s .4s"
    slideScrollbar1.style.opacity = "0";      
});

// Reusable function to add hover actions to buttons and slide containers

const addHoverTransitions = (leftButton, rightButton, scrollBar, carouselContainer, slideControlLeft, slideControlRight) => {

    // Hover functionality to carousel containers

    carouselContainer.addEventListener("mouseover", () => {
        scrollBar.style.transition = "opacity .4s .4s";
        scrollBar.style.opacity = ".8";
        slideControlLeft.style.transition = "opacity .4s .4s";
        slideControlLeft.style.opacity = "1";
        slideControlRight.style.transition = "opacity .4s .4s";
        slideControlRight.style.opacity = "1";
    });

    carouselContainer.addEventListener("mouseleave", () => {
        scrollBar.style.transition = "opacity .4s .7s";
        scrollBar.style.opacity = "0";
        slideControlLeft.style.transition = "opacity .4s .7s";
        slideControlLeft.style.opacity = "0";
        slideControlRight.style.transition = "opacity .4s .7s";
        slideControlRight.style.opacity = "0";
    });

    // Hover functionality to carousel buttons

    rightButton.addEventListener("mouseover", () => {
        scrollBar.style.transition = "opacity .4s .4s";
        scrollBar.style.opacity = ".8";
        slideControlLeft.style.transition = "opacity .4s .4s";
        slideControlLeft.style.opacity = "1";
        slideControlRight.style.transition = "opacity .4s .4s";
        slideControlRight.style.opacity = "1";
    });

    rightButton.addEventListener("mouseleave", () => {
        scrollBar.style.transition = "opacity .4s .7s"
        scrollBar.style.opacity = "0";
        slideControlLeft.style.transition = "opacity .4s .7s";
        slideControlLeft.style.opacity = "0";
        slideControlRight.style.transition = "opacity .4s .7s";
        slideControlRight.style.opacity = "0";
    });

    leftButton.addEventListener("mouseover", () => {
        scrollBar.style.transition = "opacity .4s .4s";
        scrollBar.style.opacity = ".8";
        slideControlLeft.style.transition = "opacity .4s .4s";
        slideControlLeft.style.opacity = "1";
        slideControlRight.style.transition = "opacity .4s .4s";
        slideControlRight.style.opacity = "1";
    });

    leftButton.addEventListener("mouseleave", () => {
        scrollBar.style.transition = "opacity .4s .7s"
        scrollBar.style.opacity = "0";
        slideControlLeft.style.transition = "opacity .4s .7s";
        slideControlLeft.style.opacity = "0";
        slideControlRight.style.transition = "opacity .4s .7s";
        slideControlRight.style.opacity = "0";
    });

    

};

// Hover functionality for the slider on the very bottom of the page, needed because this slider does not show the scrollbar thumb


slideContainer9.addEventListener("mouseover", () => {
    slideControlsLeft9.style.transition = "opacity .4s .4s";
    slideControlsLeft9.style.opacity = "1";
    slideControlsRight9.style.transition = "opacity .4s .4s";
    slideControlsRight9.style.opacity = "1";
});
slideContainer9.addEventListener("mouseleave", () => {
    slideControlsLeft9.style.transition = "opacity .4s .7s";
    slideControlsLeft9.style.opacity = "0";
    slideControlsRight9.style.transition = "opacity .4s .7s";
    slideControlsRight9.style.opacity = "0";
});
buttonSlideRight9.addEventListener("mouseover", () => {
    slideControlsLeft9.style.opacity = "1";
    slideControlsRight9.style.opacity = "1";
});
buttonSlideRight9.addEventListener("mouseleave", () => {
    slideControlsLeft9.style.transition = "opacity .4s .7s";
    slideControlsLeft9.style.opacity = "0";
    slideControlsRight9.style.transition = "opacity .4s .7s";
    slideControlsRight9.style.opacity = "0";
});
buttonSlideLeft9.addEventListener("mouseover", () => {
    slideControlsLeft9.style.opacity = "1";
    slideControlsRight9.style.opacity = "1";
});
buttonSlideLeft9.addEventListener("mouseleave", () => {
    slideControlsLeft9.style.transition = "opacity .4s .7s";
    slideControlsLeft9.style.opacity = "0";
    slideControlsRight9.style.transition = "opacity .4s .7s";
    slideControlsRight9.style.opacity = "0";
});


// Slide container button click functions * slides carousel left or right *

buttonSlideRight1.addEventListener("click", () => {
    instance1.scroll({ x: `+=${(Math.floor(slideSectionRail.clientWidth / 210) * 210)}` }, 500);
});

buttonSlideLeft1.addEventListener("click", () => {
    instance1.scroll({ x: `-=${(Math.floor(slideSectionRail.clientWidth / 210) * 210)}` }, 500);
});


const addCarouselButtonFunctionality = (leftButton, rightButton, instanceNumber) => {
    rightButton.addEventListener("click", () => {
        instanceNumber.scroll({ x: `+=${slideSectionRail.clientWidth}` }, 500);
    });
    leftButton.addEventListener("click", () => {
        instanceNumber.scroll({ x: `-=${slideSectionRail.clientWidth}` }, 500);
    });
};


document.addEventListener("DOMContentLoaded", () => {
    addCarouselButtonFunctionality(buttonSlideLeft2, buttonSlideRight2, instance2);
    addCarouselButtonFunctionality(buttonSlideLeft3, buttonSlideRight3, instance3);
    addCarouselButtonFunctionality(buttonSlideLeft4, buttonSlideRight4, instance4);
    addCarouselButtonFunctionality(buttonSlideLeft5, buttonSlideRight5, instance5);
    addCarouselButtonFunctionality(buttonSlideLeft6, buttonSlideRight6, instance6);
    addCarouselButtonFunctionality(buttonSlideLeft7, buttonSlideRight7, instance7);
    addCarouselButtonFunctionality(buttonSlideLeft8, buttonSlideRight8, instance8);
    addCarouselButtonFunctionality(buttonSlideLeft9, buttonSlideRight9, instance9);
});

