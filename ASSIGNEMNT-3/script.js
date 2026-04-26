let cartCount = 0;
let totalPrice = 0;


function showHome() {
    document.getElementById("homeSection").style.display = "block";
    document.getElementById("shopSection").style.display = "none";
    document.getElementById("cartSection").style.display = "none";
}


function showShop() {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("shopSection").style.display = "block";
    document.getElementById("cartSection").style.display = "none";
}


function showCart() {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("shopSection").style.display = "none";
    document.getElementById("cartSection").style.display = "block";

    document.getElementById("cartItems").innerText = cartCount;
    document.getElementById("totalPrice").innerText = totalPrice;
}


function addToCart(price) {
    cartCount = cartCount + 1;
    totalPrice = totalPrice + price;

    document.getElementById("cartCount").innerText = cartCount;
}
