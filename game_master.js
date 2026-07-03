// --- Start of file ---
// --- Keep this ---
// --- Keep this ---

let gameState = "START";
let currentNote = "";
let resultMessage = "";

let scoreCorrect = 0;
let scoreWrong = 0;
let timer = 60;
let lastSeconds = 0;

// 🔊 電子音（シンセサイザー）用の変数
let synth;

function setup() {
  createCanvas(800, 600);
  
  // p5.jsの電子音（サイン波）を準備
  synth = new p5.Oscillator('sine');
  synth.amp(0); // 最初は音量を0に
  synth.start();
  
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

    // 1. 五線譜（ごせんふ）
    stroke(0);
    strokeWeight(2);
    let baseLineY = 200; // 一番上の線（第5線 = ラ）
    for (let i = 0; i < 5; i++) {
      line(100, baseLineY + i * 20, width - 100, baseLineY + i * 20);
    }
    
    // 2. ヘ音記号（基準線にぴったり合わせる）
    textAlign(LEFT, CENTER);
    textSize(80);
    fill(0);
    noStroke();
    // ヘ音記号の「：」の点が、上から2番目の線（第4線=ファ）を挟む位置に修正
    text('𝄢', 40, baseLineY + 25); 

    // 3. 音符（config_bass.jsの修正値に合わせて正確に中央描画）
    let noteObj = config.noteData.find(n => n.name === currentNote);
    if (noteObj) {
      noFill();         // 中を透明にして五線譜を透けさせる
      stroke(0);        // 側（輪郭）は黒
      strokeWeight(3);  // 少し太めの綺麗な線
      ellipse(width / 2, noteObj.y, 28, 18); // 全音符の形
    }

    // 4. UI（文字情報の表示）
    textAlign(LEFT, TOP);
    textSize(24);
    fill(0);
    noStroke();
    
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

// 🔊 指定した周波数でピッと電子音を鳴らす関数
function playTone(noteName) {
  // 音名ごとの周波数（Hz）マッピング
  let frequencies = {
    "G": 196.00,       // 低いソ
    "A": 220.00,       // 低いラ
    "B": 246.94,       // 低いシ
    "C": 261.63,       // ド
    "D": 293.66,       // レ
    "E": 329.63,       // ミ
    "F": 349.23,       // ファ
    "G_high": 392.00   // 高いソ
  };
  
  let freq = frequencies[noteName] || 440; // 見つからない場合は基本のラ(440Hz)
  
  synth.freq(freq);
  synth.amp(0.3, 0.05); // 音量0.3に（0.05秒かけてフェードイン）
  
  // 0.2秒後に音を止める
  setTimeout(() => {
    synth.amp(0, 0.1); // 0.1秒かけてフェードアウト
  }, 200);
}

function mousePressed() {
  // ブラウザのセキュリティ制限解除のため、クリック時にオーディオコンテキストを再開
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  if (gameState === "START") {
    gameState = "PLAYING";
    timer = config.timeLimit || 60;
    scoreCorrect = 0;
    scoreWrong = 0;
    resultMessage = "";
  } else if (gameState === "PLAYING") {
    // 白鍵のクリック判定（Y: 430〜570）
    for (let k of config.keys) {
      if (mouseX > k.x && mouseX < k.x + k.w && mouseY > 430 && mouseY < 570) {
        
        // 🔊 押した鍵盤の音を鳴らす！
        playTone(k.note);

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
    gameState = "START";
  }
}
