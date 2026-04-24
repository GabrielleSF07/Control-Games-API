// Header com scroll
function configurarHeaderScroll() {
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".header");

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scroll");
        } else {
            header.classList.remove("scroll");
        }
    });
}

// Botão voltar ao topo
function configurarBotaoTopo() {
    const btn = document.getElementById("btnTopo");

    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
            btn.classList.remove("d-none");
        } else {
            btn.classList.add("d-none");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}