// Abre o modal para editar o nome de usuário ao clicar no botão
const editButton = document.getElementById('edit-name-button');
const modal = document.getElementById('edit-name-modal');
const closeModal = document.querySelector('.close');

editButton.addEventListener('click', () => {
    modal.classList.add('show'); // Exibe o modal apenas quando o botão é clicado
    modal.style.display = 'flex';
});

// Função para fechar o modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('show'); // Remove a classe show para esconder o modal
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Espera a animação terminar antes de esconder o modal
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
});

// Salva o novo nome de usuário e atualiza na página inicial e no perfil
document.getElementById('save-name-button').addEventListener('click', () => {
    const newName = document.getElementById('new-user-name').value.trim(); // Remove espaços em branco

    // Verifica se o nome está em branco
    if (newName === "") {
        alert("O nome de usuário não pode estar em branco.");
        return; // Interrompe o processo se o campo estiver vazio
    }

    fetch('/update-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Atualiza o nome de usuário no perfil
            document.getElementById('user-name').textContent = newName;
            
            // Atualiza o nome de usuário na página inicial
            const boasVindas = document.getElementById('boas-vindas');
            if (boasVindas) {
                boasVindas.textContent = `👋 Olá, ${newName}!`;
            }

            // Fecha o modal com animação
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        } else {
            alert('Erro ao atualizar o nome');
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar o nome:', error);
        alert('Erro ao atualizar o nome');
    });
});

// Exibe o email completo do usuário
fetch('/usuario')
    .then(response => response.json())
    .then(data => {
        if (data) {
            document.getElementById('user-name').textContent = data.nome;
            document.getElementById('user-email').textContent = data.email; // Exibe o email completo
        }
    })
    .catch(error => {
        console.error('Erro ao carregar os dados do usuário:', error);
    });

// Função para excluir a conta
document.getElementById('delete-account-button').addEventListener('click', () => {
    if (confirm('Tem certeza de que deseja excluir sua conta?')) {
        fetch('/delete-account', {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Conta excluída com sucesso.');
                window.location.href = '/login.html'; // Redireciona após exclusão
            } else {
                alert('Erro ao excluir a conta');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir a conta:', error);
            alert('Erro ao excluir a conta');
        });
    }
});

// Função para voltar à página principal
function voltarParaPrincipal() {
    window.location.href = '/'; // Redireciona para a página inicial ou a rota principal do seu sistema
}