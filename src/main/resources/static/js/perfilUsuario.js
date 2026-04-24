const API_CLIENTES = "http://localhost:8080/clientes";
const API_COMPRAS = "http://localhost:8080/compras";

document.addEventListener("DOMContentLoaded", carregarPerfilUsuario);

//Mostrar dados do usuário
async function carregarPerfilUsuario() {
    const clienteId = localStorage.getItem("clienteLogadoId");

    if (!clienteId) {
        alert("Você precisa fazer login.");
        window.location.href = "login.html";
        return;
    }

    try {
        // buscar cliente
        const resposta = await fetch(`${API_CLIENTES}/${clienteId}`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar cliente");
        }

        const usuario = await resposta.json();

        // buscar compras
        const respostaCompras = await fetch(API_COMPRAS);

        if (!respostaCompras.ok) {
            throw new Error("Erro ao buscar compras");
        }

        const compras = await respostaCompras.json();

        // filtrar compras do usuário
        const comprasDoUsuario = compras.filter(compra =>
            compra.cliente && compra.cliente.id == clienteId
        );

        // somar quantidade de jogos comprados
        const quantidadeJogos = comprasDoUsuario.reduce((total, compra) => {
            return total + (compra.quantidade || 0);
        }, 0);

        const container = document.querySelector(".dadosUsuario");

        if (!container) return;

        container.innerHTML = `
            <div class="dados bg-dark text-white p-4 mb-3">

                <h3 class="fs-1 mb-4">Meu Perfil</h3>

                <div class="mb-2">
                    <label class="form-label">Nome:</label>
                    <input class="form-control" value="${usuario.nome}" readonly>
                </div>

                <div class="mb-2">
                    <label class="form-label">Email:</label>
                    <input class="form-control" value="${usuario.email}" readonly>
                </div>

                <div class="row justify-content-center">
                    <div class="mb-2 col-4">
                        <label class="form-label">Idade:</label>
                        <input class="form-control" value="${usuario.idade}" readonly>
                    </div>

                    <div class="mb-2 col-4">
                        <label class="form-label">Jogos Comprados:</label>
                        <input class="form-control" value="${quantidadeJogos}" readonly>
                    </div>
                </div>

            </div>
        `;

    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar perfil.");
    }
}