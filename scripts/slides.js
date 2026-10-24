
const slider = document.querySelector(".popular-slider");

if (slider) {
    const track = slider.querySelector(".popular-track");
    const cards = [...slider.querySelectorAll(".popular-anime")];
    const nextButton = slider.querySelector(".next");
    const prevButton = slider.querySelector(".prev");

    let currentIndex = 0;
    let autoSlide;

    function getVisibleCards() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCards());
    }

    function updateSlider() {
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const cardWidth = cards[0].getBoundingClientRect().width;

        track.style.transform =
            `translateX(-${currentIndex * (cardWidth + gap)}px)`;

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= getMaxIndex();

        prevButton.style.opacity = prevButton.disabled ? "0.35" : "1";
        nextButton.style.opacity = nextButton.disabled ? "0.35" : "1";
    }

    function nextSlide() {
        currentIndex =
            currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;

        updateSlider();
    }

    function prevSlide() {
        currentIndex =
            currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;

        updateSlider();
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlide = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    nextButton.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
    });

    prevButton.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
    });

    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    window.addEventListener("resize", () => {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateSlider();
    });

    updateSlider();
    startAutoSlide();
}
