"use strict";

// Toggle Mobile Header
function toggleMobileHeader() {
  const mobileBarsIcon = document.querySelector(".fa-bars");
  const mobileCloseIcon = document.querySelector(".fa-xmark");
  const mobileNavigation = document.querySelector(".mobile-navigation");
  const mobileAnchors = document.querySelectorAll(".mobile-navigation__anchor");
  const body = document.querySelector("body");
  let isOpen = false;

  // Disable scrolling when mobile navigation is open
  function disableScrolling() {
    body.classList.add("scrolling--disable");
    body.classList.remove("scrolling--enable");
  }

  // Enable scrolling when mobile navigation is closed
  function enableScrolling() {
    body.classList.add("scrolling--enable");
    body.classList.remove("scrolling--diable");
  }

  mobileBarsIcon.addEventListener("click", () => {
    // Open menu
    isOpen = true;

    if (isOpen) {
      mobileNavigation.classList.add("mobile-navigation--open");
      mobileNavigation.classList.remove("mobile-navigation--close");
      disableScrolling();
    }
  });

  mobileCloseIcon.addEventListener("click", () => {
    // Close menu
    mobileNavigation.classList.add("mobile-navigation--close");
    mobileNavigation.classList.remove("mobile-navigation--open");
    enableScrolling();
  });

  mobileAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      mobileNavigation.classList.add("mobile-navigation--close");
      mobileNavigation.classList.remove("mobile-navigation--open");
    });
  });
}

toggleMobileHeader();

// Reusable intersection observer functio
function intersectionObserver(options, element) {
  let elIsVisible;

  // Intersection observer is asynchronous, so it needs to be placed inside a promise. This allows elIsVisble to be redeclared before being returned.
  return new Promise((resolve) => {
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        elIsVisible = entry.isIntersecting;
        resolve(elIsVisible);
      });
    };

    let observer = new IntersectionObserver(callback, options);

    observer.observe(element);
  });
}

// Change header to darker background when beginning scroll
function darkHeaderAffectAnimation() {
  const desktopHeader = document.querySelector(".desktop-header");
  const mobileHeader = document.querySelector(".mobile-header");
  const heroSection = document.querySelector(".hero-section");
  const desktopDarkClass = "desktop-header--dark";
  const mobileDarkClass = "mobile-header--dark";
  const defaultClass = "desktop-header--default";

  // Execute animation on header based on conditions
  function animationEffect(headerEl, darkClass) {
    const elDisplay = window.getComputedStyle(headerEl, null).display;

    const options = {
      threshold: 0.1,
    };

    if (elDisplay !== "none") {
      intersectionObserver(options, heroSection).then((isVisible) => {
        if (!isVisible) {
          if (
            !headerEl.classList.contains(darkClass) &&
            !headerEl.classList.contains(defaultClass)
          ) {
            headerEl.classList.add(darkClass);
          } else {
            headerEl.classList.remove(defaultClass);
            headerEl.classList.add(darkClass);
          }
        } else {
          if (headerEl.classList.contains(darkClass)) {
            headerEl.classList.remove(darkClass);
            headerEl.classList.add(defaultClass);
          }
        }
      });
    }
  }

  window.addEventListener("scroll", () => {
    animationEffect(desktopHeader, desktopDarkClass);
    animationEffect(mobileHeader, mobileDarkClass);
  });
}

// Testimonial Slider
function testimonialSliderAnimation() {
  let sliderPosition = 0;
  let sliderInner = document.querySelector(".testimonial-slider__inner");
  const slides = document.querySelectorAll(".testimonial-card");
  const arrows = document.querySelectorAll(".slider-controls__arrow");
  const backwardArrow = arrows[0];
  const forwardArrow = arrows[1];

  // Get the entire width of the slider
  // Get the amont of slides in the slider
  // We must take into account the spacing between the slides, which is 10px
  // So, divide the slider's width by the number of slides + 10px and it will give you the exact number of pixels to move the slider each time the slider is interacted (exposing one slide at a time).
  let translateCalc = sliderInner.offsetWidth / slides.length + 10;

  // Execute slide animation
  function slide(num) {
    sliderPosition = sliderPosition + num;
    sliderInner.style.transform = `translateX(${sliderPosition}px)`;
  }

  // Forward slider eventlistener
  forwardArrow.addEventListener("click", () => {
    const max = -translateCalc * (slides.length - 1);

    if (sliderPosition === max) {
      return;
    } else {
      slide(-translateCalc);
    }
  });

  // Backward slider eventlistener
  backwardArrow.addEventListener("click", () => {
    if (sliderPosition === 0) {
      return;
    } else {
      slide(translateCalc);
    }
  });

  // Reset testimonial slider when orientation changes
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      sliderPosition = 0;
      const newTranslateCalc = sliderInner.offsetWidth / slides.length + 10;
      translateCalc = newTranslateCalc;
      sliderInner.style.transform = `translateX(0)`;
    }, 800);
  });
}

darkHeaderAffectAnimation();
testimonialSliderAnimation();
