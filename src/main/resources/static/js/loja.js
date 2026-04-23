const jogos = [
    {
        id: 1,
        nome: "Sally Face",
        desenvolvedora: "Portable Moose",
        imagem: "imagens/sally.png",
        preco: 19.99,
        descricao: "Mergulhe em uma aventura sinistra sobre um garoto com o rosto protético e um passado trágico.",
        categoria: "Aventura",
        dataLancamento: "16/08/2016",
        faixaEtaria: 18,
        vendas: 15000,
        lucroTotal: 299850
    },
    {
        id: 2,
        nome: "The Last of Us",
        desenvolvedora: "Naughty Dog",
        imagem: "imagens/tlou.jpg",
        preco: 249.99,
        descricao: "Uma jornada intensa de sobrevivência em um mundo pós-apocalíptico.",
        categoria: "Ação/Aventura",
        dataLancamento: "14/06/2013",
        faixaEtaria: 18,
        vendas: 200000,
        lucroTotal: 49998000
    },
    {
        id: 3,
        nome: "Undertale",
        desenvolvedora: "Toby Fox",
        imagem: "imagens/undertale.jpg",
        preco: 29.99,
        descricao: "Um RPG único onde suas escolhas realmente importam.",
        categoria: "RPG",
        dataLancamento: "15/09/2015",
        faixaEtaria: 10,
        vendas: 500000,
        lucroTotal: 14995000
    },
    {
        id: 4,
        nome: "Fran Bow",
        desenvolvedora: "Killmonday Games",
        imagem: "imagens/franbow.jpg",
        preco: 19.99,
        descricao: "Uma história perturbadora sobre uma garota lidando com trauma e realidade distorcida.",
        categoria: "Terror/Puzzle",
        dataLancamento: "27/08/2015",
        faixaEtaria: 16,
        vendas: 80000,
        lucroTotal: 1599200
    }
];

//Exibir jogos para comprar
const comprar = document.querySelector(".todosJogos");

if (comprar) {
    jogos.forEach(jogo => {
        comprar.innerHTML += `
            <div class="jogo" onclick="abrirJogo(${jogo.id})">
                <img src="${jogo.imagem}" class="img-fluid w-100 img-jogo">
                <p class="text-bg-dark p-2 opacity-50 mb-0">${jogo.preco}</p>
            </div>
        `;
    });
}

//Exibir jogos para ver
document.addEventListener("DOMContentLoaded", () => {

    const ver = document.querySelector(".verJogos");

    if (ver) {
        jogos.forEach(jogo => {
            ver.innerHTML += `
            <div class="jogo">
                <img src="${jogo.imagem}" class="img-fluid w-100 img-jogo">
                <p class="text-bg-dark p-2 mb-0 text-white">${jogo.nome}</p>
            </div>
        `
        });
    }

    // Usuario teste
    const usuarioDados = [
        {
            nome: "Gabrielle Felix",
            email: "gabi123@gmail.com",
            senha: "654321",
            idade: 44,
            qntdeJogos: 3
        }
    ];

    // Exibir dados do usuário
    const container = document.querySelector(".dadosUsuario");

    if (container) {
        usuarioDados.forEach(usuario => {
            container.innerHTML += `
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

                        <div class="mb-2">
                            <label class="form-label">Senha</label>

                            <div class="input-group">
                                <input id="senhaInput" class="form-control" type="password" value="${usuario.senha}" readonly>

                                <button class="btn btn-secondary" type="button" onclick="toggleSenha()">
                                    <i id="iconeOlho" class="fa-solid fa-eye text-dark"></i>
                                </button>
                            </div>
                        </div>

                        <div class="row justify-content-center">
                            <div class="mb-2 col-3">
                                <label class="form-label">Idade:</label>
                                <input class="form-control" value="${usuario.idade}" readonly>
                            </div>

                            <div class="mb-2 col-3">
                                <label class="form-label">Quantidade de jogos:</label>
                                <input class="form-control" value="${usuario.qntdeJogos}" readonly>
                            </div>
                        </div>

                    </div>
            `;
        });
    }

});

function toggleSenha() {
    const input = document.getElementById("senhaInput");
    const icon = document.getElementById("iconeOlho");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}


//Botão para passar os jogos
const carrossel = document.getElementById("carrosselJogos");
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

let index = 0;

function atualizar() {
    if (!carrossel) return;

    const largura = carrossel.offsetWidth / 3;

    carrossel.scrollTo({
        left: index * largura,
        behavior: "smooth"
    });
}

if (carrossel && btnNext && btnPrev) {

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


//Efeito do header quando rola para baixo
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});


//Botão que volta ao inicio da pagina
const btn = document.getElementById("btnTopo");

if (btn) {
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

//Abrir página do jogo
function abrirJogo(id) {
    window.location.href = `jogo.html?id=${id}`;
}

//Capturar ID na página do jogo
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
    const jogo = jogos.find(j => j.id == id);
    const container = document.querySelector(".detalheJogo");

    if (jogo && container) {
        container.innerHTML = `
            <div class="row g-4">
                <div class="col-lg-7 col-12 col-md-11 mx-auto">
                    <img src="${jogo.imagem}" class="img-fluid rounded shadow">
                </div>

                <div class="col-lg-5 col-11 mx-auto text-white bg-purple p-4 rounded d-flex flex-column">

                    <div class="flex-grow-1">

                        <h3 class="mb-4 mt-2">${jogo.nome}</h3>

                        <p class="mb-5">${jogo.descricao}</p>

                        <div class="bg-dark p-3 rounded">
                            <p><strong>Categoria:</strong> ${jogo.categoria}</p>
                            <p><strong>Lançamento:</strong> ${jogo.dataLancamento}</p>
                            <p><strong>Classificação:</strong> ${jogo.faixaEtaria}</p>
                            <p><strong>Desenvolvido por:</strong> ${jogo.desenvolvedora}</p>
                        </div>

                    </div>

                    <div class="comprar d-flex justify-content-between align-items-center bg-dark p-3 rounded mt-3">
                        <span class="fs-4 text-green">${jogo.preco}</span>
                        <button class="btn btn-green">Comprar</button>
                    </div>

                </div>
            </div>
        `;
    }
}

//Listar jogos do desenvolvedor
const lista = document.getElementById("listaJogosDev");

if (lista) {
    jogos.forEach((jogo, i) => {
        lista.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card bg-dark text-white h-100 border-0 shadow">

                    <img src="${jogo.imagem}" class="card-img-top">

                    <div class="card-body d-flex flex-column">

                        <h5 class="card-title text-warning">${jogo.nome}</h5>

                        <p class="card-text small">${jogo.descricao}</p>

                        <p class="mb-1"><strong>Categoria:</strong> ${jogo.categoria}</p>
                        <p class="mb-1"><strong>Lançamento:</strong> ${jogo.dataLancamento}</p>
                        <p class="mb-1"><strong>Faixa etária:</strong> ${jogo.faixaEtaria}+</p>

                        <hr>

                        <p class="mb-1"><strong>Preço:</strong> R$ ${jogo.preco}</p>
                        <p class="mb-1"><strong>Vendas:</strong> ${jogo.vendas}</p>
                        <p class="mb-3"><strong>Lucro total:</strong> R$ ${jogo.lucroTotal.toLocaleString()}</p>

                        <div class="mt-auto d-flex gap-2">
                            <button class="btn btn-warning w-100" onclick="editarJogo(${jogo.id})">
                                Editar
                            </button>

                            <button class="btn btn-danger w-100" onclick="excluirJogo(${i})">
                                Excluir
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        `;
    });
}

//Tela de editar jogo
function editarJogo(id) {
    const jogo = jogos.find(j => j.id == id);

    localStorage.setItem("jogoEditar", JSON.stringify(jogo));

    window.location.href = "editarJogo.html";
}

//Exibir dados do jogo quando for editar
document.addEventListener("DOMContentLoaded", () => {

    if (!window.location.pathname.includes("editarJogo.html")) return;

    const jogo = JSON.parse(localStorage.getItem("jogoEditar"));

    if (!jogo) return;

    document.getElementById("nome").value = jogo.nome;
    document.getElementById("descricao").value = jogo.descricao;
    document.getElementById("categoria").value = jogo.categoria;
    document.getElementById("faixaEtaria").value = jogo.faixaEtaria;
    document.getElementById("preco").value = jogo.preco;
});

//Exibir dados do desenvolvedor
document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".dadosDev");

    if (!container) return;

    const devDados = [
        {
            empresa: "Toby Fox Productions",
            email: "tobyfox@gmail.com",
            senha: "fox123",
            quantidadeJogos: 2,
            totalVendido: 3500000,
            lucroTotal: 55120000
        }
    ];

    devDados.forEach(dev => {
        container.innerHTML += `
            <div class="bg-dark text-white p-4 rounded shadow">

                <h3 class="text-warning mb-4">Meu Perfil</h3>

                <div class="mb-3">
                    <label class="form-label">Nome da Empresa</label>
                    <input class="form-control" value="${dev.empresa}" readonly>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input class="form-control" value="${dev.email}" readonly>
                </div>

                <div class="mb-2">
                    <label class="form-label">Senha</label>

                    <div class="input-group">
                        <input id="senhaInput" class="form-control" type="password" value="${dev.senha}" readonly>

                        <button class="btn btn-secondary" type="button" onclick="toggleSenha()">
                            <i id="iconeOlho" class="fa-solid fa-eye text-dark"></i>
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Quantidade de Jogos</label>
                        <input class="form-control" value="${dev.quantidadeJogos}" readonly>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Total Vendido</label>
                        <input class="form-control" value="${dev.totalVendido.toLocaleString()}" readonly>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Lucro Total</label>
                    <input class="form-control" value="R$ ${dev.lucroTotal.toLocaleString()}" readonly>
                </div>

            </div>
        `;
    });

});

