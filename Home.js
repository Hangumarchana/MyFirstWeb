function redirectToCart(){
    window.location.href = "Cart.html";
}
function redirectToWomen(){
    window.location.href = "Women.html";
}
function redirectToMen(){
    window.location.href = "Men.html";
}
function redirectToKids(){
    window.location.href = "Kids.html";
}
function redirectToWatches(){
    window.location.href = "Watches.html";
}
function redirectToLiving(){
    window.location.href = "Living.html";
}
function redirectToShoes(){
    window.location.href = "Shoes.html";
}
function redirectToBags(){
    window.location.href = "Bag.html";
}
function redirectToToys(){
    window.location.href = "Toys.html";
}
function redirectToBeauty(){
    window.location.href = "Beauty.html";
}
function redirectToGifting(){
    window.location.href = "Gifting.html";
}
function redirectToHome(){
    window.location.href = "index.html";
}
function CategorySelector(value){
    if (value === "Women"){
        window.location.href = "Women.html";
    }else if (value === "Men"){
        window.location.href = "Men.html";
    }else if (value === "Kids & Baby"){
        window.location.href = "Kids.html";
    }else if (value === "Watches"){
        window.location.href = "Watches.html";
    }
}


function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartItemCount").innerText = cart.length;
}
document.addEventListener("DOMContentLoaded", function(){
    updateCartCount();
})


