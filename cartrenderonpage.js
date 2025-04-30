console.log("print ")
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".filter-options input").forEach(checkbox => {
        checkbox.addEventListener("change", filterProducts);
    });
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartItemCount").innerText = cart.length;
}

function AddToCartButton(product) {
    console.log("AddToCartButton", product);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let productChecker = cart.findIndex(item => item.productId === product.productId);
    let message;

    console.log("Adding to Cart - Product:", product);

    if (productChecker === -1) {
        product.quantity = 1;
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        message = "✅ Product Added to Cart!";
        updateCartCount();
    } else {
        message = "⚠️ This product is already in your cart!";
    }


    updateNotificationPanel(product, message);
}


function updateNotificationPanel(product, message) {
    let productImage = document.getElementById("productImage");
    let productName = document.getElementById("productName");
    let productBrand = document.getElementById("productBrand");
    let productPrice = document.getElementById("productPrice");

    if (productImage && productName && productBrand && productPrice) {
        productImage.src = product.imageSrc;
        productName.innerText = product.name ;
        productBrand.innerText = product.brand;
        productPrice.innerText = "$" + (product.price || "0.00");
    } else {
        console.error("One or more notification elements are missing in the DOM.");
    }

    document.getElementById("notificationMessage").innerHTML = message;
    document.getElementById("notificationContainer").classList.remove("hidden");
    document.getElementById("notificationPanel").classList.add("showNotification");
}


function closeNotificationPanel() {
    document.getElementById("notificationContainer").classList.add("hidden");
    document.getElementById("notificationPanel").classList.remove("showNotification");
}

document.addEventListener("DOMContentLoaded", updateCartCount);