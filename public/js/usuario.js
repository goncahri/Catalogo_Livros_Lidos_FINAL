const baseURL = window.location.hostname.includes("vercel.app")
  ? "https://catalogo-livros-lidos-final.vercel.app/api"
  : "http://localhost:3000/api";

document.getElementById('formUsuario').addEventListener('submit', function (event) {
  event.preventDefault();

  const msgModal = new bootstrap.Modal(document.getElementById('modalMensagem'));

  // Limpa a mensagem do modal
  document.getElementById('mensagemModal').innerHTML = '';

  // Obtendo os dados do formulário
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('login').value.trim();
  const senha = document.getElementById('senha').value.trim();

  const dadosUsuario = { nome, email, senha };

  fetch(`${baseURL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosUsuario)
  })
    .then(response => response.json())
    .then(data => {
      if (data.acknowledged || data.message === "Usuário cadastrado com sucesso") {
        document.getElementById('mensagemModal').innerHTML =
          `<span class='text-success'>✅ Usuário criado com sucesso!<br>Por favor, efetue o login.</span>`;
        msgModal.show();
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2500);
      } else if (data.errors) {
        const errorMessages = data.errors.map(error => error.msg).join('<br>');
        document.getElementById('mensagemModal').innerHTML =
          `<span class='text-danger'>${errorMessages}</span>`;
        msgModal.show();
      } else {
        document.getElementById('mensagemModal').innerHTML =
          `<span class='text-danger'>❌ Erro inesperado. Tente novamente.</span>`;
        msgModal.show();
      }
    })
    .catch(err => {
      document.getElementById('mensagemModal').innerHTML =
        `<span class='text-danger'>❌ Erro ao conectar com a API.</span>`;
      msgModal.show();
      console.error(err);
    });
});


