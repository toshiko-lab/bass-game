/ --- 共通プログラム (game_master.js) ---
let currentConfig; // ここにト音かヘ音の設定が入る

function setup() {
  createCanvas(600, 760);
  synth = new p5.MonoSynth();
  newQuestion();
}

// 描画などはすべて currentConfig を参照する
function drawNote() {
  noFill();
  stroke(0);
  strokeWeight(2);
  let y = currentConfig.noteYMap[currentNote];
  ellipse(200, y, 24, 18);
  
  // 加線処理などもここで currentConfig を使って条件分岐する
}

function mousePressed() {
  // ... (共通のクリック判定処理)
  // 鍵盤判定も config.keys を使う
  for (let k of currentConfig.keys) {
    if (mouseX > k.x && mouseX < k.x + k.w && mouseY > k.y && mouseY < k.y + k.h) {
      // 判定処理...
    }
  }
}
