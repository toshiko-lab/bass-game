let gameState = "PLAYING"; 
let currentNote = "G";
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
  
  // 2. 音符表示
  fill(0); ellipse(400, 240, 20, 15);
  
  // 3. UI
  textSize(24); fill(0);
  text("正解: " + scoreCorrect + "  間違い: " + scoreWrong, 100, 50);
}

function playTone(freq) {
  synth.freq(freq);
  synth.amp(0.3, 0.02);
  // 0.2秒後に強制的に音を止める「安全装置」
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  
  // クリック位置で音を鳴らす（仮の判定ロジック）
  // 画面下部(400-600)をクリックしたとき
  if (mouseY > 400) {
    playTone(261.63); // ドの音をテストで鳴らす
    scoreCorrect++;
  }
}
