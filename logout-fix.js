(function () {
  "use strict";

  function initLogout() {
    const user = JSON.parse(localStorage.getItem("tikproCurrentUser"));

    const headerActions = document.querySelector(".header-actions");
    if (headerActions && user) {
      const existingLogout = headerActions.querySelector(".global-logout-btn");
      if (existingLogout) existingLogout.remove();

      const logoutBtn = document.createElement("button");
      logoutBtn.className = "global-logout-btn";
      logoutBtn.innerHTML = `
        <i class="fas fa-sign-out-alt"></i>
        <span class="logout-text">Dil</span>
      `;
      logoutBtn.style.cssText = `
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        margin-left: 10px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
      `;

      logoutBtn.onmouseenter = function () {
        this.style.background = "rgba(239, 68, 68, 0.2)";
        this.style.transform = "translateY(-2px)";
      };
      logoutBtn.onmouseleave = function () {
        this.style.background = "rgba(239, 68, 68, 0.1)";
        this.style.transform = "translateY(0)";
      };

      logoutBtn.onclick = handleLogout;

      headerActions.appendChild(logoutBtn);
    }

    const isAdminPage = window.location.pathname.includes("admin.html");
    if (isAdminPage && user) {
      const adminHeader = document.querySelector(".admin-header");
      if (adminHeader) {
        const existingAdminLogout = adminHeader.querySelector(".logout-btn");
        if (existingAdminLogout) {
          existingAdminLogout.onclick = handleLogout;
        }
      }
    }

    const mobileNav = document.getElementById("mobileNav");
    if (mobileNav && user) {
      const existingMobileLogout = mobileNav.querySelector(
        ".mobile-logout-link",
      );
      if (existingMobileLogout) existingMobileLogout.remove();

      const logoutLink = document.createElement("a");
      logoutLink.className = "nav-link mobile-logout-link";
      logoutLink.href = "#";
      logoutLink.innerHTML = `
        <i class="fas fa-sign-out-alt" style="margin-right: 8px;"></i>
        Dil (${user.name || user.username})
      `;
      logoutLink.style.color = "#ef4444";
      logoutLink.style.marginTop = "10px";
      logoutLink.style.borderTop = "1px solid rgba(0,0,0,0.1)";
      logoutLink.style.paddingTop = "15px";

      logoutLink.onclick = function (e) {
        e.preventDefault();
        handleLogout();
      };

      mobileNav.appendChild(logoutLink);
    }

    const adminLinks = document.querySelectorAll(".admin-link");
    adminLinks.forEach((link) => {
      if (user) {
        if (user.role === "admin") {
          link.innerHTML = `
            <i class="fas fa-crown" style="margin-right: 5px;"></i>
            Admin
          `;
          if (link.href.includes("login.html")) {
            link.href = "admin.html";
          }
        } else {
          link.style.display = "none";
        }
      } else {
        link.innerHTML = `
          <i class="fas fa-sign-in-alt" style="margin-right: 5px;"></i>
          Hyr
        `;
        link.href = "login.html";
      }
    });
  }

  function handleLogout() {
    if (confirm("Jeni të sigurt që doni të dilni nga llogaria juaj?")) {
      localStorage.removeItem("tikproCurrentUser");
      localStorage.removeItem("tikproRemember");
      window.location.href = "login.html";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLogout);
  } else {
    initLogout();
  }

  window.handleLogout = handleLogout;
})();
