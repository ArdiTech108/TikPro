// script.js - Funksionet kryesore për index.html

function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const isDark = document.documentElement.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
}

// Paketat për TikTok likes dhe views
const likesPackages = [
  { id: "views-1", amount: 5000, price: 4.99, popular: true },
  { id: "likes-1", amount: 100, price: 0.99, popular: false },
  { id: "likes-2", amount: 250, price: 1.99, popular: false },
  { id: "likes-3", amount: 500, price: 2.99, popular: false },
  { id: "likes-4", amount: 1000, price: 4.99, popular: true },
  { id: "likes-5", amount: 2500, price: 9.99, popular: false },
  { id: "likes-6", amount: 5000, price: 17.99, popular: false },
  { id: "likes-7", amount: 10000, price: 29.99, popular: false },
  { id: "likes-8", amount: 25000, price: 59.99, popular: false },
  { id: "likes-9", amount: 50000, price: 99.99, popular: false },
  { id: "likes-10", amount: 100000, price: 179.99, popular: false },
];

const viewsPackages = [
  { id: "views-1", amount: 500, price: 0.99, popular: false },
  { id: "views-2", amount: 1000, price: 1.49, popular: false },
  { id: "views-3", amount: 2500, price: 2.99, popular: false },
  { id: "views-4", amount: 5000, price: 4.99, popular: true },
  { id: "views-5", amount: 10000, price: 8.99, popular: false },
  { id: "views-6", amount: 25000, price: 17.99, popular: false },
  { id: "views-7", amount: 50000, price: 29.99, popular: false },
  { id: "views-8", amount: 100000, price: 49.99, popular: false },
  { id: "views-9", amount: 250000, price: 99.99, popular: false },
  { id: "views-10", amount: 500000, price: 169.99, popular: false },
];

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

function renderPackages() {
  const likesGrid = document.getElementById("likesGrid");
  const viewsGrid = document.getElementById("viewsGrid");

  if (likesGrid) {
    likesGrid.innerHTML = likesPackages
      .map(
        (pkg) => `
                    <div class="package-card likes ${pkg.popular ? "popular" : ""}" data-testid="card-${pkg.id}">
                        ${pkg.popular ? '<span class="popular-badge">Më i Popullarizuar</span>' : ""}
                        <div class="package-amount">${formatNumber(pkg.amount)}</div>
                        <div class="package-type">likes</div>
                        <div class="package-price">€${pkg.price.toFixed(2)}</div>
                        <button class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-full" 
                                onclick="openPaidModal('likes', ${pkg.amount}, ${pkg.price})"
                                data-testid="button-buy-${pkg.id}">
                            Buy Now
                        </button>
                    </div>
                `,
      )
      .join("");
  }

  if (viewsGrid) {
    viewsGrid.innerHTML = viewsPackages
      .map(
        (pkg) => `
                    <div class="package-card views ${pkg.popular ? "popular popular-views" : ""}" data-testid="card-${pkg.id}">
                        ${pkg.popular ? '<span class="popular-badge">Më i Popullarizuar</span>' : ""}
                        <div class="package-amount">${formatNumber(pkg.amount)}</div>
                        <div class="package-type">views</div>
                        <div class="package-price">€${pkg.price.toFixed(2)}</div>
                        <button class="btn ${pkg.popular ? "btn-secondary" : "btn-outline"} btn-full" 
                                onclick="openPaidModal('views', ${pkg.amount}, ${pkg.price})"
                                data-testid="button-buy-${pkg.id}">
                            Buy Now
                        </button>
                    </div>
                `,
      )
      .join("");
  }
}

// script.js - Shto këtë funksion për mobile menu
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Parandalon përhapjen e eventit
      menuToggle.classList.toggle("active");
      mobileNav.classList.toggle("active");

      // Parandalon scrolling kur menuja është hapur
      if (mobileNav.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Mbyll menu kur klikon jashtë
    document.addEventListener("click", (e) => {
      if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Mbyll menu kur klikon një link
    const mobileLinks = mobileNav.querySelectorAll(".nav-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }
}

function closeFreeModal() {
  const modal = document.getElementById("freeModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
  document.getElementById("freeForm").reset();
}

function submitFreeForm(event) {
  event.preventDefault();

  const type = document.getElementById("freePackageType").value;
  const amount = document.getElementById("freePackageAmount").value;
  const videoLink = document.getElementById("freeVideoLink").value;
  const email = document.getElementById("freeEmail").value;

  if (!videoLink.includes("tiktok.com")) {
    alert("Ju lutem vendosni një link të vlefshëm TikTok!");
    return;
  }

  const orderData = {
    type: type,
    amount: parseInt(amount),
    videoLink: videoLink,
    email: email,
    isFree: true,
    timestamp: new Date().toISOString(),
  };

  // Ruaj në localStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(orderData);
  localStorage.setItem("orders", JSON.stringify(orders));

  closeFreeModal();
  showSuccessModal(
    `Porosia juaj për ${formatNumber(parseInt(amount))} ${type} falas u dërgua me sukses! Do t'ju kontaktojmë në ${email}.`,
  );
}

function openPaidModal(type, amount, price) {
  const modal = document.getElementById("paidModal");
  const modalIcon = document.getElementById("paidModalIcon");
  const modalTitle = document.getElementById("paidModalTitle");
  const modalSubtitle = document.getElementById("paidModalSubtitle");
  const totalPrice = document.getElementById("totalPrice");

  document.getElementById("paidPackageType").value = type;
  document.getElementById("paidPackageAmount").value = amount;
  document.getElementById("paidPackagePrice").value = price;

  const iconSvg =
    type === "likes"
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

  modalIcon.innerHTML = iconSvg;
  modalIcon.className = `modal-icon ${type}`;
  modalTitle.textContent = `Bli ${formatNumber(amount)} ${type}`;
  modalSubtitle.textContent = `Çmimi: €${price.toFixed(2)}`;
  totalPrice.textContent = `€${price.toFixed(2)}`;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePaidModal() {
  const modal = document.getElementById("paidModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
  document.getElementById("paidForm").reset();
}

function submitPaidForm(event) {
  event.preventDefault();

  const type = document.getElementById("paidPackageType").value;
  const amount = document.getElementById("paidPackageAmount").value;
  const price = document.getElementById("paidPackagePrice").value;
  const videoLink = document.getElementById("paidVideoLink").value;
  const email = document.getElementById("paidEmail").value;
  const cardNumber = document.getElementById("paidCardNumber").value;
  const address = document.getElementById("paidAddress").value;
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked',
  ).value;

  if (!videoLink.includes("tiktok.com")) {
    alert("Ju lutem vendosni një link të vlefshëm TikTok!");
    return;
  }

  if (cardNumber.replace(/\s/g, "").length < 16) {
    alert("Ju lutem vendosni një numër kartele të vlefshëm!");
    return;
  }

  const orderData = {
    type: type,
    amount: parseInt(amount),
    price: parseFloat(price),
    videoLink: videoLink,
    email: email,
    cardNumber: cardNumber.slice(-4),
    address: address,
    paymentMethod: paymentMethod,
    isFree: false,
    timestamp: new Date().toISOString(),
  };

  // Ruaj në localStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(orderData);
  localStorage.setItem("orders", JSON.stringify(orders));

  closePaidModal();
  showSuccessModal(
    `Porosia juaj për ${formatNumber(parseInt(amount))} ${type} (€${parseFloat(price).toFixed(2)}) u dërgua me sukses! Do t'ju kontaktojmë në ${email}.`,
  );
}

function showSuccessModal(message) {
  const modal = document.getElementById("successModal");
  document.getElementById("successMessage").textContent = message;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Counter për footer
function initCounter() {
  const counter = document.getElementById("counter");
  if (!counter) return;

  const target = +counter.getAttribute("data-target");
  const speed = 200;

  const updateCount = () => {
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  window.onload = updateCount;
}

// Loading bar
function initLoadingBar() {
  window.addEventListener("load", () => {
    const bar = document.getElementById("loading-bar");
    if (!bar) return;

    bar.style.width = "30%";

    setTimeout(() => {
      bar.style.width = "100%";

      setTimeout(() => {
        bar.style.opacity = "0";
      }, 400);
    }, 300);
  });
}

// Sales popup
function initSalesPopup() {
  const popup = document.getElementById("salesPopup");
  const msg = document.getElementById("salesMsg");

  if (!popup || !msg) return;

  const orders = [
    { emri: "Altini", qyteti: "Prishtinë", produkti: "500 Views" },
    { emri: "Klea", qyteti: "Tiranë", produkti: "200 Likes" },
    { emri: "Dritoni", qyteti: "Prizren", produkti: "1000 Views" },
    { emri: "Sara", qyteti: "Shkup", produkti: "50 Like" },
    { emri: "Enisi", qyteti: "Gjakovë", produkti: "300 Likes" },
  ];

  function showOrder() {
    const o = orders[Math.floor(Math.random() * orders.length)];
    msg.innerHTML = `<b>${o.emri}</b> nga ${o.qyteti}<br>sapo bleu <b>${o.produkti}</b>!`;
    popup.classList.add("active");

    setTimeout(() => {
      popup.classList.remove("active");
    }, 5000);
  }

  setTimeout(showOrder, 3000);
  setInterval(showOrder, 15000);
}

// Kur faqja të ngarkohet
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderPackages();
  initMobileMenu();
  initCounter();
  initLoadingBar();
  initSalesPopup();

  // Krijo admin default
  if (typeof createDefaultAdmin === "function") {
    createDefaultAdmin();
  }

  // Update header për user
  if (typeof updateHeaderForUser === "function") {
    updateHeaderForUser();
  }
});

// Mbyll modalat me ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeFreeModal();
    closePaidModal();
    closeSuccessModal();
  }
});
