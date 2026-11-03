// Personalize os dados abaixo antes de publicar.
// Adicione uma URL HTTPS real para ativar o botão de checkout.
const CONFIG = {
  checkoutUrl: "",
};

document.querySelector("#year").textContent = new Date().getFullYear();

const checkout = document.querySelector("#checkout-link");
if (checkout && CONFIG.checkoutUrl.startsWith("https://")) {
  checkout.href = CONFIG.checkoutUrl;
  checkout.textContent = "Garantir minha oferta →";
  checkout.removeAttribute("aria-label");
} else if (checkout) {
  checkout.addEventListener("click", (event) => {
    event.preventDefault();
    alert("O link de checkout ainda não foi configurado.");
  });
}
