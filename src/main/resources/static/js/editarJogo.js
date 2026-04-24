const API_JOGOS = "http://localhost:8080/jogos";

document.addEventListener("DOMContentLoaded", carregarJogoParaEditar);

// Mostra informações do jogo
async function carregarJogoParaEditar() {
    const jogoId = localStorage.getItem("jogoEditarId");

    if (!jogoId) {
        alert("Nenhum jogo selecionado.");
        window.location.href = "meusJogosDev.html";
        return;
    }

    try {
        const resposta = await fetch(`${API_JOGOS}/${jogoId}`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar jogo");
        }

        const jogo = await resposta.json();

        document.getElementById("nome").value = jogo.nome || "";
        document.getElementById("descricao").value = jogo.descricao || "";
        document.getElementById("categoria").value = jogo.categoria || "";
        document.getElementById("faixaEtaria").value = jogo.faixaEtaria || "";
        document.getElementById("valor").value = jogo.valor || "";
        document.getElementById("imagem").value = jogo.imagem || "";

        localStorage.setItem("jogoOriginal", JSON.stringify(jogo));

    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar jogo.");
    }
}

// Salva o que foi editado
async function salvarEdicao() {
    const jogoId = localStorage.getItem("jogoEditarId");
    const jogoOriginal = JSON.parse(localStorage.getItem("jogoOriginal"));

    // validação simples
    const nome = document.getElementById("nome").value.trim();
    const valor = document.getElementById("valor").value;

    if (!nome || !valor) {
        mostrarMensagem("Preencha os campos obrigatórios!", "danger");
        return;
    }

    const jogoAtualizado = {
        id: Number(jogoId),
        nome: nome,
        descricao: document.getElementById("descricao").value,
        categoria: document.getElementById("categoria").value,
        faixaEtaria: document.getElementById("faixaEtaria").value,
        valor: parseFloat(valor),
        imagem: document.getElementById("imagem").value,

        dataLancamento: jogoOriginal.dataLancamento,
        quantidadeVendida: jogoOriginal.quantidadeVendida,
        desenvolvedora: jogoOriginal.desenvolvedora
    };

    try {
        const resposta = await fetch(`${API_JOGOS}/${jogoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jogoAtualizado)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao editar jogo");
        }

        // mensagem bonita
        mostrarMensagem("Jogo editado com sucesso!", "success");

        localStorage.removeItem("jogoEditarId");
        localStorage.removeItem("jogoOriginal");

        // redireciona depois
        setTimeout(() => {
            window.location.href = "meusJogosDev.html";
        }, 2000);

    } catch (erro) {
        console.error(erro);
        mostrarMensagem("Erro ao salvar alterações.", "danger");
    }
}

// Função de mensagem na tela
function mostrarMensagem(texto, tipo) {
    let msg = document.getElementById("mensagem");

    if (!msg) {
        msg = document.createElement("div");
        msg.id = "mensagem";
        msg.className = "alert position-fixed top-0 start-50 translate-middle-x mt-3";
        msg.style.zIndex = "9999";
        document.body.appendChild(msg);
    }

    msg.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3`;
    msg.innerText = texto;

    msg.classList.remove("d-none");

    setTimeout(() => {
        msg.classList.add("d-none");
    }, 3000);
}