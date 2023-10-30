function EditarLivroPorId() {
    try {
        const params = new URLSearchParams(window.location.search);
        const livroId = params.get('livroId');
        
        if (livroId) {
            consumirAPI(`https://bookapi--wagnercipriano.repl.co/books/${livroId}`)
                .then(dados => {
                    console.log(dados)
                    document.getElementById('inputNome').readOnly = true;
                    document.getElementById('inputEdicao').readOnly = true;
                    document.getElementById('inputAno').readOnly = true;
                    document.getElementById('inputLocal').readOnly = true;
                    document.getElementById('inputPaginas').readOnly = true;
                    document.getElementById('inputFoto').readOnly = true;
                    document.getElementById('inputAutor').readOnly = true;
                    document.getElementById('genero_livro').readOnly = true;

                    document.getElementById('sim').disabled = true;
                    document.getElementById('nao').disabled = true;

                    document.getElementById('inputNome').value = dados.title;
                    document.getElementById('inputEdicao').value = dados.edition;
                    document.getElementById('inputAno').value = dados.year;
                    document.getElementById('inputLocal').value = dados.location;
                    document.getElementById('inputPaginas').value = dados.pages;
                    document.getElementById('inputFoto').value = dados.image;
                    document.getElementById('inputAutor').value = dados.author;
                    document.getElementById('genero_livro').value = dados.genre;

                    
                    
                    
                    if (dados.loaned) {
                        document.getElementById('sim').checked = true;
                    } else {
                        document.getElementById('nao').checked = true;
                    }
                    
                    
                })
                .catch(error => {
                    console.error('Erro ao carregar dados da API:', error);
                });
        }
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

document.addEventListener('DOMContentLoaded', EditarLivroPorId);