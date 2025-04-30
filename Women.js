// Page Redirections
function redirectToCart() {
    window.location.href = "Cart.html";
}
function redirectToHome() {
    window.location.href = "index.html";
}
function redirectToWomen() {
    window.location.href = "Women.html";
}
function redirectToMen() {
    window.location.href = "Men.html";
}
function redirectToKids() {
    window.location.href = "Kids.html";
}
function toggleFilter(filterId, arrowId) {
    var options = document.getElementById(filterId);
    var arrow = document.getElementById(arrowId);

    if (options.style.display === "none" || options.style.display === "") {
        options.style.display = "block";
        arrow.classList.add("rotate");
    } else {
        options.style.display = "none";
        arrow.classList.remove("rotate");
    }
}
function CategorySelector(value){
    if (value === "Women"){
        window.location.href = "Women.html";
    }else if (value === "Men"){
        window.location.href = "Men.html";
    }else if (value === "Kids & Baby"){
        window.location.href = "Kids.html";
    }
}
let Button = document.getElementById('ScrollButton');
window.addEventListener("scroll", function() {
    let scrollPosition = window.scrollY;
    let triggerPosition = 200;

    if (scrollPosition > triggerPosition) {
        Button.style.display = "block";
    } else {
        Button.style.display = "none";
    }
});


    Button.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

