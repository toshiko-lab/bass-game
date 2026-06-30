let baseY = 300;
let question = "G";
let result = "";
let startTime;
let timeLimit = 60;
let gameOver = false;
let gameStarted = false;
let score = 0;
let mistakes = 0;
let clefImg;
let notes = ["G","A","B","C","D","E","F","G_high"];

let noteYMap = {
  "G": baseY - 40, "A": baseY - 30, "B": baseY - 20, "C": baseY - 10,
  "D": baseY + 0, "E": baseY + 10, "F": baseY + 20, "G_high": baseY + 30
};

let noteFreq = {
  "G": 98, "A": 110, "B": 123, "C": 131,
  "D": 147, "E": 165, "F": 175, "G_high": 196
};

let keys = [
  {note: "G", x: 100, w: 70}, {note: "A", x: 170, w: 70}, {note: "B", x: 240, w: 70},
  {note: "C", x: 310, w: 70}, {note: "D", x: 380, w: 70}, {note: "E", x: 450, w: 70},
  {note: "F", x: 520, w: 70}, {note: "G_high", x: 590, w: 70}
];

let blackKeys = [
  {note: "F#", x: 100-9, w: 20}, {note: "G#", x: 100+70-20, w: 40}, {note: "A#", x: 170+70-20, w: 40},
  {note: "C#", x: 310+70-20, w: 40}, {note: "D#", x: 380+70-20, w: 40}, {note: "F#_middle", x: 520+70-20, w: 40},
  {note: "F#_high", x: 590+70-11, w: 20}
];

function preload() { clefImg = loadImage("bass.png"); }

function setup() {
  let canvas = createCanvas(800, 600);
  newQuestion();
}

function draw() {
  background(230);
  if (!gameStarted) {
    textAlign(CENTER, CENTER); textSize(32); fill(0);
    text("クリックでスタート", width/2, height/2);
    return;
  }
  drawStaff(); drawNote();
  for (let k of keys) { fill(255); stroke(0); rect(k.x, 450, k.w, 120); }
  for (let b of blackKeys) { fill(0); noStroke(); rect(b.x, 450, b.w, 80); }
  
  fill(0); textSize(24); textAlign(LEFT);
  let elapsed = int((millis() - startTime) / 1000);
  let remaining = max(0, timeLimit - elapsed);
  text("Time: " + remaining, 50, 50);
  text("正解数: " + score, 250, 50);
  text("ミス数: " + mistakes, 450, 50);

  if (remaining <= 0) gameOver = true;
  if (gameOver) {
    textAlign(CENTER); textSize(36); text("終了！", width/2, height/2);
    return;
  }
}

function drawStaff() {
  stroke(0);
  for (let i = 0; i < 5; i++) { line(width*0.12, baseY - i*20, width*0.88, baseY - i*20); }
  image(clefImg, 50, baseY - 115, 80, 135);
}

function drawNote() {
  let y = noteYMap[question];
  noFill(); stroke(0); strokeWeight(2); ellipse(300, y, 26, 18);
}

function newQuestion() { question = notes[floor(random(notes.length))]; }

function mousePressed() {
  if (!gameStarted) { gameStarted = true; startTime = millis(); return; }
  if (gameOver) { score=0; mistakes=0; gameOver=false; startTime=millis(); newQuestion(); return; }
  
  let answer = "";
  for (let b of blackKeys) { if (mouseX > b.x && mouseX < b.x+b.w && mouseY > 450 && mouseY < 530) answer = b.note; }
  for (let k of keys) { if (mouseX > k.x && mouseX < k.x+k.w && mouseY > 450 && mouseY < 570) answer = k.note; }
  
  if (answer === question) { score++; } else { mistakes++; }
  newQuestion();
}
