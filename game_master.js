let currentNote;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newQuestion();
}

function draw() {
  background(220);
  
  // 1. 五線譜の描画
  stroke(0);
  for (let i = 0; i < 5; i++) {
    line(50, 200 + i * 20, windowWidth - 50, 200 + i * 20);
  }
  
  // 2. 音符の描画（configのY座標をそのまま使う）
  let noteObj = config.noteData.find(n => n.name === currentNote);
  if (noteObj) {
    fill(0);
    ellipse(windowWidth / 2, noteObj.y, 25, 20);
  }
  
  // 3. 鍵盤の描画
  fill(255); stroke(0);
  for (let k of config.keys) {
    rect(k.x, 400, k.w, 100);
  }
  fill(0);
  for (let bk of config.blackKeys) {
    rect(bk.x, 400, bk.w, 60);
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
