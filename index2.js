// Quando carrego numa tecla, inicia jogo:
// cada jogada gera cor nova

// cada tecla tem efeito (.pressed)(e som) sempre que é reproduzida
// som da tecla é associado à cor ou é erro
// tecla tem mais um efeito se estiver certa ou body tem efeito se for erro (.game - over no body)

//  - Se acertar; ou tenho de acertar proxima ou gera outro som/cor (so da o ultimo) e aumenta nivel
//  - se errar: erro + muda msg - passa a dar erro em todos ou posso reiniciar jogo

var iniciado = false;
var sequencia = [];
var levels = [];

const titulo = document.getElementById('level-title');
const buttons = document.querySelectorAll('.btn');


const playSound = function (nome = 'wrong') {
    var audio = new Audio(`sounds/${nome}.mp3`);
    audio.play();
}

const animacao = function (nome, cor = '') {
    if (nome == 'btn') {
        document.getElementById(cor).classList.add('fade-in');
        setTimeout(() => {
            document.getElementById(cor).classList.remove('fade-in');
        }, 200);
    } else if (nome == 'acerto') {
        document.getElementById(cor).classList.add('pressed');
        setTimeout(() => {
            document.getElementById(cor).classList.remove('pressed');
        }, 200);
    } else if (nome == 'erro') {
        document.querySelector('body').classList.add('game-over');
        setTimeout(() => {
            document.querySelector('body').classList.remove('game-over');
        }, 200);
    }
}

const aumentaNivel = function () {
    var randNum = Math.floor(Math.random() * (3 - 0)) + 0;
    var cor;
    buttons.forEach((button, index)=>{
        if (randNum == index) {
            cor = button.id;
        }
    })
    playSound(cor);
    animacao('btn', cor);
    levels.push(cor);
    titulo.innerHTML = 'Level ' + levels.length;
}

document.addEventListener('keydown', e => {
    e.preventDefault();
    if (!iniciado) {
        sequencia = [];
        aumentaNivel();
        iniciado = true;
    }
});

const verificar = function (i) {
    if (sequencia[i] == levels[i] && i != levels.length - 1) {
        var corAtual = sequencia[i];
        animacao('btn', corAtual);
        animacao('acerto', corAtual);
        playSound(corAtual);
    } else if (sequencia[i] == levels[i] && i == levels.length - 1) {
        var corAtual = sequencia[i];
        animacao('btn', corAtual);
        animacao('acerto', corAtual);
        playSound(corAtual);
        setTimeout(() => {
            sequencia = []
            aumentaNivel();
        }, 1000);
    } else if (sequencia[i] != levels[i]){
        playSound();
        animacao('erro');
        titulo.innerHTML = 'Game Over, Press Any Key to Restart';
        levels = [];
        iniciado = false;
    }
}


buttons.forEach(button => {
    button.addEventListener('click', e => {
        let botaoAtual = e.target.getAttribute('id');
        playSound(botaoAtual);
        animacao('btn', botaoAtual);
        sequencia.push(botaoAtual);
        verificar(sequencia.length-1);
    })
});