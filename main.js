'use strict'

//dispkay onde aparece o numeros digitados eo resultado
const display = document.getElementById('resultado');
//pegando os ids que contem a palavra tecla (ou seja meus numeros)
const numeros = document.querySelectorAll('[id*=tecla]');
//pegando os ids que contem a palavra operador (ou seja meus operadores)
const operadores = document.querySelectorAll('[id*=operador]');

let numeroNovo = true;
let operador;
let numeroAnterior;

// verifica sem tem operacoes pendentes
const operacaoPendente = () => operacaoPendente != undefined;

//calcula
const calcular = () =>{
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));//parsFloat tranforma String em float e replace substiu algo por algo
        numeroNovo = true;
         if(operador == "+" ){
                 atualizarDisplay(numeroAnterior + numeroAtual);
         }else if(operador == "-" ){
            atualizarDisplay(numeroAnterior - numeroAtual);
         }else if(operador == "/" ){
            atualizarDisplay(numeroAnterior / numeroAtual);
         }else if(operador == "*" ){
            atualizarDisplay(numeroAnterior * numeroAtual);
         }
    }
}


//colocando no display(na tela)
const atualizarDisplay = (texto) =>{
    // verificando se é um novo numero(numero que vem depois da operacap por exempo 5 + 1, (1) seria o novo numero, pq vem depois da operação )
    if(numeroNovo){
        //se for ele nao concatena
        display.textContent = texto.toLocaleString('BR');
        numeroNovo = false;
    }else{
          //se for ele concatena ate uma operação ser selecionada
        display.textContent += texto.toLocaleString('BR');
    }
 

}

//pegando os numeros atarves do evento (click) e madando o evente para o atualizaDiplay 
const inserirNumero = (evento) =>{
     atualizarDisplay(evento.target.textContent);
}


//pegando todo os botoes e manda um-por-um(ForEach) da teclas que foi clicado para a funcao inserirNumero
numeros.forEach(numero => 
    numero.addEventListener('click', inserirNumero)
);





// numeroNovo = true (ou seja o operador foi selecionado entao nao pode mais concatenar com numeros antigos)
const selecionarOperador = (event) =>{
    if(!numeroNovo){ //se não for numero novo 
    calcular();
    numeroNovo = true;
    operador = event.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',','.')); 
    }
        
}


//pegando todo os botoes e manda um-por-um(ForEach) da teclas que foi clicado para a funcao selecionarOperador 
// sao os operadorres
operadores.forEach(operador=> 
    operador.addEventListener('click', selecionarOperador)
);

// sao os operadorres
const ativarIgual = () =>{
    calcular();
    operador = '';
    
}
document.getElementById('igual').addEventListener('click', ativarIgual);


// sao os operadorres
const limparTudo = () => display.textContent =' ';
document.getElementById('limpartudo').addEventListener('click', limparTudo);


// funcao para limpar tudo
const limparCalculo = () =>{
  limparTudo();
  operador = '';
  numeroNovo = true;
  numeroAnterior ='';
}
document.getElementById('limparcalculo').addEventListener('click', limparCalculo);


// funcao para apagar o numero um-por-um
const apagarUltimoNumero = () => display.textContent = display.textContent.slice(0,-1);
document.getElementById('backspace').addEventListener('click', apagarUltimoNumero);


// funcao que inverte o sinal
const inverteSinal = () => {
    numeroNovo = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverteSinal);


// funcao para inserir a virgula(inserirDecimal), verificar se tem numero antes da virgula(existeNumero) e verificar se ja tem virgula na conta(ExisteVirgula) 
const existeVirgula = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inseriDecimal = () =>{
    if(!existeVirgula()){
          if(existeValor()){
             atualizarDisplay(',');
          } else{
            atualizarDisplay('0,')
          }
    }
}
document.getElementById('virgulaDecimal').addEventListener('click', inseriDecimal);






//////////////////////////////////////////////***************************************************************//////////////////////////////////////////////





const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadordividir',
    '*'         : 'operadormultiplicar',
    '-'         : 'operadorsubitrair',
    '+'         : 'operadorsomar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limpartudo',
    'Escape'    : 'limparcalculo',
    ','         : 'virgulaDecimal'
}

const mapearTeclado = (event) =>{
    const tecla = event.key;

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;//validano a tecla e verificado se existe no meu objct(mapaTeclado)

    if(teclaPermitida()){
        document.getElementById(mapaTeclado[tecla]).click();
    }
   
    
}

document.addEventListener('keydown', mapearTeclado);