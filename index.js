function CadastrarLivro() {
    let nomeLivro = document.getElementById('inputNome').value;
    let nomeAutor = document.getElementById('inputAutor').value;
    let genero = document.getElementById('genero_livro').value;
    let emprestado = document.querySelector('input[name="emprestado"]:checked').value;

    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };

    let novoLivro = {
        nome: nomeLivro,
        nomeAutor: nomeAutor,
        genero: genero,
        isEmprestado: emprestado
    };

    dados.livros.push(novoLivro);

    localStorage.setItem('database', JSON.stringify(dados));


    document.getElementById('inputNome').value = '';
    document.getElementById('inputAutor').value = '';
    document.getElementById('genero_livro').value = '1';
    document.querySelector('input[name="emprestado"]:checked').checked = false;


    Exibirdados(dados.livros);
}


function Exibirdados(dados) {
    let tabela = document.getElementById('conteudo_biblioteca');
    tabela.innerHTML = '';

    for (let i = 0; i < dados.length; i++) {
        let livro = dados[i];
        tabela.innerHTML += `<tr>
            <td scope="row">${i + 1}</td>
            <td>${livro.nome}</td>
            <td>${livro.nomeAutor}</td>
            <td>${livro.genero}</td>
            <td>${livro.isEmprestado}</td>
        </tr>`;
    }
}

document.getElementById('cadastrar').addEventListener('click', CadastrarLivro);
