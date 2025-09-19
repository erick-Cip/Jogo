// Criação de uma lista para armazenar os números sorteados:
   let listaDeNumerosSorteados = [];

// Variável que ira receber uma quantidade de números:
   let limiteDeNumeros = 100;

// Variável que ira receber uma função que gera um número secreto:
   let numeroSecreto = gerarNumeroSecreto();

// Declaração de variável para receber a quantidade de tentativas:
   let tentativas = 1;

// Função com retorno para gerar número secreto, adicionalo a uma lista de números sorteados e apagar essas lista caso já estaja cheia: 
   function gerarNumeroSecreto(){
      let numeroEscolhido = parseInt(Math.random() * limiteDeNumeros +1); 
      let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length;
      if(quantidadeDeNumerosNaLista == limiteDeNumeros){
         listaDeNumerosSorteados = [];
      }

      if(listaDeNumerosSorteados.includes(numeroEscolhido)){ // "includes" é uma função que verifica se um dado está em uma lista ou não.
         return gerarNumeroSecreto();
      } else{
         listaDeNumerosSorteados.push(numeroEscolhido); // "push" adiciona um dado em uma lista.
         console.log(listaDeNumerosSorteados);
         return numeroEscolhido;
      }
   }

// Função com parâmetro para seleção e atribuição de funcionalidades no html
   function exibirTextoNaTela(tag, texto){
      let campo = document.querySelector(tag);
      campo.innerHTML = texto; // finção adiciona um texto ao html
      responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
   }

// Função para exibir mensagem inicial na tela:
   function mensagemInicial(){
      exibirTextoNaTela('h1', 'Jogo do número secreto!');
      exibirTextoNaTela('p', 'Escolha um número de 0 à 100 ');
   }

// Chamando função inicial para mostrar mensagem inicial na tela:
   mensagemInicial();

// Função sem parâmetro para criando a funcionalidade no botão chute que está no HTML:
   function verificarChute(){
      let chute = document.querySelector('input').value; /* value → serve para pegar somente o 
      input e não o comando todo da linha html. */

      if (chute == numeroSecreto){
         let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
         exibirTextoNaTela('h1', 'Acertou!');
         exibirTextoNaTela('p', `Parabéns, você acertou o número secerto ${numeroSecreto}
         com ${tentativas} ${palavraTentativa}!`);
         document.getElementById('reiniciar').removeAttribute('disabled'); 
         /* getElementById → serve para selecionar e retornar um elemento específico de uma página HTML usando o seu atributo id.
            removeAttribute → seve para remover um atributo da página html. */
      } else {
         if (chute > numeroSecreto){   
            exibirTextoNaTela('p', `O número é menor do que ${chute}. `)
         } else {
            exibirTextoNaTela('p', `O número é maior do que ${chute}. `)
         }
         tentativas++;
         limparCampo();
      }      
   }  

// Função para limpar o chute errado: 
   function limparCampo(){
      let chute = document.querySelector('input');
      chute.value = ' ';
   }

// Função para reiniciar o jogo:
   function reiniciarJogo(){
      limparCampo();
      numeroSecreto = gerarNumeroSecreto();
      mensagemInicial();
      document.getElementById('reiniciar').setAttribute('disabled', true); /* setAttribute →  é um método de elementos HTML que permite 
      adicionar um novo atributo a um elemento ou alterar o valor de um atributo existente */
   }