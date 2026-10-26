
const animeCards = document.querySelectorAll(".anime");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
let autoSlide;

function updateCarousel() {
    const total = animeCards.length;

    animeCards.forEach((card, index) => {
        card.classList.remove(
            "active",
            "prev",
            "next",
            "far-prev",
            "far-next",
            "hidden"
        );

        const distance = (index - currentIndex + total) % total;

        if (distance === 0) {
            card.classList.add("active");
        } else if (distance === 1) {
            card.classList.add("next");
        } else if (distance === total - 1) {
            card.classList.add("prev");
        } else if (distance < total / 2) {
            card.classList.add("far-next");
        } else {
            card.classList.add("far-prev");
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % animeCards.length;
    updateCarousel();
}

function previousSlide() {
    currentIndex =
        (currentIndex - 1 + animeCards.length) % animeCards.length;
    updateCarousel();
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, 2000);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}


 // Permite clicar nos cards e pausar ao passar o mouse
animeCards.forEach((card, index) => {
    // Pausa quando o mouse entra na imagem
    card.addEventListener("mouseenter", () => {
        stopAutoSlide();
    });

    // Continua quando o mouse sai da imagem
    card.addEventListener("mouseleave", () => {
        startAutoSlide();
    });

    // Permite selecionar um anime pelo clique
    card.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
        startAutoSlide();
    });
});


// Inicia o carrossel automático
updateCarousel();
startAutoSlide();
