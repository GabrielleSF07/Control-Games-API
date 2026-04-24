const API_JOGOS = "http://localhost:8080/jogos";

//Adiciona um novo jogo
async function adicionarJogo() {
    const devId = localStorage.getItem("desenvolvedorLogadoId");

    if (!devId) {
        alert("Você precisa fazer login como desenvolvedor.");
        window.location.href = "login.html";
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const faixaEtaria = document.getElementById("faixaEtaria").value.trim();
    const valor = document.getElementById("valor").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const dataLancamento = document.getElementById("dataLancamento").value;

    // validação
    if (!nome || !descricao || !categoria || !faixaEtaria || !valor || !imagem || !dataLancamento) {
        alert("Preencha todos os campos.");
        return;
    }

    const novoJogo = {
        nome: nome,
        descricao: descricao,
        categoria: categoria,
        faixaEtaria: faixaEtaria,
        valor: parseFloat(valor),
        quantidadeVendida: 0,
        dataLancamento: dataLancamento,
        imagem: imagem,
        desenvolvedora: {
            id: Number(devId)
        }
    };

    try {
        const resposta = await fetch(API_JOGOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao adicionar jogo");
        }

        alert("Jogo adicionado com sucesso!");

        // limpa os campos
        document.getElementById("nome").value = "";
        document.getElementById("descricao").value = "";
        document.getElementById("categoria").value = "";
        document.getElementById("faixaEtaria").value = "";
        document.getElementById("valor").value = "";
        document.getElementById("imagem").value = "";
        document.getElementById("dataLancamento").value = "";

        // redireciona
        window.location.href = "meusJogosDev.html";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao adicionar jogo.");
    }
}