/*function CadastrarLivro() {
    let nomeLivro = document.getElementById('inputNome').value;
    let nomeAutor = document.getElementById('inputAutor').value;
    let genero = document.getElementById('genero_livro').value;
    let emprestado = document.querySelector('input[name="emprestado"]:checked').value;
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
*/

function MudaPag(id) {
    try{
        console.log(id);
        window.location.href = `detalhe.html?livroId=${id}`;
    } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
    }
    
}

/*function ExcluirLivroPorId(id) {
    let dados = JSON.parse(localStorage.getItem('database')) || { livros: [] };
    const index = dados.livros.findIndex(livro => livro.id === id);

    if (index !== -1) {
        dados.livros.splice(index, 1);
        localStorage.setItem('database', JSON.stringify(dados));
        return true; 
    }

    return false; 
}
*/

function preencherSelect(dados, primeiroElemento, segundoElemento) {
    const generos = [];

    for (let i = 0; i < dados.length; i++) {
        generos[i] = dados[i].desc;
    }

    const selectGenero = document.getElementById(primeiroElemento);
    const selectGeneroTwo = document.getElementById(segundoElemento);
    selectGenero.innerHTML = '';
    selectGeneroTwo.innerHTML = '';

    const optionTodos = document.createElement('option');
    optionTodos.value = '';
    optionTodos.text = 'Todos';
    selectGenero.appendChild(optionTodos);

    const optionTodosCopy = optionTodos.cloneNode(true);
    selectGeneroTwo.appendChild(optionTodosCopy);

    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.text = genero;
        selectGenero.appendChild(option);

        const optionCopy = option.cloneNode(true);
        selectGeneroTwo.appendChild(optionCopy);
    });
}

function CarregarGeneros(API){
    try {
        consumirAPI(`${API}`).then(dados => {
            preencherSelect(dados, 'filtroGenero', 'genero_livro');
        }).catch(error => {
            console.error('Erro ao carregar dados da API:', error);
        });
    } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
    }
}

function criartabela(dados) {
    let tabela = document.getElementById('conteudo_biblioteca');
    tabela.innerHTML = '';

    if (dados.length === 0) {
        tabela.innerHTML = `<tr><td colspan="10">Nenhum livro encontrado.</td></tr>`;
    } else {
        for (let i = 0; i < dados.length; i++) {
            let livro = dados[i];
            tabela.innerHTML += `<tr>
                <td scope="row">${livro.id}</td>
                <td>${livro.title}</td>
                <td>${livro.author}</td>
                <td>${livro.genre}</td>
                <td>${livro.edition}</td>
                <td>${livro.year}</td>
                <td>${livro.pages}</td>
                <td>
                    <img src="${livro.image}" alt="Imagem do Livro" width="100" height="100">
                </td>
                <td>${livro.location}</td>
                <td>${livro.loaned ? 'Sim' : 'Não'}</td>
                <td><button class="btn btn-danger" onclick="ExcluirLivroPorId(${livro.id})">Excluir</button></td>
                <td><button class="btn btn-info" onclick="MudaPag(${livro.id})">Editar</button></td>
            </tr>`;
        }

    }
}



function Exibirdados(dados) {
    criartabela(dados);
    CarregarGeneros('https://bookapi--wagnercipriano.repl.co/literary_style');
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

async function carregarDadosDaTabela() {
    try {
        consumirAPI('https://bookapi--wagnercipriano.repl.co/books').then(dados => {
            Exibirdados(dados);
        }).catch(error => {
            console.error('Erro ao carregar dados da API:', error);
        });
    } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
    }
}

function consumirAPI(API) {
    console.log(API);
    return fetch(`${API}`)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
            throw error; // Rejeita a promessa para que o erro seja propagado
        });
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

