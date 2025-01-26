/*
//titulo do jogo
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo Secreto';
//paragrafo do jogo
let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';
*/


const maxNumber = 10
let listaDeNumeroSorteado = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


//titulo e paragrafo
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});//comando de voz
}


function exibirMensagemInicial (){
    exibirTextoNaTela('h1','Jogo Secreto' );
    exibirTextoNaTela('p', `Escolha um numero entre 1 e ${maxNumber}`);
}

exibirMensagemInicial();


//chute
function verificarChute(){
    let chuteEl = document.querySelector('#chute') //chamado do button
    const chute = chuteEl.value
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        chuteEl.style.display = 'none'  
        //button reiniciar jogo
        document.getElementById('reiniciar').removeAttribute('disabled')
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O número secreto é MAIOR');
        }
        tentativas++;
        limparCampo()
    }
}

//numero aleatorio
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * maxNumber + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteado.length;
    if(quantidadeDeElementosNaLista == maxNumber){
        listaDeNumeroSorteado = []
    }


    if(listaDeNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumeroSorteado.push(numeroEscolhido)
        console.log(listaDeNumeroSorteado)
        return numeroEscolhido;
    }
}

//Limpar campo de entreda
function limparCampo(){
    let chuteE1 = document.querySelector('#chute');
    chuteE1.value = '';
}


//reiniciar jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();

    //reexibir o campo de entreda
    let chuteEl = document.querySelector('#chute');
    chuteEl.style.display = 'block';

    //desabilitar botão reiniciar 
    document.getElementById('reiniciar').setAttribute('disabled','disabled ');

}