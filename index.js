function Gravardados () {
    let dados = localStorage.getItem('database');
    let json = {};

    if (dados) {
        json = JSON.parse (dados);
    }else{
        json = {livros:[{
            nome: "",
            nomeAutor: "",
            genero: "",
            isEmprestado: ""
        }]}
    }
    return json;
}

function incluirContato (){
    let dados = Gravardados();

    let nomeLivro = document.getElementById ('inputNome').value;
    let nomeAutor = document.getElementById ('inputAutor').value;
    let genero = document.getElementById ('inputGenero').value;
    let emprestado = document.getElementById ('').value;


    let livro = {
        nome: nomeLivro,
        nomeAutor: nomeAutor,
        genero: genero,
        isEmprestado: emprestado
    };

    dados.livros.push(livro);
    salvaDados (dados);
    imprimeDados ();
}

function Salvar (dados) {
    localStorage.setItem ('database', JSON.stringify (dados));
}

function Exibirdados () {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados ();

    for (i=0; i< objDados.contatos.length; i++) {
        strHtml += `<p>${objDados.contatos[i].nome} - ${objDados.contatos[i].telefone}</p>`
    }

    tela.innerHTML = strHtml;
}

