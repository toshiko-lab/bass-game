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

let noteData = [
  {name: "G", y: startY + gap * 3.5},
  {name: "A", y: startY + gap * 3},
  {name: "B", y: startY + gap * 2.5},
  {name: "C", y: startY + gap * 2},
  {name: "D", y: startY + gap * 1.5},
  {name: "E", y: startY + gap},
  {name: "F", y: startY + gap * 0.5},
  {name: "G_high", y: startY}
];

function preload() {
  clefImg = loadImage("treble.png");
}

function setup() {
  createCanvas(600, 760);
  synth = new p5.MonoSynth();
  newQuestion();
}

function draw() {
  background(255);

  textAlign(CENTER);
  textSize(30);
  fill(0);

  if (!gameStarted) {
    text("クリックでスタート", width / 2, height / 2);
    return;
  }

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
    gameStarted = true;
    newQuestion();
    return;
  }

  // 黒鍵はスルー
  const whiteKeyWidth = 36;
  const whiteKeyCount = 14;
  const startX = (width - whiteKeyWidth * whiteKeyCount) / 2;

  const blackKeyWidth = 22;
  const blackKeyHeight = 80;
  const pianoY = 520;

  const blackAfter = [
    0, 1,
    3, 4, 5,
    7, 8,
    10, 11, 12
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
    "C", "D", "E", "F", "G", "A", "B",
    "C", "D", "E", "F", "G", "A", "B"
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

      // 今回使う範囲：G～G_high
      if (i >= 4 && i <= 11) {
        checkAnswer(whiteNotes[i]);
      }

      // それ以外は何もしない（スルー）
      return;
    }
  }
}

function checkAnswer(answer) {
  if (answer === currentNote) {
    result = "せいかい！";
    score++;
  } else {
    result = "ちがう！";
    mistakes++;
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

  // 2オクターブ：白鍵14個
  const whiteKeyWidth = 36;
  const whiteKeyHeight = 120;
  const whiteKeyCount = 14;
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

  const blackKeyWidth = 22;
  const blackKeyHeight = 80;

  // ド♯・レ♯・ファ♯・ソ♯・ラ♯
  // × 2オクターブ
  const blackAfter = [
    0, 1,
    3, 4, 5,
    7, 8,
    10, 11, 12
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
