document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".Slider");
    const slides = document.querySelectorAll(".Slider img");
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        const newPosition = slides[currentIndex].offsetLeft;
        slider.scrollTo({ left: newPosition, behavior: "smooth" });
    }

    setInterval(showNextSlide, 5000);
});
