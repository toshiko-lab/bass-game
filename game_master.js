let currentNote;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newQuestion();
}

function draw() {
  background(220);
  
 // 五線譜の基準となるFのラインを210に合わせる
let fLineY = 210; 
stroke(0);
for (let i = 0; i < 5; i++) {
  // 第4線がF(210)になるように計算：ラインは20px間隔
  // 上から順に: 150, 170, 190, 210(F), 230
  let lineY = fLineY - (3 - i) * 20; 
  line(50, lineY, windowWidth - 50, lineY);
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
