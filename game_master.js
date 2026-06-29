// --- プログラムの心臓部 ---
// 設定ファイル（config_treble.jsなど）からデータを受け取る箱
let config; 
let synth, clefImg;
let question, score = 0, mistakes = 0, gameStarted = false, result = "";

// 1. 設定データが読み込まれた後に画像を読み込む
function preload() {
  if (config) {
    clefImg = loadImage(config.clefImg);
  }
}

function setup() {
  let canvas = createCanvas(800, 600);
  // iPadタッチ対策
  canvas.elt.addEventListener('touchstart', (e) => { if(e.touches.length > 1) e.preventDefault(); }, {passive: false});
  synth = new p5.MonoSynth();
  
  // 最初の問題をセット
  if (typeof newQuestion === 'function') {
    newQuestion();
  }
}

function draw() {
  background(230);
  
  // まだconfigが読み込まれていない場合はここでストップ
  if (!config) {
    textAlign(CENTER, CENTER);
    text("設定ファイルを読み込んでいます...", width/2, height/2);
    return;
  }

  if (!gameStarted) {
    textAlign(CENTER, CENTER);
    textSize(32);
    text("クリックでスタート", width/2, height/2);
    return;
  }

  // --- 共通の描画処理 ---
  drawStaff();
  drawNote();
  drawKeyboard();

  // (※以下、先生の既存の得点・時間表示ロジックをここに移植してください)
}

// 共通の鍵盤描画関数
function drawKeyboard() {
  // 白鍵
  for (let k of config.keys) {
    fill(255); stroke(0);
    rect(k.x, 450, k.w, 120);
  }
  // 黒鍵
  fill(0); noStroke();
  for (let b of config.blackKeys) {
    rect(b.x, 450, b.w, 80);
  }
}

// --- 共通のクリック判定 ---
function mousePressed() {
  // iPadで音を出すための必須処理
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  
  // (※ここに、config.keys を使ったクリック判定ロジックを移植してください)
}
