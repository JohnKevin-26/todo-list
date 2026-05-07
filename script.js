// ==========================
// CRIAR TAREFA NA TELA
// ==========================

function criarTarefa(texto, concluida = false) {
  const lista = document.getElementById("lista");

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = texto;

  if (concluida) {
    span.classList.add("concluida");
  }

  span.onclick = () => {
    span.classList.toggle("concluida");
    salvarTarefas();
    atualizarContador();
  };

  const botao = document.createElement("button");
  botao.innerText = "❌";

  botao.onclick = () => {
    li.remove();
    salvarTarefas();
    atualizarContador();
  };

  li.appendChild(span);
  li.appendChild(botao);
  lista.appendChild(li);
}

// ==========================
// ADICIONAR TAREFA
// ==========================

function adicionarTarefa() {
  const input = document.getElementById("inputTarefa");
  const texto = input.value;

  if (texto.trim() === "") return;

  criarTarefa(texto);

  input.value = "";

  salvarTarefas();
  atualizarContador();
}

// ==========================
// SALVAR NO LOCALSTORAGE
// ==========================

function salvarTarefas() {
  const tarefas = [];

  document.querySelectorAll("#lista li").forEach(li => {
    tarefas.push({
      texto: li.querySelector("span").innerText,
      concluida: li.querySelector("span").classList.contains("concluida")
    });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ==========================
// CARREGAR DO LOCALSTORAGE
// ==========================

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas.forEach(tarefa => {
    criarTarefa(tarefa.texto, tarefa.concluida);
  });

  atualizarContador();
}

// ==========================
// FILTROS
// ==========================

function mostrarTodas() {
  document.querySelectorAll("#lista li").forEach(li => {
    li.style.display = "flex";
  });
}

function mostrarPendentes() {
  document.querySelectorAll("#lista li").forEach(li => {
    const ok = li.querySelector("span").classList.contains("concluida");
    li.style.display = ok ? "none" : "flex";
  });
}

function mostrarConcluidas() {
  document.querySelectorAll("#lista li").forEach(li => {
    const ok = li.querySelector("span").classList.contains("concluida");
    li.style.display = ok ? "flex" : "none";
  });
}

// ==========================
// CONTADOR
// ==========================

function atualizarContador() {
  const total = document.querySelectorAll("#lista li").length;
  const concluidas = document.querySelectorAll(".concluida").length;

  document.getElementById("contador").innerText =
    `Total: ${total} | Concluídas: ${concluidas}`;
}

// ==========================
// ENTER KEY
// ==========================

document.getElementById("inputTarefa")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      adicionarTarefa();
    }
  });

// ==========================
// INICIALIZAÇÃO
// ==========================

carregarTarefas();