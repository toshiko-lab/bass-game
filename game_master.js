// --- Start of file ---
// --- Keep this ---
// --- Keep this ---

let resultMessage = ""; // 結果を表示するための変数

function setup() {
  createCanvas(windowWidth, windowHeight);
  newQuestion();
}

function draw() {
  background(220);
  
  // 1. 五線譜の描画
  stroke(0);
  strokeWeight(2);
  let baseLineY = 250; 
  for (let i = 0; i < 5; i++) {
    let lineY = baseLineY + i * 20;
    line(100, lineY, windowWidth - 100, lineY);
  }
  
  // ヘ音記号の表示
  noStroke(); fill(0);
  textSize(80);
  text('?:', 30, baseLineY + 65);

  // 2. 音符の描画
  let noteObj = config.noteData.find(n => n.name === currentNote);
  if (noteObj) {
    fill(0);
    ellipse(windowWidth / 2, noteObj.y, 25, 20);
  }

  // 3. 正解・不正解メッセージの表示
  textSize(40);
  textAlign(CENTER);
  text(resultMessage, width / 2, 100);
  
  // 4. 鍵盤の描画
  fill(255); stroke(0);
  for (let k of config.keys) {
    rect(k.x, 450, k.w, 120);
  }
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
    // クリック判定（鍵盤の高さに合わせる）
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
