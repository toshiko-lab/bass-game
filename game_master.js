// --- Start of file ---
// --- Keep this ---
// --- Keep this ---

let resultMessage = "";

function setup() {
  createCanvas(windowWidth, windowHeight);
  newQuestion();
}

function draw() {
  background(220);
  
  // 1. 五線譜の固定位置
  let baseLineY = 150; // 少し上に配置
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < 5; i++) {
    let lineY = baseLineY + i * 20;
    line(100, lineY, windowWidth - 100, lineY);
  }
  
  // ヘ音記号の表示（位置調整）
  noStroke(); fill(0);
  textSize(80);
  text('?:', 30, baseLineY + 65);

  // 2. 音符の描画
  let noteObj = config.noteData.find(n => n.name === currentNote);
  if (noteObj) {
    fill(0);
    // 五線譜の各行(150, 170, 190, 210, 230)に合わせて調整
    ellipse(width / 2, noteObj.y, 25, 20);
  }

  // 3. 正解・不正解メッセージ
  textAlign(CENTER);
  textSize(30);
  text(resultMessage, width / 2, 50);
  
  // 4. 鍵盤の描画（画面下部に配置）
  let keyTopY = height - 150; // 画面下の余白を考慮
  fill(255); stroke(0);
  for (let k of config.keys) {
    rect(k.x, keyTopY, k.w, 120);
  }
  fill(0); noStroke();
  for (let b of config.blackKeys) {
    rect(b.x, keyTopY, b.w, 80);
  }
}

function newQuestion() {
  currentNote = config.noteData[floor(random(config.noteData.length))].name;
  resultMessage = ""; // 問題が変わったらメッセージを消す
}

function mousePressed() {
  let keyTopY = height - 150;
  for (let k of config.keys) {
    if (mouseX > k.x && mouseX < k.x + k.w && mouseY > keyTopY && mouseY < keyTopY + 120) {
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
