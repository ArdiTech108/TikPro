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

const likesPackages = [
  { id: "likes-1", amount: 100, price: 0.99, popular: false },
  { id: "likes-2", amount: 250, price: 1.99, popular: false },
  { id: "likes-3", amount: 500, price: 2.99, popular: false },
  { id: "likes-4", amount: 1000, price: 4.99, popular: true },
  { id: "likes-5", amount: 2500, price: 9.99, popular: false },
  { id: "likes-6", amount: 3000, price: 14.99, popular: false },
  { id: "likes-7", amount: 4500, price: 19.99, popular: false },
  { id: "likes-8", amount: 5000, price: 17.99, popular: false },
  { id: "likes-9", amount: 10000, price: 29.99, popular: false },
  { id: "likes-10", amount: 25000, price: 59.99, popular: false },
  { id: "likes-11", amount: 50000, price: 99.99, popular: false },
  { id: "likes-12", amount: 100000, price: 179.99, popular: false },
 
];

const viewsPackages = [
  { id: "views-1", amount: 500, price: 0.99, popular: false },
  { id: "views-2", amount: 1000, price: 1.49, popular: false },
  { id: "views-3", amount: 2500, price: 2.99, popular: false },
  { id: "views-4", amount: 5000, price: 4.99, popular: true },
  { id: "views-5", amount: 10000, price: 8.99, popular: false },
  { id: "views-6", amount: 25000, price: 17.99, popular: false },
  { id: "views-7", amount: 50000, price: 29.99, popular: false },

    { id: "views-8", amount: 75000, price: 34.99, popular: false },
  { id: "views-9", amount: 100000, price: 49.99, popular: false },
  { id: "views-10", amount: 250000, price: 99.99, popular: false },
  { id: "views-11", amount: 500000, price: 169.99, popular: false }, 
   { id: "views-12", amount: 1000000, price: 299.99, popular: false },
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
            <div class="package-card likes ${
              pkg.popular ? "popular" : ""
            }" data-testid="card-${pkg.id}">
                ${
                  pkg.popular
                    ? '<span class="popular-badge">Më i Popullarizuar</span>'
                    : ""
                }
                <div class="package-amount">${formatNumber(pkg.amount)}</div>
                <div class="package-type">likes</div>
                <div class="package-price">€${pkg.price.toFixed(2)}</div>
                <button class="btn ${
                  pkg.popular ? "btn-primary" : "btn-outline"
                } btn-full" 
                        onclick="openPaidModal('likes', ${pkg.amount}, ${
                          pkg.price
                        })"
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
            <div class="package-card views ${
              pkg.popular ? "popular popular-views" : ""
            }" data-testid="card-${pkg.id}">
                ${
                  pkg.popular
                    ? '<span class="popular-badge">Më i Popullarizuar</span>'
                    : ""
                }
                <div class="package-amount">${formatNumber(pkg.amount)}</div>
                <div class="package-type">views</div>
                <div class="package-price">€${pkg.price.toFixed(2)}</div>
                <button class="btn ${
                  pkg.popular ? "btn-secondary" : "btn-outline"
                } btn-full" 
                        onclick="openPaidModal('views', ${pkg.amount}, ${
                          pkg.price
                        })"
                        data-testid="button-buy-${pkg.id}">
                    Buy Now
                </button>
            </div>
        `,
      )
      .join("");
  }
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });
  }
}

function openFreeModal(type, amount) {
  const modal = document.getElementById("freeModal");
  const modalIcon = document.getElementById("freeModalIcon");
  const modalTitle = document.getElementById("freeModalTitle");

  document.getElementById("freePackageType").value = type;
  document.getElementById("freePackageAmount").value = amount;

  const iconSvg =
    type === "likes"
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

  modalIcon.innerHTML = iconSvg;
  modalIcon.className = `modal-icon ${type}`;
  modalTitle.textContent = `Merr ${formatNumber(amount)} ${type} Falas`;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
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

  console.log("Free Order:", orderData);

  closeFreeModal();
  showSuccessModal(
    `Porosia juaj për ${formatNumber(
      parseInt(amount),
    )} ${type} falas u dërgua me sukses! Do t'ju kontaktojmë në ${email}.`,
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
    cardNumber: cardNumber.slice(-4), // Only store last 4 digits
    address: address,
    paymentMethod: paymentMethod,
    isFree: false,
    timestamp: new Date().toISOString(),
  };

  console.log("Paid Order:", orderData);

  closePaidModal();
  showSuccessModal(
    `Porosia juaj për ${formatNumber(parseInt(amount))} ${type} (€${parseFloat(
      price,
    ).toFixed(2)}) u dërgua me sukses! Do t'ju kontaktojmë në ${email}.`,
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

function submitContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  const contactData = {
    name: name,
    email: email,
    message: message,
    timestamp: new Date().toISOString(),
  };

  console.log("Contact Form:", contactData);

  const form = document.getElementById("contactForm");
  const successDiv = document.getElementById("contactSuccess");

  if (form && successDiv) {
    form.style.display = "none";
    successDiv.style.display = "block";
  }
}

function resetContactForm() {
  const form = document.getElementById("contactForm");
  const successDiv = document.getElementById("contactSuccess");

  if (form && successDiv) {
    form.reset();
    form.style.display = "block";
    successDiv.style.display = "none";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeFreeModal();
    closePaidModal();
    closeSuccessModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderPackages();
  initMobileMenu();
});
