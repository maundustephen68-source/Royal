/**
 * Royal Furniture — Main JavaScript (royal.js)
 * Full interactivity for all 4 pages
 */

/**
 * Backend API base URL. Products, cart validation and checkout all go
 * through this server so prices/stock can never be edited in the browser.
 * Replace with your deployed Render URL once you have it, e.g.
 * 'https://royal-furniture-api.onrender.com'
 */
const API_BASE = 'https://royal-furniture-api.onrender.com'; // update after deploying (see backend README)

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     WHATSAPP FLOATING BUTTON (appears on every page)
     ============================================================ */
  const waNumber = '254716817495'; // Kenya +254 format
  const waDefault = 'Hello! I am interested in your furniture. Please assist me.';

  const waBtn = document.createElement('a');
  waBtn.classList.add('whatsapp-float');
  waBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waDefault)}`;
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waBtn.innerHTML = `
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#25D366"/>
      <path fill="#fff" d="M23.5 8.5A10.44 10.44 0 0 0 16 5.5C10.2 5.5 5.5 10.2 5.5 16c0 1.86.49 3.67 1.42 5.26L5.5 26.5l5.36-1.41A10.46 10.46 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.09-5.43-3.0-7.5zm-7.5 16.15c-1.58 0-3.13-.42-4.49-1.22l-.32-.19-3.18.83.85-3.1-.21-.33A8.67 8.67 0 0 1 7.32 16c0-4.78 3.9-8.68 8.68-8.68 2.32 0 4.5.9 6.13 2.55A8.61 8.61 0 0 1 24.68 16c0 4.78-3.9 8.65-8.68 8.65zm4.76-6.48c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.65.85-.8 1.02-.15.17-.3.19-.55.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.27-1.52-1.42-1.77-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.06-.68.32-.23.26-.89.87-.89 2.12s.91 2.46 1.04 2.63c.13.17 1.8 2.75 4.36 3.85.61.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.23-.17-.49-.3z"/>
    </svg>
  `;
  document.body.appendChild(waBtn);

  const waTooltip = document.createElement('div');
  waTooltip.classList.add('whatsapp-tooltip');
  waTooltip.textContent = '💬 Chat with us on WhatsApp';
  document.body.appendChild(waTooltip);

  // Pulse animation for WhatsApp button
  const pulseCss = document.createElement('style');
  pulseCss.textContent = `
    @keyframes waPulse {
      0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
      70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
      100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
    }
    .whatsapp-float { animation: waPulse 2.5s infinite; }
    .whatsapp-float:hover { animation: none; }
  `;
  document.head.appendChild(pulseCss);

  /* ============================================================
     MOBILE NAVIGATION TOGGLE
     ============================================================ */
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');

  if (nav) {
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.setAttribute('aria-label', 'Toggle Navigation');
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    // Place hamburger inside nav but absolutely positioned via CSS
    nav.style.position = 'relative';
    nav.appendChild(hamburger);

    hamburger.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
      this.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* ============================================================
     ACTIVE NAV LINK HIGHLIGHTING
     ============================================================ */
  const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'home.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href').toLowerCase();
    if (href === currentPage) link.classList.add('active-link');
  });

  /* ============================================================
     SCROLL-REVEAL ANIMATION
     ============================================================ */
  const revealEls = document.querySelectorAll('.section, .card, .hero, .product-banner');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 0.1}s`;
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ============================================================
     BACK TO TOP BUTTON
     ============================================================ */
  const topBtn = document.createElement('button');
  topBtn.classList.add('back-to-top');
  topBtn.innerHTML = '&#9650;';
  topBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 300);
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ============================================================
     TOAST NOTIFICATION SYSTEM
     ============================================================ */
  function showToast(msg, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.classList.add('toast-container');
      document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.classList.add('toast', `toast-${type}`);
    t.textContent = msg;
    container.appendChild(t);
    requestAnimationFrame(() => t.classList.add('toast-visible'));
    setTimeout(() => {
      t.classList.remove('toast-visible');
      setTimeout(() => t.remove(), 400);
    }, 3800);
  }

  /* ============================================================
     PRODUCTS PAGE
     ============================================================ */
  const catalogRoot = document.getElementById('product-catalog');
  if (catalogRoot) {

    // ---- Cart State ----
    // Each item is { id, name, price, qty }. `id` and `price` come straight
    // from the API response, never typed/edited by a user, so the server
    // can always re-verify them at checkout.
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem('royalCart') || '[]'); } catch(e) { cart = []; }

    let allProducts = []; // flat list fetched from the API, used for filter/search

    async function loadProducts() {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (!res.ok) throw new Error('Bad response');
        const data = await res.json();
        allProducts = data.products.map(p => ({
          id: p.id,
          category: p.category,
          name: p.name,
          description: p.description,
          price: p.price_cents / 100,
          currency: p.currency,
          imageUrl: p.image_url
        }));
        renderCatalog(allProducts);
      } catch (err) {
        console.error(err);
        catalogRoot.innerHTML = `<p class="loading-products">⚠ Could not load products right now. Please refresh or try again shortly.</p>`;
      }
    }

    function renderCatalog(products) {
      if (products.length === 0) {
        catalogRoot.innerHTML = `<p class="loading-products">No products found.</p>`;
        return;
      }
      const categories = [...new Set(products.map(p => p.category))];
      catalogRoot.innerHTML = categories.map(cat => `
        <h2 class="category-title">${cat} Collection</h2>
        <div class="products">
          ${products.filter(p => p.category === cat).map(p => `
            <div class="card" data-id="${p.id}">
              <img src="${p.imageUrl}" alt="${p.name}" loading="lazy">
              <div class="card-content">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div class="price">$${p.price.toLocaleString()}</div>
                <button class="buy-btn">View Product</button>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('');

      wireBuyButtons();
      buildFilterBar(categories);
    }

    // ---- Cart Icon in Header ----
    if (header) {
      const cartIcon = document.createElement('div');
      cartIcon.classList.add('cart-icon');
      cartIcon.innerHTML = `🛒 Cart <span class="cart-count">0</span>`;
      header.appendChild(cartIcon);
      cartIcon.addEventListener('click', openCart);
    }

    function updateCartCount() {
      const count = cart.reduce((s, i) => s + i.qty, 0);
      const el = document.querySelector('.cart-count');
      if (el) el.textContent = count;
    }
    updateCartCount();

    function saveCart() {
      try { localStorage.setItem('royalCart', JSON.stringify(cart)); } catch(e){}
    }

    // ---- Cart Sidebar ----
    const cartSidebar = document.createElement('div');
    cartSidebar.classList.add('cart-sidebar');
    cartSidebar.innerHTML = `
      <div class="cart-sidebar-header">
        <h3>🛒 Your Cart</h3>
        <button class="close-cart" aria-label="Close cart">✕</button>
      </div>
      <div class="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total">Total: <strong>$0</strong></div>
        <input type="text" class="checkout-name" placeholder="Your full name" required>
        <input type="tel" class="checkout-phone" placeholder="Your phone number" required>
        <button class="checkout-btn">✓ Checkout via WhatsApp</button>
        <button class="clear-cart-btn">Clear Cart</button>
      </div>
    `;
    document.body.appendChild(cartSidebar);

    const overlay = document.createElement('div');
    overlay.classList.add('cart-overlay');
    document.body.appendChild(overlay);

    function openCart()  { cartSidebar.classList.add('open'); overlay.classList.add('open'); renderCart(); }
    function closeCart() { cartSidebar.classList.remove('open'); overlay.classList.remove('open'); }

    cartSidebar.querySelector('.close-cart').addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    function renderCart() {
      const container = cartSidebar.querySelector('.cart-items');
      if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">🛒 Your cart is empty.<br><small>Browse products and add items!</small></p>';
        cartSidebar.querySelector('.cart-total strong').textContent = '$0';
        return;
      }
      container.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <strong>${item.name}</strong>
            <small>$${item.price.toLocaleString()} × ${item.qty} = $${(item.price * item.qty).toLocaleString()}</small>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="dec" data-index="${i}" aria-label="Decrease">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-index="${i}" aria-label="Increase">+</button>
            <button class="remove-btn" data-index="${i}" aria-label="Remove">🗑</button>
          </div>
        </div>
      `).join('');

      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      cartSidebar.querySelector('.cart-total strong').textContent = `$${total.toLocaleString()}`;

      container.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const idx = +this.dataset.index;
          if (this.dataset.action === 'inc') cart[idx].qty++;
          else cart[idx].qty--;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
          saveCart(); renderCart(); updateCartCount();
        });
      });
      container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          cart.splice(+this.dataset.index, 1);
          saveCart(); renderCart(); updateCartCount();
        });
      });
    }

    cartSidebar.querySelector('.clear-cart-btn').addEventListener('click', () => {
      if (!cart.length) return;
      cart = []; saveCart(); renderCart(); updateCartCount();
      showToast('Cart cleared.', 'error');
    });

    // Secure WhatsApp checkout — the browser only sends product IDs + quantities.
    // The backend looks up real prices/stock and returns the message to send,
    // so nothing typed or edited in the browser can change what the customer pays.
    cartSidebar.querySelector('.checkout-btn').addEventListener('click', async () => {
      if (!cart.length) { showToast('Your cart is empty!', 'error'); return; }

      const nameInput = cartSidebar.querySelector('.checkout-name');
      const phoneInput = cartSidebar.querySelector('.checkout-phone');
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();

      if (name.length < 2) { showToast('Please enter your full name.', 'error'); nameInput.focus(); return; }
      if (phone.length < 7) { showToast('Please enter a valid phone number.', 'error'); phoneInput.focus(); return; }

      const btn = cartSidebar.querySelector('.checkout-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Validating order…';
      btn.disabled = true;

      try {
        const res = await fetch(`${API_BASE}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { name, phone },
            items: cart.map(i => ({ id: i.id, qty: i.qty }))
          })
        });
        const data = await res.json();

        if (!res.ok) {
          showToast(data.error || 'Could not validate your order. Please try again.', 'error');
          return;
        }

        window.open(data.whatsappUrl, '_blank');
        showToast(`Order ${data.orderRef} created — opening WhatsApp…`, 'success');
        cart = []; saveCart(); renderCart(); updateCartCount(); closeCart();
      } catch (err) {
        console.error(err);
        showToast('Network error — please check your connection and try again.', 'error');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });

    // ---- Product Modal ----
    const modal = document.createElement('div');
    modal.classList.add('product-modal');
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" aria-label="Close">✕</button>
        <img class="modal-img" src="" alt="">
        <div class="modal-body">
          <h2 class="modal-title"></h2>
          <p class="modal-desc"></p>
          <div class="modal-price"></div>
          <div class="modal-qty">
            <button class="modal-dec" aria-label="Decrease">−</button>
            <span class="modal-qty-val">1</span>
            <button class="modal-inc" aria-label="Increase">+</button>
          </div>
          <button class="modal-add-btn">🛒 Add to Cart</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    let currentProduct = null;
    let currentQty = 1;

    modal.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

    modal.querySelector('.modal-dec').addEventListener('click', () => {
      if (currentQty > 1) { currentQty--; modal.querySelector('.modal-qty-val').textContent = currentQty; }
    });
    modal.querySelector('.modal-inc').addEventListener('click', () => {
      currentQty++; modal.querySelector('.modal-qty-val').textContent = currentQty;
    });

    modal.querySelector('.modal-add-btn').addEventListener('click', () => {
      if (!currentProduct) return;
      const existing = cart.find(i => i.id === currentProduct.id);
      if (existing) existing.qty += currentQty;
      else cart.push({ ...currentProduct, qty: currentQty });
      saveCart(); updateCartCount();
      modal.classList.remove('open');
      showToast(`"${currentProduct.name}" added to cart! 🛒`, 'success');
    });

    // Wire "View Product" buttons — called again after every catalog re-render
    function wireBuyButtons() {
      catalogRoot.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const card = this.closest('.card');
          const id = Number(card.dataset.id);
          const product = allProducts.find(p => p.id === id);
          if (!product) return;

          currentProduct = { id: product.id, name: product.name, price: product.price };
          currentQty = 1;

          modal.querySelector('.modal-img').src = product.imageUrl;
          modal.querySelector('.modal-img').alt = product.name;
          modal.querySelector('.modal-title').textContent = product.name;
          modal.querySelector('.modal-desc').textContent = product.description;
          modal.querySelector('.modal-price').textContent = `$${product.price.toLocaleString()}`;
          modal.querySelector('.modal-qty-val').textContent = '1';
          modal.classList.add('open');
        });
      });
    }

    // ---- Category Filter Tabs + Search (rebuilt once after first product load) ----
    let filterBarBuilt = false;

    function applyFilters() {
      const activeBtn = document.querySelector('.filter-btn.active');
      const category = activeBtn && activeBtn.dataset.category ? activeBtn.dataset.category : null;
      const query = (document.querySelector('.product-search')?.value || '').toLowerCase();

      const filtered = allProducts.filter(p => {
        const matchesCategory = !category || p.category === category;
        const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
      });
      renderCatalog(filtered.length ? filtered : []);
      if (filtered.length === 0) catalogRoot.innerHTML = `<p class="loading-products">No products match your search.</p>`;
    }

    function buildFilterBar(categories) {
      if (filterBarBuilt) return; // only build controls once; re-renders just re-filter
      filterBarBuilt = true;

      const filterBar = document.createElement('div');
      filterBar.classList.add('filter-bar');

      const allBtn = document.createElement('button');
      allBtn.textContent = 'All';
      allBtn.classList.add('filter-btn', 'active');
      filterBar.appendChild(allBtn);

      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.classList.add('filter-btn');
        btn.dataset.category = cat;
        filterBar.appendChild(btn);
      });

      const banner = document.querySelector('.product-banner');
      if (banner) banner.after(filterBar);
      else catalogRoot.before(filterBar);

      filterBar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });

      const searchWrapper = document.createElement('div');
      searchWrapper.classList.add('search-bar-wrapper');
      searchWrapper.innerHTML = `<input type="text" class="product-search" placeholder="🔍  Search products..." aria-label="Search products">`;
      filterBar.after(searchWrapper);

      searchWrapper.querySelector('.product-search').addEventListener('input', applyFilters);
    }

    loadProducts();

  } // end products page

  /* ============================================================
     CONTACT PAGE FORM VALIDATION
     ============================================================ */
  const contactForm = document.querySelector('form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput  = this.querySelector('input[type="text"]');
      const emailInput = this.querySelector('input[type="email"]');
      const msgInput   = this.querySelector('textarea');

      // Clear old errors
      this.querySelectorAll('.field-error').forEach(el => el.remove());
      this.querySelectorAll('input, textarea').forEach(el => el.classList.remove('input-error'));

      let valid = true;
      function showError(input, message) {
        input.classList.add('input-error');
        const err = document.createElement('span');
        err.classList.add('field-error');
        err.textContent = message;
        input.insertAdjacentElement('afterend', err);
        valid = false;
      }

      if (!nameInput || !nameInput.value.trim())
        showError(nameInput, '⚠ Please enter your full name.');
      if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value))
        showError(emailInput, '⚠ Please enter a valid email address.');
      if (!msgInput || msgInput.value.trim().length < 10)
        showError(msgInput, '⚠ Message must be at least 10 characters.');

      if (!valid) return;

      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      const phoneInput = this.querySelector('input[type="tel"]');

      fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput ? phoneInput.value.trim() : '',
          message: msgInput.value.trim()
        })
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to send message.');
          showToast('✅ Message sent! We will contact you shortly.', 'success');
          contactForm.reset();
          const counter = document.querySelector('.char-counter');
          if (counter) counter.textContent = '0 characters';
        })
        .catch(err => {
          console.error(err);
          showToast('⚠ Could not send your message. Please try again or WhatsApp us.', 'error');
        })
        .finally(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        });
    });

    // WhatsApp quick contact link in contact form area
    const waLink = document.createElement('p');
    waLink.style.cssText = 'margin-top:20px;text-align:center;font-size:14px;color:#555;';
    waLink.innerHTML = `Or message us directly on 
      <a href="https://wa.me/${waNumber}?text=${encodeURIComponent('Hello Royal Furniture! I would like more information.')}" 
         target="_blank" rel="noopener" 
         style="color:#25D366;font-weight:700;text-decoration:underline;">
        WhatsApp: +254 716 817 495
      </a>`;
    contactForm.after(waLink);

    // Live character counter
    const textarea = contactForm.querySelector('textarea');
    if (textarea) {
      const counter = document.createElement('small');
      counter.classList.add('char-counter');
      counter.textContent = '0 characters';
      textarea.insertAdjacentElement('afterend', counter);
      textarea.addEventListener('input', function () {
        const len = this.value.length;
        counter.textContent = `${len} character${len !== 1 ? 's' : ''}`;
        counter.style.color = len < 10 ? '#c0392b' : '#aaa';
      });
    }
  }

}); // end DOMContentLoaded
