


let WomenProducts = [];

// Fetch and parse XML data
fetch("Product.xml")
        .then(response => response.text())
        .then(xmlText => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlText, "text/xml");

            let products = xmlDoc.getElementsByTagName("product");

            WomenProducts = Array.from(products).map(product => ({
                name: product.getElementsByTagName("name")[0]?.textContent.trim(),
                price: product.getElementsByTagName("price")[0]?.textContent.trim(),
                brand: product.getElementsByTagName("brand")[0]?.textContent.trim() ,
                type: product.getElementsByTagName("subcategory")[0]?.textContent.trim(),
                size: product.getElementsByTagName("size")[0]?.textContent.trim(),
                imageSrc: product.getElementsByTagName("image")[0]?.textContent.trim(),
                secondImageSrc: product.getElementsByTagName("Image")[0]?.textContent.trim(),
                ratingScore: product.getElementsByTagName("ratingScore")[0]?.textContent.trim(),
                itemSold: product.getElementsByTagName("itemSold")[0]?.textContent.trim() ,
                hoverImageSrc: product.getElementsByTagName("hoverImage")[0]?.textContent.trim() ,
                productId:product.getElementsByTagName("id")[0]?.textContent.trim() ,
            }));

            RenderProducts(WomenProducts);
        })
        .catch(error => console.error("Error loading XML", error));

// Function to filter products based on selected checkboxes
function filterProducts() {
    let selectedTypes = Array.from(document.querySelectorAll("#filterOptions1 input:checked"))
            .map(cb => cb.parentElement.textContent.trim().split(" (")[0]);

    let selectedSizes = Array.from(document.querySelectorAll("#filterOptions2 input:checked"))
            .map(cb => cb.parentElement.textContent.trim());

    let selectedBrands = Array.from(document.querySelectorAll("#filterOptions3 input:checked"))
            .map(cb => cb.parentElement.textContent.trim());

    let filteredProducts = WomenProducts.filter(product => {
        return (selectedTypes.length === 0 || selectedTypes.includes(product.type)) &&
                (selectedSizes.length === 0 || selectedSizes.includes(product.size)) &&
                (selectedBrands.length === 0 || selectedBrands.includes(product.brand));
    });


    let existingNoProduct = document.querySelector(".noProduct");
    if (existingNoProduct) {
        existingNoProduct.remove();

    }

    if (filteredProducts.length === 0) {
        RenderProducts(filteredProducts);


        let noProduct = document.createElement("div");
        noProduct.classList.add("noProduct");

        let text = document.createElement("p");
        text.innerHTML = "No Product Found for this criteria";
        text.classList.add("Text");

        let clear = document.createElement("button");
        clear.classList.add("clear");
        clear.textContent = "Clear all";
        clear.onclick = clearAll;



        let image = document.createElement("img");
        image.classList.add("clearIMG");
        image.src = "http://localhost:5500/assets/Essensials/nofound.gif";

        noProduct.appendChild(image);
        noProduct.appendChild(text);
        noProduct.appendChild(clear);
        document.body.appendChild(noProduct);

        let footer = document.getElementsByClassName("FooterRectangle")[0];
        footer.style.position = "absolute";
        footer.style.top = "650px";

    } else {

        let footer = document.getElementsByClassName("FooterRectangle")[0];
        footer.style.position = "relative";
        footer.style.top="0px";


        let noProductDiv = document.querySelector(".noProduct");
        if (noProductDiv) {
            noProductDiv.remove();
        }

        RenderProducts(filteredProducts);
    }
}


// Function to display products
function RenderProducts(products) {
    let productGrid = document.getElementById("Product-Grid");
    productGrid.innerHTML = "";

    products.forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("productDiv");

        let productImg = document.createElement("img");
        productImg.classList.add("productImg");
        productImg.src = product.imageSrc;
        productImg.alt = product.name;


        productImg.addEventListener("mouseover", function () {
            productImg.src = product.hoverImageSrc;
        });

        productImg.addEventListener("mouseout", function () {
            productImg.src = product.imageSrc;
        });

        let productName = document.createElement("p");
        productName.classList.add("productName");
        productName.textContent = product.name;

        let brandName = document.createElement("p");
        brandName.classList.add("brandName");
        brandName.textContent = product.brand;

        let productPrice = document.createElement("p");
        productPrice.classList.add("productPrice");
        productPrice.textContent = `$${product.price}`;


        let ScoreSpan = document.createElement("span");
        ScoreSpan.classList.add("scoreSpan");

        let productSecondImg = document.createElement("img");
        productSecondImg.classList.add("productSecondImg");
        productSecondImg.src = product.secondImageSrc;
        productSecondImg.alt = "Star";

        let Rating = document.createElement("p");
        Rating.classList.add("rating");
        Rating.textContent = product.ratingScore;

        let NumberOfProducts = document.createElement("p");
        NumberOfProducts.classList.add("numberOfProducts");
        NumberOfProducts.textContent = product.itemSold;

        let addToCartButton = document.createElement("button");
        addToCartButton.classList.add("addToCartButton");
        addToCartButton.textContent = "ADD TO CART";

        addToCartButton.addEventListener("click", function () {
            AddToCartButton(product);
        });


        let ColorSelectionText =document.createElement("p");
        ColorSelectionText.classList.add("colorSelection");
        ColorSelectionText.textContent = "Available in 5 colours ";

        let ColorSection=document.createElement("span")
        ColorSection.classList.add("colorSection");


        let Rectangle1 = document.createElement("div");
        Rectangle1.classList.add("rectangle1");

        let Rectangle2 = document.createElement("div");
        Rectangle2.classList.add("rectangle2");

        let Rectangle3 = document.createElement("div");
        Rectangle3.classList.add("rectangle3");

        let Rectangle4 = document.createElement("div");
        Rectangle4.classList.add("rectangle4");

        let Rectangle5 = document.createElement("div");
        Rectangle5.classList.add("rectangle5");

        let ColorText =document.createElement("p");
        ColorText.classList.add("colorText");
        ColorText.textContent="Available in 5 colours ";


        ColorSection.appendChild(Rectangle1);
        ColorSection.appendChild(Rectangle2);
        ColorSection.appendChild(Rectangle3);
        ColorSection.appendChild(Rectangle4);
        ColorSection.appendChild(Rectangle5);


        ScoreSpan.appendChild(productSecondImg);
        ScoreSpan.appendChild(Rating);
        ScoreSpan.appendChild(NumberOfProducts);
        productDiv.appendChild(productImg);
        productDiv.appendChild(ScoreSpan);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(brandName);
        productDiv.appendChild(ColorText);



        productDiv.appendChild(ColorSection);
        productDiv.appendChild(addToCartButton);
        productGrid.appendChild(productDiv);
        productImg.addEventListener("click", function () {
            redirectToProductDetail(product.productId);
        });


    });
}
//Function to redirectToProduct
function redirectToProductDetail(productId) {
    if (productId) {
        window.location.href = `product-detail.html?productId=${productId}`;
    } else {
        console.error("Product ID not found.");
    }
}
//function to clear all product filters
function clearAll() {

    document.querySelectorAll("#filterOptions1 input, #filterOptions2 input, #filterOptions3 input").forEach(cb => cb.checked = false);


    RenderProducts(WomenProducts);
    let footer = document.getElementsByClassName("FooterRectangle")[0];
    footer.style.position = "relative";
    footer.style.top="0px";


    let noProductDiv = document.querySelector(".noProduct");
    if (noProductDiv) {
        noProductDiv.remove();
    }


}

