function loginPanel() {
    let container = document.createElement('div');
    container.classList.add("login-panel");
    container.id = "loginPanel";

    container.innerHTML = `
        <div class="login-panel-con">
            <input type="text" id="email_phone" placeholder="Please enter your Phone number or Email" class="username-input">
            <input type="password" id="pass" placeholder="Please enter your password" class="password-input">
            <p class="forgot">Forgot Password?</p>
            <button id="login-button" class="login-button" onclick="submit()">LOG IN</button>
            <p class="information">Don't have an account? <a class="anchor1" onclick="signIn()">Sign up</a></p>
            <p id="para2">Or, Log in with </p>
            <img src="http://127.0.0.1:5500/assets/Essensials/google.png" alt="Google-icon" class="googleIcon">
            <img src="http://127.0.0.1:5500/assets/Essensials/facebook%20(3).png" alt="Facebook Icon" class="facebookIcon">
            <p onclick="closePanel()" class="closeIcon">🗙</p>
            <p class="Google">Google</p>
            <p class="facebook1">Facebook</p>
            <video id="correctGif" autoplay loop>
            <source src="correct.webm" type="video/webm">
            </video>
        </div>
    `;


    let showImage = document.createElement("img");
    showImage.classList.add("showImage");


    showImage.src = "http://127.0.0.1:5500/assets/Essensials/hidden.png";


    showImage.addEventListener("mouseover", function() {
        showImage.src = "http://127.0.0.1:5500/assets/Essensials/eye%20(1).png";
        document.getElementById("pass").setAttribute("type", "text");
    });

    showImage.addEventListener("mouseout", function() {
        showImage.src = "http://127.0.0.1:5500/assets/Essensials/hidden.png";
        document.getElementById("pass").setAttribute("type", "password");
    });

    container.appendChild(showImage);


    document.getElementById('loginContainer').appendChild(container);
}

function openPanel() {
    loginPanel();
    document.getElementById('blurBackground').style.display = 'block';
}

function closePanel() {
    document.getElementById('blurBackground').style.display = 'none';
    document.getElementById('loginContainer').innerHTML = '';
}

function submit() {
    let emailPhone = document.getElementById("email_phone").value.trim();
    let password = document.getElementById("pass").value.trim();
    let alertDisplay = document.getElementById("alertDisplay");

    if (!alertDisplay) {
        console.error("alertDisplay element not found!");
        return;
    }

    // Clear previous alerts
    alertDisplay.innerHTML = "";

    let container = document.createElement("div");
    container.classList.add("alert");

    // Validate email format
    let emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let phonePattern = /^\d{10}$/; // Exactly 10 digits

    if ((emailPattern.test(emailPhone) || phonePattern.test(emailPhone)) && password) {
        let storedData = JSON.parse(localStorage.getItem(emailPhone));

        if (!storedData) {
            // If email is not found in localStorage, prompt user to sign up
            container.classList.add("alert2");
            container.innerHTML = `<p id="p2">❎ Email not found. Please sign up</p>`;
        } else if (storedData.password !== password) {
            // If email exists but password doesn't match
            container.classList.add("alert2");
            container.innerHTML = `<p id="p2">❎ Invalid password. Please try again.</p>`;
        } else {


            localStorage.setItem('userFirstName', storedData.firstName);
            updateAccountUI();
            document.getElementById("correctGif").style.display = "block";
            setTimeout(() => {
                closePanel();
            }, 3000);
        }
    } else {
        // If email is invalid or password is missing
        container.classList.add("alert2");
        container.innerHTML = `<p id="p2">❎ Invalid Email or Number!</p>`;
    }

    alertDisplay.appendChild(container);


    setTimeout(() => {
        container.remove();
    }, 3000);
}


function signIn() {
    let clear = document.getElementById("loginContainer");
    clear.innerHTML = "";

    let container = document.createElement('div');
    container.classList.add("login-panel");
    container.id = "loginPanel";
    container.innerHTML = `
    <div class="login-panel-con1">
        <p class="prompt1">Create my account</p>
        <p class="prompt2">Please fill in the information below: </p>
        
        <input type="text" id="Firstname" placeholder="First Name" class="username-input-fname">
        <p class="error-message" id="fnameError"></p>

        <input type="text" id="Lastname" placeholder=" Last Name" class="user-input-lname">
        <p class="error-message" id="lnameError"></p>

        <input type="text" id="email_phone" placeholder=" Email" class="username-input1">
        <p class="error-message" id="emailError"></p>

        <input type="password" id="pass" placeholder="password" class="password-input1">
        <p class="error-message" id="passError"></p>

        <input type="text" id="number" placeholder=" Phone Number" class="user-input-num">
        <p class="error-message" id="numberError"></p>

        <p id="para3">Or, Log in with </p>
        <img src="http://127.0.0.1:5500/assets/Essensials/google.png" alt="Google-icon" class="googleIcon1">
        <img src="http://127.0.0.1:5500/assets/Essensials/facebook%20(3).png" alt="Facebook Icon" class="facebookIcon1">
        <button class="create" id="createAccount">CREATE</button>
        <p onclick="closePanel()" class="closeIcon">🗙</p>
        <p class="Google1">Google</p>
        <p class="facebook2">Facebook</p>
        <video id="correctGif" autoplay loop>
            <source src="correct.webm" type="video/webm">
        </video>
        

    </div>`;

    let showImage = document.createElement("img");
    showImage.classList.add("showImage1");
    showImage.src = "http://127.0.0.1:5500/assets/Essensials/hidden.png";

    showImage.addEventListener("mouseover", function () {
        showImage.src = "http://127.0.0.1:5500/assets/Essensials/eye%20(1).png";
        document.getElementById("pass").setAttribute("type", "text");
    });

    showImage.addEventListener("mouseout", function () {
        showImage.src = "http://127.0.0.1:5500/assets/Essensials/hidden.png";
        document.getElementById("pass").setAttribute("type", "password");
    });

    container.appendChild(showImage);
    document.getElementById('loginContainer').appendChild(container);

    // Add validation logic
    document.getElementById("createAccount").addEventListener("click", function () {
        let firstName = document.getElementById("Firstname").value.trim();
        let lastName = document.getElementById("Lastname").value.trim();
        let emailPhone = document.getElementById("email_phone").value.trim();
        let password = document.getElementById("pass").value.trim();
        let phoneNumber = document.getElementById("number").value.trim();

        let isValid = true;


        document.querySelectorAll('.error-message').forEach(e => e.textContent = '');

        if (firstName === "") {
            document.getElementById("fnameError").textContent = "First name is required.";
            isValid = false;
        }
        else if (lastName === "") {
            document.getElementById("lnameError").textContent = "Last name is required.";
            isValid = false;
        }
        else if (emailPhone === "") {
            document.getElementById("emailError").textContent = "Email or phone number is required.";
            isValid = false;
        }
        else if (password === "") {
            document.getElementById("passError").textContent = "Password is required.";
            isValid = false;
        }
        else if (phoneNumber === "") {
            document.getElementById("numberError").textContent = "Phone number is required.";
            isValid = false;
        }


        else if (!emailPhone.includes("@") || !emailPhone.includes(".")){
            document.getElementById("emailError").textContent = "Enter Valid Email.";

        }

        else if  (!/^\d{10}$/.test(phoneNumber)){
            document.getElementById("numberError").textContent = "10 digits  required.";
            isValid = false;
        }
        else if (isValid) {

            let storedData = localStorage.getItem(emailPhone);

            if (storedData) {

                document.getElementById("emailError").textContent = "Email is already registered.";
            } else {
                // If the email doesn't exist in localStorage, proceed with saving the data
                let userData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: emailPhone,
                    password: password,
                    phoneNumber: phoneNumber
                };


                localStorage.setItem(emailPhone, JSON.stringify(userData));


                localStorage.setItem('userFirstName', firstName);


                // Show success message or perform the video display logic
                document.getElementById("correctGif").style.display = "block";
                updateAccountUI()

                setTimeout(() => {
                    closePanel();
                }, 3000);
            }
        }


        setTimeout(function () {

            document.getElementById("fnameError").value="";
            document.getElementById("fnameError").textContent = "";

            document.getElementById("lnameError").value = "";
            document.getElementById("lnameError").textContent = "";
            document.getElementById("emailError").value = "";
            document.getElementById("emailError").textContent="";
            document.getElementById("passError").value = "";
            document.getElementById("passError").textContent="";
            document.getElementById("numberError").value = "";
            document.getElementById("numberError").textContent = "";


        }, 3000);

    });



}
function updateAccountUI() {
    let userFirstName = localStorage.getItem('userFirstName');

    if (userFirstName) {
        document.getElementById("myAc").textContent = `Hi ${userFirstName}`;
        document.getElementById("myAc1").textContent = `Log out  `;
    }
}
window.onload = function() {
    updateAccountUI();
};

document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".navigation ul li");

    navItems.forEach((item) => {
        item.addEventListener("click", function () {

            navItems.forEach((nav) => nav.classList.remove("active"));

            this.classList.add("active");
        });
    });
});
function panelDeterminer(){
    console.log("Panel Determiner");
    let user =document.getElementById("myAc");
    let user1 =document.getElementById("myAc1");
    const value =user.innerText;
    if (value ==="Login / SignUp"){
        openPanel()
    }
    else{
        localStorage.removeItem('userFirstName');
        closePanel();
        user.innerText="Login / SignUp"
        user1.innerText="My Account"

    }
}