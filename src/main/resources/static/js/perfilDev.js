const API_DESENVOLVEDORES = "http://localhost:8080/desenvolvedores";
const API_JOGOS = "http://localhost:8080/jogos";

document.addEventListener("DOMContentLoaded", carregarPerfilDev);

//Mostrar dados do dev
async function carregarPerfilDev() {
    const devId = localStorage.getItem("desenvolvedorLogadoId");

    if (!devId) {
        alert("Você precisa fazer login como desenvolvedor.");
        window.location.href = "login.html";
        return;
    }

    try {
        const respostaDev = await fetch(`${API_DESENVOLVEDORES}/${devId}`);

        if (!respostaDev.ok) {
            throw new Error("Erro ao buscar desenvolvedor");
        }

        const dev = await respostaDev.json();

        const respostaJogos = await fetch(API_JOGOS);

        if (!respostaJogos.ok) {
            throw new Error("Erro ao buscar jogos");
        }

        const jogos = await respostaJogos.json();

        const jogosDoDev = jogos.filter(jogo =>
            jogo.desenvolvedora && jogo.desenvolvedora.id == devId
        );

        const quantidadeJogos = jogosDoDev.length;

        const totalVendido = jogosDoDev.reduce((total, jogo) => {
            return total + (jogo.quantidadeVendida || 0);
        }, 0);

        const lucroTotal = jogosDoDev.reduce((total, jogo) => {
            return total + ((jogo.quantidadeVendida || 0) * (jogo.valor || 0));
        }, 0);

        const container = document.querySelector(".dadosDev");

        if (!container) return;

        container.innerHTML = `
            <div class="bg-dark text-white p-4 rounded shadow">

                <h3 class="text-warning mb-4">Meu Perfil</h3>

                <div class="mb-3">
                    <label class="form-label">Nome da Empresa</label>
                    <input class="form-control" value="${dev.nomeEmpresa}" readonly>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input class="form-control" value="${dev.email}" readonly>
                </div>

                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Quantidade de Jogos</label>
                        <input class="form-control" value="${quantidadeJogos}" readonly>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label class="form-label">Total Vendido</label>
                        <input class="form-control" value="${totalVendido}" readonly>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label class="form-label">Lucro Total</label>
                        <input class="form-control" value="R$ ${lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}" readonly>
                    </div>
                </div>

            </div>
        `;

    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar perfil do desenvolvedor.");
    }
}
