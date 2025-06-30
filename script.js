'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(event) {
    event.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function(event) {
    //
    section1.scrollIntoView({behavior: "smooth"});
});


//////////////////////////////
//Page navigation 

//Me: using event delegation 
//1. Add event listener to common parent element 
//2. Determine what element originated the event 
document.querySelector(".nav__links").addEventListener("click", function(event) {
    event.preventDefault();
    //console.log(event.target);

    //Matching strategy 
    if (event.target.classList.contains("nav__link")) {
        const id = event.target.getAttribute("href");
        //console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});
//////////////////////////////////

//Tabbed component 
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

//Me: this forEach is not a good practice if we have a lot of tabs 
// tabs.forEach(tab => tab.addEventListener("click", function () {
//     // body...
//     console.log("TAB");
// }));
tabsContainer.addEventListener("click", function(event) {
    const clickedButtonTab = event.target.closest(".operations__tab");
    // console.log(clickedButtonTab);

    //Guard clause 
    if (!clickedButtonTab) return;

    //the traditional way
    // if (clickedButtonTab) {
    //     clickedButtonTab.classList.add("operations__tab--active");
    // } 

    //Remove active classes
    //tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
    //tabsContent.forEach(tabContent => tabContent.classList.remove("operations__content--active"));

    //Activate tab
    tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
    clickedButtonTab.classList.add("operations__tab--active");

    //Activate content
    tabsContent.forEach(tabContent => tabContent.classList.remove("operations__content--active"));

    // console.log(clickedButtonTab.dataset.tab);
    document.querySelector(`.operations__content--${clickedButtonTab.dataset.tab}`).classList.add("operations__content--active");
});

/////////////////////////////

//Menu fade animation 
const nav = document.querySelector(".nav");

// const handelMouseOverAndOut = function(event, opacity) {

//     if (event.target.classList.contains("nav__link")) {
//         const targetedLink = event.target;
//         // const overedLink = event.target;
//         const siblings = targetedLink.closest(".nav").querySelectorAll(".nav__link");
//         const logo = targetedLink.closest(".nav").querySelector("img");

//         //
//         siblings.forEach(sibling => {
//             if (sibling !== targetedLink) sibling.style.opacity = opacity;
//         });
//         logo.style.opacity = opacity;
//     }
// };

//Me: the third edition solution
const handelMouseOverAndOut = function(event) {
    // console.log(this, event.currentTarget);
    
    if (event.target.classList.contains("nav__link")) {
        const targetedLink = event.target;
        // const overedLink = event.target;
        const siblings = targetedLink.closest(".nav").querySelectorAll(".nav__link");
        const logo = targetedLink.closest(".nav").querySelector("img");

        //
        siblings.forEach(sibling => {
            if (sibling !== targetedLink) sibling.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};


// nav.addEventListener("mouseover", function(event) {
//     //Me: first edition solution
//     // if (event.target.classList.contains("nav__link")) {
//     //     const targetedLink = event.target;
//     //     // const overedLink = event.target;
//     //     const siblings = targetedLink.closest(".nav").querySelectorAll(".nav__link");
//     //     const logo = targetedLink.closest(".nav").querySelector("img");

//     //     //
//     //     siblings.forEach(sibling => {
//     //         if (sibling !== targetedLink) sibling.style.opacity = 0.5;
//     //     });
//     //     logo.style.opacity = 0.5;
//     // }
//     //Me: second edition solution
//     handelMouseOverAndOut(event, 0.50);
// });

//Me: third edition solution 
//Passing "argument" into handler
nav.addEventListener("mouseover", handelMouseOverAndOut.bind(0.5));

// nav.addEventListener("mouseout", function(event) {
//     //Me: my solution
//     // nav.querySelector("img").style.opacity = 1;
//     // nav.querySelectorAll(".nav__link").forEach(link => link.style.opacity = 1);

//      //Me: first edition solution
//     //lecture solution
//     // if (event.target.classList.contains("nav__link")) {
//     //     const targetedLink = event.target;
//     //     // const outOfLink = event.target;
//     //     const siblings = targetedLink.closest(".nav").querySelectorAll(".nav__link");
//     //     const logo = targetedLink.closest(".nav").querySelector("img");

//     //     //
//     //     siblings.forEach(sibling => {
//     //         if (sibling !== targetedLink) sibling.style.opacity = 1;
//     //     });
//     //     logo.style.opacity = 1;
//     // }
//     //Me: second edition solution
//     handelMouseOverAndOut(event, 1);
// });

//Me: third edition solution 
//Passing "argument" into handler
nav.addEventListener("mouseout", handelMouseOverAndOut.bind(1));


/////////////////////////////

//Me: old method or way
// Sticky navigation 
// const initialCoordinates = section1.getBoundingClientRect();

// window.addEventListener("scroll", function() {
//     // console.log(this.window.scrollY);//same result but what is this?
//     // console.log(window.scrollY);
//     if (window.scrollY > initialCoordinates.top)
//         nav.classList.add("sticky");
//     else
//         nav.classList.remove("sticky");
// });


/////////////////////////////


// Sticky navigation: Intersection Observer API 

// const intersectionObserverCallback = function(entries, intersectionObserver) {
//     entries.forEach(entry => console.log(entry));
// };

// const intersectionObserverOptions = {
//     root: null,
//     threshold: [0, 0.2]
// };

// const intersectionObserver = new IntersectionObserver(intersectionObserverCallback, intersectionObserverOptions);
// intersectionObserver.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const headerIntersectionObserverCallback = function(entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add("sticky"); 
    else nav.classList.remove("sticky");
};

const headerIntersectionObserver = new IntersectionObserver(
    headerIntersectionObserverCallback, {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`
    }
);
headerIntersectionObserver.observe(header);


//Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, intersectionObserver) {
    // console.log(entries);
    // const [entry] = entries;
    entries.forEach(entry => {
        // console.log(entry);
        // //Me: first solution
        // if (entry.isIntersecting) 
        //     entry.target.classList.remove("section--hidden");
        //Me: Or second solution second Guard clause
        if (!entry.isIntersecting) return;

        entry.target.classList.remove("section--hidden");

        intersectionObserver.unobserve(entry.target);
    });

};

const sectionIntersectionObserver = new IntersectionObserver(revealSection, { root: null, threshold: 0.15 });

allSections.forEach(function(section) {
    section.classList.add("section--hidden");
    sectionIntersectionObserver.observe(section);
});

//////////////////////////////////

// Lazy loading images 
const imgTargets = document.querySelectorAll("img[data-src]");
// console.log(imgTargets);

const imgLazyLoading = function(entries, intersectionObserver) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) return;

    //Replace src of img with data src
    entry.target.src = entry.target.dataset.src;

    //Me: this load event happens after load FINISHES 
    entry.target.addEventListener("load", function() {
        entry.target.classList.remove("lazy-img");
    });

    intersectionObserver.unobserve(entry.target);

};

const imgIntersectionObserver = new IntersectionObserver(imgLazyLoading, {
    root: null,
    threshold: 0,
    rootMargin: "200px"
});

imgTargets.forEach(img => imgIntersectionObserver.observe(img
    ));

/**Me: I did this comment because of the last modification which is rearranging the programme of putting variables alone and functions alone and event handlers alone, was overlapping  
/////////////////////////////////
//Slider
//++++++++++++++++++++++++++++++++++++++++++++++++++
//LECTURE: 214. Building a Slider Component: Part 2
const playSlider = function() {
    //

    const slides = document.querySelectorAll(".slide");

    const sliderBtnLeft = document.querySelector(".slider__btn--left");
    const sliderBtnRight = document.querySelector(".slider__btn--right");

    // //Me: for test
    // const slider = document.querySelector(".slider");
    // slider.style.transform = "scale(0.4) translateX(-800px)";
    // slider.style.overflow = "visible";
    //
    const goToSlide = function(wantedSlide) {
        slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * (index - wantedSlide)}%)`);
    };

    // //++++++++++++++++++++++++++++++++++++++++++++++++++
    // //LECTURE: 214. Building a Slider Component: Part 2
    // goToSlide(0);
    // 0% 100% 200% 300%


    //Next slide
    // //Me: my solution
    // let counter = 1;
    // sliderBtnRight.addEventListener("click", function() {
    //     slides.forEach((slide, index) => {
    //         slide.style.transform = `translateX(${100 * (index - counter)}%)`;
    //     });
    //     if (counter === slides.length - 1)
    //         counter = 0;
    //     else counter++;
    // });
    // //Me:
    // //  0               1               2               3
    // // (index-1)*100    (index-1)*100   (index-1)*100   (index-1)*100
    // // -100%            0%              100%            200%
    // // (index-2)*100    (index-2)*100   (index-2)*100   (index-2)*100
    // // -200%            -100%           0%              100%
    // // (index-3)*100    (index-3)*100   (index-3)*100   (index-3)*100
    // // -300%            -200%           -100%           0%
    // // (index-0)*100    (index-0)*100   (index-0)*100   (index-0)*100
    // // 0%               100%            200%            300%

    //Me: I comented this solution for refactoring
    // //Me: lecture solution
    // let currentSlide = 0;
    // const countOfSlides = slides.length;

    // sliderBtnRight.addEventListener("click", function() {
    //     if (currentSlide === countOfSlides - 1)
    //         currentSlide = 0;
    //     else currentSlide++;

    //     slides.forEach((slide, index) => {
    //         slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    //     });
    // });
    // // currentSlide = 1: -100%   0%   100%   200%

    //++++++++++++++++++++++++++++++++++++++++++++++++++
    //LECTURE: 214. Building a Slider Component: Part 2
    const activateDot = function(slide) {
        document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
        //console.log(slide);
    };
    //++++++++++++++++++++++++++++++++++++++++++++++++++

    let currentSlide = 0;
    const countOfSlides = slides.length;

    const goToNextSlide = function() {
        if (currentSlide === countOfSlides - 1)
            currentSlide = 0;
        else currentSlide++;

        goToSlide(currentSlide);
        activateDot(currentSlide);
    };

    sliderBtnRight.addEventListener("click", goToNextSlide);


    const goToPreviousSlide = function() {
        if (currentSlide === 0)
            currentSlide = countOfSlides - 1;
        else currentSlide--;

        goToSlide(currentSlide);
        activateDot(currentSlide);
    };

    sliderBtnLeft.addEventListener("click", goToPreviousSlide);


    //////////////////////////////////
    //--------------------------------------------------
    //LECTURE: 214. Building a Slider Component: Part 2
    //--------------------------------------------------

    document.addEventListener("keydown", function(event) {
        // console.log(event);
        if (event.key === "ArrowRight") goToNextSlide();
        event.key === "ArrowLeft" && goToPreviousSlide();
    });

    const dotsContainer = document.querySelector(".dots");

    const createDots = function() {
        slides.forEach(function(_, index) {
            //
            dotsContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
        });
    };

    const init = function() {
        goToSlide(0);
        createDots();
        activateDot(0);
    }
    init();

    dotsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("dots__dot")) {
            // //Me: this is lecture solution but modified by video note montage
            // const {slide} = event.target.dataset;
            // goToSlide(slide);
            // activateDot(slide);
            //Me: this is the edited solution
            currentSlide = Number(event.target.dataset.slide);
            goToSlide(currentSlide);
            activateDot(currentSlide);
        }
    });
}
playSlider();*/
/////////////////////////////////

//Slider
//++++++++++++++++++++++++++++++++++++++++++++++++++
//LECTURE: 214. Building a Slider Component: Part 2
const playSlider = function() {
    //

    const slides = document.querySelectorAll(".slide");

    const sliderBtnLeft = document.querySelector(".slider__btn--left");
    const sliderBtnRight = document.querySelector(".slider__btn--right");
    const dotsContainer = document.querySelector(".dots");

    let currentSlide = 0;
    const countOfSlides = slides.length;


    //Functions
    const goToSlide = function(wantedSlide) {
        slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * (index - wantedSlide)}%)`);
    };

    const createDots = function() {
        slides.forEach(function(_, index) {
            //
            dotsContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
        });
    };

    const activateDot = function(slide) {
        document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
        //console.log(slide);
    };


    const goToNextSlide = function() {
        if (currentSlide === countOfSlides - 1)
            currentSlide = 0;
        else currentSlide++;

        goToSlide(currentSlide);
        activateDot(currentSlide);
    };


    const goToPreviousSlide = function() {
        if (currentSlide === 0)
            currentSlide = countOfSlides - 1;
        else currentSlide--;

        goToSlide(currentSlide);
        activateDot(currentSlide);
    };


    const init = function() {
        goToSlide(0);
        createDots();
        activateDot(0);
    }
    init();

    //Event handlers
    sliderBtnRight.addEventListener("click", goToNextSlide);
    sliderBtnLeft.addEventListener("click", goToPreviousSlide);

    document.addEventListener("keydown", function(event) {
        // console.log(event);
        if (event.key === "ArrowRight") goToNextSlide();
        event.key === "ArrowLeft" && goToPreviousSlide();
    });


    dotsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("dots__dot")) {
            // //Me: this is lecture solution but modified by video note montage
            // const {slide} = event.target.dataset;
            // goToSlide(slide);
            // activateDot(slide);
            //Me: this is the edited solution
            currentSlide = Number(event.target.dataset.slide);
            goToSlide(currentSlide);
            activateDot(currentSlide);
        }
    });
}
playSlider();

