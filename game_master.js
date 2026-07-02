let currentNote;
let score = 0;
let mistakes = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newQuestion();
}

function draw() {
  background(220);
  
  // 1. 五線譜と音符の描画
  drawStaff();
  if (currentNote) {
    drawNote(currentNote);
  }
  
  // 2. 鍵盤の描画
  drawKeyboard();
}

function drawStaff() {
  stroke(0);
  for (let i = 0; i < 5; i++) {
    line(50, 200 + i * 20, windowWidth - 50, 200 + i * 20);
  }
}

function drawNote(noteName) {
  let note = config.noteData.find(n => n.name === noteName);
  if (note) {
    fill(0);
    ellipse(windowWidth / 2, note.y, 20, 15);
  }
}

function drawKeyboard() {
  // 白鍵の描画
  fill(255);
  stroke(0);
  for (let k of config.keys) {
    rect(k.x, 400, k.w, 100);
  }
  // 黒鍵の描画
  fill(0);
  for (let bk of config.blackKeys) {
    rect(bk.x, 400, bk.w, 60);
  }
}

function newQuestion() {
  currentNote = config.noteData[floor(random(config.noteData.length))].name;
}

function mousePressed() {
  // 鍵盤が押されたかの判定（簡易版）
  for (let k of config.keys) {
    if (mouseX > k.x && mouseX < k.x + k.w && mouseY > 400 && mouseY < 500) {
      if (k.note === currentNote) {
        score++;
        console.log("正解！");
      } else {
        mistakes++;
        console.log("間違い");
      }
      newQuestion();
      break;
    }
  }
}
