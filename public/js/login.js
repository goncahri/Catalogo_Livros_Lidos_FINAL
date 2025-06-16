const baseURL = window.location.hostname.includes("front-catalogo-livros-lidos-final.vercel.app")
  ? "https://catalogo-livros-lidos-final.vercel.app/api"
  : "http://localhost:3000/api";

document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  try {
    const res = await fetch(`${baseURL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const dados = await res.json();
    console.log("Resposta do login:", dados);

    if (res.ok && dados.access_token) {
      // Salva o token no localStorage
      localStorage.setItem("access_token", dados.access_token);

      // Salva informações do usuário, se existirem
      if (dados.usuario && typeof dados.usuario === "object" && dados.usuario.nome) {
        localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
      } else {
        console.warn("⚠️ Dados do usuário ausentes ou inválidos:", dados.usuario);
        localStorage.removeItem("usuarioLogado");
      }

      alert("✅ Login realizado com sucesso!");
      window.location.href = "index.html"; // Redireciona para página principal
    } else {
      const erro = dados?.errors?.[0]?.msg || dados?.msg || "Erro ao efetuar login.";
      document.getElementById("mensagem").textContent = erro;
    }
  } catch (err) {
    console.error("❌ Erro na requisição:", err);
    document.getElementById("mensagem").textContent = "Erro na requisição. Tente novamente.";
  }
});
