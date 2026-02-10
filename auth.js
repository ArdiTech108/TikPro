(function () {
  "use strict";

  function checkAuth() {
    try {
      const currentUser = getCurrentUser();
      const currentPath = window.location.pathname.toLowerCase();
      const isLoginPage = currentPath.includes("login.html");
      const isRegisterPage = currentPath.includes("regjister.html");
      const isIndexPage =
        currentPath.endsWith("index.html") ||
        currentPath === "/" ||
        currentPath === "";

      if (isIndexPage && !currentUser) {
        window.location.href = "login.html";
        return false;
      }

      if ((isLoginPage || isRegisterPage) && currentUser) {
        window.location.href = "index.html";
        return false;
      }

      const isProtectedPage = currentPath.includes("admin.html");
      if (isProtectedPage && (!currentUser || currentUser.role !== "admin")) {
        alert("Vetëm administratorët mund të hyjnë këtu!");
        window.location.href = "login.html";
        return false;
      }

      return true;
    } catch (error) {
      console.error("Auth error:", error);
      return true;
    }
  }

  function getCurrentUser() {
    const userStr = localStorage.getItem("tikproCurrentUser");
    return userStr ? JSON.parse(userStr) : null;
  }

  function setCurrentUser(user, remember = false) {
    localStorage.setItem("tikproCurrentUser", JSON.stringify(user));
    if (remember) {
      localStorage.setItem("tikproRemember", "true");
    }
  }

  function logout() {
    localStorage.removeItem("tikproCurrentUser");
    localStorage.removeItem("tikproRemember");
    window.location.href = "login.html";
  }

  document.addEventListener("DOMContentLoaded", function () {
    checkAuth();

    const logoutButtons = document.querySelectorAll("[data-logout]");
    logoutButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (confirm("Jeni të sigurt që doni të dilni?")) {
          logout();
        }
      });
    });

    const user = getCurrentUser();
    if (user) {
      const userElements = document.querySelectorAll("[data-user-name]");
      userElements.forEach((el) => {
        el.textContent = user.name || user.username;
      });
    }
  });

  window.Auth = {
    checkAuth,
    getCurrentUser,
    setCurrentUser,
    logout,
  };
})();
