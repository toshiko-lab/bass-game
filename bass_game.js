let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

// 鍵盤と対応する音（ファソラシドレミファソラ）
let noteFreqs = [174.61, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00];
// 五線譜上の音符の高さ（第1線のソ〜第4間のソ）
let noteYs = [240, 220, 200, 180, 160, 140, 120, 100, 80, 60]; 
let currentNoteIndex = 0;

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
  newQuestion();
}

function newQuestion() {
  currentNoteIndex = floor(random(10)); // 0~9のどれか
}

function draw() {
  background(255);
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }
  
  textSize(30); fill(0);
  text("Time " + timer + "   Yes " + scoreYes + "   No " + scoreNo, 50, 40);

  // 五線譜
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // ヘ音記号
  textSize(100); noStroke(); fill(0);
  text("𝄢", 25, 250);

  // 全音符を表示
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, noteYs[currentNoteIndex], 25, 20);
  
  // 鍵盤
  for (let i = 0; i < 10; i++) {
    stroke(0); fill(255);
    rect(50 + i * 70, 400, 70, 150);
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let index = floor((mouseX - 50) / 70);
    if (index >= 0 && index < 10) {
      synth.freq(noteFreqs[index]);
      synth.amp(0.3, 0.05);
      setTimeout(() => { synth.amp(0, 0.05); }, 200);
      
      // 正誤判定
      if (index === currentNoteIndex) scoreYes++; else scoreNo++;
      newQuestion();
    }
  }
}
