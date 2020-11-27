"use strict";

(function () {
  var headerButton = document.querySelector(".header__button");
  var popupForm = document.querySelector(".callform");
  var closePopup = document.querySelector(".callform__close");
  var popupLogin = popupForm.querySelector("[name=callform-login]");
  var popupPhone = popupForm.querySelector("[name=callform-tel]");
  var popupText = popupForm.querySelector("[name=callform-text]");
  var footerButtons = document.querySelectorAll(".footer__button");
  var footerLists = document.querySelectorAll(".footer__list-hide");
  var body = document.querySelector("body");
  var footerButtonsArray = Array.prototype.slice.call(footerButtons);
  var footerListsArray = Array.prototype.slice.call(footerLists);
  var isStorageSupport = true;
  var storage = "";

  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }

  var addClass = function (element, selector) {
    element.classList.add(selector);
  };

  var removeClass = function (element, selector) {
    element.classList.remove(selector);
  };

  var toggleClass = function (element, selector) {
    element.classList.toggle(selector);
  };

  if (headerButton) {
    headerButton.addEventListener("click", function () {
      addClass(popupForm, "callform__active");
      if (storage) {
        popupLogin.value = localStorage.getItem("login");
        popupPhone.value = localStorage.getItem("phone");
        popupText.value = localStorage.getItem("text");
      }
      popupLogin.focus();
      addClass(body, "body__overflow");
    })
  }

  if (closePopup) {
    closePopup.addEventListener("click", function () {
      removeClass(popupForm, "callform__active");
      removeClass(body, "body__overflow");
    })

    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        removeClass(popupForm, "callform__active");
        removeClass(body, "body__overflow");
      }
    });
  }

  if (popupForm) {
    popupForm.addEventListener("submit", function () {
      if (isStorageSupport) {
        localStorage.setItem("login", popupLogin.value)
        localStorage.setItem("phone", popupPhone.value)
        localStorage.setItem("text", popupText.value)
      }
    });
  }

  if (footerButtons) {
    footerButtonsArray.forEach(function (button, i) {
      button.addEventListener("click", function () {
        toggleClass(button, "footer__button--active");
        toggleClass(footerListsArray[i], "footer__list--disable");
      });
    });
  }

  jQuery(function($){
    $("#callform-phone").mask("+7(999)999-99-99");
 });
})();
