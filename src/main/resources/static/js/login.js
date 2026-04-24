const API_CLIENTES = "http://localhost:8080/clientes";
const API_DESENVOLVEDORES = "http://localhost:8080/desenvolvedores";

// alternar telas
function mostrarUsuario() {
    document.getElementById("loginUsuario").classList.remove("d-none");
    document.getElementById("cadastroUsuario").classList.add("d-none");
    document.getElementById("loginDev").classList.add("d-none");

    document.querySelector(".btn-user").classList.add("active");
    document.querySelector(".btn-dev").classList.remove("active");
}

function mostrarDev() {
    document.getElementById("loginUsuario").classList.add("d-none");
    document.getElementById("cadastroUsuario").classList.add("d-none");
    document.getElementById("loginDev").classList.remove("d-none");

    document.querySelector(".btn-dev").classList.add("active");
    document.querySelector(".btn-user").classList.remove("active");
}

function mostrarCadastro() {
    document.getElementById("cadastroUsuario").classList.remove("d-none");
    document.getElementById("loginUsuario").classList.add("d-none");
}

function voltarLogin() {
    mostrarUsuario();
}

// login usuário
async function loginUsuario() {
    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value.trim();

    try {
        const resposta = await fetch("http://localhost:8080/clientes/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const user = await resposta.json();

        if (user) {
            localStorage.setItem("clienteLogadoId", user.id);
            localStorage.setItem("clienteLogadoNome", user.nome);
            window.location.href = "loja.html";
        } else {
            alert("Login inválido");
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao fazer login.");
    }
}

// login desenvolvedor
async function loginDev() {
    const email = document.getElementById("emailDev").value.trim();
    const senha = document.getElementById("senhaDev").value.trim();

    try {
        const resposta = await fetch("http://localhost:8080/desenvolvedores/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const dev = await resposta.json();

        if (dev) {
            localStorage.setItem("desenvolvedorLogadoId", dev.id);
            localStorage.setItem("desenvolvedorLogadoNome", dev.nomeEmpresa);
            window.location.href = "meusJogosDev.html";
        } else {
            alert("Login inválido");
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao fazer login.");
    }
}

// cadastro usuário
async function cadastrar() {
    const nome = document.getElementById("nomeCadastro").value.trim();
    const idade = document.getElementById("idadeCadastro").value.trim();
    const email = document.getElementById("emailCadastro").value.trim();
    const senha = document.getElementById("senhaCadastro").value.trim();

    if (!nome || !idade || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    const novoUsuario = {
        nome: nome,
        idade: parseInt(idade),
        email: email,
        senha: senha
    };

    try {
        const resposta = await fetch(API_CLIENTES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoUsuario)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar usuário");
        }

        alert("Conta criada com sucesso!");
        voltarLogin();

        document.getElementById("nomeCadastro").value = "";
        document.getElementById("idadeCadastro").value = "";
        document.getElementById("emailCadastro").value = "";
        document.getElementById("senhaCadastro").value = "";

    } catch (erro) {
        console.error("Erro no cadastro:", erro);
        alert("Erro ao cadastrar usuário.");
    }
}

//Esconder senha
function toggleSenhaLogin() {
    const input = document.getElementById("senhaLogin");
    const icon = document.getElementById("iconeOlhoLogin");

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

function toggleSenhaDev() {
    const input = document.getElementById("senhaDev");
    const icon = document.getElementById("iconeOlhoDev");

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