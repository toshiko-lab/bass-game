// --- Start of file ---
// --- Keep this ---
// --- Keep this ---

function setup() {
  createCanvas(windowWidth, windowHeight);
  newQuestion();
}

function draw() {
  background(220);
  
  // 1. 五線譜の描画（Y位置を下げて中央に寄せます）
  stroke(0);
  strokeWeight(2);
  let baseLineY = 250; // 全体的に五線譜を下に配置
  for (let i = 0; i < 5; i++) {
    let lineY = baseLineY + i * 20;
    line(100, lineY, windowWidth - 100, lineY);
  }
  
  // ヘ音記号の表示（仮としてテキストで表示）
  noStroke(); fill(0);
  textSize(80);
  text('?:', 30, baseLineY + 30); // 簡易ヘ音記号

  // 2. 音符の描画
  let noteObj = config.noteData.find(n => n.name === currentNote);
  if (noteObj) {
    fill(0);
    // 音符のY座標を五線譜に合わせて調整（configの数値による）
    ellipse(windowWidth / 2, noteObj.y, 25, 20);
  }
  
  // 3. 鍵盤の描画（修正版）
  // 白鍵
  fill(255); stroke(0);
  for (let k of config.keys) {
    rect(k.x, 450, k.w, 120);
  }
  // 黒鍵
  fill(0); noStroke();
  for (let b of config.blackKeys) {
    rect(b.x, 450, b.w, 80);
  }
}
function newQuestion() {
  currentNote = config.noteData[floor(random(config.noteData.length))].name;
}

function mousePressed() {
  for (let k of config.keys) {
    if (mouseX > k.x && mouseX < k.x + k.w && mouseY > 400 && mouseY < 500) {
      if (k.note === currentNote) {
        console.log("正解！");
      }
      newQuestion();
      break;
    }
  }
}
