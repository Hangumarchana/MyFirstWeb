document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".navigation ul li");

    navItems.forEach((item) => {
        item.addEventListener("click", function () {

            navItems.forEach((nav) => nav.classList.remove("active"));

            this.classList.add("active");
        });
    });
});
