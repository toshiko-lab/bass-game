// 音符のデータ
const config = {
  timeLimit: 60,
  noteData: [
    { name: "G", y: 220 },
    { name: "A", y: 200 },
    { name: "B", y: 180 },
    { name: "C", y: 160 },
    { name: "D", y: 140 },
    { name: "E", y: 120 },
    { name: "F", y: 100 },
    { name: "G_high", y: 80 }
  ]
};
let gameState = "START";
let currentNote = "";
let resultMessage = "";
let scoreCorrect = 0;
let scoreWrong = 0;
let timer = 60;
let lastSeconds = 0;
let synth;
let keyboardImg;

function preload() {
  keyboardImg = loadImage('keyboard.svg');
}

const whiteKeysData = [
  { note: "G", x: 100 }, { note: "A", x: 160 }, { note: "B", x: 220 },
  { note: "C", x: 280 }, { note: "D", x: 340 }, { note: "E", x: 400 },
  { note: "F", x: 460 }, { note: "G_high", x: 520 }, { note: "A_high", x: 580 }
];

const blackKeysData = [
  { name: "G#", x: 142 }, { name: "A#", x: 202 }, { name: "C#", x: 322 },
  { name: "D#", x: 382 }, { name: "F#", x: 502 }, { name: "G#2", x: 562 }
];

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
    stroke(0); strokeWeight(2);
    let baseLineY = 160; 
    for (let i = 0; i < 5; i++) {
      line(100, baseLineY + i * 20, width - 100, baseLineY + i * 20);
    }
    push();
    textAlign(LEFT, TOP);
    textSize(85); fill(0);
    text("𝄢", 110, baseLineY - 30);
    pop();
    let noteObj = config.noteData.find(n => n.name === currentNote);
    if (noteObj) {
      noFill(); stroke(0); strokeWeight(3);
      ellipse(width / 2, noteObj.y, 28, 18);
    }
    image(keyboardImg, 100, 430, 600, 140);
    textAlign(LEFT, TOP); textSize(24); fill(0);
    text("Time: " + timer, 50, 40);
    text("OK: " + scoreCorrect, 200, 40);
    text("NO: " + scoreWrong, 350, 40);
  } else if (gameState === "END") {
    textAlign(CENTER, CENTER); textSize(40); fill(250, 0, 0);
    text("終了！ 正解数: " + scoreCorrect, width / 2, height / 2);
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
    for (let k of whiteKeysData) {
      if (mouseX > k.x && mouseX < k.x + 60 && mouseY > 430 && mouseY < 570) {
        playTone(k.note);
        if (k.note === currentNote) { scoreCorrect++; } else { scoreWrong++; }
        newQuestion(); break;
      }
    }
  } else if (gameState === "START" || gameState === "END") { gameState = "PLAYING"; timer = 60; }
}
