// --- 1. 設定データ (全モード分をここに集約) ---
const GAME_CONFIG = {
  treble: {
    clefImg: "treble.png",
    yOffset: 300, // ト音記号の五線の基準位置
    // ト音記号の白鍵
    keys: [
      {note: "F", x: 40, w: 50}, {note: "G", x: 90, w: 50}, {note: "A", x: 140, w: 50},
      {note: "B", x: 190, w: 50}, {note: "C", x: 240, w: 50}, {note: "D", x: 290, w: 50},
      {note: "E", x: 340, w: 50}, {note: "F", x: 390, w: 50}, {note: "G", x: 440, w: 50},
      {note: "A", x: 490, w: 50}, {note: "B", x: 540, w: 50}
    ],
    blackKeys: [
      {x: 75, w: 30}, {x: 125, w: 30}, {x: 175, w: 30}, {x: 275, w: 30},
      {x: 325, w: 30}, {x: 425, w: 30}, {x: 475, w: 30}, {x: 525, w: 30}
    ]
  },
  bass: {
    clefImg: "bass.png",
    yOffset: 300, // ヘ音記号の基準位置
    keys: [
      {note: "G", x: 100, w: 70}, {note: "A", x: 170, w: 70}, {note: "B", x: 240, w: 70},
      {note: "C", x: 310, w: 70}, {note: "D", x: 380, w: 70}, {note: "E", x: 450, w: 70},
      {note: "F", x: 520, w: 70}, {note: "G_high", x: 590, w: 70}
    ],
    blackKeys: [
      {x: 91, w: 20}, {x: 150, w: 40}, {x: 220, w: 40}, {x: 290, w: 40},
      {x: 360, w: 40}, {x: 500, w: 40}, {x: 579, w: 20}
    ]
  }
};

// --- 2. モード選択と共通変数 ---
let currentMode = 'bass'; // ★ここを 'treble' か 'bass' に切り替えるだけ！
let config = GAME_CONFIG[currentMode];
let synth, clefImg, question, score = 0, mistakes = 0, gameStarted = false, result = "";

function preload() {
  clefImg = loadImage(config.clefImg);
}

function setup() {
  let canvas = createCanvas(800, 600);
  // iPadタッチ対策
  canvas.elt.addEventListener('touchstart', (e) => { if(e.touches.length > 1) e.preventDefault(); }, {passive: false});
  synth = new p5.MonoSynth();
}

function draw() {
  background(230);
  if (!gameStarted) {
    textAlign(CENTER, CENTER); text("クリックでスタート", width/2, height/2);
    return;
  }
  
  // 描画処理 (共通化)
  drawStaff();
  drawKeyboard();
  // ...ここから先は先生の既存の draw() ロジックを少し当てはめてください
}

function drawKeyboard() {
  // 共通の描画処理で config.keys を使う
  for (let k of config.keys) {
    fill(255); stroke(0); rect(k.x, 450, k.w, 120);
  }
  fill(0); noStroke();
  for (let b of config.blackKeys) {
    rect(b.x, 450, b.w, 80);
  }
}
