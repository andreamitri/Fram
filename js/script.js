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

/* =========================
   CHATBOT LOGIC (NO BACKEND)
   ========================= */

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const chatError = document.getElementById("chatError");

const RESPONSES = [
  {
    keywords: ["farm", "farms"],
    reply:
      "We partner with small local farms that share our values of sustainability, quality, and transparency. We build long-term relationships by visiting farms and working closely with producers."
  },
  {
    keywords: ["delivery"],
    reply:
      "Deliveries are scheduled weekly and bring fresh produce directly from our partner farms to your doorstep."
  },
  {
    keywords: ["product", "produce"],
    reply:
      "Our produce selection changes seasonally to ensure freshness and support local harvest cycles."
  }
];

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  chatError.textContent = "";

  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  addTyping();

  setTimeout(() => {
    removeTyping();

    // Simulate random failure (to show error handling)
    if (Math.random() < 0.15) {
      chatError.textContent =
        "Failed to connect. Wait and try again later.";
      return;
    }

    const reply = getReply(text);
    addMessage(reply, "bot");
  }, 900);
});

function getReply(text) {
  const lower = text.toLowerCase();

  for (const item of RESPONSES) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.reply;
    }
  }

  return "I can help with questions about farms, products, and delivery.";
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;

  div.innerHTML = `
    ${type === "bot" ? `<span class="label">FRAM</span>` : ""}
    <div class="bubble">${text}</div>
  `;

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTyping() {
  const div = document.createElement("div");
  div.className = "message bot typing";
  div.innerHTML = `
    <span class="label">FRAM</span>
    <div class="bubble">•••</div>
  `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = chatMessages.querySelector(".typing");
  if (typing) typing.remove();
}
