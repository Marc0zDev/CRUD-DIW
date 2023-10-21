function CadastrarLivro() {
    let nomeLivro = document.getElementById('inputNome').value;
    let nomeAutor = document.getElementById('inputAutor').value;
    let genero = document.getElementById('genero_livro').value;
    let emprestado = document.querySelector('input[name="emprestado"]:checked').value;

    // Aqui você também deve coletar os novos campos
    let edicao = document.getElementById('inputEdicao').value;
    let ano = document.getElementById('inputAno').value;
    let paginas = document.getElementById('inputPaginas').value;
    let foto = document.getElementById('inputFoto').value;
    let local = document.getElementById('inputLocal').value;

    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };

    let novoLivro = {
        nome: nomeLivro,
        nomeAutor: nomeAutor,
        genero: genero,
        isEmprestado: emprestado,
        edicao: edicao,
        ano: ano,
        paginas: paginas,
        foto: foto,
        local: local
    };

    dados.livros.push(novoLivro);

    localStorage.setItem('database', JSON.stringify(dados));


    document.getElementById('inputNome').value = '';
    document.getElementById('inputAutor').value = '';
    document.getElementById('genero_livro').value = '1';
    document.querySelector('input[name="emprestado"]:checked').checked = false;

    document.getElementById('inputEdicao').value = '';
    document.getElementById('inputAno').value = '';
    document.getElementById('inputPaginas').value = '';
    document.getElementById('inputFoto').value = '';
    document.getElementById('inputLocal').value = '';

    Exibirdados(dados.livros);
}

function EditarLivro(index) {
    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };
    let livro = dados.livros[index];

    document.getElementById('inputNome').value = livro.nome;
    document.getElementById('inputAutor').value = livro.nomeAutor;
    document.getElementById('genero_livro').value = livro.genero;
    document.querySelector('input[name="emprestado"][value="' + livro.isEmprestado + '"]').checked = true;

    // Aqui você também deve preencher os novos campos
    document.getElementById('inputEdicao').value = livro.edicao;
    document.getElementById('inputAno').value = livro.ano;
    document.getElementById('inputPaginas').value = livro.paginas;
    document.getElementById('inputFoto').value = livro.foto;
    document.getElementById('inputLocal').value = livro.local;

    document.getElementById('cadastrar').setAttribute('data-index', index);
    document.getElementById('cadastrar').textContent = 'Salvar Edição';

    document.getElementById('cadastrar').onclick = function () {
        let editedLivro = {
            nome: document.getElementById('inputNome').value,
            nomeAutor: document.getElementById('inputAutor').value,
            genero: document.getElementById('genero_livro').value,
            isEmprestado: document.querySelector('input[name="emprestado"]:checked').value,
            edicao: document.getElementById('inputEdicao').value,
            ano: document.getElementById('inputAno').value,
            paginas: document.getElementById('inputPaginas').value,
            foto: document.getElementById('inputFoto').value,
            local: document.getElementById('inputLocal').value
        };

        dados.livros[index] = editedLivro;
        localStorage.setItem('database', JSON.stringify(dados));

        LimparCampos();
        document.getElementById('cadastrar').textContent = 'Inserir';
        document.getElementById('cadastrar').onclick = CadastrarLivro;
        Exibirdados(dados.livros);
    };
}



function Exibirdados(dados) {
    let tabela = document.getElementById('conteudo_biblioteca');
    tabela.innerHTML = '';

    if (dados.length === 0) {
        tabela.innerHTML = `<tr><td colspan="10">Nenhum livro encontrado.</td></tr>`;
    } else {
        for (let i = 0; i < dados.length; i++) {
            let livro = dados[i];
            tabela.innerHTML += `<tr>
                <td scope="row">${i + 1}</td>
                <td>${livro.nome}</td>
                <td>${livro.nomeAutor}</td>
                <td>${livro.genero}</td>
                <td>${livro.edicao}</td>
                <td>${livro.ano}</td>
                <td>${livro.paginas}</td>
                <td>${livro.foto}</td>
                <td>${livro.local}</td>
                <td>${livro.isEmprestado}</td>
                <td><button onclick="ExcluirLivro(${i})">Excluir</button></td>
            </tr>`;
        }
    }
}



function ExcluirLivro(index) {
    if (confirm('Tem certeza de que deseja excluir este livro?')) {
        let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };
        dados.livros.splice(index, 1);
        localStorage.setItem('database', JSON.stringify(dados));
        Exibirdados(dados.livros);
    }
}


function LimparTabela() {
    if (confirm('Tem certeza de que deseja limpar a lista de livros?')) {
        localStorage.removeItem('database');
        Exibirdados([]);
    }
}

function DetalharLivro(index) {
    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };
    let livro = dados.livros[index];
    alert(`Detalhes do Livro:
    Nome: ${livro.nome}
    Autor: ${livro.nomeAutor}
    Gênero: ${livro.genero}
    Emprestado: ${livro.isEmprestado}`);
}
function PesquisarLivros() {
    let termoPesquisa = document.getElementById('termoPesquisa').value.toLowerCase();
    let generoFiltro = document.getElementById('filtroGenero').value;
    let emprestadoFiltro = document.getElementById('filtroEmprestado').value;
    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };

    let livrosFiltrados = dados.livros.filter((livro) => {
        const nomeEmLowerCase = livro.nome.toLowerCase();
        return (
            nomeEmLowerCase.includes(termoPesquisa) &&
            (generoFiltro === "" || generoFiltro === livro.genero) &&
            (emprestadoFiltro === "" || emprestadoFiltro === livro.isEmprestado)
        );
    });

    Exibirdados(livrosFiltrados);
}

function carregarDadosDaTabela() {
    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };
    Exibirdados(dados.livros);
}


document.addEventListener('DOMContentLoaded', carregarDadosDaTabela);



document.getElementById('cadastrar').addEventListener('click', CadastrarLivro);
document.getElementById('alterar').addEventListener('click', EditarLivro);
document.getElementById('deletar').addEventListener('click', ExcluirLivro);
document.getElementById('conteudo_biblioteca').addEventListener('click', function (e) {
    if (e.target && e.target.nodeName == 'TD') {
        DetalharLivro(e.target.parentElement.rowIndex - 1);
    }
});
