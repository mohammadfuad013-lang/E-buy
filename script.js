/* =====================================================
   E-BUY E-COMMERCE JAVASCRIPT
   ===================================================== */


/* =====================================================
   PRODUCT DATABASE
   ===================================================== */

const products = [

  {
    id: 1,
    name: "Smartphone Pro",
    category: "Electronics",
    price: 499,
    oldPrice: 599,
    discount: "17% OFF",
    icon: "📱",
    rating: 4.9,
    description:
      "A modern smartphone with a beautiful display, powerful performance and long-lasting battery."
  },

  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 79,
    oldPrice: 99,
    discount: "20% OFF",
    icon: "🎧",
    rating: 4.8,
    description:
      "Enjoy clear sound and comfortable listening with modern wireless headphones."
  },

  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 89,
    oldPrice: 119,
    discount: "25% OFF",
    icon: "⌚",
    rating: 4.7,
    description:
      "Track your daily activities and stay connected with a stylish smart watch."
  },

  {
    id: 4,
    name: "Laptop Pro",
    category: "Electronics",
    price: 799,
    oldPrice: 899,
    discount: "11% OFF",
    icon: "💻",
    rating: 4.9,
    description:
      "A powerful laptop suitable for study, business, development and everyday work."
  },

  {
    id: 5,
    name: "Classic T-Shirt",
    category: "Fashion",
    price: 25,
    oldPrice: 35,
    discount: "29% OFF",
    icon: "👕",
    rating: 4.6,
    description:
      "Comfortable everyday T-shirt with a simple and modern design."
  },

  {
    id: 6,
    name: "Premium Sneakers",
    category: "Fashion",
    price: 65,
    oldPrice: 85,
    discount: "24% OFF",
    icon: "👟",
    rating: 4.8,
    description:
      "Stylish and comfortable sneakers designed for everyday use."
  },

  {
    id: 7,
    name: "Modern Backpack",
    category: "Fashion",
    price: 39,
    oldPrice: 49,
    discount: "20% OFF",
    icon: "🎒",
    rating: 4.5,
    description:
      "A practical backpack for school, work, travel and everyday activities."
  },

  {
    id: 8,
    name: "Home Lamp",
    category: "Home",
    price: 32,
    oldPrice: 45,
    discount: "29% OFF",
    icon: "💡",
    rating: 4.6,
    description:
      "A modern lamp that adds a comfortable atmosphere to your home."
  },

  {
    id: 9,
    name: "Coffee Maker",
    category: "Home",
    price: 69,
    oldPrice: 89,
    discount: "22% OFF",
    icon: "☕",
    rating: 4.7,
    description:
      "Make delicious coffee quickly and easily at home."
  },

  {
    id: 10,
    name: "Sports Ball",
    category: "Sports",
    price: 29,
    oldPrice: 39,
    discount: "26% OFF",
    icon: "⚽",
    rating: 4.5,
    description:
      "A durable sports ball suitable for training and recreational play."
  },

  {
    id: 11,
    name: "Beauty Kit",
    category: "Beauty",
    price: 45,
    oldPrice: 60,
    discount: "25% OFF",
    icon: "✨",
    rating: 4.7,
    description:
      "A collection of everyday beauty and personal care essentials."
  },

  {
    id: 12,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 28,
    oldPrice: 40,
    discount: "30% OFF",
    icon: "🕶️",
    rating: 4.6,
    description:
      "Classic sunglasses with a stylish design for everyday use."
  }

];


/* =====================================================
   APPLICATION STATE
   ===================================================== */

let cart = JSON.parse(localStorage.getItem("ebuyCart")) || [];

let wishlist =
  JSON.parse(localStorage.getItem("ebuyWishlist")) || [];

let currentFilter = "All";

let currentProduct = null;


/* =====================================================
   DOM ELEMENTS
   ===================================================== */

const productsGrid =
  document.getElementById("productsGrid");

const noProducts =
  document.getElementById("noProducts");

const cartSidebar =
  document.getElementById("cartSidebar");

const cartItems =
  document.getElementById("cartItems");

const emptyCart =
  document.getElementById("emptyCart");

const overlay =
  document.getElementById("overlay");

const cartCount =
  document.getElementById("cartCount");

const wishlistCount =
  document.getElementById("wishlistCount");

const cartTotal =
  document.getElementById("cartTotal");

const searchInput =
  document.getElementById("searchInput");

const notification =
  document.getElementById("notification");

const notificationText =
  document.getElementById("notificationText");


/* =====================================================
   SAVE DATA
   ===================================================== */

function saveData() {

  localStorage.setItem(
    "ebuyCart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "ebuyWishlist",
    JSON.stringify(wishlist)
  );

}


/* =====================================================
   FORMAT MONEY
   ===================================================== */

function formatMoney(amount) {

  return "$" + amount.toFixed(2);

}


/* =====================================================
   DISPLAY PRODUCTS
   ===================================================== */

function displayProducts(list = products) {

  productsGrid.innerHTML = "";

  if (list.length === 0) {

    noProducts.style.display = "block";

    return;

  }

  noProducts.style.display = "none";


  list.forEach(product => {

    const isFavorite =
      wishlist.includes(product.id);

    const card =
      document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

      <div class="product-image">

        <span>${product.icon}</span>

        <span class="discount">
          ${product.discount}
        </span>

        <button
          class="wishlist ${isFavorite ? "active" : ""}"
          onclick="toggleWishlist(${product.id})"
          aria-label="Add to wishlist"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>

      </div>


      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <div class="rating">
          ⭐⭐⭐⭐⭐
          <span>${product.rating}</span>
        </div>

        <div class="price-row">

          <div>

            <span class="price">
              ${formatMoney(product.price)}
            </span>

            <span class="old-price">
              ${formatMoney(product.oldPrice)}
            </span>

          </div>

          <button
            class="add-btn"
            onclick="addToCart(${product.id})"
            aria-label="Add to cart"
          >
            +
          </button>

        </div>

      </div>

    `;


    card.addEventListener(
      "click",
      function(event) {

        if (
          event.target.closest(".wishlist") ||
          event.target.closest(".add-btn")
        ) {
          return;
        }

        openProductModal(product.id);

      }
    );


    productsGrid.appendChild(card);

  });

}


/* =====================================================
   FILTER PRODUCTS
   ===================================================== */

function filterProducts(category) {

  currentFilter = category;

  const searchTerm =
    searchInput.value.toLowerCase().trim();


  let filtered = products;


  if (category !== "All") {

    filtered =
      filtered.filter(
        product =>
          product.category === category
      );

  }


  if (searchTerm) {

    filtered =
      filtered.filter(product =>

        product.name
          .toLowerCase()
          .includes(searchTerm)

        ||

        product.category
          .toLowerCase()
          .includes(searchTerm)

      );

  }


  displayProducts(filtered);


  document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );

    });

}


/* =====================================================
   SEARCH
   ===================================================== */

searchInput.addEventListener(
  "input",
  function() {

    filterProducts(currentFilter);

  }
);


document
  .getElementById("searchBtn")
  .addEventListener(
    "click",
    function() {

      filterProducts(currentFilter);

      document
        .getElementById("products")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


/* =====================================================
   FILTER BUTTONS
   ===================================================== */

document
  .querySelectorAll(".filter-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      function() {

        filterProducts(
          this.dataset.filter
        );

      }
    );

  });


/* =====================================================
   CATEGORY BUTTONS
   ===================================================== */

document
  .querySelectorAll(".category-card")
  .forEach(button => {

    button.addEventListener(
      "click",
      function() {

        const category =
          this.dataset.category;

        filterProducts(category);

        document
          .getElementById("products")
          .scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  });


/* =====================================================
   ADD TO CART
   ===================================================== */

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );

  if (!product) return;


  const existing =
    cart.find(
      item => item.id === productId
    );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id: productId,
      quantity: 1
    });

  }


  saveData();

  updateCart();

  showNotification(
    `${product.name} added to your cart`
  );

}


/* =====================================================
   UPDATE CART
   ===================================================== */

function updateCart() {

  cartItems.innerHTML = "";


  let total = 0;

  let itemCount = 0;


  if (cart.length === 0) {

    emptyCart.style.display = "grid";

  } else {

    emptyCart.style.display = "none";

  }


  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.id
      );

    if (!product) return;


    const itemTotal =
      product.price * item.quantity;

    total += itemTotal;

    itemCount += item.quantity;


    const div =
      document.createElement("div");

    div.className = "cart-item";


    div.innerHTML = `

      <div class="cart-item-image">
        ${product.icon}
      </div>

      <div>

        <h4>${product.name}</h4>

        <div class="cart-item-price">
          ${formatMoney(product.price)}
        </div>

        <div class="quantity">

          <button
            onclick="changeQuantity(${product.id}, -1)"
          >
            −
          </button>

          <span>${item.quantity}</span>

          <button
            onclick="changeQuantity(${product.id}, 1)"
          >
            +
          </button>

        </div>

      </div>

      <button
        class="remove-item"
        onclick="removeFromCart(${product.id})"
      >
        Remove
      </button>

    `;


    cartItems.appendChild(div);

  });


  cartCount.textContent = itemCount;

  cartTotal.textContent =
    formatMoney(total);

}


/* =====================================================
   CHANGE QUANTITY
   ===================================================== */

function changeQuantity(
  productId,
  amount
) {

  const item =
    cart.find(
      product => product.id === productId
    );

  if (!item) return;


  item.quantity += amount;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== productId
      );

  }


  saveData();

  updateCart();

}


/* =====================================================
   REMOVE FROM CART
   ===================================================== */

function removeFromCart(productId) {

  cart =
    cart.filter(
      item => item.id !== productId
    );

  saveData();

  updateCart();

  showNotification("Product removed from cart");

}


/* =====================================================
   OPEN CART
   ===================================================== */

function openCart() {

  cartSidebar.classList.add("active");

  overlay.classList.add("active");

  document.body.style.overflow = "hidden";

}


/* =====================================================
   CLOSE CART
   ===================================================== */

function closeCart() {

  cartSidebar.classList.remove("active");

  overlay.classList.remove("active");

  document.body.style.overflow = "";

}


document
  .getElementById("cartBtn")
  .addEventListener(
    "click",
    openCart
  );


document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


overlay.addEventListener(
  "click",
  closeCart
);


/* =====================================================
   WISHLIST
   ===================================================== */

function toggleWishlist(productId) {

  const product =
    products.find(
      p => p.id === productId
    );

  if (!product) return;


  if (wishlist.includes(productId)) {

    wishlist =
      wishlist.filter(
        id => id !== productId
      );

    showNotification(
      "Removed from wishlist"
    );

  } else {

    wishlist.push(productId);

    showNotification(
      "Added to wishlist"
    );

  }


  saveData();

  updateWishlistCount();

  filterProducts(currentFilter);

}


function updateWishlistCount() {

  wishlistCount.textContent =
    wishlist.length;

}


document
  .getElementById("wishlistBtn")
  .addEventListener(
    "click",
    function() {

      if (wishlist.length === 0) {

        showNotification(
          "Your wishlist is empty"
        );

        return;

      }


      const favoriteProducts =
        products.filter(
          product =>
            wishlist.includes(product.id)
        );


      productsGrid.innerHTML = "";

      noProducts.style.display = "none";

      displayProducts(
        favoriteProducts
      );


      document
        .getElementById("products")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


/* =====================================================
   PRODUCT MODAL
   ===================================================== */

const productModal =
  document.getElementById("productModal");

const modalImage =
  document.getElementById("modalImage");

const modalName =
  document.getElementById("modalName");

const modalCategory =
  document.getElementById("modalCategory");

const modalDescription =
  document.getElementById("modalDescription");

const modalPrice =
  document.getElementById("modalPrice");


function openProductModal(productId) {

  const product =
    products.find(
      p => p.id === productId
    );

  if (!product) return;


  currentProduct = product;


  modalImage.textContent =
    product.icon;

  modalName.textContent =
    product.name;

  modalCategory.textContent =
    product.category;

  modalDescription.textContent =
    product.description;

  modalPrice.textContent =
    formatMoney(product.price);


  productModal.classList.add("active");

  document.body.style.overflow = "hidden";

}


document
  .getElementById("closeModal")
  .addEventListener(
    "click",
    function() {

      productModal.classList.remove("active");

      document.body.style.overflow = "";

    }
  );


productModal.addEventListener(
  "click",
  function(event) {

    if (event.target === productModal) {

      productModal.classList.remove("active");

      document.body.style.overflow = "";

    }

  }
);


document
  .getElementById("modalAdd")
  .addEventListener(
    "click",
    function() {

      if (!currentProduct) return;

      addToCart(
        currentProduct.id
      );

      productModal.classList.remove("active");

      document.body.style.overflow = "";

      openCart();

    }
  );


/* =====================================================
   CHECKOUT
   ===================================================== */

const checkoutModal =
  document.getElementById("checkoutModal");


document
  .getElementById("checkoutBtn")
  .addEventListener(
    "click",
    function() {

      if (cart.length === 0) {

        showNotification(
          "Your cart is empty"
        );

        return;

      }


      closeCart();

      checkoutModal.classList.add("active");

      document.body.style.overflow = "hidden";

    }
  );


document
  .getElementById("closeCheckout")
  .addEventListener(
    "click",
    function() {

      checkoutModal.classList.remove("active");

      document.body.style.overflow = "";

    }
  );


/* =====================================================
   PLACE ORDER
   ===================================================== */

document
  .getElementById("checkoutForm")
  .addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const name =
        document.getElementById(
          "customerName"
        ).value.trim();


      const phone =
        document.getElementById(
          "customerPhone"
        ).value.trim();


      const address =
        document.getElementById(
          "customerAddress"
        ).value.trim();


      const payment =
        document.getElementById(
          "paymentMethod"
        ).value;


      if (
        !name ||
        !phone ||
        !address ||
        !payment
      ) {

        showNotification(
          "Please complete all fields"
        );

        return;

      }


      const orderNumber =
        "EB-" +
        Date.now()
          .toString()
          .slice(-6);


      alert(
        `Thank you, ${name}!\n\nYour order ${orderNumber} has been received.\n\nWe will contact you at ${phone} to confirm delivery.`
      );


      cart = [];

      saveData();

      updateCart();


      checkoutModal.classList.remove("active");

      document.body.style.overflow = "";

      this.reset();

    }
  );


/* =====================================================
   NEWSLETTER
   ===================================================== */

document
  .getElementById("newsletterForm")
  .addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const email =
        document.getElementById(
          "emailInput"
        ).value.trim();


      if (!email) return;


      showNotification(
        "Thank you for subscribing!"
      );


      this.reset();

    }
  );


/* =====================================================
   NOTIFICATION
   ===================================================== */

let notificationTimer;


function showNotification(message) {

  notificationText.textContent =
    message;

  notification.classList.add("active");


  clearTimeout(
    notificationTimer
  );


  notificationTimer =
    setTimeout(
      function() {

        notification.classList.remove(
          "active"
        );

      },
      2500
    );

}


/* =====================================================
   MOBILE MENU
   ===================================================== */

document
  .getElementById("mobileMenuBtn")
  .addEventListener(
    "click",
    function() {

      document
        .getElementById("navLinks")
        .classList.toggle("active");

    }
  );


document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener(
      "click",
      function() {

        document
          .getElementById("navLinks")
          .classList.remove("active");

      }
    );

  });


/* =====================================================
   ACCOUNT
   ===================================================== */

document
  .getElementById("accountBtn")
  .addEventListener(
    "click",
    function() {

      showNotification(
        "Customer accounts will be connected to the backend."
      );

    }
  );


/* =====================================================
   YEAR
   ===================================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =====================================================
   INITIALIZE WEBSITE
   ===================================================== */

displayProducts();

updateCart();

updateWishlistCount();
