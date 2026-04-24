const API_JOGOS = "http://localhost:8080/jogos";
const API_COMPRAS = "http://localhost:8080/compras";

let jogos = [];
let index = 0;

document.addEventListener("DOMContentLoaded", () => {
    carregarJogosLoja();
    carregarDetalheJogo();
});

// Carregar jogos na loja e em todosJogosLoja
async function carregarJogosLoja() {
    const container = document.querySelector(".todosJogos");

    if (!container) return;

    try {
        const resposta = await fetch(API_JOGOS);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar jogos");
        }

        jogos = await resposta.json();

        container.innerHTML = "";

        jogos.forEach(jogo => {
            container.innerHTML += `
                <div class="jogo" onclick="abrirJogo(${jogo.id})">
                    <img src="${jogo.imagem}" class="img-fluid w-100 img-jogo">
                    <p class="text-bg-dark p-2 opacity-50 mb-0">
                        R$ ${Number(jogo.valor).toFixed(2)}
                    </p>
                </div>
            `;
        });

        configurarCarrossel();

    } catch (erro) {
        console.error(erro);
        container.innerHTML = `<p class="text-white">Erro ao carregar jogos.</p>`;
    }
}

// Abrir página do jogo
function abrirJogo(id) {
    window.location.href = `jogo.html?id=${id}`;
}

// Carregar detalhe do jogo
async function carregarDetalheJogo() {
    const container = document.querySelector(".detalheJogo");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        container.innerHTML = `<p class="text-white">Jogo não encontrado.</p>`;
        return;
    }

    try {
        const resposta = await fetch(`${API_JOGOS}/${id}`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar jogo");
        }

        const jogo = await resposta.json();

        container.innerHTML = `
            <div class="row g-4">
                <div class="col-lg-7 col-12 col-md-11 mx-auto">
                    <img src="${jogo.imagem}" class="img-fluid rounded shadow">
                </div>

                <div class="col-lg-5 col-11 mx-auto text-white bg-purple p-4 rounded d-flex flex-column">

                    <div class="flex-grow-1">

                        <h3 class="mb-4 mt-2">${jogo.nome}</h3>

                        <p class="mb-5">${jogo.descricao || ""}</p>

                        <div class="bg-dark p-3 rounded">
                            <p><strong>Categoria:</strong> ${jogo.categoria || ""}</p>
                            <p><strong>Lançamento:</strong> ${jogo.dataLancamento || ""}</p>
                            <p><strong>Classificação:</strong> ${jogo.faixaEtaria || ""}+</p>
                            <p><strong>Desenvolvido por:</strong> ${jogo.desenvolvedora?.nomeEmpresa || ""}</p>
                        </div>

                    </div>

                    <div class="comprar d-flex justify-content-between align-items-center bg-dark p-3 rounded mt-3">
                        <span class="fs-4 text-green">
                            R$ ${Number(jogo.valor).toFixed(2)}
                        </span>

                        <button class="btn btn-green" onclick="comprarJogo(${jogo.id})">
                            Comprar
                        </button>
                    </div>

                </div>
            </div>
        `;

    } catch (erro) {
        console.error(erro);
        container.innerHTML = `<p class="text-white">Erro ao carregar jogo.</p>`;
    }
}

// Comprar jogo
async function comprarJogo(jogoId) {
    const clienteId = localStorage.getItem("clienteLogadoId");

    if (!clienteId) {
        alert("Você precisa estar logado para comprar.");
        window.location.href = "login.html";
        return;
    }

    const compra = {
        cliente: {
            id: Number(clienteId)
        },
        jogo: {
            id: Number(jogoId)
        },
        quantidade: 1
    };

    try {
        const resposta = await fetch(API_COMPRAS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(compra)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao comprar jogo");
        }

        alert("Jogo comprado com sucesso!");

    } catch (erro) {
        console.error(erro);
        alert("Erro ao realizar compra.");
    }
}

// Carrossel
function configurarCarrossel() {
    const carrossel = document.getElementById("carrosselJogos");
    const btnNext = document.querySelector(".next");
    const btnPrev = document.querySelector(".prev");

    if (!carrossel || !btnNext || !btnPrev) return;

    function atualizar() {
        const largura = carrossel.offsetWidth / 3;

        carrossel.scrollTo({
            left: index * largura,
            behavior: "smooth"
        });
    }

    btnNext.addEventListener("click", () => {
        if (index < jogos.length - 3) {
            index++;
            atualizar();
        }
    });

    btnPrev.addEventListener("click", () => {
        if (index > 0) {
            index--;
            atualizar();
        }
    });
}