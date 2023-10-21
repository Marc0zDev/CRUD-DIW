function Gravardados() {
    let dados = localStorage.getItem('database');
    let json = {};

    if (dados) {
        json = JSON.parse(dados);
    } else {
        json = {
            livros: []
        };
    }
    return json;
}

function CadastrarLivro() {
    let dados = Gravardados();

    let nomeLivro = document.getElementById('inputNome').value;
    let nomeAutor = document.getElementById('inputAutor').value;
    let genero = document.getElementById('genero_livro').value;
    let emprestado = document.getElementById('inputEmprestado').value;

    let livro = {
        nome: nomeLivro,
        nomeAutor: nomeAutor,
        genero: genero,
        isEmprestado: emprestado
    };

    dados.livros.push(livro);
    Salvar(dados);
    Exibirdados(dados.livros);
}

function Salvar(dados) {
    localStorage.setItem('database', JSON.stringify(dados));
}

function Exibirdados(dados) {
    let tabela = document.getElementById('biblioteca');
    tabela.innerHTML = "";
    for (let i = 0; i < dados.length; i++) {
        let livro = dados[i];
        tabela.innerHTML += `<tr><td scope="row">${i}</td>
            <td>${livro.nome}</td>
            <td>${livro.nomeAutor}</td>
            <td>${livro.genero}</td>
            <td>${livro.isEmprestado}</td></tr>`;
    }
}

document.getElementById('cadastrar').addEventListener('click', CadastrarLivro);
