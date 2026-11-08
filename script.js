let habitos = [];
carregar();
renderizar();

function renderizar() {
    const ul = document.getElementById("lista-habitos");
    ul.innerHTML = "";
    habitos.forEach(function(habito){
        const li = document.createElement("li");
        ul.appendChild(li);

        const span = document.createElement("span");
        span.textContent = habito.nome;
        span.className = "nome-habito";
        li.appendChild(span);

        const ultimaData = document.createElement("div")
        ultimaData.className = "div-ultima-data";
        ultimaData.textContent = pegarUltimaData(habito.diasConcluidos);
        li.appendChild(ultimaData);        

        const dias = document.createElement("div");
        dias.textContent = "🔥 " + calcularStreak(habito.diasConcluidos);
        dias.className = "div-dias";
        li.appendChild(dias);        

        const botao = document.createElement("button");
        const hoje = new Date().toISOString().slice(0,10);
        botao.textContent = habito.diasConcluidos.includes(hoje) ? "Desmarcar" : "Feito hoje";
        botao.onclick = function() { marcaHabito(habito.id); };
        botao.className = "btn-feito-desfeito";
        li.appendChild(botao);

        const remover = document.createElement("button");
        remover.textContent = "X";
        remover.onclick = function() { removerHabito(habito.id); };
        remover.className="btn-remover";
        li.appendChild(remover);       
        
    })
};

function adicionarHabito(){
    const input = document.getElementById("input-habito");
    const nome = input.value;
    if (nome.trim() === ""){
        return;
    }
    input.value = "";
    const novoHabito = {
        id: Date.now().toString(),
        nome: nome,
        diasConcluidos: []
    };
    habitos.push(novoHabito);
    renderizar();
    salvar();
};

function marcaHabito(id){
    const habito = habitos.find(function(h){
        return h.id === id;
    });
    const hoje = new Date().toISOString().slice(0, 10);
    if(habito.diasConcluidos.includes(hoje)){
        habito.diasConcluidos = habito.diasConcluidos.filter(function(dia){
            return dia !== hoje;
        });
    }else{
        habito.diasConcluidos.push(hoje)
    };
    renderizar();
    salvar();
};

function calcularStreak(diasConcluidos){
    let cont = 0;
    let data = new Date();

    while (true){
        const dia = data.toISOString().slice(0,10);
        if (diasConcluidos.includes(dia)) {
            cont++;
            data.setDate(data.getDate() - 1);
        }else {
            break;
        }

    }
    return cont;
}

function removerHabito(id){
    habitos = habitos.filter(h=> h.id !== id);
    renderizar();
    salvar();
}

function salvar(){
    localStorage.setItem("habitos", JSON.stringify(habitos));
}

function carregar(){
    const salvo = localStorage.getItem("habitos");
    if (salvo) {
        habitos = JSON.parse(salvo);
    }
}

function pegarUltimaData(diasConcluidos){
    if(diasConcluidos.length == 0) return "nunca"
    return diasConcluidos[diasConcluidos.length-1];
}