// ============================================================
// DWARAKA PRESS – Books Page JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const booksGrid    = document.getElementById('books-grid');
  const countEl      = document.querySelector('.results-count');
  const noResults    = document.getElementById('no-results');
  const priceSlider  = document.getElementById('price-max');
  const priceLabel   = document.getElementById('price-max-label');

  // Mobile filter toggle
  const filterToggle  = document.querySelector('.mobile-filter-toggle');
  const filtersSidebar = document.querySelector('.filters-sidebar');
  filterToggle?.addEventListener('click', () => {
    const open = filtersSidebar.classList.toggle('open');
    filterToggle.setAttribute('aria-expanded', String(open));
  });

  // Read URL param for initial category
  const params   = new URLSearchParams(window.location.search);
  const initCat  = params.get('cat') || 'all';
  const initSort = params.get('sort') || 'default';

  // Pre-select radio buttons from URL
  const catRadio = document.querySelector(`input[name="cat"][value="${initCat}"]`);
  if (catRadio) catRadio.checked = true;
  const sortRadio = document.querySelector(`input[name="sort"][value="${initSort}"]`);
  if (sortRadio) sortRadio.checked = true;

  // State
  let activeFilter = { cat: initCat, sort: initSort, maxPrice: 900 };

  // Price slider
  priceSlider?.addEventListener('input', () => {
    activeFilter.maxPrice = parseInt(priceSlider.value);
    priceLabel.textContent = `Up to ₹${priceSlider.value}`;
    renderBooks();
  });

  // Category & Sort radios
  document.querySelectorAll('input[name="cat"]').forEach(r => {
    r.addEventListener('change', () => {
      activeFilter.cat = r.value;
      renderBooks();
    });
  });
  document.querySelectorAll('input[name="sort"]').forEach(r => {
    r.addEventListener('change', () => {
      activeFilter.sort = r.value;
      renderBooks();
    });
  });

  // Reset
  function resetFilters() {
    activeFilter = { cat: 'all', sort: 'default', maxPrice: 900 };
    document.querySelector('input[name="cat"][value="all"]').checked = true;
    document.querySelector('input[name="sort"][value="default"]').checked = true;
    priceSlider.value = 900;
    priceLabel.textContent = 'Up to ₹900';
    renderBooks();
  }

  document.getElementById('reset-filters')?.addEventListener('click', resetFilters);
  document.getElementById('reset-filters-2')?.addEventListener('click', resetFilters);

  // Render
  function renderBooks() {
    let books = [...window.BOOKS];

    // Filter
    if (activeFilter.cat !== 'all') {
      books = books.filter(b => b.category === activeFilter.cat);
    }
    books = books.filter(b => b.price <= activeFilter.maxPrice);

    // Sort
    if (activeFilter.sort === 'price-asc')  books.sort((a, b) => a.price - b.price);
    if (activeFilter.sort === 'price-desc') books.sort((a, b) => b.price - a.price);
    if (activeFilter.sort === 'new')        books.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));

    // Update count
    countEl.textContent = `${books.length} book${books.length !== 1 ? 's' : ''} found`;

    if (!books.length) {
      booksGrid.innerHTML = '';
      noResults.hidden = false;
      return;
    }
    noResults.hidden = true;

    booksGrid.innerHTML = books.map(b => buildBookCard(b)).join('');
    attachAddToCartListeners(booksGrid);
  }

  // Shared helper from main.js (already defined)
  function buildBookCard(book) {
    const originalPriceHtml = book.originalPrice
      ? `<span class="price-original">₹${book.originalPrice}</span>` : '';
    const badgeHtml = book.badge
      ? `<span class="book-badge badge-${book.category}">${escHtml(book.badge)}</span>` : '';
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
          ${book.pages ? `<p style="font-size:0.75rem;color:var(--clr-text-muted)">${book.pages} pages${book.ageGroup ? ' · ' + book.ageGroup : ''}</p>` : ''}
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

  // Initial render
  renderBooks();
});
