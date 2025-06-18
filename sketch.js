let milhos = [];
let milhoColhido = false;
let fala = "";
let agricultorX, agricultorY;
let caixaX, caixaY;
let milhosNaCaixa = 0;
let milhoArrastando = null;
let tempoRestante = 20;
let timerAtivo = true;
let mostrarMensagemFinal = false;

function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < 10; i++) {
    milhos.push({ x: random(40, 300), y: random(200, 350), colhido: false });
  }

  agricultorX = width / 2;
  agricultorY = height / 2;
  caixaX = 100;
  caixaY = height - 50;

  setInterval(decrementarTempo, 1000);
}

function draw() {
  background(135, 206, 235);

  fill(34, 139, 34);
  rect(0, height / 2, width, height / 2);

  desenharCidade();
  desenharCaixa();
  exibirInstrucoesETemporizador();

  for (let i = 0; i < milhos.length; i++) {
    if (!milhos[i].colhido) {
      desenharMilho(milhos[i].x, milhos[i].y);
    }
  }

  desenharAgricultor(mouseX, mouseY);

  // Mostrar milho sendo arrastado
  if (milhoArrastando) {
    desenharMilho(mouseX, mouseY);
  }

  if (tempoRestante <= 0 && !mostrarMensagemFinal) {
    timerAtivo = false;
    fill(0);
    textSize(16);
    textAlign(LEFT, CENTER);
    text("Tempo esgotado! Você colocou " + milhosNaCaixa + " milhos na caixa.", 35, height / 3);
  }

  // Verifica se todos os milhos foram colocados na caixa
  if (milhosNaCaixa === milhos.length && !mostrarMensagemFinal) {
    mostrarMensagemFinal = true;
  }

  // Exibir mensagem final no centro
  if (mostrarMensagemFinal) {
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(width / 2 - 150, height / 2 - 50, 300, 100, 20);

    noStroke();
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("AGORA IREI VENDER NA CIDADE", width / 2, height / 2);
  }
}

function desenharAgricultor(x, y) {
  fill(0, 255, 0);
  rect(x - 15, y, 30, 50);

  fill(255, 224, 189);
  rect(x - 25, y + 10, 10, 30);
  rect(x + 15, y + 10, 10, 30);
  ellipse(x, y - 30, 40, 40);

  fill(139, 69, 19);
  arc(x, y - 40, 50, 30, PI, 0, CHORD);

  fill(0);
  ellipse(x - 10, y - 35, 8, 8);
  ellipse(x + 10, y - 35, 8, 8);
  noFill();
  stroke(0);
  arc(x, y - 25, 20, 10, 0, PI);
  noStroke();
}

function desenharMilho(x, y) {
  fill(255, 223, 0);
  ellipse(x, y - 30, 20, 50);

  fill(255, 200, 0);
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      let gx = x + i * 4;
      let gy = y - 30 + j * 5;
      if (dist(gx, gy, x, y - 30) < 20) {
        ellipse(gx, gy, 3, 4);
      }
    }
  }

  fill(34, 139, 34);
  beginShape();
  vertex(x - 10, y - 10);
  bezierVertex(x - 40, y - 40, x - 40, y + 30, x - 5, y + 20);
  endShape(CLOSE);

  beginShape();
  vertex(x + 10, y - 10);
  bezierVertex(x + 40, y - 40, x + 40, y + 30, x + 5, y + 20);
  endShape(CLOSE);

  fill(0, 100, 0);
  beginShape();
  vertex(x, y - 20);
  bezierVertex(x - 15, y + 10, x + 15, y + 10, x, y - 20);
  endShape(CLOSE);
}

function desenharCidade() {
  fill(200);
  rect(400, 100, 80, 250);
  rect(490, 120, 100, 220);
  rect(600, 80, 60, 240);
  fill(180);
  rect(550, 200, 70, 180);

  desenharJanelas(400, 100, 80, 250);
  desenharJanelas(490, 120, 100, 220);
  desenharJanelas(600, 80, 60, 240);
  desenharJanelas(550, 200, 70, 180);

  fill(255, 0, 0);
  rect(370, 300, 40, 60);
  fill(255, 223, 186);
  rect(570, 320, 40, 60);
}

function desenharJanelas(x, y, w, h) {
  let janelaLargura = 20;
  let janelaAltura = 30;
  fill(0);
  for (let j = y + 20; j < y + h - 20; j += janelaAltura + 10) {
    for (let i = x + 10; i < x + w - 10; i += janelaLargura + 10) {
      rect(i, j, janelaLargura, janelaAltura);
    }
  }
}

function desenharCaixa() {
  fill(139, 69, 19);
  rect(caixaX - 40, caixaY - 30, 80, 30);

  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Milhos: " + milhosNaCaixa, caixaX, caixaY - 20);
}

function exibirInstrucoesETemporizador() {
  fill(0);
  textSize(18);
  textAlign(LEFT, TOP);
  text("Instruções: Coloque todos os milhos na caixa antes que o tempo acabe!", 20, 20);

  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Tempo restante: " + tempoRestante + "s", 20, 50);
}

function decrementarTempo() {
  if (timerAtivo && tempoRestante > 0) {
    tempoRestante--;
  }
}

function mousePressed() {
  for (let i = 0; i < milhos.length; i++) {
    let d = dist(mouseX, mouseY, milhos[i].x, milhos[i].y);
    if (d < 25 && !milhos[i].colhido) {
      milhoArrastando = milhos[i];
      milhoColhido = true;
    }
  }
}

function mouseReleased() {
  if (milhoArrastando) {
    let d = dist(mouseX, mouseY, caixaX, caixaY);
    if (d < 40) {
      milhoArrastando.colhido = true;
      milhosNaCaixa++;
    }
    milhoArrastando = null;
  }
}

