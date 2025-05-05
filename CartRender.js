console.log("JavaScript file is running!");
document.addEventListener("DOMContentLoaded", function () {
    renderCart();
});
let cartCounter=0;


//To render the cart
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("Cart-Container");

    if (!cartContainer) {
        console.error("Error: Cart-Container element not found.");
        return;
    }

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `
                                   <div id="cart-rectangle">
                                     <p id='empty-pra'>Your cart is empty.</p>
                                   <div id="empty-can">
                                        <img  id="empty-icon" src="box.png" alt="empty-icon">
                                   </div>
                                   <button id="empty-button" onclick="redirectToHome()">SHOP OUR PRODUCTS
                                   
                                    </button>
                                   </div>
                                  


    `;



        let totalRender = document.querySelector(".totalRender1, .totalRender2");
        if (totalRender) {
            totalRender.remove();
        }

        return;
    }

    cart.forEach((product, index) => {
        let productElement = document.createElement("div");
        productElement.className = "cart-item";

        productElement.innerHTML = `     
            <img src="${product.imageSrc}" alt="${product.name}">
            <p class="name">${product.name}</p>
            <p class="brand">${product.brand}</p>
            <p class="unit-price">$${product.price}</p>
            <p class="total-price">$${(product.price * (product.quantity || 1)).toFixed(2)}</p>

            <div class="quantity">
                <button class="reduceButton" data-index="${index}">-</button>
                <input class="quantity_input" type="text" value="${product.quantity || 1}" readonly>
                <button class="increaseButton" data-index="${index}">+</button>
            </div>

            <span class="pdSpan">
                <img class="starRating" src="star.png" alt="rating">
                <span class="rating">${product.ratingScore}</span>
                <span class="items">${product.itemSold}</span>
            </span>
            <img  id="remove-icon" class="remove-icon" src="bin.png" alt="Remove" data-index="${index}">
        `;

        cartContainer.appendChild(productElement);
    });

    totalRenderFun(cart);
    addEventListeners();
    addRemoveEventListeners();
    updateTotalRenderPosition();
}

//To render total sum method
function totalRenderFun(cart) {
    let totalRender = document.querySelector(".totalRender1, .totalRender2");


    if (totalRender) {
        totalRender.remove();
    }


    let sum = cart.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);


    totalRender = document.createElement("div");
    totalRender.className = cart.length === 1 ? "totalRender1" : "totalRender2";

    totalRender.innerHTML = ` 
        <span class="${cart.length === 1 ? "total_span1" : "total_span2"}">
            <p class="${cart.length === 1 ? "totheader1" : "totheader2"}">Total</p>
            <p class="${cart.length === 1 ? "total_sum1" : "total_sum2"}">$${sum.toFixed(2)}</p>
        </span>
        <hr class="${cart.length === 1 ? "line1" : "line2"}">
        <button class="${cart.length === 1 ? "checkout1" : "checkout2"}" onclick="checkout1(${sum})">CHECKOUT</button>
        <img class="${cart.length === 1 ? "img1" : "img2"}" alt="koko" src="koko.webp" >
        <p class="${cart.length === 1 ? "pay1" : "pay2"}">PAY US ON </p>
        <p class="${cart.length === 1 ? "payDep1" : "payDep2"}">Incl. 0.5% convenience fee or x3 amount</p>
        <p class="${cart.length === 1 ? "pay1" : "pay4"}">  SHIPPING METHOD </p>
        <hr class="${cart.length === 1 ? "line1" : "line3"}">
        <form class="${cart.length === 1 ? "inp1" : "inp2"}">
             <label>
                   <input type="radio" name="choice" value="option1"> 
                   Standard Shipping
             </label>
             <label>
                   <input type="radio" name="choice" value="option2"> 
                   Pick-up from Store
             </label>
             
        </form>
    `;

    document.body.appendChild(totalRender);
    return sum;
}
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartItemCount").innerText = cart.length;
}




//Function to update quantity in the cart
function addEventListeners() {
    document.querySelectorAll(".increaseButton").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            updateQuantity(index, 1);
        });
    });

    document.querySelectorAll(".reduceButton").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            updateQuantity(index, -1);
        });
    });


}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {

        cart[index].quantity += change;

        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));


        updateCartCount()
        renderCart()

    }
}
function updateTotalRenderPosition() {
    const cartContainer = document.querySelector("#Cart-Container");
    const footerRec = document.querySelector(".FooterRectangle");
    const totalRender = document.querySelector(".totalRender2");

    if (!cartContainer || !totalRender || !footerRec) return;

    // Get element positions
    const cartRect = cartContainer.getBoundingClientRect();
    const footerTop = footerRec.getBoundingClientRect().top;
    const totalRenderHeight = totalRender.offsetHeight;
    const fixedTop = 190; // Fixed top position when scrolling
    const cartBottom = cartRect.bottom - totalRenderHeight;
    const footerLimit = footerTop - totalRenderHeight - 50; // 20px padding before footer

    if (cartRect.top <= fixedTop && cartBottom >= fixedTop) {
        // Stick totalRender inside the cart
        totalRender.style.position = "fixed";
        totalRender.style.top = `${Math.min(fixedTop, footerLimit)}px`;
    } else if (cartBottom < fixedTop) {
        // Stop at the bottom of the cart when scrolling down
        totalRender.style.position = "absolute";
        totalRender.style.top = `${cartBottom}px`;
    } else {
        // Reset when scrolling up
        totalRender.style.position = "absolute";
        totalRender.style.top = "0px";
    }
}



function onScroll() {
    requestAnimationFrame(updateTotalRenderPosition);
}

document.addEventListener("DOMContentLoaded", function () {
    renderCart();


    setTimeout(() => {
        updateTotalRenderPosition();
    }, 100);

    window.addEventListener("scroll", onScroll);
});

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

// Add event listener for remove buttons
function addRemoveEventListeners() {
    document.querySelectorAll(".remove-icon").forEach((button, index) => {
        button.addEventListener("click", function () {
            removeFromCart(index);
            updateCartCount()
        });
    });
}

function redirectToHome() {
    window.location.href = "home.html";
}

//Check out secton 
function checkout1(sum){
    let container1=document.createElement("div");
    container1.id="loginPanel1"
    container1.classList.add("checkout");

    container1.innerHTML =`
    <div class="container_user">
        <p onclick="closePanel()" class="closeIcon">🗙</p>
        <p class="head1">Shipping Details </p>
        <p class="head2">Payment Details</p>
        <img src="ic1.gif" alt="Logo" class="ic1">
        <img src="ic2.gif" alt="Logo" class="ic2">
        <div class="rect1">
                <p class="Country">Country</p>
                
                <select id="country" class="country-input">
                    <option id="text" value="America">America</option>
                </select>    
                <p class="Street">Address</p>  
                <p id="alMsg3" class="error-message"></p> 
                <input id="inp1" type="text" placeholder="Address">
                
                <p class="Town"> Town/City</p>
                <input id="inp2" type="text" placeholder="Town/City">
                <p id="alMsg4" class="error-message" ></p>
                
                <p class="Postcode">Postcode</p>
                <input id="inp3" type="text" placeholder="Zip">
                <p id="alMsg5" class="error-message"></p>
                
                <p class="phone">Phone</p>
                <input id="inp4" type="text" placeholder="Number">
                <p id="alMsg6" class="error-message" ></p>
                
                <p class="email">Email</p>
                <input id="inp5" type="text" placeholder="Email">
                <p id="alMsg7" class="error-message"></p>
                
                <input type="checkbox" id="check1" >
                <p id="opt">Sign me up to receive email updates and news</p>
                
                <button id="verify" onclick="validInputs()">Place Order</button>
                
                
        </div>
        
        
     
    
        <div class="checkout-container">
        
                <p class="subTot ">SubTotal :  </p>
                <p class="subTot1" id="subTot1">1000</p>
                <p class="Discount">Discount :</p>
                <p id="alMsg1" class="error-message"></p>
                <input type="text" placeholder="Code " id="Dis">
                <p class="Tax">Tax :</p>
                <p class="TPrice">Due upon Delivery</p>
                <p class="Total">Total :</p>
                <p class="TotPrice" id="TotPrice">1000</p>
                <p class="method1">Payment:</p>
                <form id="PaymentMethod">
                    <label id="label1">
                        <input id="inp6" type="radio" name="choice" value="option1"> Cash on Delivery
                    </label>
                    <label id="label2" >
                        <input id="inp7" type="radio" name="choice" value="option2"> Credit Card
                    
                    </label>
                    <label id="label3" >
                        <input id="inp8" type="radio" name="choice" value="option3"> Pay with KoKo</input>
                    </label>
                
                
                </form>
                <img src="master.jpg" alt="masterCard" class="masterIMG">
                <img src="visa.jpg" alt="Visa" class="VisaIMG">
                <img src="Dis.png" alt="Discover" class="DiscoverIMG">
                <img src="Ame.png" alt="American" class="AmericanIMG">
                <img src="logo.png" alt="Koko" class="KokoIMG">
                <p class="sec"> Pay security using your credit card</p>
                <p id="alMsg2" class="error-message"></p>
                <p class="CardText">Card Details :</p>
                <input type="text" placeholder="card Number" id="cardNumber" class="cardNumber">
                
                <input id="inp9" type="text" placeholder="Expiration(MM/YY)" class="Expiration">
                <p id="alMsg8" class="error-message"></p>
                <input type="password" placeholder="CSC" id="cardCode" class="cardCode">
                <p id="alMsg9" class="error-message"></p>
                <input type="checkbox" id="inp10">
                <p class="agree"> You agreed to Terms and Condition </p>
                <p id="alMsg10" class="error-message"></p>
        
        </div>
    
    </div> 
    

    
    
    
    
    `

    document.getElementById("loginContainer").appendChild(container1)
    openPanel1(sum);



}
function openPanel1(sum) {

    document.getElementById('blurBackground').style.display = 'block';
    document.getElementById('subTot1').textContent="$ "+sum.toFixed(2);
    document.getElementById('TotPrice').textContent="$ " +sum.toFixed(2);
}
function closePanel() {
    document.getElementById('blurBackground').style.display = 'none';
    document.getElementById('loginContainer').innerHTML = '';
}

function validInputs(){
    console.log("Hi")
    let Address=document.getElementById("inp1").value.trim();
    let City=document.getElementById("inp2").value.trim();
    let Postcode=document.getElementById("inp3").value.trim();
    let Phone = document.getElementById("inp4").value.trim();
    let Email= document.getElementById("inp5").value.trim();
    let DiscountCode=document.getElementById("Dis").value.trim();
    let CardNumber =document.getElementById("cardNumber").value.trim();
    let CSC = document.getElementById("cardCode").value.trim();
    let Expiration = document.getElementById("inp9").value.trim();

    let isValid = true;
    document.querySelectorAll('.error-message').forEach(e => e.textContent = '');
    if(Address ===""){
        document.getElementById("alMsg3").textContent="Required";
        isValid = false;
    }
    if(City ===""){
        document.getElementById("alMsg4").textContent="Required";
        isValid = false;
    }
    else if (/[0-9]/.test(City)){
        document.getElementById("alMsg4").textContent="Invalid City ";
        isValid = false;
    }
    if(Postcode ===""){
        document.getElementById("alMsg5").textContent="Required";
        isValid = false;
    }
    else if (!/^\d+$/.test(Postcode)){
        document.getElementById("alMsg5").textContent="Invalid Postcode";
        isValid = false;
    }
    if (Phone ===""){
        document.getElementById("alMsg6").textContent="Required";
        isValid = false;
    }
    else if  (!/^\d{10}$/.test(Phone)){
        document.getElementById("alMsg6").textContent="Invalid Number";
        isValid = false;
    }
    if (Email ===""){
        document.getElementById("alMsg7").textContent="Required";
        isValid = false;
    }
    else if (!Email.includes("@") || !Email.includes(".")){
        document.getElementById("alMsg7").textContent = "Invalid Email";
        isValid = false;

    }
    if (DiscountCode !== "") {
        if (!/^\d{4}$/.test(DiscountCode)) {
            document.getElementById("alMsg1").textContent = "Invalid Code";
            isValid = false;
        }
    }




    let selectedOption = document.querySelector('input[name="choice"]:checked');


    if (!selectedOption) {
        document.getElementById("alMsg10").textContent = "Select Payment Method";
        event.preventDefault();
        isValid = false;
    }


    let creditCard = document.getElementById("inp7").checked;
    console.log("Changed");
    let regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if(creditCard){
        if (CardNumber===""){
            document.getElementById("alMsg2").textContent="Required";
            isValid = false;

        }
        else if  (!/^\d{10}$/.test(CardNumber)){
            document.getElementById("alMsg2").textContent="Invalid Number";
            isValid = false;
        }
        if(CSC ===""){
            document.getElementById("alMsg9").textContent=" Required";
            isValid = false;

        }
        else if (!/^\d{4}$/.test(CSC)){
            document.getElementById("alMsg9").textContent="Invalid";
            isValid = false;
        }
        if (Expiration ===""){
            document.getElementById("alMsg8").textContent="Required";
            document.getElementById("inp9").placeholder = "";
            isValid = false;


        }
        else if(!regex.test(Expiration)){
            document.getElementById("alMsg8").textContent="Invalid Date";
            document.getElementById("inp9").placeholder = "";
            isValid = false;

        }
        else if(isValid){
            document.getElementById("correct").style.display = "block";
            setTimeout(() => {
                closePanel();
                document.getElementById("correct").style.display = "none";
                localStorage.removeItem("cart");
                renderCart()
            }, 3000);





        }








    }

    else if(isValid){
        document.getElementById("correct").style.display = "block";
        setTimeout(() => {
            closePanel();
            document.getElementById("correct").style.display = "none";
            localStorage.removeItem("cart");
            renderCart()
            localStorage.removeItem("cart");
            renderCart()
        }, 3000);






    }
    setTimeout(function () {
        document.getElementById("alMsg1").textContent = "";

        document.getElementById("alMsg2").textContent = "";
        document.getElementById("alMsg3").textContent = "";
        document.getElementById("alMsg4").textContent = "";
        document.getElementById("alMsg5").textContent = "";
        document.getElementById("alMsg6").textContent = "";
        document.getElementById("alMsg7").textContent = "";
        document.getElementById("alMsg8").textContent = "";
        document.getElementById("alMsg9").textContent = "";
        document.getElementById("alMsg10").textContent = "";

    }, 3000);






}