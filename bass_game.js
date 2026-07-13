let gameState = "PLAYING";
let currentNote = "B"; // 第3線の音をBとします
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
  // 五線譜
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // 音符
  fill(0); ellipse(400, 200, 25, 20); // 第3線に配置
  
  // 鍵盤の枠（画像なしで鍵盤の位置を示す）
  stroke(0); fill(240);
  rect(100, 400, 600, 150);
  
  // UI
  textSize(24); fill(0);
  text("正解: " + scoreCorrect + "  間違い: " + scoreWrong, 100, 50);
}

function playTone(freq) {
  synth.freq(freq);
  synth.amp(0.3, 0.02);
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  
  // 鍵盤エリアをクリックしたら反応
  if (mouseY > 400) {
    let clickedFreq = 246.94; // Bの音
    playTone(clickedFreq);
    
    // 正解判定
    if (currentNote === "B") {
      scoreCorrect++;
    } else {
      scoreWrong++;
    }
  }
}
