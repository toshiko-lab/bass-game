let gameState = "START";
let currentNote = "";
let resultMessage = "";

let scoreCorrect = 0;
let scoreWrong = 0;
let timer = 60;
let lastSeconds = 0;

// 🔊 電子音（シンセサイザー）用の変数
let synth;

// 🎹 鍵盤の配置データ（画面の並びを綺麗にするためにここで定義します）
// 白鍵9本（低いソから高いソまで：G, A, B, C, D, E, F, G, A）
const whiteKeysData = [
  { note: "G",      x: 100 },
  { note: "A",      x: 160 },
  { note: "B",      x: 220 },
  { note: "C",      x: 280 },
  { note: "D",      x: 340 },
  { note: "E",      x: 400 },
  { note: "F",      x: 460 },
  { note: "G_high", x: 520 },
  { note: "A_high", x: 580 } // 右端の予備
];

// 黒鍵6本（白鍵の隙間に正しく配置：2本・3本のピアノの並びに修正）
const blackKeysData = [
  // 【最初の2本の塊】
  { name: "G#",  x: 142 }, // 低いソ と 低いラ の間
  { name: "A#",  x: 202 }, // 低いラ と 低いシ の間（枠線に被らない綺麗な位置）
  
  // ※ 低いシ と ド の間には黒鍵はありません（隙間が空きます）

  // 【次の3本の塊】
  { name: "C#",  x: 322 }, // ド と レ の間
  { name: "D#",  x: 382 }, // レ と ミ の間
  { name: "F#",  x: 502 }, // ファ と 高いソ の間
  
  // 【次の塊の始まり】
  { name: "G#2", x: 562 }  // 高いソ と 高いラ の間
];

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
    
    // 2. ヘ音記号（𝄢）の描画
    // ★大きさを「第2線から第5線」の幅（60px分）に合わせ、2つの点が第4線を挟むように調整
    push();
    textAlign(LEFT, TOP);
    textSize(105); // サイズを大きくして第2〜第5線に合わせます
    fill(0);
    noStroke();
    textFont("Georgia"); 
    // 横位置110、縦位置は第5線(200)の上付近から描画すると綺麗に収まります
    text("𝄢", 110, baseLineY - 26); 
    pop();

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
    
    // 5. 🛠️ 鍵盤の描画（ズレをなくすため、ここで直接綺麗に描画します）
    let kw = 60;  // 白鍵の幅
    let kh = 140; // 白鍵の高さ
    let bY = 430; // 鍵盤の開始Y座標
    
    // ① 白鍵の描画
    for (let k of whiteKeysData) {
      stroke(0);
      strokeWeight(1.5);
      fill(255);
      rect(k.x, bY, kw, kh);
    }
    
    // ② 黒鍵の描画（音を出すためではなく、目印として綺麗に配置）
    let b_kw = 36; // 黒鍵の幅
    let b_kh = 85; // 黒鍵の高さ
    for (let b of blackKeysData) {
      stroke(0);
      strokeWeight(1);
      fill(0);
      rect(b.x, bY, b_kw, b_kh);
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
  
  let freq = frequencies[noteName] || 440;
  
  synth.freq(freq);
  synth.amp(0.3, 0.05);
  
  setTimeout(() => {
    synth.amp(0, 0.1);
  }, 200);
}

function mousePressed() {
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
    
    let bY = 430;
    let b_kw = 36;
    let b_kh = 85;
    let kw = 60;
    let kh = 140;

    // 【判定1】黒鍵がクリックされたら「まちがい」（音は鳴らさない）
    let clickedBlack = false;
    for (let b of blackKeysData) {
      if (mouseX > b.x && mouseX < b.x + b_kw && mouseY > bY && mouseY < bY + b_kh) { 
        resultMessage = "まちがい";
        scoreWrong++;
        newQuestion();
        clickedBlack = true;
        break;
      }
    }

    // 【判定2】黒鍵が押されていなければ、白鍵の判定を行う
    if (!clickedBlack) {
      for (let k of whiteKeysData) {
        if (mouseX > k.x && mouseX < k.x + kw && mouseY > bY && mouseY < bY + kh) {
          
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
    }
  } else if (gameState === "END") {
    gameState = "START";
  }
}
