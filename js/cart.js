// ============================================================
// DWARAKA PRESS – Cart Module
// ============================================================

const Cart = (() => {
  const STORAGE_KEY = 'dwaraka_press_cart';

  // ----- State -----
  let items = [];

  function load() {
    try {
      items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      items = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function getItems() {
    return [...items];
  }

  function getCount() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  function getTotal() {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function addItem(bookId) {
    const book = window.BOOKS.find(b => b.id === bookId);
    if (!book) return;
    const existing = items.find(i => i.id === bookId);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ id: book.id, title: book.title, author: book.author, price: book.price, emoji: book.emoji, qty: 1 });
    }
    save();
    CartUI.refresh();
    showToast(`"${book.title}" added to cart`);
  }

  function updateQty(bookId, delta) {
    const item = items.find(i => i.id === bookId);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) items = items.filter(i => i.id !== bookId);
    save();
    CartUI.refresh();
  }

  function removeItem(bookId) {
    items = items.filter(i => i.id !== bookId);
    save();
    CartUI.refresh();
  }

  function clear() {
    items = [];
    save();
    CartUI.refresh();
  }

  // Initialise
  load();

  return { getItems, getCount, getTotal, addItem, updateQty, removeItem, clear };
})();

// ============================================================
// CartUI – renders the cart sidebar
// ============================================================
const CartUI = (() => {
  const modal      = document.getElementById('cart-modal');
  const countEl    = document.getElementById('cart-count');
  const itemsEl    = document.getElementById('cart-items');
  const footerEl   = document.getElementById('cart-footer');
  const totalEl    = document.getElementById('cart-total-price');
  const cartToggle = document.querySelector('.cart-toggle');
  const cartClose  = document.querySelector('.cart-close');

  function open() {
    modal.showModal();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.close();
    document.body.style.overflow = '';
  }

  function refresh() {
    const items = Cart.getItems();
    const count = Cart.getCount();
    const total = Cart.getTotal();

    // Badge
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';

    // Items
    if (items.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      footerEl.hidden = true;
      return;
    }

    footerEl.hidden = false;
    totalEl.textContent = '₹' + total.toLocaleString('en-IN');

    itemsEl.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-cover">${item.emoji}</div>
        <div class="cart-item-info">
          <h4>${escHtml(item.title)}</h4>
          <p class="ci-author">${escHtml(item.author)}</p>
          <div class="ci-qty-row">
            <button class="ci-qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span class="ci-qty" aria-label="${item.qty} in cart">${item.qty}</span>
            <button class="ci-qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="ci-remove" data-id="${item.id}" aria-label="Remove ${escHtml(item.title)} from cart">Remove</button>
        </div>
        <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
      </div>
    `).join('');
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Events
  cartToggle?.addEventListener('click', open);
  cartClose?.addEventListener('click', close);

  // Close on backdrop click
  modal?.addEventListener('click', e => {
    const rect = modal.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right) close();
  });

  // Qty / remove delegation
  itemsEl?.addEventListener('click', e => {
    const btn = e.target.closest('[data-action],[data-id].ci-remove,[class~="ci-remove"]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    if (btn.classList.contains('ci-remove')) { Cart.removeItem(id); return; }
    if (btn.dataset.action === 'inc') { Cart.updateQty(id, +1); return; }
    if (btn.dataset.action === 'dec') { Cart.updateQty(id, -1); return; }
  });

  // Init
  refresh();

  return { open, close, refresh };
})();

// ============================================================
// Toast helper
// ============================================================
function showToast(msg, duration = 2800) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { toast.hidden = true; }, 300);
  }, duration);
}

window.Cart    = Cart;
window.CartUI  = CartUI;
window.showToast = showToast;
