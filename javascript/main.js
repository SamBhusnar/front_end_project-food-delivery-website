var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});
const cartIcon = document.querySelector(".cart-icon");

const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");
const hamburger = document.querySelector(".samadhan");
const mobileMenu = document.querySelector(".mobile-menu");
const bars = document.querySelector(".fa-bars");

cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.add("cart-tab-active");
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.remove("cart-tab-active");
});
hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  mobileMenu.classList.toggle("mobile-menu-active");
});
hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  bars.classList.toggle("fa-xmark");
  bars.classList.toggle("fa-bars");
});
let productList = [];
let cartProduct = [];
const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;
  document.querySelectorAll(".item").forEach((item) => {
    const price = parseFloat(
      item.querySelector(".item-total").textContent.replace("$", "")
    );
    const quantity = parseInt(
      item.querySelector(".quantity-value").textContent
    );
    totalPrice += price;
    totalQuantity += quantity;
  });
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
};
const showCard = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");
    orderCard.innerHTML = `
    <div class="card-image flex between-1">
      <img src="${product.image}" alt="">
            </div>
            <h4>${product.name}</h4>
            <h4 class="price" >${product.price}</h4>
            <a href="#"   class="btn cart-select-btn">Add to Cart</a>
    `;
    cardList.appendChild(orderCard);
    const cardBtn = orderCard.querySelector(".cart-select-btn");
    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};
const addToCart = (innerProduct) => {
  const existingProduct = cartProduct.find(
    (item) => item.id === innerProduct.id
  );
  if (existingProduct) {
    alert("Item already in your cart");
    return;
  }
  cartProduct.push(innerProduct);
  let quantity = 1;
  let price = parseFloat(innerProduct.price.replace("$", ""));
  const cartItem = document.createElement("div");

  cartItem.classList.add("item");
  cartItem.classList.add("flex");
  cartItem.classList.add("between");
  cartItem.innerHTML = `
  <div class="item-image">
                    <img src="${innerProduct.image}" alt="">
  
                  </div>
                  <div>
                    <h4>${innerProduct.name}</h4>
                    <h4 class="item-total" >${innerProduct.price}</h4>
                  </div>
                  <div class="flex">
                    <a href="#" class="quantity-btn">
                      <i class="fa-solid fa-minus minus"></i>
                    </a>
                    <h4 class="quantity-value">${quantity}</h4>
                    <a href="#" class="quantity-btn">
                    <i class="fa-solid fa-plus plus"></i>
  
                    </a>
                  </div>
  
  `;
  cartList.appendChild(cartItem);
  updateTotals();
  const plusBtn = cartItem.querySelector(".plus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");
  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotals();
  });
  const minusBtn = cartItem.querySelector(".minus");
  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity--;
    if (quantity >= 1) {
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      setTimeout(() => {
        cartItem.classList.add("slide-out");
        minusBtn.parentElement.parentElement.parentElement.remove();
        cartProduct.pop(innerProduct);
        updateTotals();
      }, 1000);
    }
  });
};
const initApp = () => {
  fetch("./json/products.json")
    .then((res) => res.json())
    .then((data) => {
      productList = data;
      showCard();
    })
    .catch((err) => {
      console.log("error appeared !");
    });
};
initApp();
