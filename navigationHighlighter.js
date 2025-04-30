document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith("home.html")) {
        document.getElementById("nav1").classList.add("active");
    }

    if(window.location.pathname.endsWith("Women.html")){
        document.getElementById("nav2").classList.add("active");
    }
    if(window.location.pathname.endsWith("Men.html")){
        console.log("nav3")
        document.getElementById("nav3").classList.add("active");
    }
    if(window.location.pathname.endsWith("Watches.html")){
        document.getElementById("nav4").classList.add("active");
    }
    if(window.location.pathname.endsWith("Kids.html")){
        document.getElementById("nav5").classList.add("active");
    }
    if(window.location.pathname.endsWith("Living.html")){
        document.getElementById("nav6").classList.add("active");
    }
    if(window.location.pathname.endsWith("Shoes.html")){
        document.getElementById("nav7").classList.add("active");
    }
    if(window.location.pathname.endsWith("Bag.html")){
        document.getElementById("nav8").classList.add("active");
    }
    if(window.location.pathname.endsWith("Toys.html"))
    document.getElementById("nav9").classList.add("active");
    if(window.location.pathname.endsWith("Beauty.html")){
        document.getElementById("nav10").classList.add("active");
    }
    if(window.location.pathname.endsWith("Gifting.html")){
        document.getElementById("nav11").classList.add("active");
    }
    if(window.location.pathname.endsWith("product-detail.html")){
        document.getElementById("nav2").classList.add("active");
    }

});
