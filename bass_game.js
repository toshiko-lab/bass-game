const config = {
  timeLimit: 60,
  noteData: [
    { name: "G", y: 220 }, { name: "A", y: 200 }, { name: "B", y: 180 },
    { name: "C", y: 160 }, { name: "D", y: 140 }, { name: "E", y: 120 },
    { name: "F", y: 100 }, { name: "G_high", y: 80 }
  ]
};
let gameState = "START";
let currentNote = "";
let scoreCorrect = 0;
let scoreWrong = 0;
let timer = 60;
let lastSeconds = 0;
let synth;

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.amp(0);
  synth.start();
  newQuestion();
}

function draw() {
  background(220);
  if (gameState === "START") {
    textAlign(CENTER, CENTER); textSize(40); fill(0);
    text("クリックしてスタート", width / 2, height / 2);
  } else if (gameState === "PLAYING") {
    if (second() !== lastSeconds) {
      if (timer > 0) timer--; else gameState = "END";
      lastSeconds = second();
    }
    // 五線譜・ヘ音記号・音符
    stroke(0); strokeWeight(2);
    let baseLineY = 160; 
    for (let i = 0; i < 5; i++) line(100, baseLineY + i * 20, width - 100, baseLineY + i * 20);
    textAlign(LEFT, TOP); textSize(85); fill(0); text("𝄢", 110, baseLineY - 30);
    let noteObj = config.noteData.find(n => n.name === currentNote);
    if (noteObj) { noFill(); stroke(0); strokeWeight(3); ellipse(width / 2, noteObj.y, 28, 18); }
    
    // 簡易鍵盤描画（画像なしで四角を描く）
    for(let i=0; i<8; i++){
      fill(255); stroke(0); rect(100 + i*60, 430, 60, 140);
    }

    textAlign(LEFT, TOP); textSize(24); fill(0);
    text("Time: " + timer, 50, 40);
    text("OK: " + scoreCorrect, 200, 40);
    text("NO: " + scoreWrong, 350, 40);
  }
}

function newQuestion() {
  currentNote = config.noteData[floor(random(config.noteData.length))].name;
}

function playTone(noteName) {
  let frequencies = { "G": 196.00, "A": 220.00, "B": 246.94, "C": 261.63, "D": 293.66, "E": 329.63, "F": 349.23, "G_high": 392.00 };
  synth.freq(frequencies[noteName] || 440);
  synth.amp(0.3, 0.05);
  setTimeout(() => { synth.amp(0, 0.1); }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (gameState === "PLAYING") {
    // 簡易クリック判定
    let i = floor((mouseX - 100) / 60);
    if (i >= 0 && i < 8 && mouseY > 430 && mouseY < 570) {
      let notes = ["G", "A", "B", "C", "D", "E", "F", "G_high"];
      playTone(notes[i]);
      if (notes[i] === currentNote) scoreCorrect++; else scoreWrong++;
      newQuestion();
    }
  } else if (gameState === "START" || gameState === "END") { gameState = "PLAYING"; timer = 60; }
}
