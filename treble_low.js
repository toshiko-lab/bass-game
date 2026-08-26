let startY = 250;
let gap = 20;

let clefImg;

let gameStarted = false;
let gameOver = false;
let score = 0;
let mistakes = 0;
let result = "";
let synth;

let currentNote;
let noteY;
let startTime;
let timeLimit = 60;

let noteData = [
  {name: "ソ", y: startY + gap * 3.5},
  {name: "ラ", y: startY + gap * 3},
  {name: "シ", y: startY + gap * 2.5},
  {name: "ド", y: startY + gap * 2},
  {name: "レ", y: startY + gap * 1.5},
  {name: "ミ", y: startY + gap},
  {name: "ファ", y: startY + gap * 0.5},
  {name: "ソ_high", y: startY}
];
function preload() {
  clefImg = loadImage("treble.png");
}

function setup() {
  createCanvas(600, 760);
  synth = new p5.MonoSynth();
  synth.setVolume(0.5);
  newQuestion();
}

function draw() {
  background(255);

  textAlign(CENTER);
  textSize(30);
  fill(0);

 if (!gameStarted) {

  if (gameOver) {
    textSize(36);
    fill(0);
    text("終了！", width / 2, 150);

    textSize(28);
    text("正解：" + score, width / 2, 210);
    text("ミス：" + mistakes, width / 2, 250);

    textSize(24);
    text("クリックでスタート", width / 2, 330);

  } else {
    textSize(30);
    fill(0);
    text("クリックでスタート", width / 2, height / 2);
  }

  return;
}
// タイマー
let elapsed = int((millis() - startTime) / 1000);
let remaining = max(0, timeLimit - elapsed);

textAlign(RIGHT);
textSize(24);
fill(0);
text("Time: " + remaining, width - 20, 35);

// 60秒終了
if (remaining <= 0) {
  gameStarted = false;
  gameOver = true;
  return;
}

textAlign(CENTER);

  text("ト音記号 ト～1点ト", width / 2, 55);

  // ト音記号
  image(clefImg, -10, 210, 110, 160);

  drawStaff();
  drawNote();
  drawKeyboard();

  if (result !== "") {
    textSize(32);
    fill(255, 0, 0);
    text(result, width / 2, 100);
  }
}
 

function mousePressed() {

  // スタート
 if (!gameStarted) {
  userStartAudio();
  getAudioContext().resume();

  score = 0;
  mistakes = 0;
  result = "";
  gameOver = false;

  gameStarted = true;
  startTime = millis();
  newQuestion();
  return;
}

  // 黒鍵はスルー
  const whiteKeyWidth = 50;
  const whiteKeyCount = 8;
  const startX = (width - whiteKeyWidth * whiteKeyCount) / 2;

  const blackKeyWidth = 30;
  const blackKeyHeight = 80;
  const pianoY = 520;

  const blackAfter = [
    0, 1,
    3, 4,
    6, 7
  ];

  for (let i of blackAfter) {
    const x =
      startX +
      (i + 1) * whiteKeyWidth -
      blackKeyWidth / 2;

    if (
      mouseX >= x &&
      mouseX < x + blackKeyWidth &&
      mouseY >= pianoY &&
      mouseY < pianoY + blackKeyHeight
    ) {
      return;
    }
  }

  // 白鍵の音名
  const whiteNotes = [
    "ソ",
    "ラ",
    "シ",
    "ド",
    "レ",
    "ミ",
    "ファ",
    "ソ_high"
  ];

  // 白鍵をクリックしたか
  for (let i = 0; i < whiteNotes.length; i++) {

    const x = startX + i * whiteKeyWidth;

    if (
      mouseX >= x &&
      mouseX < x + whiteKeyWidth &&
      mouseY >= pianoY &&
      mouseY < pianoY + 120
    ) {

      checkAnswer(whiteNotes[i]);
      return;
    }
  }
}

function checkAnswer(answer) {
 const noteFreq = {
  "ソ": 196,
  "ラ": 220,
  "シ": 247,
  "ド": 262,
  "レ": 294,
  "ミ": 330,
  "ファ": 349,
  "ソ_high": 392
};

  if (answer === currentNote) {
    result = "せいかい！";
    score++;
  } else {
    result = "ちがう！";
    mistakes++;
  }

  if (synth && noteFreq[answer]) {
    synth.play(noteFreq[answer], 0.5, 0, 0.3);
  }

  newQuestion();
}
function drawStaff() {
  stroke(0);

  for (let i = 0; i < 5; i++) {
    line(50, startY + i * gap, 550, startY + i * gap);
  }
}
function drawNote() {
noFill();
stroke(0);
strokeWeight(2);
ellipse(200, noteY, 24, 18);
}

function drawKeyboard() {

  // 白鍵8個：ソ・ラ・シ・ド・レ・ミ・ファ・ソ
  const whiteKeyWidth = 50;
  const whiteKeyHeight = 120;
  const whiteKeyCount = 8;
  const startX = (width - whiteKeyWidth * whiteKeyCount) / 2;
  const pianoY = 520;

  // 白鍵
  fill(255);
  stroke(0);
  strokeWeight(2);

  for (let i = 0; i < whiteKeyCount; i++) {
    rect(
      startX + i * whiteKeyWidth,
      pianoY,
      whiteKeyWidth,
      whiteKeyHeight
    );
  }

  // 黒鍵
  fill(0);

  const blackKeyWidth = 30;
  const blackKeyHeight = 80;

  // ソ♯・ラ♯・ド♯・レ♯・ファ♯・ソ♯
  const blackAfter = [
    0, 1,
    3, 4,
    6, 7
  ];

  for (let i of blackAfter) {
    const x =
      startX +
      (i + 1) * whiteKeyWidth -
      blackKeyWidth / 2;

    rect(
      x,
      pianoY,
      blackKeyWidth,
      blackKeyHeight
    );
  }
}
function newQuestion() {
  let current = random(noteData);
  currentNote = current.name;
  noteY = current.y;
}
