// https://londonappbrewery.github.io/Simon-Game/

// Quando carrego numa tecla, inicia jogo: gera cor/som aleatorio

//  - Se acertar: + efeito (.pressed); gera outro som/cor (so da o ultimo) e aumenta nivel
//  - se errar: + fundo verm (.game - over no body) + som erro + muda msg; da erro - passa a dar erro em todos ou posso reiniciar (faz refresh)

var iniciado = false;
var botaoAtual;
var vitoria = true;
var clique = 0;

var sequencia = [];
const levels = [];

const titulo = document.getElementById('level-title');
const buttons = document.querySelectorAll('.btn');

const novaCor = function () {
    var randNum = Math.floor(Math.random() * (4 - 1)) + 1;
    switch (randNum) {
        case 1:
            var corGerada = 'green';
            break;
        case 2:
            var corGerada = 'red';
            break;
        case 3:
            var corGerada = 'yellow';
            break;
        case 4:
            var corGerada = 'blue';
            break;
    }
    return corGerada;
}

const escolherCor = function (cor) {
    switch (cor) {
        case 'green':
            var audio = new Audio('sounds/green.mp3');
            break;
        case 'red':
            var audio = new Audio('sounds/red.mp3');
            break;
        case 'yellow':
            var audio = new Audio('sounds/yellow.mp3');
            break;
        case 'blue':
            var audio = new Audio('sounds/blue.mp3');
            break;
    }
    audio.play(audio);
    document.getElementById(cor).classList.add('fade-in');
    setTimeout(() => {
        document.getElementById(cor).classList.remove('fade-in');
    }, 200);
}

const atualizarNivel = function () {
    let cor = novaCor();
    escolherCor(cor);
    levels.push(cor);
    titulo.innerHTML = 'Level ' + levels.length;
}

const verificarVitoria = function () {
    if (sequencia[clique] == levels[clique]) {
        document.getElementById(botaoAtual).classList.add('pressed');
        setTimeout(() => {
            document.getElementById(botaoAtual).classList.remove('pressed');
        }, 200);
        if (clique != (levels.length - 1)) {
            clique++;
        } else {
            setTimeout(() => {
                sequencia = []
                clique = 0;
                atualizarNivel();
            }, 1000);
        }
    } else {
        var erro = new Audio('sounds/wrong.mp3');
        erro.play();
        document.querySelector('body').classList.add('game-over');
        setTimeout(() => {
            document.querySelector('body').classList.remove('game-over');
        }, 200);
        titulo.innerHTML = 'Game Over, Press Any Key to Restart';
        document.addEventListener('keydown', e => {
            e.preventDefault();
            window.location.reload()
            // vitoria = false;
        });
        buttons.forEach(button => {
            button.removeEventListener('click', e => {
                botaoAtual = e.target.getAttribute('id');
                escolherCor(botaoAtual);
                sequencia.push(botaoAtual);
                verificarVitoria();
                // if (vitoria) {
                    
                // } 
            });
            button.addEventListener('click', e => {
                erro.play();
                document.querySelector('body').classList.add('game-over');
                setTimeout(() => {
                    document.querySelector('body').classList.remove('game-over');
                }, 200)
            });
        })
    }
    // return vitoria;
}
document.addEventListener('keydown', e => {
    e.preventDefault();
    if (!iniciado) {
        atualizarNivel();
        iniciado = true;
    }
});

if (iniciado) {
    document.removeEventListener('keydown', e => {
        e.preventDefault();
        if (!iniciado) {
            atualizarNivel();
            iniciado = true;
        }
    });
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        botaoAtual = e.target.getAttribute('id');
        escolherCor(botaoAtual);
        sequencia.push(botaoAtual);
        verificarVitoria();
        // if (vitoria) {
        //     if (clique != (levels.length - 1)) {
        //         clique++;
        //     } else {
        //         setTimeout(() => {
        //             sequencia = []
        //             clique = 0;
        //             atualizarNivel();
        //         }, 1000);
        //     }
        // }
    })
});