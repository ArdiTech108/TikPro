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
        `
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
        `
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
      parseInt(amount)
    )} ${type} falas u dërgua me sukses! Do t'ju kontaktojmë në ${email}.`
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
    'input[name="paymentMethod"]:checked'
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
      price
    ).toFixed(2)}) u dërgua me sukses! Do t'ju kontaktojmë në ${email}.`
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


// translations.js
const translations = {
  sq: {
    // Navigation
    home: "Kryefaqja",
    contact: "Kontakt",
    privacy: "Privatësia",
    
    // Hero section
    heroTitle: "Tik<span class='text-primary'>Pro</span>",
    heroSubtitle: "Rrite Profilin Tënd TikTok",
    heroDescription: "Merr likes dhe views të vërteta për videot e tua TikTok. Shërbim i shpejtë, i sigurt dhe me çmime të lira.",
    viewPackages: "Shiko Paketat",
    contactUs: "Kontakto",
    
    // Free packages
    free: "FALAS",
    freePackages: "Paketa Falas",
    freeSubtitle: "Fillo pa paguar asgjë! Merr likes dhe views falas për të provuar shërbimin tonë.",
    limitedTime: "Kohë e Kufizuar",
    freeLikes: "Likes Falas",
    freeViews: "Views Falas",
    
    // Features
    realUsers: "Likes të vërteta nga përdorues realë",
    viewsRealUsers: "Views të vërteta nga përdorues realë",
    delivery24h: "Dorëzim brenda 24 orëve",
    noPassword: "Pa fjalëkalim të nevojshëm",
    
    // Packages
    likesPackages: "Paketa Likes",
    likesSubtitle: "Zgjidh paketën që i përshtatet nevojave të tua. Çmime të lira dhe dorëzim i garantuar.",
    viewsPackages: "Paketa Views",
    viewsSubtitle: "Rrite numrin e shikimeve të videove të tua me paketat tona të lira.",
    
    // Why TikPro
    whyTikPro: "Pse TikPro?",
    whySubtitle: "Platforma jonë ofron shërbimin më të mirë për rritjen e profilit tënd TikTok.",
    fastDelivery: "Dorëzim i Shpejtë",
    fastDeliveryDesc: "Porosia juaj fillon të përpunohet menjëherë dhe përfundon brenda 24 orëve.",
    secure: "100% i Sigurt",
    secureDesc: "Nuk kërkojmë fjalëkalimin tuaj. Llogaria juaj mbetet plotësisht e sigurt.",
    support: "Mbështetje 24/7",
    supportDesc: "Ekipi ynë është gjithmonë gati për t'ju ndihmuar me çdo pyetje.",
    
    // Footer
    footerDesc: "Platforma më e besueshme për rritjen e profilit tënd TikTok me likes dhe views të vërteta.",
    quickLinks: "Linqe të Shpejta",
    contact24: "Na kontaktoni 24/7 për çdo pyetje apo ndihmë.",
    rights: "Të gjitha të drejtat e rezervuara.",
    
    // Buttons
    get: "Get",
    buyNow: "Buy Now",
    
    // Modal
    modalTitleLikes: "Merr Likes Falas",
    modalTitleViews: "Merr Views Falas",
    modalSubtitle: "Plotëso të dhënat për të marrë paketën falas.",
    videoLink: "Linku i Videos",
    videoPlaceholder: "https://tiktok.com/@user/video/...",
    email: "Email",
    emailPlaceholder: "email@shembull.com",
    sendOrder: "Dërgo Porosinë",
    buyLikes: "Bli Likes",
    buyViews: "Bli Views",
    price: "Çmimi:",
    cardNumber: "Numri i Kartelës",
    cardPlaceholder: "1234 5678 9012 3456",
    address: "Adresa",
    addressPlaceholder: "Adresa juaj e plotë",
    paymentMethod: "Mënyra e Pagesës",
    total: "Totali:",
    payNow: "Paguaj Tani",
    success: "Sukses!",
    successMessage: "Porosia juaj u dërgua me sukses!",
    ok: "OK",
    
    // Contact page
    contactTitle: "Na Kontaktoni",
    contactSubtitle: "Keni pyetje apo keni nevojë për ndihmë? Dërgoni një mesazh dhe do t'ju përgjigjemi brenda 24 orëve.",
    sendMessage: "Dërgo Mesazh",
    contactDesc: "Plotësoni formularin më poshtë dhe ne do t'ju kontaktojmë sa më shpejt.",
    yourName: "Emri Juaj",
    namePlaceholder: "Emri dhe mbiemri",
    message: "Mesazhi",
    messagePlaceholder: "Shkruani mesazhin tuaj këtu...",
    sendMessageBtn: "Dërgo Mesazhin",
    messageSent: "Mesazhi u Dërgua!",
    thankYou: "Faleminderit për kontaktimin. Do t'ju përgjigjemi sa më shpejt që mundemi.",
    sendAnother: "Dërgo Mesazh Tjetër",
    orContact: "Ose na kontaktoni direkt në:",
    
    // Privacy page
    privacyTitle: "Politika e Privatësisë",
    privacySubtitle: "Përditësuar së fundi: Nëntor 2024",
    privacyIntro: "Në TikPro, ne e marrim seriozisht privatësinë tuaj. Kjo politikë privatësie shpjegon se si mbledhim, përdorim dhe mbrojmë informacionin tuaj personal kur përdorni shërbimet tona.",
    dataCollection: "Mbledhja e të Dhënave",
    dataUse: "Përdorimi i të Dhënave",
    dataSecurity: "Siguria e të Dhënave",
    yourRights: "Të Drejtat Tuaja",
    cookies: "Cookies",
    contactPrivacy: "Na Kontaktoni",
    privacyNote: "Kjo politikë privatësie mund të përditësohet herë pas here. Ndryshimet do të publikohen në këtë faqe me datën e përditësimit të re. Ju inkurajojmë të rishikoni këtë politikë periodikisht.",
    
    // Trust indicators
    clients: "10,000+ Klientë",
    safe: "100% i Sigurt",
    fast: "Dorëzim i Shpejtë",
    
    // Popular badge
    popular: "Më i Popullarizuar",
    
    // Language names
    languageAlbanian: "Shqip",
    languageEnglish: "English"
  },
  
  en: {
    // Navigation
    home: "Home",
    contact: "Contact",
    privacy: "Privacy",
    
    // Hero section
    heroTitle: "Tik<span class='text-primary'>Pro</span>",
    heroSubtitle: "Boost Your TikTok Profile",
    heroDescription: "Get real likes and views for your TikTok videos. Fast, secure service with affordable prices.",
    viewPackages: "View Packages",
    contactUs: "Contact Us",
    
    // Free packages
    free: "FREE",
    freePackages: "Free Packages",
    freeSubtitle: "Start without paying anything! Get free likes and views to try our service.",
    limitedTime: "Limited Time",
    freeLikes: "Free Likes",
    freeViews: "Free Views",
    
    // Features
    realUsers: "Real likes from real users",
    viewsRealUsers: "Real views from real users",
    delivery24h: "Delivery within 24 hours",
    noPassword: "No password required",
    
    // Packages
    likesPackages: "Likes Packages",
    likesSubtitle: "Choose the package that fits your needs. Affordable prices and guaranteed delivery.",
    viewsPackages: "Views Packages",
    viewsSubtitle: "Increase your video views with our affordable packages.",
    
    // Why TikPro
    whyTikPro: "Why TikPro?",
    whySubtitle: "Our platform offers the best service for growing your TikTok profile.",
    fastDelivery: "Fast Delivery",
    fastDeliveryDesc: "Your order starts processing immediately and completes within 24 hours.",
    secure: "100% Secure",
    secureDesc: "We don't ask for your password. Your account remains completely safe.",
    support: "24/7 Support",
    supportDesc: "Our team is always ready to help you with any questions.",
    
    // Footer
    footerDesc: "The most reliable platform for growing your TikTok profile with real likes and views.",
    quickLinks: "Quick Links",
    contact24: "Contact us 24/7 for any questions or help.",
    rights: "All rights reserved.",
    
    // Buttons
    get: "Get",
    buyNow: "Buy Now",
    
    // Modal
    modalTitleLikes: "Get Free Likes",
    modalTitleViews: "Get Free Views",
    modalSubtitle: "Fill in the details to receive your free package.",
    videoLink: "Video Link",
    videoPlaceholder: "https://tiktok.com/@user/video/...",
    email: "Email",
    emailPlaceholder: "email@example.com",
    sendOrder: "Send Order",
    buyLikes: "Buy Likes",
    buyViews: "Buy Views",
    price: "Price:",
    cardNumber: "Card Number",
    cardPlaceholder: "1234 5678 9012 3456",
    address: "Address",
    addressPlaceholder: "Your full address",
    paymentMethod: "Payment Method",
    total: "Total:",
    payNow: "Pay Now",
    success: "Success!",
    successMessage: "Your order was sent successfully!",
    ok: "OK",
    
    // Contact page
    contactTitle: "Contact Us",
    contactSubtitle: "Have questions or need help? Send us a message and we'll respond within 24 hours.",
    sendMessage: "Send Message",
    contactDesc: "Fill out the form below and we'll contact you as soon as possible.",
    yourName: "Your Name",
    namePlaceholder: "First and last name",
    message: "Message",
    messagePlaceholder: "Write your message here...",
    sendMessageBtn: "Send Message",
    messageSent: "Message Sent!",
    thankYou: "Thank you for contacting us. We'll respond as soon as possible.",
    sendAnother: "Send Another Message",
    orContact: "Or contact us directly at:",
    
    // Privacy page
    privacyTitle: "Privacy Policy",
    privacySubtitle: "Last updated: November 2024",
    privacyIntro: "At TikPro, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information when you use our services.",
    dataCollection: "Data Collection",
    dataUse: "Data Usage",
    dataSecurity: "Data Security",
    yourRights: "Your Rights",
    cookies: "Cookies",
    contactPrivacy: "Contact Us",
    privacyNote: "This privacy policy may be updated from time to time. Changes will be published on this page with the updated date. We encourage you to review this policy periodically.",
    
    // Trust indicators
    clients: "10,000+ Clients",
    safe: "100% Safe",
    fast: "Fast Delivery",
    
    // Popular badge
    popular: "Most Popular",
    
    // Language names
    languageAlbanian: "Shqip",
    languageEnglish: "English"
  }
};

// Ruaj gjuhën aktuale
let currentLang = 'sq';

function setLanguage(lang) {
  if (!translations[lang]) return;
  
  currentLang = lang;
  localStorage.setItem('language', lang);
  
  // Përditëso butonin e gjuhës
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const shortSpan = langToggle.querySelector('.lang-short');
    const fullSpan = langToggle.querySelector('.lang-full');
    
    if (shortSpan) shortSpan.textContent = lang.toUpperCase();
    if (fullSpan) fullSpan.textContent = lang === 'sq' ? 'Shqip' : 'English';
  }
  
  // Përditëso të gjithë tekstet
  updatePageText(lang);
}

function updatePageText(lang) {
  const t = translations[lang];
  
  // Përditëso të gjithë elementët që kanë atributin data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (t[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = t[key];
      } else {
        element.innerHTML = t[key];
      }
    }
  });
}

function initLanguage() {
  // Kontrollo gjuhën e ruajtur ose gjuhën e shfletuesit
  const savedLang = localStorage.getItem('language');
  const browserLang = navigator.language.startsWith('en') ? 'en' : 'sq';
  const defaultLang = savedLang || browserLang;
  
  setLanguage(defaultLang);
  
  // Shto event listener për butonin e gjuhës
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'sq' ? 'en' : 'sq';
      setLanguage(newLang);
    });
  }
}

// Eksporto për përdorim global
window.translations = translations;
window.currentLang = currentLang;
window.setLanguage = setLanguage;
window.initLanguage = initLanguage;





