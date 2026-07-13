let gameState = "PLAYING";
// 8つの鍵盤に対応する音名
let noteNames = ["C", "D", "E", "F", "G", "A", "B", "C_high"];
let freqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
let currentNoteIndex = 0; // 現在の問題のインデックス
let scoreCorrect = 0;
let scoreWrong = 0;
let synth;

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
  newQuestion(); // 最初の一問を作る
}

function newQuestion() {
  currentNoteIndex = floor(random(8)); // 0〜7の間でランダムに
}

function draw() {
  background(255);
  // 1. 五線譜
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // 2. 音符（現在の問題に基づいて位置を変える）
  // 今は簡易的に第3線(C)周辺に表示します
  fill(0); ellipse(400, 240 - currentNoteIndex * 10, 25, 20); 
  
  // 3. 8つの鍵盤を描画
  stroke(0);
  for (let i = 0; i < 8; i++) {
    fill(240);
    rect(100 + i * 75, 400, 75, 150);
  }
  
  // 4. UI
  textSize(24); fill(0);
  text("正解: " + scoreCorrect + "  間違い: " + scoreWrong, 100, 50);
  text("問題: " + noteNames[currentNoteIndex] + " を押してね", 100, 100);
}

function playTone(freq) {
  synth.freq(freq);
  synth.amp(0.3, 0.02);
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  
  if (mouseY > 400 && mouseY < 550) {
    let keyIndex = floor((mouseX - 100) / 75);
    if (keyIndex >= 0 && keyIndex < 8) {
      playTone(freqs[keyIndex]);
      
      // 正誤判定
      if (keyIndex === currentNoteIndex) {
        scoreCorrect++;
        newQuestion(); // 正解したら次の問題へ
      } else {
        scoreWrong++;
      }
    }
  }
}
