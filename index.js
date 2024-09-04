//Selecao de elementos
const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")

//Teclas permitidas, quaisquer outras teclas (ex.: letas) nao serao impedidas
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//Selecionar os elementos de classe charKey e executar a funcao de click (para cada elemento) para acrescentar um valor das teclas permitidas
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})

//Evento de click para limpar o input
document.getElementById("clear").addEventListener("click", function () {
  //Ao clicar no 'C' a barra de input deve ficar vazia
  input.value = ""
  //Selecionar input automaticamente apos limpar
  input.focus()
})

//Ao pressionar a tecla (keydown) 
input.addEventListener("keydown", function (ev) {
  ev.preventDefault()
  //Somente teclas incluidas nas permitidas podem ser digitadas
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key
    return
  }
  //Ao clicar apagar (backspace), apagar apenas o ultimo numero digitado
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1)
  }
  //Ao clicar enter, efetuar o calculo
  if (ev.key === "Enter") {
    calculate()
  }
})

//Selecionar botao de id "equal" e executar a funcao "calculate"
document.getElementById("equal").addEventListener("click", calculate)

//Funcao exibicao do resultado
function calculate() {
  resultInput.value = "ERROR"
  resultInput.classList.add("error")
  //Funcao eval: executar o resultado da conta digitada
  const result = eval(input.value)
  resultInput.value = result
  resultInput.classList.remove("error")
}

//Evento para copiar resultado para area de trasnferencia
document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
  const button = ev.currentTarget
  if (button.innerText === "Copy") {
    button.innerText = "Copied!"
    button.classList.add("success")
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = "Copy"
    button.classList.remove("success")
  }
})

//Evento de troca de tema (claro/escuro)
document.getElementById("themeSwitcher").addEventListener("click", function () {
  //Se estiver no tema escuro (dark), trocar para claro (light)
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#26834a")
    main.dataset.theme = "light"
  //Se estiver no tema claro (light), trocar para escuro (dark)
  } else {
    root.style.setProperty("--bg-color", "#212529")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#4dff91")
    main.dataset.theme = "dark"
  }
})