const API_JOGOS = "http://localhost:8080/jogos";

document.addEventListener("DOMContentLoaded", carregarMeusJogosDev);

//Listar jogos
async function carregarMeusJogosDev() {
    const devId = localStorage.getItem("desenvolvedorLogadoId");
    const lista = document.getElementById("listaJogosDev");

    if (!devId) {
        alert("Você precisa fazer login como desenvolvedor.");
        window.location.href = "login.html";
        return;
    }

    if (!lista) return;

    try {
        const resposta = await fetch(API_JOGOS);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar jogos");
        }

        const jogos = await resposta.json();

        const jogosDoDev = jogos.filter(jogo =>
            jogo.desenvolvedora && jogo.desenvolvedora.id == devId
        );

        lista.innerHTML = "";

        if (jogosDoDev.length === 0) {
            lista.innerHTML = `
                <p class="text-white text-center">Você ainda não cadastrou nenhum jogo.</p>
            `;
            return;
        }

        jogosDoDev.forEach(jogo => {
            const vendas = jogo.quantidadeVendida || 0;
            const lucroTotal = vendas * jogo.valor;

            lista.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="card bg-dark text-white h-100 border-0 shadow">

                        <img src="${jogo.imagem}" class="card-img-top">

                        <div class="card-body d-flex flex-column">

                            <h5 class="card-title text-warning">${jogo.nome}</h5>

                            <p class="card-text small">${jogo.descricao || ""}</p>

                            <p class="mb-1"><strong>Categoria:</strong> ${jogo.categoria || ""}</p>
                            <p class="mb-1"><strong>Lançamento:</strong> ${jogo.dataLancamento || ""}</p>
                            <p class="mb-1"><strong>Faixa etária:</strong> ${jogo.faixaEtaria || ""}+</p>

                            <hr>

                            <p class="mb-1"><strong>Preço:</strong> R$ ${Number(jogo.valor).toFixed(2)}</p>
                            <p class="mb-1"><strong>Vendas:</strong> ${vendas}</p>
                            <p class="mb-3"><strong>Lucro total:</strong> R$ ${lucroTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</p>

                            <div class="mt-auto d-flex gap-2">
                                <button class="btn btn-warning w-100" onclick="editarJogo(${jogo.id})">
                                    Editar
                                </button>

                                <button class="btn btn-danger w-100" onclick="excluirJogo(${jogo.id})">
                                    Excluir
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            `;
        });

    } catch (erro) {
        console.error(erro);
        lista.innerHTML = `<p class="text-white text-center">Erro ao carregar seus jogos.</p>`;
    }
}

//Editar jogo
function editarJogo(id) {
    localStorage.setItem("jogoEditarId", id);
    window.location.href = "editarJogo.html";
}

//Excluir jogo
async function excluirJogo(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este jogo?");

    if (!confirmar) return;

    try {
        const resposta = await fetch(`http://localhost:8080/jogos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir jogo");
        }

        alert("Jogo excluído com sucesso!");
        carregarMeusJogosDev();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao excluir jogo.");
    }
}

//Buscar jogos
document.getElementById("pesquisaJogosDev")?.addEventListener("input", function () {
    const termo = this.value.toLowerCase();

    const cards = document.querySelectorAll("#listaJogosDev .card");
    const mensagem = document.getElementById("mensagemBusca");

    let encontrou = false;

    cards.forEach(card => {
        const nome = card.querySelector(".card-title").textContent.toLowerCase();

        if (nome.includes(termo)) {
            card.parentElement.style.display = "block";
            encontrou = true;
        } else {
            card.parentElement.style.display = "none";
        }
    });

    // mostrar ou esconder mensagem
    if (!encontrou) {
        mensagem.classList.remove("d-none");
    } else {
        mensagem.classList.add("d-none");
    }
});