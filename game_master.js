// --- Start of file ---
// --- Keep this ---
// --- Keep this ---

let gameState = "START";
let currentNote = "";
let resultMessage = "";

function setup() {
  createCanvas(800, 600);
  newQuestion();
}

function draw() {
  background(220);

  if (gameState === "START") {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0);
    text("クリックしてスタート", width / 2, height / 2);
  } else {
    // 1. 五線譜
    stroke(0);
    strokeWeight(2);
    let baseLineY = 200;
    for (let i = 0; i < 5; i++) {
      line(100, baseLineY + i * 20, width - 100, baseLineY + i * 20);
    }
    
    // 2. ヘ音記号
    textAlign(LEFT, CENTER);
    textSize(60);
    fill(0);
    text('?:', 40, baseLineY + 40); 

    // 3. 音符
    let noteObj = config.noteData.find(n => n.name === currentNote);
    if (noteObj) {
      fill(0); noStroke();
      ellipse(width / 2, noteObj.y, 25, 20);
    }

    // 4. UI（メッセージ）
    textAlign(CENTER);
    textSize(30);
    text(resultMessage, width / 2, 80);
    
    // 5. 鍵盤（common.jsの関数）
    if (typeof drawKeyboard === 'function') {
        drawKeyboard();
    }
  }
}

function newQuestion() {
  currentNote = config.noteData[floor(random(config.noteData.length))].name;
  resultMessage = "";
}

function mousePressed() {
  if (gameState === "START") {
    gameState = "PLAYING";
  } else {
    // 鍵盤クリック判定（common.jsのconfigを使用）
    for (let k of config.keys) {
      if (mouseX > k.x && mouseX < k.x + k.w && mouseY > 450 && mouseY < 570) {
        if (k.note === currentNote) {
          resultMessage = "正解！";
        } else {
          resultMessage = "まちがい";
        }
        newQuestion();
        break;
      }
    }
  }
}
