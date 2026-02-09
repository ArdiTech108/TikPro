// logout-fix.js - Fix logout for all pages and devices
(function () {
  "use strict";

  function initLogout() {
    const user = JSON.parse(localStorage.getItem("tikproCurrentUser"));

    // ===== 1. FIX DESKTOP LOGOUT =====
    // Për faqet e rregullta
    const headerActions = document.querySelector(".header-actions");
    if (headerActions && user) {
      // Heq butonat ekzistues
      const existingLogout = headerActions.querySelector(".global-logout-btn");
      if (existingLogout) existingLogout.remove();

      // Krijo buton të ri logout
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

      // Efektet hover
      logoutBtn.onmouseenter = function () {
        this.style.background = "rgba(239, 68, 68, 0.2)";
        this.style.transform = "translateY(-2px)";
      };
      logoutBtn.onmouseleave = function () {
        this.style.background = "rgba(239, 68, 68, 0.1)";
        this.style.transform = "translateY(0)";
      };

      // Click handler
      logoutBtn.onclick = handleLogout;

      // Shto në header
      headerActions.appendChild(logoutBtn);
    }

    // ===== 2. FIX LOGOUT PËR ADMIN PAGE =====
    // Kontrollo nëse jemi në admin.html
    const isAdminPage = window.location.pathname.includes("admin.html");
    if (isAdminPage && user) {
      const adminHeader = document.querySelector(".admin-header");
      if (adminHeader) {
        // Heq butonin ekzistues
        const existingAdminLogout = adminHeader.querySelector(".logout-btn");
        if (existingAdminLogout) {
          existingAdminLogout.onclick = handleLogout;
        }
      }
    }

    // ===== 3. FIX MOBILE LOGOUT =====
    const mobileNav = document.getElementById("mobileNav");
    if (mobileNav && user) {
      // Heq logout-in ekzistues të mobile
      const existingMobileLogout = mobileNav.querySelector(
        ".mobile-logout-link",
      );
      if (existingMobileLogout) existingMobileLogout.remove();

      // Krijo mobile logout link
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

      // Shto në mobile menu
      mobileNav.appendChild(logoutLink);
    }

    // ===== 4. UPDATE ADMIN LINKS =====
    const adminLinks = document.querySelectorAll(".admin-link");
    adminLinks.forEach((link) => {
      if (user) {
        if (user.role === "admin") {
          // Përdorues admin - shfaq si admin panel
          link.innerHTML = `
            <i class="fas fa-crown" style="margin-right: 5px;"></i>
            Admin
          `;
          if (link.href.includes("login.html")) {
            link.href = "admin.html";
          }
        } else {
          // Përdorues i rregullt - fshi admin links
          link.style.display = "none";
        }
      } else {
        // Pa përdorues - shfaq si login
        link.innerHTML = `
          <i class="fas fa-sign-in-alt" style="margin-right: 5px;"></i>
          Hyr
        `;
        link.href = "login.html";
      }
    });
  }

  // ===== LOGOUT HANDLER =====
  function handleLogout() {
    if (confirm("Jeni të sigurt që doni të dilni nga llogaria juaj?")) {
      localStorage.removeItem("tikproCurrentUser");
      localStorage.removeItem("tikproRemember");
      window.location.href = "login.html";
    }
  }

  // ===== INITIALIZE =====
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLogout);
  } else {
    initLogout();
  }

  // Bëj handleLogout të disponueshëm globalisht
  window.handleLogout = handleLogout;
})();
