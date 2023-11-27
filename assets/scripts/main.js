"use strict";

// Reusable intersection observer functio
function intersectionObserver(options, element) {
  let elIsVisible;

  // Intersection observer is asynchronous, so it needs to be placed inside a promise. This allows elIsVisble to be redeclared.
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
function desktopDarkHeader() {
  const desktopHeader = document.querySelector(".desktop-header");
  const heroSection = document.querySelector(".hero-section");
  const darkClass = "desktop-header--dark";
  const defaultClass = "desktop-header--default";

  const options = {
    threshold: 0.1,
  };

  window.addEventListener("scroll", () => {
    intersectionObserver(options, heroSection).then((isVisible) => {
      if (!isVisible) {
        if (
          !desktopHeader.classList.contains(darkClass) &&
          !desktopHeader.classList.contains(defaultClass)
        ) {
          desktopHeader.classList.add(darkClass);
        } else {
          desktopHeader.classList.remove(defaultClass);
          desktopHeader.classList.add(darkClass);
        }
      } else {
        if (desktopHeader.classList.contains(darkClass)) {
          desktopHeader.classList.remove(darkClass);
          desktopHeader.classList.add(defaultClass);
        }
      }
    });
  });
}

desktopDarkHeader();
