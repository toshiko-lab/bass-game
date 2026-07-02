// --- Start of file ---
// --- Keep this ---
// --- Keep this ---

// (他はそのままに、drawの中身を以下に入れ替えてください)

function draw() {
  background(220);
  
  // 1. 五線譜（固定値で描画）
  stroke(0);
  strokeWeight(2);
  let baseLineY = 200; // ここを基準にします
  for (let i = 0; i < 5; i++) {
    line(100, baseLineY + i * 20, width - 100, baseLineY + i * 20);
  }
  
  // 2. ヘ音記号を強制的に特定の場所へ描画
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

  // 4. 正解・不正解表示
  textAlign(CENTER);
  textSize(30);
  text(resultMessage, width / 2, 80);
  
  // 5. 鍵盤（configの値を使用しますが、位置を強制指定）
  fill(255); stroke(0);
  for (let k of config.keys) {
    // 画面下から150pxの位置に固定
    rect(k.x, height - 150, k.w, 120);
  }
  fill(0); noStroke();
  for (let b of config.blackKeys) {
    rect(b.x, height - 150, b.w, 80);
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
