// ============================================================
// DWARAKA PRESS – Main JS (Homepage)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Sticky Header ----------
  const header = document.getElementById('site-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile Hamburger ----------
  const hamburger  = document.querySelector('.hamburger');
  const mobileNav  = document.getElementById('mobile-nav');

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('open', !expanded);
    mobileNav.setAttribute('aria-hidden', String(expanded));
  });

  // ---------- Search Overlay ----------
  const searchToggle  = document.querySelector('.search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput   = document.getElementById('search-input');
  const searchClose   = document.querySelector('.search-close');
  const searchResults = document.getElementById('search-results');

  function openSearch() {
    searchOverlay.setAttribute('aria-hidden', 'false');
    searchOverlay.classList.add('open');
    searchToggle?.setAttribute('aria-expanded', 'true');
    setTimeout(() => searchInput?.focus(), 50);
  }

  function closeSearch() {
    searchOverlay.setAttribute('aria-hidden', 'true');
    searchOverlay.classList.remove('open');
    searchToggle?.setAttribute('aria-expanded', 'false');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (searchOverlay.classList.contains('open')) closeSearch();
    }
  });

  // Search logic
  let searchTimer;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    const q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) { searchResults.innerHTML = ''; return; }
    searchTimer = setTimeout(() => renderSearchResults(q), 250);
  });

  function renderSearchResults(q) {
    const matches = window.BOOKS.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    ).slice(0, 5);

    if (!matches.length) {
      searchResults.innerHTML = '<p style="color:var(--clr-text-muted);text-align:center;margin-top:1rem;">No books found</p>';
      return;
    }

    searchResults.innerHTML = matches.map(b => `
      <div class="search-result-item" role="button" tabindex="0" data-id="${b.id}">
        <div class="sri-cover">${b.emoji}</div>
        <div class="sri-info">
          <h4>${escHtml(b.title)}</h4>
          <p>${escHtml(b.author)} · ₹${b.price}</p>
        </div>
      </div>
    `).join('');

    searchResults.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = parseInt(el.dataset.id);
        Cart.addItem(id);
        closeSearch();
      });
    });
  }

  // ---------- Featured Books Grid ----------
  const featuredGrid = document.getElementById('featured-books');
  if (featuredGrid) {
    // Show 8 books (mix of categories)
    const featured = window.BOOKS.slice(0, 8);
    featuredGrid.innerHTML = featured.map(b => buildBookCard(b)).join('');
    attachAddToCartListeners(featuredGrid);
  }

  // ---------- Book Card Builder ----------
  function buildBookCard(book) {
    const originalPriceHtml = book.originalPrice
      ? `<span class="price-original">₹${book.originalPrice}</span>`
      : '';
    const badgeHtml = book.badge
      ? `<span class="book-badge badge-${book.category}">${escHtml(book.badge)}</span>`
      : '';

    return `
      <article class="book-card" role="listitem">
        <div class="book-cover">
          ${badgeHtml}
          <span aria-hidden="true">${book.emoji}</span>
        </div>
        <div class="book-info">
          <h3>${escHtml(book.title)}</h3>
          <p class="book-author">${escHtml(book.author)}</p>
          <p class="book-price">₹${book.price} ${originalPriceHtml}</p>
        </div>
        <button class="btn-add-cart" data-id="${book.id}" aria-label="Add ${escHtml(book.title)} to cart">
          Add to Cart
        </button>
      </article>
    `;
  }

  function attachAddToCartListeners(container) {
    container.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        Cart.addItem(id);
        btn.classList.add('adding');
        btn.textContent = '✓ Added';
        setTimeout(() => {
          btn.classList.remove('adding');
          btn.textContent = 'Add to Cart';
        }, 1500);
      });
    });
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Expose buildBookCard for other pages
  window.buildBookCard = buildBookCard;
  window.attachAddToCartListeners = attachAddToCartListeners;

});
