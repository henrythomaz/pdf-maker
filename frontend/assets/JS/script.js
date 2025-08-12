document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioContrato");
  const mensagem = document.getElementById("mensagem");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    try {
      mensagem.textContent = "Gerando contrato...";
      
      const formData = new FormData(form);
      
      // Converta File objects para URLs temporárias (para o exemplo)
      const dados = {
        ...Object.fromEntries(formData.entries()),
        // Remova os arquivos do objeto principal ou converta
        partyLogo: formData.get('partyLogo').name, // apenas o nome
        partyItems: formData.get('partyItems').name // apenas o nome
      };

      console.log("Dados processados:", dados);

      const response = await fetch("https://miniature-broccoli-pj7xvgpw775r3rjpv-3000.app.github.dev/gerar-contrato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Erro na resposta do servidor");
      }

      const result = await response.blob();
      const url = window.URL.createObjectURL(result);
      const a = document.createElement("a");
      a.href = url;
      a.download = "contrato.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      mensagem.textContent = "Contrato gerado com sucesso!";
    } catch (err) {
      console.error("Erro detalhado:", err);
      mensagem.textContent = `Erro: ${err.message}`;
    }
  });
});