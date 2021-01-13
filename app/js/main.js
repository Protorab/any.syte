/** @format */

// import $ from "jquery";
// import wow from "wowjs";
import Swiper from "./vendor/swiper-bundle.min.js";
import inputmask from "inputmask";
import loadingAttributePolyfill from "loading-attribute-polyfill";
// const WOW = require("wowjs");
// window.wow = new wow.WOW();
// window.wow.init();
// window.jQuery = $;
// window.$ = $;
// require("./vendor/mail.js");

// import module example (npm i -D jquery)

document.addEventListener("DOMContentLoaded", () => {
  const showMore = document.querySelectorAll(".show__more");
  const popupRates = document.querySelector(".popup__rates");
  const ratesMore = document.querySelector(".popup__more");
  const ratesDevelopment = document.querySelector("#development__text");
  const ratesAdvancing = document.querySelector("#advancing__text");
  const ratesTitle = document.querySelector("#more__title");
  const ratesDay = document.querySelector("#more__day");
  const ratesPrice = document.querySelector("#more__price");
  const ratesIcon = document.querySelector("#more__icon");
  const ratesList = document.querySelector("#rates__list");
  const ratesOrder = document.querySelector("#rates__order");

  const popupProject = document.querySelector(".popup__project");
  const projectPreview = document.querySelector(".project__preview");
  const projectPreviewImg = document.querySelector("#project__img");
  const showProject = document.querySelectorAll(".show__project");

  const phone = document.querySelector(".telephone");

  const popupForm = document.querySelector("#popup__form");
  const formPopup = document.querySelector(".form__popup");
  const showForm = document.querySelectorAll(".show__form");

  const popupBg = document.querySelectorAll(".popup__overlay");
  const closePopup = document.querySelectorAll(".close");

  const burgerMenu = document.querySelector(".burger__menu");

  const main = document.querySelector(".main");

  const header = document.querySelector(".header");

  const project = document.querySelector(".project");

  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");

  const scrollLink = document.querySelectorAll(".menu__item");
  const section = document.querySelectorAll(".section");
  const sections = {};

  const animItems = document.querySelectorAll(".__animate");

  let moreDevelopment;
  let moreAdvancing;
  let moreList;
  let moreTitle;
  let morePrice;
  let moreIcon;
  let moreDay;

  for (let anchor of scrollLink) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href").substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  if (burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      this.classList.toggle("__clicked");
      menu.classList.toggle("__show");
      e.preventDefault;
    });
  }

  if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);

    function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
        const animItem = animItems[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animItemStart = 10;

        let animItemPoint = window.innerHeight - animItemHeight / animItemStart;
        if (animItemHeight >= window.innerHeight) {
          animItemPoint =
            window.innerHeight - window.innerHeight / animItemStart;
        }
        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          animItem.classList.add("_active");
        } else {
          if (!animItem.classList.contains("__animated")) {
            animItem.classList.remove("_active");
          }
        }
      }
    }
    setTimeout(() => {
      animOnScroll();
    }, 800);
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }

  let phoneMask = new inputmask({
    mask: "+375-99-999-99-99",
    clearIncomplete: true,
    greedy: false,
  });
  if (phone) {
    phoneMask.mask(phone);
  }

  // topSection.style.minHeight = topSectionHeight - header.offsetHeight + "px";

  main.style.marginTop = -(header.offsetHeight + "px");

  const popupToggle = (
    popUp,
    popUpElement,
    state,
    timing,
    el1ShowClassAdd = "animate__fadeIn",
    el2ShowClassAdd = "animate__bounceInDown",
    el1HideClassRemove = "animate__fadeOut",
    el2HideClassRemove = "animate__bounceOutUp"
  ) => {
    popUp.classList.add(el1ShowClassAdd);
    popUp.classList.remove(el1HideClassRemove);
    popUpElement.classList.remove(el2HideClassRemove);
    popUpElement.classList.add(el2ShowClassAdd);
    body.classList.toggle("__fixed");
    setTimeout(function FormFadeIn() {
      popUp.style.display = state;
    }, timing);
  };

  const classRemove = (element, removeClass) => {
    const elementClass = document.querySelector("" + element + "");
    if (elementClass) {
      elementClass.classList.remove(removeClass);
    }
  };
  window.addEventListener("scroll", function () {
    classRemove(".burger__menu.__clicked", "__clicked");
    classRemove(".menu.__show", "__show");
  });
  if (showForm) {
    showForm.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const subject = this.dataset.subject;
        console.log(subject);
        e.preventDefault();
        popupToggle(popupForm, formPopup, "flex", 100);
      });
      return false;
    });
  }
  if (showProject) {
    showProject.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        let preview = this.dataset.preview;
        projectPreviewImg.src = preview;
        popupToggle(popupProject, projectPreview, "flex", 100);
      });
    });
  }
  if (showMore) {
    showMore.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        moreIcon = this.dataset.icon;
        moreDay = this.dataset.day;
        moreDevelopment = this.parentElement.parentElement.querySelector(
          ".more__development"
        );
        morePrice = this.parentElement.parentElement.parentElement.querySelector(
          ".rates__item-price h4"
        );
        moreTitle = this.parentElement.parentElement.parentElement.querySelector(
          ".rates__item-title h4"
        );
        moreAdvancing = this.parentElement.parentElement.querySelector(
          ".more__advancing"
        );
        moreList = this.parentElement.parentElement.querySelector(
          ".rates__item-short__info"
        );
        ratesOrder.dataset.subject = "Хочу заказать " + moreTitle.textContent;
        ratesIcon.src = moreIcon;
        ratesDay.innerHTML = moreDay;
        ratesList.innerHTML = moreList.innerHTML;
        ratesTitle.innerHTML = moreTitle.textContent;
        ratesPrice.innerHTML = morePrice.textContent;
        ratesDevelopment.innerHTML = moreDevelopment.innerHTML;
        ratesAdvancing.innerHTML = moreAdvancing.innerHTML;

        popupToggle(popupRates, ratesMore, "flex", 100);
        e.preventDefault();
      });
    });
  }

  const popupClose = () => {
    if (window.getComputedStyle(popupForm).display === "flex") {
      // popupHide(popupForm, formPopup);
      popupToggle(
        popupForm,
        formPopup,
        "none",
        1000,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown"
      );
    }
    if (window.getComputedStyle(popupProject).display === "flex") {
      // popupHide(popupProject, projectPreview);
      popupToggle(
        popupProject,
        projectPreview,
        "none",
        1000,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown"
      );
    }
    if (window.getComputedStyle(popupRates).display === "flex") {
      // popupHide(popupRates, ratesMore);
      popupToggle(
        popupRates,
        ratesMore,
        "none",
        1000,
        "animate__fadeOut",
        "animate__bounceOutUp",
        "animate__fadeIn",
        "animate__bounceInDown"
      );
    }
  };
  if (popupBg) {
    popupBg.forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        popupClose();
      });
    });
  }
  if (closePopup) {
    closePopup.forEach(function (close) {
      close.addEventListener("click", function (e) {
        popupClose();
        e.preventDefault();
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      popupClose();
    }
  });

  let identCounter = 0;
  if (scrollLink) {
    scrollLink.forEach((item) => {
      item.addEventListener("click", (e) => {
        let targetBlock = document.querySelector(e.target.hash);
        e.preventDefault();
        window.scrollTo({
          top: targetBlock.offsetTop,
          behavior: "smooth",
        });
      });
    });
  }

  Array.prototype.forEach.call(section, (e) => {
    sections[e.id] = e.offsetTop;
  });

  window.onscroll = () => {
    let scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    scrollPosition += scrollPosition / 4;
    for (identCounter in sections) {
      if (sections[identCounter] <= scrollPosition) {
        document.querySelector(".active").classList.remove("active");
        document
          .querySelector("a[href*=" + identCounter + "]")
          .classList.add("active");
      }
    }
  };

  const projectHorisontal = new Swiper(".project", {
    effect: "cube",
    rtl: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    // direction: "vertical",
    speed: 800,
    // spaceBetween: 100,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  const projectVertical = new Swiper(".project__vertical", {
    effect: "cube",

    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    direction: "vertical",
    speed: 800,
    // spaceBetween: 100,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
});
