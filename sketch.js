let telaAtual = "menu"; // Variável para controlar a tela atual (menu, quiz, instrucoes, creditos)
let faseAtual = 1; // Variável para controlar a fase atual do jogo
let numero1, numero2, numero3, numero4, operacao, respostaCorreta;
let respostaInput;
let acertosFaseAtual = 0;
let acertoTudo=0;
let questaoAtual = 1;
let Voltarx=60;
let Voltary=20;
const QUESTOES_POR_FASE = 5; // Número de questões por fase
const ACERTOS_PARA_AVANCAR = 2; // Número mínimo de acertos para avançar para a próxima fase

let fundomenu;
let titulo;
let finalJogo;
let venceu;
let perdeu;
let quadro;

let mensagemResposta = ""; // Variável para armazenar a mensagem de resposta
let mostrarMensagem = false; // Variável para controlar a exibição da mensagem
let mensagemTempo = 0.5; // Tempo de exibição da mensagem em segundos

function preload(){
  fundomenu=loadImage('fundomenu.jpg');
  titulo=loadImage('match.png');
  venceu=loadImage('vocevenceu.jpg');
  perdeu=loadImage('perdeu.jpg')
  quadro=loadImage('quadro.png')
  quadro.resize(10,10);
}


function setup() {
  createCanvas(600, 400);
  background(220);
  
  respostaInput = createInput(); // Cria um campo de input
  respostaInput.position(width / 2 - 0, 200); // Define a posição do campo de input
  respostaInput.hide(); // Esconde o campo de input inicialmente
}

function draw() {
  background(fundomenu,100);
  image(titulo,100,140);
  
  if (telaAtual === "menu") {
    quadro.resize(200,200);
    image(quadro,300,60);
    exibirMenu();
  } else if (telaAtual === "quiz") {
    exibirQuiz();
  } else if (telaAtual === "instrucoes") {
    exibirInstrucoes();
  } else if (telaAtual === "creditos") {
    exibirCreditos();
  } else if(telaAtual === "finalJogo"){
    final();
  }
  
  if (mostrarMensagem) {
    exibirMensagem();
  }
}

function mouseClicked() {
  if (telaAtual === "menu") {
    verificarBotaoMenu(mouseX, mouseY);
  } else if (telaAtual === "quiz") {
    verificarRespostaQuiz(mouseX, mouseY);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (telaAtual === "quiz") {
      verificarRespostaQuiz(width / 2, 235);
    }
  } else if (keyCode === ESCAPE) {
    if (telaAtual === "instrucoes" || telaAtual === "creditos") {
      telaAtual = "menu";
    }
  }
}

function exibirMenu() {
  respostaInput.hide();
  fill(255, 0, 0);
  rect(150, 100, 100, 50); // Botão de iniciar
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Iniciar",200, 125);

  fill(255, 0, 0);
  rect(150, 160, 100, 50); // Botão de instruções
  fill(0);
  text("Instruções", 200, 185);

  fill(255, 0, 0);
  rect(150, 220, 100, 50); // Botão de créditos
  fill(0);
  text("Créditos", 200, 245);
}

function exibirQuiz() {
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Fase " + faseAtual, width / 2, 50);
  text("Questão " + questaoAtual, width / 2, 80);
  text("Resolva a operação:", width / 2, 120);
  

  if (faseAtual === 1) {
    text(numero1 + " + " + numero2 + " =", width / 2, 160);
  } else if (faseAtual === 2) {
    text(numero1 + " + " + numero2 + " - " + numero3 + " =", width / 2, 160);
  } else if (faseAtual === 3) {
    while(numero1%numero2 !=0){
       numero1 = Math.floor(random(1, 11));
       numero2 = Math.floor(random(1, 11));
    }
    respostaCorreta = (numero1/numero2)+(numero3*numero4)
  text(`(${numero1}/${numero2})+(${numero3}*${numero4})=`,width/2,160)
  }
    fill(255, 0, 0);
  rect(width / 2 - 50, 220, 100, 30); // Botão de enviar resposta
  fill(0);
  text("Enviar", width / 2, 235);

  respostaInput.position(210, 190); // Reposiciona o campo de input
  respostaInput.show(); // Mostra o campo de input
  
  boxvoltar();
}

function exibirInstrucoes() {
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Instruções", width / 2, 50);
  textSize(16);
  text("Resolva as operações matemáticas que aparecerem na tela.", width / 2, 100);
  text("Digite sua resposta no campo de input e clique em 'Enviar'.", width / 2, 130);
  text("Divirta-se e teste seus conhecimentos matemáticos!", width / 2, 160);
  
  boxvoltar();
}

function exibirCreditos() {
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Créditos", width / 2, 50);
  textSize(16);
  text(`Desenvolvido por: Rafael Nonato Moreira da Silva \n Aluno do curso de Egenharia de telecomunicações. \n Orientado pela professora Idalmis Milian`, width / 2, 190);
  boxvoltar();
}

function verificarBotaoMenu(x,y) {
  if (x > 150 && x < 250 && y > 100 && y < 150) {
    // Clicou no botão de iniciar
    iniciarJogo();
  } else if (x > 150 && x < 250 && y > 160 && y < 210) {
    // Clicou no botão de instruções
    telaAtual = "instrucoes";
  } else if (x > 150 && x < 250 && y > 220 && y < 270) {
    // Clicou no botão de créditos
    telaAtual = "creditos";
  }
}

function iniciarJogo() {
  faseAtual = 1;
  questaoAtual = 0;
  acertosFaseAtual = 0;
  proximaQuestao();
  telaAtual = "quiz";
}

function proximaQuestao() {
  questaoAtual++;

  if (faseAtual === 1) {
    numero1 = Math.floor(random(1, 11));
    numero2 = Math.floor(random(1, 11));
    numero3 = Math.floor(random(1, 11));
    operacao = "+";
    respostaCorreta = numero1 + numero2;
  } else if (faseAtual === 2) {
    numero1 = Math.floor(random(1, 11));
    numero2 = Math.floor(random(1, 11));
    numero3 = Math.floor(random(1, 11));
    numero4 = Math.floor(random(1, 11));
    operacao = "-";
    respostaCorreta = numero1 + numero2 - numero3;
  } else if (faseAtual === 3) {
    numero1 = Math.floor(random(1, 11));
    numero2 = Math.floor(random(1, 11));
    numero3 = Math.floor(random(1, 11));
    numero4 = Math.floor(random(1, 11));
    operacao = random(["+", "-", "*", "/"]);
    respostaCorreta = (numero1/numero2)+(numero3*numero4)
  }

  respostaInput.value("");

  if (questaoAtual <= QUESTOES_POR_FASE) {
    telaAtual = "quiz";
  }else if(acertosFaseAtual<ACERTOS_PARA_AVANCAR){
    telaAtual ="finalJogo"
  } 
  else {
    if (acertosFaseAtual > ACERTOS_PARA_AVANCAR) {
      if (faseAtual < 3) {
        faseAtual++;
        questaoAtual = 1;
        acertosFaseAtual = 0;
      } else {
        telaAtual="finalJogo";
      }
    }
    } 
}

function verificarRespostaQuiz(x, y) {
  if (x > width / 2 - 50 && x < width / 2 + 50 && y > 220 && y < 250) {
    const respostaUsuario = parseInt(respostaInput.value());

    if (respostaUsuario === respostaCorreta) {
      mensagemResposta = "Resposta correta!";
      acertosFaseAtual++;
    } else {
      mensagemResposta = "Resposta incorreta!";
    }

    mostrarMensagem = true;
    setTimeout(() => {
      mostrarMensagem = false;
      proximaQuestao();
    }, mensagemTempo * 1000);
  }
}

function exibirMensagem() {
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(mensagemResposta, width / 2, 280);
}

function boxvoltar(){
   textSize(20);
   if(mouseX>535-Voltarx && mouseX<535+Voltarx && mouseY>370-Voltary && mouseY<370+Voltary){
    if(mouseIsPressed){
    telaAtual="menu"
   }
    overBox4=true
      stroke(255)
      noFill();
      rect(535, 370, Voltarx, Voltary);
      fill('white');
      noStroke();
      text("VOLTAR", 490, 380);
  }else{
    stroke(20);
    noFill();
    rect(535, 370, Voltarx, Voltary);
    noStroke();
  fill('black');
  text("VOLTAR", 490, 380);
    overBox1=false;
  } 
}
function final(){
  if(acertosFaseAtual>2){
    background(venceu,100);
    respostaInput.hide()
    boxvoltar();
  }else{
  background(perdeu,100);
  respostaInput.hide()
  boxvoltar();
}
}