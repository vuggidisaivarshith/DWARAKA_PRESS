// ============================================================
// DWARAKA PRESS – Checkout JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const step1El   = document.getElementById('step-1');
  const step2El   = document.getElementById('step-2');
  const step3El   = document.getElementById('step-3');
  const step2Lbl  = document.getElementById('step-2-label');
  const step3Lbl  = document.getElementById('step-3-label');

  // ----- Order Summary -----
  function renderSummary() {
    const items      = Cart.getItems();
    const subtotal   = Cart.getTotal();
    const shipping   = subtotal >= 499 ? 0 : 49;
    const total      = subtotal + shipping;

    const summaryItems = document.getElementById('summary-items');
    const shippingNote = document.getElementById('shipping-note');

    if (!items.length) {
      summaryItems.innerHTML = '<p style="color:var(--clr-text-muted);font-size:0.88rem">Your cart is empty. <a href="books.html" style="color:var(--clr-accent)">Add books →</a></p>';
    } else {
      summaryItems.innerHTML = items.map(item => `
        <div class="summary-item">
          <div>
            <div class="summary-item-title">${escHtml(item.title)}</div>
            <div class="summary-item-qty">Qty: ${item.qty}</div>
          </div>
          <div class="summary-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        </div>
      `).join('');
    }

    document.getElementById('summary-subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
    document.getElementById('summary-shipping').textContent = shipping === 0 ? 'FREE' : '₹' + shipping;
    document.getElementById('summary-total').textContent    = '₹' + total.toLocaleString('en-IN');
    shippingNote.textContent = subtotal >= 499
      ? '🎉 You qualify for free shipping!'
      : `Add ₹${499 - subtotal} more for free shipping`;
  }

  renderSummary();

  // ----- Step 1 → 2 -----
  document.getElementById('shipping-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!e.target.checkValidity()) { e.target.reportValidity(); return; }

    step1El.hidden = true;
    step2El.hidden = false;
    step2Lbl?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ----- Step 2 ← back -----
  document.getElementById('back-to-shipping')?.addEventListener('click', () => {
    step2El.hidden = true;
    step1El.hidden = false;
    step2Lbl?.classList.remove('active');
  });

  // ----- Step 2 → 3 (Place Order) -----
  document.getElementById('payment-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!e.target.checkValidity()) { e.target.reportValidity(); return; }

    // Generate order ID
    const orderId = 'DWP-' + Date.now().toString(36).toUpperCase();
    const email   = document.getElementById('email')?.value || '';

    step2El.hidden = true;
    step3El.hidden = false;
    step3Lbl?.classList.add('active');

    document.getElementById('order-id-display').textContent = orderId;
    document.getElementById('confirm-email').textContent    = email;

    // Clear cart after order
    Cart.clear();
    renderSummary();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ----- Card number formatting -----
  const ccNumber = document.getElementById('cc-number');
  ccNumber?.addEventListener('input', () => {
    let val = ccNumber.value.replace(/\D/g, '').slice(0, 16);
    ccNumber.value = val.replace(/(.{4})/g, '$1 ').trim();
  });

  // ----- Expiry formatting -----
  const ccExp = document.getElementById('cc-exp');
  ccExp?.addEventListener('input', () => {
    let val = ccExp.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) val = val.slice(0,2) + '/' + val.slice(2);
    ccExp.value = val;
  });

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
});
