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

    if (dados.length === 0) {
        tabela.innerHTML = `<tr><td colspan="5">Nenhum livro encontrado.</td></tr>`;
    } else {
        for (let i = 0; i < dados.length; i++) {
            let livro = dados[i];
            tabela.innerHTML += `<tr>
                <td scope="row">${i + 1}</td>
                <td>${livro.nome}</td>
                <td>${livro.nomeAutor}</td>
                <td>${livro.genero}</td>
                <td>${livro.isEmprestado}</td>
                <td><button onclick="ExcluirLivro(${i})">Excluir</button></td>
            </tr>`;
        }
    }
}

function EditarLivro(index) {
    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };
    let livro = dados.livros[index];

    document.getElementById('inputNome').value = livro.nome;
    document.getElementById('inputAutor').value = livro.nomeAutor;
    document.getElementById('genero_livro').value = livro.genero;
    document.querySelector('input[name="emprestado"][value="' + livro.isEmprestado + '"]').checked = true;

    document.getElementById('cadastrar').setAttribute('data-index', index);
    document.getElementById('cadastrar').textContent = 'Salvar Edição';
    
    document.getElementById('cadastrar').onclick = function () {
        let editedLivro = {
            nome: document.getElementById('inputNome').value,
            nomeAutor: document.getElementById('inputAutor').value,
            genero: document.getElementById('genero_livro').value,
            isEmprestado: document.querySelector('input[name="emprestado"]:checked').value
        };
        
        dados.livros[index] = editedLivro;
        localStorage.setItem('database', JSON.stringify(dados));

        LimparCampos();
        document.getElementById('cadastrar').textContent = 'Inserir';
        document.getElementById('cadastrar').onclick = CadastrarLivro;
        Exibirdados(dados.livros);
    };
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
    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };

    
    let livrosFiltrados = dados.livros.filter((livro) => {
        const nomeEmLowerCase = livro.nome.toLowerCase();
        return (
            nomeEmLowerCase.includes(termoPesquisa) &&
            (generoFiltro === "" || generoFiltro === livro.genero)
        );
    });

    Exibirdados(livrosFiltrados);
}

document.getElementById('cadastrar').addEventListener('click', CadastrarLivro);
document.getElementById('alterar').addEventListener('click', EditarLivro);
document.getElementById('deletar').addEventListener('click', ExcluirLivro);
document.getElementById('Limpar').addEventListener('click', LimparTabela);
document.getElementById('conteudo_biblioteca').addEventListener('click', function (e) {
    if (e.target && e.target.nodeName == 'TD') {
        DetalharLivro(e.target.parentElement.rowIndex - 1);
    }
});
