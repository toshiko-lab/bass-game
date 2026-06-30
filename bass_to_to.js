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

// ヘ音記号用の設定
let notes = ["G","A","B","C","D","E","F","G_high"];

// 音符のY座標（ヘ音記号の第1線ソ～第4間ソに配置）
let noteYMap = {
  "G": baseY - 40,
  "A": baseY - 30,
  "B": baseY - 20,
  "C": baseY - 10,
  "D": baseY + 0,
  "E": baseY + 10,
  "F": baseY + 20,
  "G_high": baseY + 30
};

// ヘ音記号用の音の高さ（周波数）
let noteFreq = {
  "G": 98,
  "A": 110,
  "B": 123,
  "C": 131,
  "D": 147,
  "E": 165,
  "F": 175,
  "G_high": 196
};

let keys = [
  {note: "G", x: 100, w: 70},
  {note: "A", x: 170, w: 70},
  {note: "B", x: 240, w: 70},
  {note: "C", x: 310, w: 70},
  {note: "D", x: 380, w: 70},
  {note: "E", x: 450, w: 70},
  {note: "F", x: 520, w: 70},
  {note: "G_high", x: 590, w: 70}
];

let blackKeys = [
  {note: "F#", x: 100 - 9, w: 20},
  {note: "G#", x: 100 + 70 - 20, w: 40},
  {note: "A#", x: 170 + 70 - 20, w: 40},
  {note: "C#", x: 310 + 70 - 20, w: 40},
  {note: "D#", x: 380 + 70 - 20, w: 40},
  {note: "F#_middle", x: 520 + 70 - 20, w: 40},
  {note: "F#_high", x: 590 + 70 - 11 , w: 20}
];

function preload() {
  clefImg = loadImage("bass.png");
}

function setup() {
  let canvas = createCanvas(800, 600);
  // (タッチ操作のイベントリスナーはそのまま)
  canvas.elt.addEventListener('touchstart', function(e) { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
  canvas.elt.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
  document.addEventListener('gesturestart', function(e) { e.preventDefault(); });
  document.addEventListener('gesturechange', function(e) { e.preventDefault(); });
  document.addEventListener('gestureend', function(e) { e.preventDefault(); });

  newQuestion();
  startTime = millis();
}

function draw() {
  background(230);
  if (!gameStarted) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text("クリックでスタート", width/2, height/2);
    return;
  }
  drawStaff();
  drawNote();
  // 鍵盤描画など他の処理は省略していますが、以前と同じです
  for (let k of keys) { fill(255); stroke(0); rect(k.x, 450, k.w, 120); }
  for (let b of blackKeys) { fill(0); noStroke(); rect(b.x, 450, b.w, 80); }
  
  // 結果や時間の表示などの残り処理も以前のコード通り記述してください
  // (文字数制限のため省略しましたが、基本的にはそのままコピペで動作します)
}

function drawStaff() {
  stroke(0);
  for (let i = 0; i < 5; i++) {
    line(width * 0.12, baseY - i * 20, width * 0.88, baseY - i * 20);
  }
  image(clefImg, 50, baseY - 115, 80, 135);
}

function drawNote() {
  let y = noteYMap[question]; // ここで新しい noteYMap を参照します
  if (y === undefined) return;
  noFill();
  stroke(0);
  strokeWeight(2);
  ellipse(300, y, 26, 18);
}

// 他の関数（newQuestion, mousePressed等）もそのまま使えます
function newQuestion() {
  let i = floor(random(notes.length));
  question = notes[i];
}

