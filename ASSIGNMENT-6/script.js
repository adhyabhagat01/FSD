
// --- CART STATE ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
let totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);


function showHome() {
    document.getElementById("homeSection").classList.remove("d-none");
    document.getElementById("shopSection").classList.add("d-none");
    document.getElementById("cartSection").classList.add("d-none");
}


function showShop() {
    document.getElementById("homeSection").classList.add("d-none");
    document.getElementById("shopSection").classList.remove("d-none");
    document.getElementById("cartSection").classList.add("d-none");
}


function showCart() {
    document.getElementById("homeSection").classList.add("d-none");
    document.getElementById("shopSection").classList.add("d-none");
    document.getElementById("cartSection").classList.remove("d-none");
    renderCart();
}


function addToCart(product) {
    const idx = cart.findIndex(item => item._id === product._id);
    if (idx > -1) {
        cart[idx].qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item._id !== id);
    saveCart();
    updateCartUI();
    renderCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
    cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.getElementById("cartCount").innerText = cartCount;
}


// Always use local dummy products for frontend demo
const allProducts = [
    {
        _id: "demo1",
        name: "Classic Denim Jacket",
        price: 1299,
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        category: "Jackets",
        description: "A timeless denim jacket for all seasons."
    },
    {
        _id: "demo2",
        name: "Summer Floral Dress",
        price: 999,
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        category: "Dresses",
        description: "Light and breezy floral dress for summer."
    },
    {
        _id: "demo3",
        name: "Trendy Sneakers",
        price: 1599,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        category: "Shoes",
        description: "Comfortable and stylish sneakers for everyday wear."
    }
];

function loadProducts() {
    renderProducts(allProducts);
}

function renderProducts(products) {
    const homeContainer = document.getElementById("productContainer");
    const shopContainer = document.getElementById("shopProducts");
    homeContainer.innerHTML = "";
    shopContainer.innerHTML = "";
    products.forEach(p => {
        const card = `
            <div class="col-md-4">
                <div class="card product-card">
                    <img src="${p.image}" class="product-img">
                    <div class="p-3 text-center">
                        <h5>${p.name}</h5>
                        <p class="price">₹${p.price}</p>
                        <button class="btn btn-dark w-100" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        homeContainer.innerHTML += card;
        shopContainer.innerHTML += card;
    });
}

function searchProducts(e) {
    e.preventDefault();
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)));
    renderProducts(filtered);
}
function renderCart() {
    const box = document.querySelector(".cart-box");
    let html = `<h2>Your Cart 🛒</h2>
        <p>Total Items: <span id="cartItems">${cartCount}</span></p>
        <p>Total Price: ₹ <span id="totalPrice">${totalPrice}</span></p>`;
    if (cart.length === 0) {
        html += `<p>Your cart is empty.</p>`;
    } else {
        html += `<ul class="list-group mb-3">`;
        cart.forEach(item => {
            html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${item.name} x${item.qty}</span>
                <span>₹${item.price * item.qty}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item._id}')">Remove</button>
            </li>`;
        });
        html += `</ul>`;
        html += `<button class="btn btn-success">Place Order</button>`;
    }
    box.innerHTML = html;
}
// SIGNUP API
async function signupUser() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    
    if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }
    
    try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        console.log("Signup response:", data);
        alert(data.message);
        
        if (data.message === "Signup successful") {
            window.location.href = "login.html";
        }
    } catch (err) {
        console.error("Signup error:", err);
        alert("Signup failed! Backend error: " + err.message);
    }
}


// LOGIN API
async function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    if (!email || !password) {
        alert("Please fill in all fields!");
        return;
    }
    
    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        console.log("Login response:", data);
        alert(data.message);
        
        if (data.message === "Login successful") {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "index.html";
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Login failed! Backend error: " + err.message);
    }
}

// --- USER NAVBAR STATE ---
function updateUserNav() {
    const userNav = document.getElementById("userNav");
    if (!userNav) return; // Element doesn't exist, skip
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        userNav.innerHTML = `<span class='me-2 text-white'>Hi, ${user.name}</span><button class='btn btn-danger btn-sm' onclick='logoutUser()'>Logout</button>`;
    } else {
        userNav.innerHTML = `<button class='btn btn-warning me-2' onclick=\"location.href='login.html'\">Login/Signup</button>`;
    }
}

function logoutUser() {
    localStorage.removeItem("user");
    location.reload();
}

// --- INIT ---
window.onload = function() {
    updateCartUI();
    updateUserNav();
    loadProducts();
};