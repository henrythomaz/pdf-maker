document.addEventListener("DOMContentLoaded", () => {
  Inputmask({ mask: "(99) 99999-9999" }).mask("#clientTel");
  Inputmask({ mask: "(99) 99999-9999" }).mask("#userTel");

  const form = document.getElementById("formularioContrato");
  const mensagem = document.getElementById("mensagem");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    try {
      mensagem.textContent = "Gerando contrato...";

      const response = await fetch("http://localhost:3000/gerar-contrato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!response.ok) throw new Error("Erro ao gerar contrato");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "contrato.pdf";
      link.click();
      mensagem.textContent = "Contrato gerado com sucesso!";
    } catch (err) {
      console.error(err);
      mensagem.textContent = "Erro ao gerar contrato.";
    }
  });
});
