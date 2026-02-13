(function () {
  "use strict";

  function fixPackagesLink() {
    const packageLinks = document.querySelectorAll('a[href="packages.html"]');

    let currentLang = "sq";

    if (document.documentElement.lang) {
      currentLang = document.documentElement.lang;
    }

    if (window.Weglot && window.Weglot.getCurrentLang) {
      currentLang = window.Weglot.getCurrentLang();
    }

    if (localStorage.getItem("weglot-language")) {
      currentLang = localStorage.getItem("weglot-language");
    }

    console.log("Current language:", currentLang);

    packageLinks.forEach((link) => {
      const currentText = link.textContent.trim();
      let newText = "";

      if (
        currentLang === "en" ||
        currentLang === "eng" ||
        currentLang === "en-US"
      ) {
        newText = "Packages";
      } else {
        newText = "Paketa";
      }

      if (currentText !== newText) {
        console.log('Fixing link: "' + currentText + '" -> "' + newText + '"');
        link.textContent = newText;
      }
    });
  }

  if (window.Weglot) {
    if (Weglot.on) {
      Weglot.on("languageChanged", function (newLang, prevLang) {
        console.log("Weglot languageChanged event:", newLang);
        setTimeout(fixPackagesLink, 10);
        setTimeout(fixPackagesLink, 50);
        setTimeout(fixPackagesLink, 100);
        setTimeout(fixPackagesLink, 200);
      });
    }

    if (Weglot.api && Weglot.api.addListener) {
      Weglot.api.addListener("languageChanged", function (event) {
        console.log("Weglot API languageChanged:", event);
        setTimeout(fixPackagesLink, 10);
        setTimeout(fixPackagesLink, 100);
      });
    }
  }

  const observer = new MutationObserver(function (mutations) {
    let shouldFix = false;

    mutations.forEach(function (mutation) {
      if (
        mutation.type === "characterData" ||
        mutation.type === "childList" ||
        (mutation.type === "attributes" && mutation.attributeName === "lang")
      ) {
        shouldFix = true;
      }

      if (mutation.target && mutation.target.nodeType === 3) {
        const parent = mutation.target.parentNode;
        if (
          parent &&
          parent.tagName === "A" &&
          parent.getAttribute("href") === "packages.html"
        ) {
          shouldFix = true;
        }
      }
    });

    if (shouldFix) {
      fixPackagesLink();
    }
  });

  setTimeout(function () {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["lang"],
    });
  }, 500);

  let checkCount = 0;
  const intervalId = setInterval(function () {
    fixPackagesLink();
    checkCount++;

    if (checkCount > 10) {
      clearInterval(intervalId);
    }
  }, 200);

  const htmlElement = document.documentElement;
  const langObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "lang") {
        console.log("lang attribute changed to:", htmlElement.lang);
        setTimeout(fixPackagesLink, 50);
      }
    });
  });

  langObserver.observe(htmlElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  fixPackagesLink();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixPackagesLink);
  } else {
    fixPackagesLink();
  }

  window.addEventListener("load", function () {
    setTimeout(fixPackagesLink, 100);
    setTimeout(fixPackagesLink, 500);
  });

  window.fixPackagesLink = fixPackagesLink;

  console.log("fix-packages-link.js loaded - waiting for language changes");
})();
