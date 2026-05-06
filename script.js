function adicionarTarefa() {
    let input = document.getElementById("inputTarefa");
    let texto = input.value;

    if (texto === "") return;

    let lista = document.getElementById("lista");

    let li = document.createElement("li");
    li.innerText = texto;

    li.onclick = function() {
        li.style.textDecoration = "line-through";
    };

    let botao = document.createElement("button");
    botao.innerText = "Excluir";

    botao.onclick = function() {
        lista.removeChild(li);
    };

    li.appendChild(botao);
    lista.appendChild(li);

    input.value = "";
}

document.getElementById("inputTarefa")
  .addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      adicionarTarefa();
    }
});