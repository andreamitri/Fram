/* =========================
   SHARED STATE
   ========================= */

const CART_KEY = "fram_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.querySelector(".cart");
  if (badge) badge.textContent = cart.length;
}

/* =========================
   ADD TO BASKET
   ========================= */

function handleAddToBasket() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".product span");
    if (!btn) return;

    const product = btn.closest(".product");
    if (!product) return;

    const name = product.querySelector("strong")?.textContent;
    const price = product.querySelector(".meta span")?.textContent;

    const cart = getCart();
    cart.push({ name, price });
    setCart(cart);

    updateCartBadge();

    // Visual feedback
    btn.textContent = "Added ✓";
    btn.style.background = "#2fbf71";

    setTimeout(() => {
      btn.textContent = "Add to basket ↑";
      btn.style.background = "rgba(0,0,0,.8)";
    }, 800);
  });
}

/* =========================
   CONTACT FORM
   ========================= */

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Exit safely if form is not on this page
  if (!form || !formStatus) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.style.color = "red";
      return;
    }

    const emailPattern = /^[^]()

