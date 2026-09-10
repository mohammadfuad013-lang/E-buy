/* =========================================================
   E-BUY MARKETPLACE
   BUY • SELL • EXCHANGE
   Complete JavaScript
   ========================================================= */


/* =========================
   PRODUCT DATABASE
   ========================= */

const products = [
    {
        id: 1,
        name: "Smartphone Pro",
        category: "Electronics",
        price: 18500,
        location: "Addis Ababa",
        condition: "New",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        description: "Modern smartphone with a high-quality display and powerful performance."
    },
    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 3200,
        location: "Addis Ababa",
        condition: "New",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable wireless headphones with excellent sound quality."
    },
    {
        id: 3,
        name: "Classic Sneakers",
        category: "Fashion",
        price: 2500,
        location: "Adama",
        condition: "New",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description: "Stylish everyday sneakers suitable for casual use."
    },
    {
        id: 4,
        name: "Modern Laptop",
        category: "Electronics",
        price: 42000,
        location: "Addis Ababa",
        condition: "Used - Good",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
        description: "Reliable laptop for study, business and programming."
    },
    {
        id: 5,
        name: "Mountain Bicycle",
        category: "Sports",
        price: 8500,
        location: "Bishoftu",
        condition: "Used - Good",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
        description: "Strong mountain bicycle for outdoor activities."
    },
    {
        id: 6,
        name: "Modern Sofa",
        category: "Home",
        price: 12500,
        location: "Addis Ababa",
        condition: "Used - Good",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable modern sofa for your living room."
    },
    {
        id: 7,
        name: "Men's Jacket",
        category: "Fashion",
        price: 1800,
        location: "Adama",
        condition: "New",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
        description: "Modern jacket suitable for everyday wear."
    },
    {
        id: 8,
        name: "Gaming Console",
        category: "Electronics",
        price: 28000,
        location: "Addis Ababa",
        condition: "Used - Good",
        image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=800&q=80",
        description: "Gaming console for entertainment and gaming."
    },
    {
        id: 9,
        name: "Toyota Car",
        category: "Vehicles",
        price: 950000,
        location: "Addis Ababa",
        condition: "Used - Good",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
        description: "Reliable used vehicle available for local buyers."
    },
    {
        id: 10,
        name: "Office Chair",
        category: "Home",
        price: 4500,
        location: "Addis Ababa",
        condition: "Used - Good",
        image: "https://images.unsplash.com/photo-1505843490701-5be2f0f1f2e1?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable office chair for work and study."
    },
    {
        id: 11,
        name: "Sports Watch",
        category: "Sports",
        price: 2200,
        location: "Hawassa",
        condition: "New",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        description: "Stylish sports watch for active users."
    },
    {
        id: 12,
        name: "Beauty Set",
        category: "Beauty",
        price: 1800,
        location: "Addis Ababa",
        condition: "New",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        description: "Personal beauty care set."
    }
];


/* =========================
   LOCAL STORAGE
   ========================= */

let cart = JSON.parse(localStorage.getItem("ebuyCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("ebuyWishlist")) || [];
let userListings = JSON.parse(localStorage.getItem("ebuyListings")) || [];
let exchangeListings = JSON.parse(localStorage.getItem("ebuyExchanges")) || [];


/* =========================
   DOM ELEMENTS
   ========================= */

const productGrid =
    document.getElementById("productGrid") ||
    document.querySelector(".product-grid");

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount") ||
    document.querySelector(".cart-count");

const wishlistCount =
    document.getElementById("wishlistCount") ||
    document.querySelector(".wishlist-count");

const cartTotal =
    document.getElementById("cartTotal") ||
    document.querySelector(".cart-total-price");

const searchInput =
    document.getElementById("searchInput") ||
    document.querySelector("#search");

const categoryFilter =
    document.getElementById("categoryFilter") ||
    document.querySelector("#category");

const sortSelect =
    document.getElementById("sortSelect") ||
    document.querySelector("#sort");


/* =========================
   SAVE DATA
   ========================= */

function saveData() {
    localStorage.setItem("ebuyCart", JSON.stringify(cart));
    localStorage.setItem("ebuyWishlist", JSON.stringify(wishlist));
    localStorage.setItem("ebuyListings", JSON.stringify(userListings));
    localStorage.setItem("ebuyExchanges", JSON.stringify(exchangeListings));
}


/* =========================
   MONEY FORMAT
   ========================= */

function formatPrice(price) {
    return new Intl.NumberFormat("en-US").format(price) + " ETB";
}


/* =========================
   TOAST
   ========================= */

function showToast(message) {

    let toast = document.getElementById("ebuyToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "ebuyToast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* =========================
   RENDER PRODUCTS
   ========================= */

function renderProducts(list = products) {

    if (!productGrid) return;

    if (list.length === 0) {
        productGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = list.map(product => {

        const isFavorite = wishlist.includes(product.id);

        return `
            <article class="product-card">

                <button
                    class="wishlist-btn ${isFavorite ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})"
                    aria-label="Add to wishlist"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

                <div class="product-image">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >
                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <div class="product-price">
                        ${formatPrice(product.price)}
                    </div>

                    <div class="product-location">
                        📍 ${product.location}
                    </div>

                    <div class="product-actions">

                        <button
                            class="btn btn-secondary btn-small"
                            onclick="openProductModal(${product.id})"
                        >
                            View
                        </button>

                        <button
                            class="btn btn-primary btn-small"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </article>
        `;
    }).join("");
}


/* =========================
   SEARCH & FILTER
   ========================= */

function filterProducts() {

    const searchTerm =
        searchInput ?
        searchInput.value.toLowerCase().trim() :
        "";

    const selectedCategory =
        categoryFilter ?
        categoryFilter.value :
        "all";

    const sortValue =
        sortSelect ?
        sortSelect.value :
        "default";

    let filtered = [...products, ...userListings];

    if (searchTerm) {

        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.location.toLowerCase().includes(searchTerm)
        );
    }

    if (
        selectedCategory &&
        selectedCategory !== "all"
    ) {
        filtered = filtered.filter(
            product => product.category === selectedCategory
        );
    }

    if (sortValue === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "newest") {
        filtered.reverse();
    }

    renderProducts(filtered);
}


if (searchInput) {
    searchInput.addEventListener(
        "input",
        filterProducts
    );
}

if (categoryFilter) {
    categoryFilter.addEventListener(
        "change",
        filterProducts
    );
}

if (sortSelect) {
    sortSelect.addEventListener(
        "change",
        filterProducts
    );
}


/* =========================
   WISHLIST
   ========================= */

function toggleWishlist(productId) {

    const index = wishlist.indexOf(productId);

    if (index === -1) {
        wishlist.push(productId);
        showToast("Added to wishlist ❤️");
    } else {
        wishlist.splice(index, 1);
        showToast("Removed from wishlist");
    }

    saveData();
    updateCounters();
    filterProducts();
}


function updateWishlistCounter() {

    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }

    const counter =
        document.getElementById("wishlistCount");

    if (counter) {
        counter.textContent = wishlist.length;
    }
}


/* =========================
   CART
   ========================= */

function addToCart(productId) {

    const product =
        [...products, ...userListings]
        .find(item => item.id === productId);

    if (!product) return;

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveData();
    updateCart();
    showToast(`${product.name} added to cart 🛒`);
}


function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveData();
    updateCart();
}


function changeQuantity(productId, amount) {

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveData();
    updateCart();
}


function updateCart() {

    if (!cartItemsContainer) return;

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add products to start shopping.</p>
            </div>
        `;

    } else {

        cartItemsContainer.innerHTML = cart.map(item => {

            return `
                <div class="cart-item">

                    <img
                        class="cart-item-image"
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>${formatPrice(item.price)}</p>

                        <div class="cart-quantity">

                            <button
                                class="quantity-btn"
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                class="quantity-btn"
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                        <button
                            class="remove-cart"
                            onclick="removeFromCart(${item.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;
        }).join("");
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const count = cart.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );

    if (cartTotal) {
        cartTotal.textContent = formatPrice(total);
    }

    if (cartCount) {
        cartCount.textContent = count;
    }

    const counter =
        document.getElementById("cartCount");

    if (counter) {
        counter.textContent = count;
    }
}


/* =========================
   OPEN / CLOSE CART
   ========================= */

function openCart() {

    if (cartSidebar) {
        cartSidebar.classList.add("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.add("active");
    }

    document.body.classList.add("no-scroll");
}


function closeCart() {

    if (cartSidebar) {
        cartSidebar.classList.remove("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.remove("active");
    }

    document.body.classList.remove("no-scroll");
}


if (cartOverlay) {
    cartOverlay.addEventListener(
        "click",
        closeCart
    );
}


/* =========================
   PRODUCT MODAL
   ========================= */

function openProductModal(productId) {

    const product =
        [...products, ...userListings]
        .find(item => item.id === productId);

    if (!product) return;

    let modal =
        document.getElementById("productModal");

    if (!modal) {
        createProductModal();
        modal =
            document.getElementById("productModal");
    }

    const content =
        modal.querySelector(".modal-content-area");

    content.innerHTML = `

        <div class="product-modal-content">

            <div class="product-modal-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>

            <div class="product-modal-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h2>${product.name}</h2>

                <div class="price">
                    ${formatPrice(product.price)}
                </div>

                <p>
                    ${product.description}
                </p>

                <p>
                    <strong>Condition:</strong>
                    ${product.condition}
                </p>

                <p>
                    <strong>Location:</strong>
                    📍 ${product.location}
                </p>

                <button
                    class="btn btn-primary btn-full"
                    onclick="addToCart(${product.id}); closeProductModal();"
                >
                    🛒 Add to Cart
                </button>

            </div>

        </div>
    `;

    modal.classList.add("active");
    document.body.classList.add("no-scroll");
}


function createProductModal() {

    const modal =
        document.createElement("div");

    modal.id = "productModal";
    modal.className = "modal-overlay";

    modal.innerHTML = `

        <div class="modal">

            <button
                class="modal-close"
                onclick="closeProductModal()"
            >
                ✕
            </button>

            <div class="modal-content-area"></div>

        </div>
    `;

    document.body.appendChild(modal);
}


function closeProductModal() {

    const modal =
        document.getElementById("productModal");

    if (modal) {
        modal.classList.remove("active");
    }

    document.body.classList.remove("no-scroll");
}


/* =========================
   SELL PRODUCT
   ========================= */

function setupSellForm() {

    const form =
        document.getElementById("sellForm") ||
        document.querySelector("#sell form");

    if (!form) return;

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            form.querySelector(
                '[name="productName"], #productName'
            )?.value.trim();

        const category =
            form.querySelector(
                '[name="category"], #sellCategory'
            )?.value;

        const condition =
            form.querySelector(
                '[name="condition"], #condition'
            )?.value;

        const price =
            form.querySelector(
                '[name="price"], #price'
            )?.value;

        const location =
            form.querySelector(
                '[name="location"], #location'
            )?.value.trim();

        const description =
            form.querySelector(
                '[name="description"], #description'
            )?.value.trim();

        const imageInput =
            form.querySelector(
                '[type="file"]'
            );

        if (!name || !category || !price || !location) {

            showToast(
                "Please complete the required fields."
            );

            return;
        }

        const createListing = imageData => {

            const newListing = {

                id:
                    Date.now(),

                name,

                category,

                condition:
                    condition || "Used",

                price:
                    Number(price),

                location,

                description:
                    description ||
                    "Seller listing on E-Buy.",

                image:
                    imageData ||
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
            };

            userListings.unshift(
                newListing
            );

            saveData();

            form.reset();

            showToast(
                "Your product has been listed successfully! 🎉"
            );

            filterProducts();
        };


        if (
            imageInput &&
            imageInput.files &&
            imageInput.files[0]
        ) {

            const reader =
                new FileReader();

            reader.onload = function(e) {
                createListing(e.target.result);
            };

            reader.readAsDataURL(
                imageInput.files[0]
            );

        } else {

            createListing(null);
        }

    });
}


setupSellForm();


/* =========================
   IMAGE PREVIEW
   ========================= */

function setupImagePreview() {

    const input =
        document.querySelector(
            '#sellForm input[type="file"], #sell input[type="file"]'
        );

    if (!input) return;

    input.addEventListener(
        "change",
        function() {

            const file = this.files[0];

            if (!file) return;

            let preview =
                document.getElementById(
                    "listingImagePreview"
                );

            if (!preview) {

                preview =
                    document.createElement("div");

                preview.id =
                    "listingImagePreview";

                preview.className =
                    "image-preview";

                input.parentNode.appendChild(
                    preview
                );
            }

            const reader =
                new FileReader();

            reader.onload =
                function(event) {

                    preview.innerHTML = `
                        <img
                            src="${event.target.result}"
                            alt="Preview"
                        >
                    `;

                    preview.classList.add(
                        "show"
                    );
                };

            reader.readAsDataURL(file);
        }
    );
}


setupImagePreview();


/* =========================
   EXCHANGE LISTINGS
   ========================= */

const defaultExchangeListings = [

    {
        id: "ex1",
        have: "Laptop",
        want: "Smartphone",
        description:
            "I have a good-condition laptop and would like to exchange it for a smartphone.",
        location: "Addis Ababa"
    },

    {
        id: "ex2",
        have: "Mountain Bike",
        want: "Gaming Console",
        description:
            "Looking to exchange my mountain bike for a gaming console.",
        location: "Adama"
    },

    {
        id: "ex3",
        have: "Smart TV",
        want: "Laptop",
        description:
            "Good-condition Smart TV available for exchange.",
        location: "Bishoftu"
    }
];


function getAllExchanges() {

    return [
        ...exchangeListings,
        ...defaultExchangeListings
    ];
}


function renderExchangeListings() {

    const container =
        document.getElementById(
            "exchangeGrid"
        ) ||
        document.querySelector(
            ".exchange-grid"
        );

    if (!container) return;

    const listings =
        getAllExchanges();

    container.innerHTML =
        listings.map(item => {

            return `
                <div class="exchange-card">

                    <div class="exchange-top">

                        <div class="exchange-icon">
                            🔄
                        </div>

                        <span class="exchange-status">
                            Available
                        </span>

                    </div>

                    <h3>
                        ${item.have}
                    </h3>

                    <p>
                        ${item.description}
                    </p>

                    <div class="exchange-wants">
                        <strong>Wants:</strong>
                        ${item.want}
                    </div>

                    <div class="exchange-location">
                        📍 ${item.location}
                    </div>

                    <button
                        class="btn btn-success btn-full"
                        onclick="openExchangeRequest('${item.id}')"
                    >
                        Request Exchange
                    </button>

                </div>
            `;

        }).join("");
}


renderExchangeListings();


/* =========================
   EXCHANGE REQUEST
   ========================= */

function openExchangeRequest(exchangeId) {

    const item =
        getAllExchanges()
        .find(exchange =>
            String(exchange.id) ===
            String(exchangeId)
        );

    if (!item) return;

    let modal =
        document.getElementById(
            "exchangeRequestModal"
        );

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "exchangeRequestModal";

        modal.className =
            "modal-overlay";

        modal.innerHTML = `

            <div class="modal">

                <button
                    class="modal-close"
                    onclick="closeExchangeRequest()"
                >
                    ✕
                </button>

                <h2>
                    Request Exchange
                </h2>

                <p class="modal-subtitle">
                    Send a request to exchange
                    your item.
                </p>

                <form id="exchangeRequestForm">

                    <div class="form-group">

                        <label>
                            What do you offer?
                        </label>

                        <input
                            type="text"
                            id="offerItem"
                            required
                            placeholder="Example: My smartphone"
                        >

                    </div>

                    <div class="form-group">

                        <label>
                            Your message
                        </label>

                        <textarea
                            id="exchangeMessage"
                            required
                            placeholder="Write your exchange offer..."
                        ></textarea>

                    </div>

                    <button
                        class="btn btn-success btn-full"
                        type="submit"
                    >
                        Send Exchange Request
                    </button>

                </form>

            </div>
        `;

        document.body.appendChild(modal);

        document
            .getElementById(
                "exchangeRequestForm"
            )
            .addEventListener(
                "submit",
                function(event) {

                    event.preventDefault();

                    const offer =
                        document
                        .getElementById(
                            "offerItem"
                        )
                        .value.trim();

                    if (!offer) return;

                    closeExchangeRequest();

                    showToast(
                        "Exchange request sent successfully! 🔄"
                    );
                }
            );
    }

    modal.classList.add("active");

    document.body.classList.add(
        "no-scroll"
    );
}


function closeExchangeRequest() {

    const modal =
        document.getElementById(
            "exchangeRequestModal"
        );

    if (modal) {
        modal.classList.remove(
            "active"
        );
    }

    document.body.classList.remove(
        "no-scroll"
    );
}


/* =========================
   CREATE EXCHANGE
   ========================= */

function openCreateExchange() {

    let modal =
        document.getElementById(
            "createExchangeModal"
        );

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "createExchangeModal";

        modal.className =
            "modal-overlay";

        modal.innerHTML = `

            <div class="modal">

                <button
                    class="modal-close"
                    onclick="closeCreateExchange()"
                >
                    ✕
                </button>

                <h2>
                    Create Exchange Listing
                </h2>

                <p class="modal-subtitle">
                    Tell other users what you
                    have and what you want.
                </p>

                <form id="createExchangeForm">

                    <div class="form-group">

                        <label>
                            What do you have?
                        </label>

                        <input
                            type="text"
                            id="exchangeHave"
                            required
                            placeholder="Example: Laptop"
                        >

                    </div>

                    <div class="form-group">

                        <label>
                            What do you want?
                        </label>

                        <input
                            type="text"
                            id="exchangeWant"
                            required
                            placeholder="Example: Smartphone"
                        >

                    </div>

                    <div class="form-group">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            id="exchangeLocation"
                            required
                            placeholder="Example: Addis Ababa"
                        >

                    </div>

                    <div class="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            id="exchangeDescription"
                            required
                            placeholder="Describe your item..."
                        ></textarea>

                    </div>

                    <button
                        type="submit"
                        class="btn btn-success btn-full"
                    >
                        Publish Exchange
                    </button>

                </form>

            </div>
        `;

        document.body.appendChild(
            modal
        );

        document
            .getElementById(
                "createExchangeForm"
            )
            .addEventListener(
                "submit",
                function(event) {

                    event.preventDefault();

                    const newExchange = {

                        id:
                            Date.now(),

                        have:
                            document
                            .getElementById(
                                "exchangeHave"
                            )
                            .value.trim(),

                        want:
                            document
                            .getElementById(
                                "exchangeWant"
                            )
                            .value.trim(),

                        location:
                            document
                            .getElementById(
                                "exchangeLocation"
                            )
                            .value.trim(),

                        description:
                            document
                            .getElementById(
                                "exchangeDescription"
                            )
                            .value.trim()
                    };

                    exchangeListings.unshift(
                        newExchange
                    );

                    saveData();

                    renderExchangeListings();

                    closeCreateExchange();

                    showToast(
                        "Exchange listing published! 🔄"
                    );
                }
            );
    }

    modal.classList.add(
        "active"
    );

    document.body.classList.add(
        "no-scroll"
    );
}


function closeCreateExchange() {

    const modal =
        document.getElementById(
            "createExchangeModal"
        );

    if (modal) {
        modal.classList.remove(
            "active"
        );
    }

    document.body.classList.remove(
        "no-scroll"
    );
}


/* =========================
   FIND CREATE EXCHANGE BUTTON
   ========================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "#createExchangeBtn, .create-exchange-btn, [data-action='create-exchange']"
            );

        if (button) {
            event.preventDefault();
            openCreateExchange();
        }
    }
);


/* =========================
   CHECKOUT
   ========================= */

function openCheckout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty."
        );

        return;
    }

    let modal =
        document.getElementById(
            "checkoutModal"
        );

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "checkoutModal";

        modal.className =
            "modal-overlay";

        modal.innerHTML = `

            <div class="modal">

                <button
                    class="modal-close"
                    onclick="closeCheckout()"
                >
                    ✕
                </button>

                <h2>
                    Checkout
                </h2>

                <p class="modal-subtitle">
                    Complete your order details.
                </p>

                <form id="checkoutForm">

                    <div class="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="checkoutName"
                            required
                        >

                    </div>

                    <div class="form-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            id="checkoutPhone"
                            required
                            placeholder="+251..."
                        >

                    </div>

                    <div class="form-group">

                        <label>
                            Delivery Location
                        </label>

                        <input
                            type="text"
                            id="checkoutLocation"
                            required
                            placeholder="Your city/location"
                        >

                    </div>

                    <div class="form-group">

                        <label>
                            Payment Method
                        </label>

                        <select
                            id="paymentMethod"
                            required
                        >
                            <option value="">
                                Select payment
                            </option>
                            <option value="cash">
                                Cash on Delivery
                            </option>
                            <option value="bank">
                                Bank Transfer
                            </option>
                            <option value="mobile">
                                Mobile Money
                            </option>
                        </select>

                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary btn-full"
                    >
                        Place Order
                    </button>

                </form>

            </div>
        `;

        document.body.appendChild(
            modal
        );

        document
            .getElementById(
                "checkoutForm"
            )
            .addEventListener(
                "submit",
                function(event) {

                    event.preventDefault();

                    const orderNumber =
                        "EB-" +
                        Date.now()
                        .toString()
                        .slice(-8);

                    cart = [];

                    saveData();

                    updateCart();

                    closeCheckout();

                    closeCart();

                    showToast(
                        `Order ${orderNumber} placed successfully! 🎉`
                    );
                }
            );
    }

    modal.classList.add(
        "active"
    );

    document.body.classList.add(
        "no-scroll"
    );
}


function closeCheckout() {

    const modal =
        document.getElementById(
            "checkoutModal"
        );

    if (modal) {
        modal.classList.remove(
            "active"
        );
    }

    document.body.classList.remove(
        "no-scroll"
    );
}


/* =========================
   CHECKOUT BUTTON
   ========================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "#checkoutBtn, .checkout-btn, [data-action='checkout']"
            );

        if (button) {
            event.preventDefault();
            openCheckout();
        }
    }
);


/* =========================
   NEWSLETTER
   ========================= */

function setupNewsletter() {

    const form =
        document.querySelector(
            ".newsletter-form"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                form.querySelector(
                    "input"
                )?.value.trim();

            if (!email) return;

            showToast(
                "Thanks for subscribing! 📩"
            );

            form.reset();
        }
    );
}


setupNewsletter();


/* =========================
   ACCOUNT BUTTON
   ========================= */
/* =========================
   ACCOUNT SYSTEM
   ========================= */

let currentUser = null;

async function checkLoginStatus() {
    try {
        const response = await fetch("session.php", {
            credentials: "include"
        });

        const data = await response.json();

        if (data.success) {
            currentUser = data.user;
        } else {
            currentUser = null;
        }

        updateAccountButton();

    } catch (error) {
        console.log("Session check failed:", error);
        currentUser = null;
        updateAccountButton();
    }
}


function updateAccountButton() {

    const account = document.getElementById("accountBtn");

    if (!account) return;

    if (currentUser) {

        account.textContent = "👤 " + currentUser.name;

    } else {

        account.textContent = "👤 Account";

    }
}


function openAccountModal() {

    let modal = document.getElementById("accountModal");

    if (!modal) {

        modal = document.createElement("div");

        modal.id = "accountModal";
        modal.className = "modal-overlay";

        modal.innerHTML = `
            <div class="modal">

                <button
                    class="modal-close"
                    onclick="closeAccountModal()"
                >
                    ✕
                </button>

                <div id="accountContent"></div>

            </div>
        `;

        document.body.appendChild(modal);
    }

    renderAccountContent();

    modal.classList.add("active");
    document.body.classList.add("no-scroll");
}


function renderAccountContent() {

    const content =
        document.getElementById("accountContent");

    if (!content) return;


    /* LOGGED IN */

    if (currentUser) {

        content.innerHTML = `

            <h2>Welcome, ${currentUser.name}! 👋</h2>

            <p class="modal-subtitle">
                You are logged in to E-Buy.
            </p>

            <div class="form-group">
                <strong>Email:</strong>
                <p>${currentUser.email}</p>
            </div>

            <div class="form-group">
                <strong>Location:</strong>
                <p>${currentUser.location || "Not provided"}</p>
            </div>

            <div class="form-group">
                <strong>Account type:</strong>
                <p>${currentUser.role}</p>
            </div>

            <button
                class="btn btn-primary btn-full"
                onclick="logoutUser()"
            >
                Logout
            </button>
        `;

        return;
    }


    /* NOT LOGGED IN */

    content.innerHTML = `

        <h2>Welcome to E-Buy 👋</h2>

        <p class="modal-subtitle">
            Login or create an account to continue.
        </p>

        <form id="loginForm">

            <div class="form-group">

                <label>Email</label>

                <input
                    type="email"
                    id="loginEmail"
                    required
                    placeholder="Enter your email"
                >

            </div>


            <div class="form-group">

                <label>Password</label>

                <input
                    type="password"
                    id="loginPassword"
                    required
                    placeholder="Enter your password"
                >

            </div>


            <button
                type="submit"
                class="btn btn-primary btn-full"
            >
                Login
            </button>

        </form>


        <div style="text-align:center; margin-top:20px;">

            <p>
                Don't have an account?
            </p>

            <button
                class="btn btn-secondary btn-full"
                onclick="showRegisterForm()"
            >
                Create Account
            </button>

        </div>
    `;


    document
        .getElementById("loginForm")
        .addEventListener(
            "submit",
            loginUser
        );
}


async function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);


    try {

        const response = await fetch(
            "login.php",
            {
                method: "POST",
                body: formData,
                credentials: "include"
            }
        );


        const data = await response.json();


        if (!data.success) {

            showToast(data.message);

            return;
        }


        currentUser = data.user;

        updateAccountButton();

        showToast("Login successful! 🎉");

        renderAccountContent();


    } catch (error) {

        console.error(error);

        showToast(
            "Unable to connect to the server."
        );
    }
}


function showRegisterForm() {

    const content =
        document.getElementById("accountContent");

    if (!content) return;


    content.innerHTML = `

        <h2>Create E-Buy Account</h2>

        <p class="modal-subtitle">
            Join E-Buy and start buying, selling and exchanging.
        </p>


        <form id="registerForm">

            <div class="form-group">

                <label>Full Name</label>

                <input
                    type="text"
                    id="registerName"
                    required
                    placeholder="Your full name"
                >

            </div>


            <div class="form-group">

                <label>Email</label>

                <input
                    type="email"
                    id="registerEmail"
                    required
                    placeholder="you@example.com"
                >

            </div>


            <div class="form-group">

                <label>Password</label>

                <input
                    type="password"
                    id="registerPassword"
                    required
                    minlength="6"
                    placeholder="At least 6 characters"
                >

            </div>


            <div class="form-group">

                <label>Location</label>

                <input
                    type="text"
                    id="registerLocation"
                    placeholder="Your city"
                >

            </div>


            <button
                type="submit"
                class="btn btn-primary btn-full"
            >
                Create Account
            </button>

        </form>


        <div style="text-align:center; margin-top:20px;">

            <button
                class="btn btn-secondary btn-full"
                onclick="renderAccountContent()"
            >
                ← Back to Login
            </button>

        </div>
    `;


    document
        .getElementById("registerForm")
        .addEventListener(
            "submit",
            registerUser
        );
}


async function registerUser(event) {

    event.preventDefault();


    const formData = new FormData();

    formData.append(
        "name",
        document.getElementById("registerName").value.trim()
    );

    formData.append(
        "email",
        document.getElementById("registerEmail").value.trim()
    );

    formData.append(
        "password",
        document.getElementById("registerPassword").value
    );

    formData.append(
        "location",
        document.getElementById("registerLocation").value.trim()
    );


    try {

        const response = await fetch(
            "register.php",
            {
                method: "POST",
                body: formData,
                credentials: "include"
            }
        );


        const data = await response.json();


        if (!data.success) {

            showToast(data.message);

            return;
        }


        showToast(
            "Account created successfully! 🎉"
        );


        renderAccountContent();


    } catch (error) {

        console.error(error);

        showToast(
            "Unable to connect to the server."
        );
    }
}


async function logoutUser() {

    try {

        await fetch(
            "logout.php",
            {
                credentials: "include"
            }
        );

    } catch (error) {

        console.error(error);
    }


    currentUser = null;

    updateAccountButton();

    closeAccountModal();

    showToast("You have been logged out.");
}


function closeAccountModal() {

    const modal =
        document.getElementById("accountModal");

    if (modal) {

        modal.classList.remove("active");

    }

    document.body.classList.remove("no-scroll");
}


/* Account button */

document.addEventListener(
    "click",
    function(event) {

        const account =
            event.target.closest("#accountBtn");

        if (!account) return;

        event.preventDefault();

        openAccountModal();
    }
);


/* =========================
   WISHLIST BUTTON
   ========================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "#wishlistBtn, .wishlist-header-btn"
            );

        if (!button) return;

        event.preventDefault();

        if (wishlist.length === 0) {

            showToast(
                "Your wishlist is empty ❤️"
            );

            return;
        }

        const favoriteProducts =
            products.filter(
                product =>
                    wishlist.includes(
                        product.id
                    )
            );

        renderProducts(
            favoriteProducts
        );

        document
            .getElementById(
                "products"
            )
            ?.scrollIntoView({
                behavior: "smooth"
            });

        showToast(
            `Showing ${favoriteProducts.length} wishlist item(s).`
        );
    }
);


/* =========================
   CART BUTTON
   ========================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "#cartBtn, .cart-btn, [data-action='cart']"
            );

        if (!button) return;

        event.preventDefault();

        openCart();
    }
);


/* =========================
   CLOSE MODALS ON OVERLAY
   ========================= */

document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "modal-overlay"
            )
        ) {
            event.target.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "no-scroll"
            );
        }
    }
);


/* =========================
   ESCAPE KEY
   ========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") return;

        closeCart();
        closeProductModal();
        closeExchangeRequest();
        closeCreateExchange();
        closeCheckout();
    }
);


/* =========================
   MOBILE NAVIGATION
   ========================= */

function setupMobileNavigation() {

    const nav =
        document.querySelector(
            ".main-nav"
        );

    if (!nav) return;

    let menuButton =
        document.querySelector(
            ".mobile-menu-btn"
        );

    if (!menuButton) {

        menuButton =
            document.createElement(
                "button"
            );

        menuButton.className =
            "icon-btn mobile-menu-btn";

        menuButton.innerHTML =
            "☰";

        const headerActions =
            document.querySelector(
                ".header-actions"
            );

        if (headerActions) {
            headerActions.prepend(
                menuButton
            );
        }
    }

    menuButton.addEventListener(
        "click",
        function() {

            nav.classList.toggle(
                "mobile-open"
            );

            if (
                nav.classList.contains(
                    "mobile-open"
                )
            ) {

                nav.style.display =
                    "flex";

                nav.style.position =
                    "absolute";

                nav.style.top =
                    "66px";

                nav.style.left =
                    "0";

                nav.style.right =
                    "0";

                nav.style.background =
                    "white";

                nav.style.padding =
                    "15px";

                nav.style.flexDirection =
                    "column";

                nav.style.borderBottom =
                    "1px solid #eaecf0";

            } else {

                nav.removeAttribute(
                    "style"
                );
            }
        }
    );
}


setupMobileNavigation();


/* =========================
   COUNTERS
   ========================= */

function updateCounters() {

    updateCart();

    updateWishlistCounter();
}


/* =========================
   INITIALIZE
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderProducts(
            [...products, ...userListings]
        );

        renderExchangeListings();

        updateCounters();

        setupSellForm();

        setupImagePreview();

        setupNewsletter();

    }
);


/* =========================
   GLOBAL FUNCTIONS
   ========================= */

window.addToCart =
    addToCart;

window.removeFromCart =
    removeFromCart;

window.changeQuantity =
    changeQuantity;

window.toggleWishlist =
    toggleWishlist;

window.openCart =
    openCart;

window.closeCart =
    closeCart;

window.openProductModal =
    openProductModal;

window.closeProductModal =
    closeProductModal;

window.openExchangeRequest =
    openExchangeRequest;

window.closeExchangeRequest =
    closeExchangeRequest;

window.openCreateExchange =
    openCreateExchange;

window.closeCreateExchange =
    closeCreateExchange;

window.openCheckout =
    openCheckout;

window.closeCheckout =
    closeCheckout;


/* =========================================================
   END OF E-BUY JAVASCRIPT
   ========================================================= */
