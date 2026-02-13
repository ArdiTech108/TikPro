const allPackages = {
  tiktok: {
    followers: [
      { amount: 100, price: 2.99 },
      { amount: 250, price: 6.99 },
      { amount: 500, price: 9.99 },
      { amount: 1000, price: 17.99 },
      { amount: 2500, price: 39.99 },
      { amount: 5000, price: 69.99 },
      { amount: 10000, price: 129.99 },
      { amount: 25000, price: 299.99 },
      { amount: 50000, price: 549.99 },
      { amount: 100000, price: 999.99 },
      { amount: 250000, price: 2299.99 },
      { amount: 500000, price: 3999.99 },
    ],
    views: [
      { amount: 500, price: 0.99 },
      { amount: 1000, price: 1.49 },
      { amount: 2500, price: 2.99 },
      { amount: 5000, price: 4.99 },
      { amount: 10000, price: 8.99 },
      { amount: 25000, price: 17.99 },
      { amount: 50000, price: 29.99 },
      { amount: 100000, price: 49.99 },
      { amount: 250000, price: 99.99 },
      { amount: 500000, price: 169.99 },
      { amount: 5000000, price: 699.99 },
      { amount: 10000000, price: 999.99 },
    ],
    likes: [
      { amount: 100, price: 0.99 },
      { amount: 250, price: 1.99 },
      { amount: 500, price: 2.99 },
      { amount: 1000, price: 4.99 },
      { amount: 2500, price: 9.99 },
      { amount: 5000, price: 17.99 },
      { amount: 10000, price: 29.99 },
      { amount: 25000, price: 59.99 },
      { amount: 50000, price: 99.99 },
      { amount: 100000, price: 179.99 },
      { amount: 250000, price: 344.99 },
      { amount: 500000, price: 599.99 },
    ],
  },
  instagram: {
    followers: [
      { amount: 100, price: 2.49 },
      { amount: 250, price: 5.99 },
      { amount: 500, price: 8.99 },
      { amount: 1000, price: 15.99 },
      { amount: 2500, price: 34.99 },
      { amount: 5000, price: 64.99 },
      { amount: 10000, price: 119.99 },
      { amount: 25000, price: 279.99 },
      { amount: 50000, price: 499.99 },
      { amount: 100000, price: 899.99 },
      { amount: 250000, price: 1999.99 },
      { amount: 500000, price: 3499.99 },
    ],
    views: [
      { amount: 1000, price: 0.79 },
      { amount: 2500, price: 1.99 },
      { amount: 5000, price: 2.99 },
      { amount: 10000, price: 4.99 },
      { amount: 25000, price: 11.99 },
      { amount: 50000, price: 22.99 },
      { amount: 100000, price: 39.99 },
      { amount: 250000, price: 89.99 },
      { amount: 500000, price: 169.99 },
      { amount: 1000000, price: 319.99 },
      { amount: 5000000, price: 1499.99 },
      { amount: 10000000, price: 2499.99 },
    ],
    likes: [
      { amount: 100, price: 0.79 },
      { amount: 250, price: 1.99 },
      { amount: 500, price: 2.99 },
      { amount: 1000, price: 4.99 },
      { amount: 2500, price: 11.99 },
      { amount: 5000, price: 22.99 },
      { amount: 10000, price: 39.99 },
      { amount: 25000, price: 89.99 },
      { amount: 50000, price: 169.99 },
      { amount: 100000, price: 319.99 },
      { amount: 250000, price: 749.99 },
      { amount: 500000, price: 1299.99 },
    ],
  },
  facebook: {
    followers: [
      { amount: 100, price: 3.99 },
      { amount: 250, price: 8.99 },
      { amount: 500, price: 14.99 },
      { amount: 1000, price: 27.99 },
      { amount: 2500, price: 59.99 },
      { amount: 5000, price: 109.99 },
      { amount: 10000, price: 199.99 },
      { amount: 25000, price: 449.99 },
      { amount: 50000, price: 799.99 },
      { amount: 100000, price: 1499.99 },
      { amount: 250000, price: 3499.99 },
      { amount: 500000, price: 6499.99 },
    ],
    views: [
      { amount: 1000, price: 1.49 },
      { amount: 2500, price: 3.49 },
      { amount: 5000, price: 5.99 },
      { amount: 10000, price: 9.99 },
      { amount: 25000, price: 22.99 },
      { amount: 50000, price: 44.99 },
      { amount: 100000, price: 79.99 },
      { amount: 250000, price: 189.99 },
      { amount: 500000, price: 349.99 },
      { amount: 1000000, price: 649.99 },
      { amount: 5000000, price: 2999.99 },
      { amount: 10000000, price: 5499.99 },
    ],
    likes: [
      { amount: 100, price: 1.49 },
      { amount: 250, price: 3.49 },
      { amount: 500, price: 5.99 },
      { amount: 1000, price: 9.99 },
      { amount: 2500, price: 22.99 },
      { amount: 5000, price: 44.99 },
      { amount: 10000, price: 79.99 },
      { amount: 25000, price: 189.99 },
      { amount: 50000, price: 349.99 },
      { amount: 100000, price: 649.99 },
      { amount: 250000, price: 1499.99 },
      { amount: 500000, price: 2799.99 },
    ],
  },
};

let currentPlatform = "tiktok";
let currentService = "followers";

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

function getServiceName(service) {
  const names = {
    followers: "followers",
    views: "views",
    likes: "likes",
  };
  return names[service] || service;
}

function getButtonClass(index) {
  const classes = ["btn-primary", "btn-secondary", "btn-outline"];
  return classes[index % 3];
}

function renderPackages() {
  const container = document.getElementById("packagesContainer");
  if (!container) return;

  const packages = allPackages[currentPlatform][currentService];

  container.innerHTML = packages
    .map((pkg, index) => {
      const buttonClass = "btn-primary";

      return `
            <div class="package-card ${currentPlatform}" data-testid="package-${currentPlatform}-${currentService}-${index}">
                <!-- Hiq badge-in -->
                <div class="package-amount">${formatNumber(pkg.amount)}</div>
                <div class="package-type">${getServiceName(currentService)}</div>
                <div class="package-price">€${pkg.price.toFixed(2)}</div>
                <button class="btn-package ${buttonClass} btn-full" 
                        onclick="openPurchaseModal('${currentPlatform}', '${currentService}', ${pkg.amount}, ${pkg.price})">
                    🛒 Bli Tani
                </button>
            </div>
        `;
    })
    .join("");
}

function openPurchaseModal(platform, service, amount, price) {
  const modal = document.getElementById("paidModal");
  const modalIcon = document.getElementById("paidModalIcon");
  const modalTitle = document.getElementById("paidModalTitle");
  const modalSubtitle = document.getElementById("paidModalSubtitle");
  const totalPrice = document.getElementById("totalPrice");

  document.getElementById("paidPackageType").value = service;
  document.getElementById("paidPackageAmount").value = amount;
  document.getElementById("paidPackagePrice").value = price;

  let iconSvg = "";
  let serviceName = getServiceName(service);
  let platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  if (service === "likes") {
    iconSvg =
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  } else if (service === "views") {
    iconSvg =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  } else if (service === "followers") {
    iconSvg =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
  }

  modalIcon.innerHTML = iconSvg;
  modalIcon.className = `modal-icon ${service}`;
  modalTitle.textContent = `Bli ${formatNumber(amount)} ${serviceName}`;
  modalSubtitle.textContent = `Platforma: ${platformName} | Çmimi: €${price.toFixed(2)}`;
  totalPrice.textContent = `€${price.toFixed(2)}`;

  const linkInput = document.getElementById("paidVideoLink");
  if (platform === "tiktok") {
    linkInput.placeholder = "https://tiktok.com/@username/video/123456789";
  } else if (platform === "instagram") {
    linkInput.placeholder = "https://instagram.com/p/ABC123";
  } else if (platform === "facebook") {
    linkInput.placeholder = "https://facebook.com/username/posts/123456789";
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function submitPaidForm(event) {
  event.preventDefault();

  const service = document.getElementById("paidPackageType").value;
  const amount = document.getElementById("paidPackageAmount").value;
  const price = document.getElementById("paidPackagePrice").value;
  const videoLink = document.getElementById("paidVideoLink").value;
  const email = document.getElementById("paidEmail").value;
  const cardNumber = document.getElementById("paidCardNumber").value;
  const address = document.getElementById("paidAddress").value;
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked',
  ).value;

  if (!videoLink.includes(".com")) {
    alert("Ju lutem vendosni një link të vlefshëm!");
    return;
  }

  if (cardNumber.replace(/\s/g, "").length < 16) {
    alert("Ju lutem vendosni një numër kartele të vlefshëm!");
    return;
  }

  const order = {
    id: Date.now(),
    service: service,
    amount: parseInt(amount),
    price: parseFloat(price),
    videoLink: videoLink,
    email: email,
    cardNumber: cardNumber.slice(-4),
    address: address,
    paymentMethod: paymentMethod,
    date: new Date().toISOString(),
    status: "pending",
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  closePaidModal();

  showSuccessMessage(
    `Porosia juaj për ${formatNumber(parseInt(amount))} ${getServiceName(service)} u dërgua me sukses! Do t'ju kontaktojmë në ${email}.`,
  );
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
  showSuccessMessage(
    `Porosia juaj për ${formatNumber(parseInt(amount))} ${type} falas u dërgua me sukses! Do t'ju kontaktojmë në ${email}.`,
  );
}

function closePaidModal() {
  const modal = document.getElementById("paidModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
  document.getElementById("paidForm").reset();
}

function closeFreeModal() {
  const modal = document.getElementById("freeModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
  document.getElementById("freeForm").reset();
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function showSuccessMessage(message) {
  const modal = document.getElementById("successModal");
  document.getElementById("successMessage").textContent = message;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function initPlatformTabs() {
  const platformTabs = document.querySelectorAll(".platform-tab");
  const serviceTabs = document.querySelectorAll(".service-tab");

  platformTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      platformTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentPlatform = tab.dataset.platform;
      renderPackages();
    });
  });

  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      serviceTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentService = tab.dataset.service;
      renderPackages();
    });
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  mobileNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPackages();
  initPlatformTabs();

  if (typeof initTheme === "function") {
    initTheme();
  }

  if (typeof initMobileMenu === "function") {
    initMobileMenu();
  }
});
