//Load the page and close notification panel
document.addEventListener("DOMContentLoaded",function (){
    closeNotificationPanel()
})

//function to get product Id and get the details of that product
document.addEventListener("DOMContentLoaded", function () {
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get("productId");

    if (productId) {
        fetch("Product.xml")
                .then(response => response.text())
                .then(xmlText => {
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(xmlText, "text/xml");

                    let products = Array.from(xmlDoc.getElementsByTagName("product"));
                    let product = products.find(p => p.getElementsByTagName("id")[0].textContent.trim() === productId);


                    if (product) {
                        document.getElementById("addToCart").addEventListener("click", () => {
                            addToCart(product);
                        })
                        displayProductDetails(product);

                    } else {
                        console.error("Product not found.");
                    }
                })
                .catch(error => console.error("Error loading XML", error));
    }
});


//Display the product details in the html content
function displayProductDetails(product) {
    console.log(product);

    let productNameEl = document.getElementById("productName");
    let productPriceEl = document.getElementById("productPrice");
    let brandNameEl = document.getElementById("brandName");
    let productIMGEl = document.getElementById("productImage");
    let ProductSizeEl=document.getElementById("productSize");

    let ratingEl = document.getElementById("rating");
    let genderEl = document.getElementById("Gender");
    let typeEl = document.getElementById("Type");
    let itemSoldEl = document.getElementById("itemSold");
    let pd3El = document.getElementById("pd3");
    let pd4El = document.getElementById("pd4");
    let IMG1 = product.getElementsByTagName("image")[0]?.textContent.trim();
    let IMG2 = product.getElementsByTagName("hoverImage")[0]?.textContent.trim();


    let  Size = product.getElementsByTagName("size")[0]?.textContent.trim();
    let small="S";
    let medium="M";
    let large="L";

    if(Size===small){
        ProductSizeEl.textContent = "Small";

    }
    else if(Size===medium){
        ProductSizeEl.textContent = "Medium";
    }
    else if(Size===large){
        ProductSizeEl.textContent = "Large";
    }

    if (productNameEl) productNameEl.textContent = product.getElementsByTagName("name")[0]?.textContent.trim();
    if (productPriceEl) productPriceEl.textContent = "$" + product.getElementsByTagName("price")[0]?.textContent.trim();
    if (brandNameEl) brandNameEl.textContent = product.getElementsByTagName("brand")[0]?.textContent.trim();

    let imageSrc = product.getElementsByTagName("image")[0]?.textContent.trim();
    if (productIMGEl) productIMGEl.src=imageSrc;








    if (ratingEl) ratingEl.textContent = product.getElementsByTagName("ratingScore")[0]?.textContent.trim();
    if (genderEl) genderEl.textContent = product.getElementsByTagName("category")[0]?.textContent.trim();
    if (typeEl) typeEl.textContent = product.getElementsByTagName("subcategory")[0]?.textContent.trim();
    if (itemSoldEl) itemSoldEl.textContent = product.getElementsByTagName("itemSold")[0]?.textContent.trim();

    let hoverImageSrc = product.getElementsByTagName("hoverImage")[0]?.textContent.trim();
    if (pd3El) pd3El.src = imageSrc;
    if (pd4El) pd4El.src = hoverImageSrc;
    document.getElementById("pd3").addEventListener("click", function (event) {
        document.getElementById("productImage").src=this.src;
        changeMainImage(this);

    })

    document.getElementById("pd4").addEventListener("click", function (event) {
        document.getElementById("productImage").src=this.src;
        changeMainImage(this);

    })

    if (IMG1 === IMG2){
        document.getElementById("pd4").style.display="none";
    }

}

//Transition to apply to image when user clicked
function changeMainImage(selectedImg) {
    let mainImage = document.getElementById("productImage");

    // Fade out effect
    mainImage.style.opacity = 0.8;


    setTimeout(() => {
        mainImage.src = selectedImg.src;
        mainImage.style.opacity = 1;

    }, 300);

    mainDisplay(selectedImg);
}

//Function to display clicked image
function mainDisplay(selectedIMG){

    document.getElementById("pd3").classList.remove("selected");
    document.getElementById("pd4").classList.remove("selected");

    selectedIMG.classList.add("selected");
}
//Adding event listeners to colour section
document.addEventListener("DOMContentLoaded", function () {
    let rec1 = document.getElementById("rec1");
    if (rec1) {
        rec1.focus();
        console.log("Element #rec1 is focused!");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("rec1").addEventListener("focus", function () {
        document.getElementById("ColorName").textContent = "Black";
    });

    document.getElementById("rec2").addEventListener("focus", function () {
        document.getElementById("ColorName").textContent = "Green";
    });

    document.getElementById("rec3").addEventListener("focus", function () {
        document.getElementById("ColorName").textContent = "Light Blue";
    });

    document.getElementById("rec4").addEventListener("focus", function () {
        document.getElementById("ColorName").textContent = "Red";
    });

    document.getElementById("rec5").addEventListener("focus", function () {
        document.getElementById("ColorName").textContent = "Navy Blue";
    });
});

//Function to add products to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let Id=product.getElementsByTagName("id")[0]?.textContent.trim();
    let productChecker = cart.findIndex(item => item.productId === Id);
    let message;
    if (productChecker === -1) {
        product.quantity = 1;
        product.name=product.getElementsByTagName("name")[0]?.textContent.trim();
        product.brand=product.getElementsByTagName("brand")[0]?.textContent.trim();
        product.hoverImageSrc=product.getElementsByTagName("hoverImage")[0]?.textContent.trim();
        product.imageSrc=product.getElementsByTagName("image")[0]?.textContent.trim();
        product.price=product.getElementsByTagName("price")[0]?.textContent.trim();
        product.productId=product.getElementsByTagName("id")[0]?.textContent.trim();
        product.ratingScore=product.getElementsByTagName("ratingScore")[0]?.textContent.trim();
        product.itemSold=product.getElementsByTagName("itemSold")[0]?.textContent.trim();
        product.size=product.getElementsByTagName("size")[0]?.textContent.trim();
        product.secondImageSrc=product.getElementsByTagName("Image")[0]?.textContent.trim();
        product.type=product.getElementsByTagName("subcategory")[0]?.textContent.trim();

        cart.push(product);
        console.log("hi" ,product);
        localStorage.setItem("cart", JSON.stringify(cart));
        message = "✅ Product Added to Cart!";
        updateCartCount();
    } else {
        message = "⚠️ This product is already in your cart!";
    }

    updateNotificationPanel(product, message);



}
//Function to show user the notification of cart adding process
function updateNotificationPanel(product, message) {
    console.log(product);

    let productImage = document.getElementById("productImage1");
    let productName = document.getElementById("productName1");
    let productBrand = document.getElementById("productBrand1");
    let productPrice = document.getElementById("productPrice1");

    if (productImage && productName && productBrand && productPrice) {
        productImage.src = product.getElementsByTagName("image")[0]?.textContent.trim();
        productName.innerText = product.getElementsByTagName("name")[0]?.textContent.trim();
        productBrand.innerText = product.getElementsByTagName("brand")[0]?.textContent.trim();
        productPrice.innerText = "$" + product.getElementsByTagName("price")[0]?.textContent.trim();
    } else {
        console.error("One or more notification elements are missing in the DOM.");
    }

    document.getElementById("notificationMessage").innerHTML = message;
    document.getElementById("notificationContainer").classList.remove("hidden");
    document.getElementById("notificationPanel").classList.add("showNotification");
}

//function to close notification
function closeNotificationPanel() {
    console.log("close notificationPanel");
    document.getElementById("notificationContainer").classList.add("hidden");
    document.getElementById("notificationPanel").classList.remove("showNotification");
}
//function to update cart count 
document.addEventListener("DOMContentLoaded", updateCartCount);
