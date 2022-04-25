const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefas = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

function criaLi() {
    const li = document.createElement('li')
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    }
});

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar está tarefa')
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);+
    salvarTarefas();
}

btnTarefas.addEventListener('click', function() {
    if (!inputTarefa) return;
    criaTarefa(inputTarefa.value)
});

document.addEventListener('click', function(e) {
    const el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    };
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTerefas = [];

    for (let tarefas of liTarefas) {
        let tarefaTexto = tarefas.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTerefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTerefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTerefas = JSON.parse(tarefas); 

    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }

}
adicionaTarefasSalvas();