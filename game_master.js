// --- Start of file ---
// --- Keep this ---
// --- Keep this ---

function setup() {
  createCanvas(windowWidth, windowHeight);
  newQuestion();
}

function draw() {
  background(220);
  
  // 1. 五線譜の描画（第4線が F = 210 になるように設定）
  stroke(0);
  strokeWeight(2); // 線の太さを少し見やすくします
  let fLineY = 210; 
  for (let i = 0; i < 5; i++) {
    // 上から i=0,1,2,3,4 と数える
    // i=3 が F(210) になるよう調整
    let lineY = fLineY - (3 - i) * 20; 
    line(50, lineY, windowWidth - 50, lineY);
  }
  
  // 2. 音符の描画
  let noteObj = config.noteData.find(n => n.name === currentNote);
  if (noteObj) {
    fill(0);
    noStroke();
    ellipse(windowWidth / 2, noteObj.y, 25, 20);
  }
  
  // 3. 鍵盤の描画（共通処理）
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
