/**
 * WEWAL STORE - Modern Handcrafted Cane E-Commerce Engine
 */

// Master Products Catalog
const products = [
  {
    id: 1,
    name: "Radella Scallop Lounge Chair",
    category: "seating",
    categoryName: "Living & Chairs",
    price: 185.00,
    oldPrice: 220.00,
    rating: 5,
    reviews: 32,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    description: "Steam-bent wild cane frame paired with ergonomic double-woven honey rattan backrest. Designed for relaxed tropical lounging."
  },
  {
    id: 2,
    name: "Kandy Sunburst Armchair",
    category: "seating",
    categoryName: "Living & Chairs",
    price: 260.00,
    oldPrice: 310.00,
    rating: 5,
    reviews: 48,
    badge: "Signature",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
    description: "Inspired by tropical modernism. Features intricate octagonal radio mesh weave and contoured solid wewal armrests."
  },
  {
    id: 3,
    name: "Sigiriya Lantern Pendant",
    category: "lighting",
    categoryName: "Pendant Lights",
    price: 95.00,
    oldPrice: null,
    rating: 4.9,
    reviews: 19,
    badge: "Eco-Weave",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    description: "Architectural flared cane dome casting gentle geometric shadow plays across dining rooms and open verandas."
  },
  {
    id: 4,
    name: "Dambulla Harvest Storage Baskets (Set of 2)",
    category: "storage",
    categoryName: "Baskets & Storage",
    price: 68.00,
    oldPrice: 85.00,
    rating: 4.8,
    reviews: 41,
    badge: "Handmade",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
    description: "Sturdy woven wild cane storage with hand-stitched vegan saddle leather carry handles. Ideal for throws and magazines."
  },
  {
    id: 5,
    name: "Ella Sculptural Accent Stool",
    category: "seating",
    categoryName: "Living & Chairs",
    price: 110.00,
    oldPrice: 135.00,
    rating: 4.9,
    reviews: 14,
    badge: "New Arrival",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    description: "Versatile drum stool shaped with tight vertical cane ribs. Functions as an organic side table or extra living room perch."
  },
  {
    id: 6,
    name: "Bentota Woven Breakfast Tray",
    category: "decor",
    categoryName: "Dining & Decor",
    price: 45.00,
    oldPrice: 55.00,
    rating: 5,
    reviews: 28,
    badge: "Popular Gift",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    description: "Morning tray with raised cane rails and reinforced plywood core lined with natural woven rattan cane matting."
  },
  {
    id: 7,
    name: "Mirissa Bell Pendant Lamp",
    category: "lighting",
    categoryName: "Pendant Lights",
    price: 115.00,
    oldPrice: 140.00,
    rating: 4.8,
    reviews: 22,
    badge: "Artisan Drop",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
    description: "Organic tiered bell silhouette, expertly braided with split cane peel. Creates a warm, atmospheric amber glow."
  },
  {
    id: 8,
    name: "Mahiyangana Tall Laundry Hamper",
    category: "storage",
    categoryName: "Baskets & Storage",
    price: 89.00,
    oldPrice: null,
    rating: 4.9,
    reviews: 37,
    badge: "Breathable",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
    description: "Tall ventilated laundry hamper complete with fitted cane lid and removable organic unbleached cotton liner."
  }
];

// App State
let cart = JSON.parse(localStorage.getItem('wewal_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wewal_wishlist')) || [];
let currentCategory = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const categoryTabs = document.querySelectorAll('.filter-tab');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSubtotal = document.getElementById('cartSubtotal');
const drawerCountText = document.getElementById('drawerCountText');
const meterText = document.getElementById('meterText');
const meterProgress = document.getElementById('meterProgress');
const toastContainer = document.getElementById('toastContainer');
const quickViewOverlay = document.getElementById('quickViewOverlay');
const modalBody = document.getElementById('modalBody');
const searchModalOverlay = document.getElementById('searchModalOverlay');
const searchBtn = document.getElementById('searchBtn');
const searchResultsList = document.getElementById('searchResultsList');
const mobileNavDrawer = document.getElementById('mobileNavDrawer');
const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobCartCount = document.getElementById('mobCartCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
});

// Event Listeners Setup
function setupEventListeners() {
  // Category tabs filter
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderProducts();
    });
  });

  // Cart Drawer open/close
  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Mobile Drawer open/close
  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileNav);
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileNav);

  // Search Modal open/close
  if (searchBtn) searchBtn.addEventListener('click', openSearch);

  if (searchModalOverlay) {
    searchModalOverlay.addEventListener('click', (e) => {
      if (e.target === searchModalOverlay) closeSearch();
    });
  }

  // Quick view overlay click outside to close
  if (quickViewOverlay) {
    quickViewOverlay.addEventListener('click', (e) => {
      if (e.target === quickViewOverlay) closeQuickView();
    });
  }

  // Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeQuickView();
      closeSearch();
      closeMobileNav();
    }
  });
}

function openMobileNav() {
  if (mobileNavDrawer && mobileDrawerOverlay) {
    mobileNavDrawer.classList.add('active');
    mobileDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  if (mobileNavDrawer && mobileDrawerOverlay) {
    mobileNavDrawer.classList.remove('active');
    mobileDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openSearch() {
  if (searchModalOverlay) {
    searchModalOverlay.classList.add('active');
    const input = document.getElementById('liveSearchInput');
    if (input) {
      input.value = '';
      input.focus();
      handleLiveSearch('');
    }
  }
}

// Render Products Grid
function renderProducts() {
  if (!productsGrid) return;

  const filtered = currentCategory === 'all'
    ? products
    : products.filter(p => p.category === currentCategory);

  productsGrid.innerHTML = filtered.map(product => {
    const isWished = wishlist.includes(product.id);
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          <button class="product-fav-btn ${isWished ? 'active' : ''}" onclick="toggleWishlist(${product.id})" aria-label="Add to wishlist">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <div class="product-hover-actions">
            <button class="btn btn-primary btn-small btn-full" onclick="addToCart(${product.id})">
              <span>+ Quick Add</span>
            </button>
            <button class="btn btn-secondary btn-small" onclick="openQuickView(${product.id})" aria-label="Quick View">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${product.categoryName}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <span>★★★★★</span>
            <span class="product-rating-count">(${product.reviews})</span>
          </div>
          <div class="product-footer-row">
            <div class="product-price-box">
              <span class="product-price">$${product.price.toFixed(2)}</span>
              ${product.oldPrice ? `<span class="product-old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="btn btn-secondary btn-small" onclick="addToCart(${product.id})">
              Add
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Cart Functionality
function addToCart(productId, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to your shopping bag!`);
  openCart();
}

function updateCartQuantity(productId, delta) {
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast("Item removed from bag.");
}

function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  updateCartUI();
  showToast("Shopping bag cleared.");
}

function saveCart() {
  localStorage.setItem('wewal_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update counters
  if (cartCount) cartCount.textContent = totalCount;
  if (mobCartCount) mobCartCount.textContent = totalCount;
  if (drawerCountText) drawerCountText.textContent = `(${totalCount} item${totalCount === 1 ? '' : 's'})`;
  if (cartSubtotal) cartSubtotal.textContent = `$${totalSubtotal.toFixed(2)}`;

  // Free shipping threshold ($120)
  const freeThreshold = 120.00;
  if (meterText && meterProgress) {
    if (totalSubtotal >= freeThreshold) {
      meterText.textContent = "🎉 Congratulations! You qualify for Free Delivery!";
      meterProgress.style.width = "100%";
      meterProgress.style.backgroundColor = "#2E7D32";
    } else {
      const remaining = (freeThreshold - totalSubtotal).toFixed(2);
      const percent = Math.min((totalSubtotal / freeThreshold) * 100, 100);
      meterText.textContent = `Add $${remaining} more for Free Islandwide Delivery!`;
      meterProgress.style.width = `${percent}%`;
      meterProgress.style.backgroundColor = "var(--cane-gold)";
    }
  }

  // Render items in drawer
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
        </svg>
        <p>Your shopping bag is currently empty.</p>
        <button class="btn btn-secondary btn-small" onclick="closeCart()">Browse Handwoven Pieces</button>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div class="cart-item-qty-row">
            <div class="qty-counter">
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function openCart() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Checkout simulation
function handleCheckout() {
  if (cart.length === 0) {
    showToast("Please add items to your cart first!");
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  alert(`✨ Thank you for choosing Wewal Store!\n\nOrder total: $${total}\nYour handwoven heirloom pieces are ready for packaging.\nOur master artisan will hand-inspect each cane weave before dispatch.`);
  clearCart();
  closeCart();
}

// Wishlist Functionality
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(productId);
    showToast("Saved to your wishlist ❤️");
  }
  localStorage.setItem('wewal_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
  }
}

// Quick View Modal
function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !modalBody || !quickViewOverlay) return;

  modalBody.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="modal-img">
    <div class="modal-details">
      <span class="sub-heading">${product.categoryName}</span>
      <h2 style="font-family:'Playfair Display', serif; font-size:1.8rem; margin:8px 0 12px; color:var(--text-main);">${product.name}</h2>
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px;">
        <span style="color:#E29526;">★★★★★</span>
        <span style="font-size:0.85rem; color:var(--text-light);">(${product.reviews} customer reviews)</span>
      </div>
      <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6; margin-bottom:20px;">${product.description}</p>
      
      <div style="background:var(--bg-secondary); padding:16px; border-radius:10px; margin-bottom:24px; font-size:0.85rem; border:1px solid var(--border-light);">
        <div>🌿 <strong>Natural Wild Wewal:</strong> Sourced sustainably from Sabaragamuwa</div>
        <div style="margin-top:6px;">🔨 <strong>Crafting:</strong> Steam-molded frame, handcrafted finish</div>
        <div style="margin-top:6px;">📦 <strong>In Stock:</strong> Ready for immediate dispatch</div>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
        <div>
          <span style="font-size:1.8rem; font-weight:700; color:var(--text-main);">$${product.price.toFixed(2)}</span>
          ${product.oldPrice ? `<span style="font-size:1.1rem; color:var(--text-light); text-decoration:line-through; margin-left:8px;">$${product.oldPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>

      <div style="display:flex; gap:12px;">
        <button class="btn btn-primary btn-full" onclick="addToCart(${product.id}); closeQuickView();">
          Add to Shopping Bag
        </button>
      </div>
    </div>
  `;

  quickViewOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  if (quickViewOverlay) {
    quickViewOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Live Search
function handleLiveSearch(query) {
  if (!searchResultsList) return;
  const q = query.trim().toLowerCase();

  if (!q) {
    searchResultsList.innerHTML = `<p class="search-hint">Type above to browse our catalog of genuine Sri Lankan cane furniture and decor.</p>`;
    return;
  }

  const results = products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.categoryName.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    searchResultsList.innerHTML = `<p class="search-hint">No cane crafts matching "${query}". Try searching "chair", "light", or "basket".</p>`;
    return;
  }

  searchResultsList.innerHTML = results.map(item => `
    <div class="search-item" onclick="openQuickView(${item.id}); closeSearch();">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <strong style="display:block; font-size:0.95rem; color:var(--text-main);">${item.name}</strong>
        <span style="font-size:0.8rem; color:var(--cane-gold-hover); font-weight:600;">$${item.price.toFixed(2)} • ${item.categoryName}</span>
      </div>
    </div>
  `).join('');
}

function closeSearch() {
  if (searchModalOverlay) {
    searchModalOverlay.classList.remove('active');
  }
}

// Newsletter
function handleNewsletter(event) {
  event.preventDefault();
  const input = document.getElementById('newsletterEmail');
  if (input && input.value) {
    showToast(`Welcome to Wewal Club! 10% code: WEWAL10 sent to ${input.value}`);
    input.value = '';
  }
}

// Toast System
function showToast(message) {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">✨</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
