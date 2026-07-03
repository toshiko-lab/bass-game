// --- Start of file ---
// --- Keep this ---
// --- Keep this ---

let gameState = "START";
let currentNote = "";
let resultMessage = "";

// 消えていたスコアとタイマーの変数を復活
let scoreCorrect = 0;
let scoreWrong = 0;
let timer = 60;
let lastSeconds = 0;

function setup() {
  createCanvas(800, 600);
  newQuestion();
}

function draw() {
  background(220);

  if (gameState === "START") {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0);
    text("クリックしてスタート", width / 2, height / 2);
  } else if (gameState === "PLAYING") {
    
    // --- タイマーのカウントダウン処理 ---
    if (second() !== lastSeconds) {
      if (timer > 0) {
        timer--;
      } else {
        gameState = "END"; // 0秒になったら終了
      }
      lastSeconds = second();
    }

    // 1. 五线譜（ごせんふ）
    stroke(0);
    strokeWeight(2);
    let baseLineY = 200;
    for (let i = 0; i < 5; i++) {
      line(100, baseLineY + i * 20, width - 100, baseLineY + i * 20);
    }
    
    // 2. ヘ音記号（本物の記号を最適な位置に描画）
    textAlign(LEFT, CENTER);
    textSize(80);
    fill(0);
    noStroke();
    text('𝄢', 40, baseLineY + 30); // 上から2番目の線(ファ)にぴったり合う位置

    // 3. 音符（側は黒、中は透明で下の線が見える全音符）
    let noteObj = config.noteData.find(n => n.name === currentNote);
    if (noteObj) {
      noFill();         // ★ 中を透明にして五線譜を透けさせる
      stroke(0);        // ★ 側（輪郭）は黒
      strokeWeight(3);  // 少し太めの綺麗な線
      ellipse(width / 2, noteObj.y, 28, 18); // 全音符の形
    }

    // 4. UI（文字情報の表示）
    textAlign(LEFT, TOP);
    textSize(24);
    fill(0);
    noStroke();
    
    // 消えていた「Time」と「正解・まちがい」をここに復活！
    text("Time: " + timer, 50, 40);
    text("正解: " + scoreCorrect, 200, 40);
    text("まちがい: " + scoreWrong, 350, 40);

    // 画面中央に「正解！」「まちがい」を大きく出す
    textAlign(CENTER, TOP);
    textSize(35);
    if (resultMessage === "正解！") fill(0, 150, 0); // 緑色
    if (resultMessage === "まちがい") fill(250, 0, 0); // 赤色
    text(resultMessage, width / 2, 100);
    
    // 5. 鍵盤の描画（common.jsから呼び出し）
    if (typeof drawKeyboard === 'function') {
        drawKeyboard();
    }
  } else if (gameState === "END") {
    // 終了画面
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(250, 0, 0);
    text("タイムアップ！", width / 2, height / 2 - 30);
    textSize(28);
    fill(0);
    text("正解数: " + scoreCorrect + " 回", width / 2, height / 2 + 30);
  }
}

function newQuestion() {
  currentNote = config.noteData[floor(random(config.noteData.length))].name;
}

function mousePressed() {
  if (gameState === "START") {
    gameState = "PLAYING";
    timer = config.timeLimit || 60; // 60秒リセット
    scoreCorrect = 0;
    scoreWrong = 0;
    resultMessage = "";
  } else if (gameState === "PLAYING") {
    // 鍵盤クリック判定
    for (let k of config.keys) {
      if (mouseX > k.x && mouseX < k.x + k.w && mouseY > 450 && mouseY < 570) {
        if (k.note === currentNote) {
          resultMessage = "正解！";
          scoreCorrect++;
        } else {
          resultMessage = "まちがい";
          scoreWrong++;
        }
        newQuestion();
        break;
      }
    }
  } else if (gameState === "END") {
    gameState = "START"; // クリックで最初に戻る
  }
}
