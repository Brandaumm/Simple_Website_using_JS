function adicionarLoja() {
    var nome = document.getElementById('nome').value;
    var tipo = document.getElementById('tipo').value;
    var producao = document.getElementById('producao').value;
    var status = document.getElementById('status').value;

    if (!nome || !tipo || !producao || !status) {
        alert("Preencha todos os campos.");
        return;
    }

    var loja = {
        id: new Date().getTime(), 
        nome: nome,
        tipo: tipo,
        producao: producao,
        status: status
    };

    var lojasSalvas = JSON.parse(localStorage.getItem('lojas')) || [];

    lojasSalvas.push(loja);

    localStorage.setItem('lojas', JSON.stringify(lojasSalvas));

    exibirLojas();
    
    document.getElementById('nome').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('status').value = '';
    document.getElementById('producao').value = '';
}

function exibirLojas() {
    var lojasSalvas = JSON.parse(localStorage.getItem('lojas')) || [];
    var listaLojas = document.getElementById('listaLoja');

    listaLojas.innerHTML = '';

    lojasSalvas.forEach(function (lojas) {
        var lojasElement = document.createElement('div');
        lojasElement.className = 'alert alert-success';

        lojasElement.innerHTML = `<strong>${"Nome: " + lojas.nome}</strong> - ${"Tipo: " + lojas.tipo}    ${"Producao : " + lojas.producao}  ${"Status: " + lojas.status}`;

        var botaoExcluir = document.createElement('button');
        botaoExcluir.className = 'btn btn-danger';
        botaoExcluir.innerHTML = 'Excluir';
        botaoExcluir.onclick = function () {
            excluirlojas(lojas.id);
        };

        lojasElement.appendChild(botaoExcluir);
        listaLojas.appendChild(lojasElement);
    });
}

function excluirlojas(lojasId) {
    var lojasSalvas = JSON.parse(localStorage.getItem('lojas')) || [];

    var index = lojasSalvas.findIndex(function (c) {
        return c.id === lojasId;
    });

    if (index !== -1) {
        lojasSalvas.splice(index, 1);
        localStorage.setItem('lojas', JSON.stringify(lojasSalvas));

        var lojaElement = document.getElementById(lojasId);
        if (lojaElement) {
            lojaElement.parentNode.removeChild(lojaElement);
        }

        exibirLojas();
    }
}

window.onload = exibirlojas;

function onLoad() {
    if (window.location.pathname.endsWith("inventario.html")) {
        exibirProdutos();
    }
}
window.onload = onload

function adicionarProduto() {
    var nomeProduto = document.getElementById('nomeProduto').value;
    var quantidade = document.getElementById('quantidade').value;

    if (!nomeProduto || !quantidade) {
        alert("Preencha todos os campos.");
        return;
    }

    var produto = {
        nome: nomeProduto,
        quantidade: parseInt(quantidade, 10)
    };

    var produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtosSalvos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtosSalvos));

    exibirProdutos();
    document.getElementById('nomeProduto').value = '';
    document.getElementById('quantidade').value = '';
}

function aumentarProduto(produtoElement, index) {
    var produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtosSalvos[index].quantidade++;

    localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
    exibirProdutos();
}

function diminuirProduto(produtoElement, index) {
    var produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    if (produtosSalvos[index].quantidade > 0) {
        produtosSalvos[index].quantidade--;

        localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
        exibirProdutos();
    }
}

function excluirProduto(produtoElement, index) {
    var produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtosSalvos.splice(index, 1);

    localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
    exibirProdutos();
}

function exibirProdutos() {
    var produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    var listaProduto = document.getElementById('listaProduto');

    listaProduto.innerHTML = '';

    produtosSalvos.forEach(function (produto, index) {
        var produtoElement = document.createElement('div');
        produtoElement.className = 'alert alert-success';

        produtoElement.innerHTML = `<strong>${"Nome: " + produto.nome}</strong> - <span data-quantidade="${produto.quantidade}">${"Quantidade: " + produto.quantidade}</span>`;

        var botaoAumentar = document.createElement('button');
        botaoAumentar.className = 'btn btn-success';
        botaoAumentar.innerHTML = '+ Produto';
        botaoAumentar.onclick = function () {
            aumentarProduto(produtoElement, index);
        };
        produtoElement.appendChild(botaoAumentar);

        var botaoDiminuir = document.createElement('button');
        botaoDiminuir.className = 'btn btn-warning';
        botaoDiminuir.innerHTML = '- Produto';
        botaoDiminuir.onclick = function () {
            diminuirProduto(produtoElement, index);
        };
        produtoElement.appendChild(botaoDiminuir);

        var botaoExcluir = document.createElement('button');
        botaoExcluir.className = 'btn btn-danger';
        botaoExcluir.innerHTML = 'Excluir';
        botaoExcluir.onclick = function () {
            excluirProduto(produtoElement, index);
        };
        produtoElement.appendChild(botaoExcluir);

        listaProduto.appendChild(produtoElement);
    });
   
}



function salvarDados() {
    var nome = document.getElementById('registroNome').value;
    var email = document.getElementById('registroEmail').value;
    var senha = document.getElementById('registroSenha').value;
    var idade = document.getElementById('registroIdade').value;
    var confirmarSenha = document.getElementById('registroConfirmarSenha').value;
    var cpf = document.getElementById('registroCpf').value;

    if (!nome || !email || !senha || !idade || !confirmarSenha || !cpf) {
        alert('Preencha todos os campos corretamente');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não correspondem');
        return;
    }

    if (typeof(Storage) !== "undefined") {
        console.log("Possui localStorage");

        var dadosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

        var usuarioExistente = dadosSalvos.find(function (usuario) {
            return usuario.cpf === cpf;
        });

        if (usuarioExistente) {
            alert('Já existe um usuário cadastrado com esse CPF');
            return;
        }

        dadosSalvos.push({ nome: nome, email: email, senha: senha, idade: idade, cpf: cpf });

        localStorage.setItem('usuarios', JSON.stringify(dadosSalvos));

        document.getElementById('registroNome').value = '';
        document.getElementById('registroEmail').value = '';
        document.getElementById('registroSenha').value = '';
        document.getElementById('registroIdade').value = '';
        document.getElementById('registroCpf').value = '';

        console.log('Dados salvos');

        alert("Cadastrado com sucesso");
    } else {
        alert("Desculpe, seu navegador não suporta LocalStorage");
    }
}


function teste(){
    alert('deu certo')
}

function exibirDadosSalvos(){

console.log("Tentando exibir dados salvos")

var dadosSalvos = JSON.parse(localStorage.getItem('usuarios')) || []

var dadosSalvosDiv = document.getElementById('dadosSalvos');
dadosSalvosDiv.innerHTML="";

for(var i = 0; i < dadosSalvos.length; i++){
    var usuario = dadosSalvos[i];
    dadosSalvosDiv.innerHTML += "<p><strong>Nome: </strong> " + usuario.nome + " | <strong>E-mail: </strong> " + usuario.email + "| <strong>CPF: </strong> " + usuario.cpf + "| <strong>Idade: </strong>" + usuario.idade + "</p>"
}
}

function limparDados(){
    localStorage.clear();
}

function autenticarUsuario() {
    var email = document.getElementById('indexEmail').value;
    var senha = document.getElementById('indexSenha').value;

    if (typeof(Storage) !== "undefined") {
        console.log("Possui localStorage");

        var dadosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

        var usuarioAutenticado = dadosSalvos.find(function (usuario) {
            return usuario.email === email && usuario.senha === senha;
        });

        if (usuarioAutenticado) {
            alert('Login bem-sucedido!');
            window.location.href = 'main.html';
        } else {
            alert('Email ou senha incorretos. Tente novamente.');
        }
    } else {
        alert("Desculpe, seu navegador não suporta LocalStorage");
    }
}