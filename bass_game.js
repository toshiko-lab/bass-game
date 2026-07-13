let gameState = "PLAYING";
let scoreCorrect = 0;
let scoreWrong = 0;
let synth;

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
}

function draw() {
  background(255);
  // 1. 五線譜
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // 2. 音符（第3線に配置）
  fill(0); ellipse(400, 240, 25, 20); 
  
  // 3. 8つの鍵盤を描画
  stroke(0);
  for (let i = 0; i < 8; i++) {
    fill(240);
    rect(100 + i * 75, 400, 75, 150);
  }
  
  // 4. UI
  textSize(24); fill(0);
  text("正解: " + scoreCorrect + "  間違い: " + scoreWrong, 100, 50);
}

// ここが心臓部です。音を鳴らして200ミリ秒後に確実に消します。
function playTone(freq) {
  synth.freq(freq);
  synth.amp(0.3, 0.02);
  setTimeout(() => {
    synth.amp(0, 0.05);
  }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  
  // 鍵盤エリアをクリックした時の判定
  if (mouseY > 400 && mouseY < 550) {
    let keyIndex = floor((mouseX - 100) / 75);
    if (keyIndex >= 0 && keyIndex < 8) {
      // ドレミファソラシドの周波数
      let freqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
      
      playTone(freqs[keyIndex]);
      
      // 正解判定（今は0番目の鍵盤＝ドを正解としています）
      if (keyIndex === 0) {
        scoreCorrect++;
      } else {
        scoreWrong++;
      }
    }
  }
}
