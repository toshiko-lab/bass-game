let gameState = "START";
let currentNote = "";
let resultMessage = "";

let scoreCorrect = 0;
let scoreWrong = 0;
let timer = 60;
let lastSeconds = 0;

// 🔊 電子音（シンセサイザー）用の変数
let synth;

// 🎹 【仕様通りに修正】白鍵10本（低いファ から 高いラ まで）
// 左端のG(ソ)問題の前の「F(ファ)」からスタートし、生徒が位置を理解できるように10本並べます
const whiteKeysData = [
  { note: "F_low",  x: 100 }, // 1: 低いファ
  { note: "G",      x: 155 }, // 2: 低いソ (第1線)
  { note: "A",      x: 210 }, // 3: 低いラ
  { note: "B",      x: 265 }, // 4: 低いシ
  { note: "C",      x: 320 }, // 5: ド
  { note: "D",      x: 375 }, // 6: レ
  { note: "E",      x: 430 }, // 7: ミ
  { note: "F",      x: 485 }, // 8: ファ
  { note: "G_high", x: 540 }, // 9: 高いソ (第4間)
  { note: "A_high", x: 595 }  // 10:高いラ
];

// 🎹 【仕様通りに修正】黒鍵（白鍵10本の隙間に完全に合わせた配置）
// 幅55pxの白鍵に対して、境界線の真上に綺麗にまたがるように座標を計算しています
const blackKeysData = [
  // --- 最初の3本の塊 ---
  { name: "F#_low", x: 137 }, // ファ と ソ の間
  { name: "G#",     x: 192 }, // ソ と ラ の間
  { name: "A#",     x: 247 }, // ラ と シ の間 ★被らず綺麗な位置！
  
  // 💡 シ と ド の間（265〜320px）は「無し」

  // --- 次の2本の塊 ---
  { name: "C#",     x: 357 }, // ド と レ の間
  { name: "D#",     x: 412 }, // レ と ミ の間
  
  // 💡 ミ と ファ の間（430〜485px）は「無し」

  // --- 次の2本の塊 ---
  { name: "F#",     x: 522 }, // ファ と ソ の間
  { name: "G#_high",x: 577 }  // ソ と ラ の間
];

function setup() {
  createCanvas(800, 600);
  
  // p5.jsの電子音（サイン波）を準備
  synth = new p5.Oscillator('sine');
  synth.amp(0); 
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
        gameState = "END";
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
    // ★サイズを「65」に抑え、第2線〜第5線にピッタリ美しく収まる位置にコントロールします
    push();
    textAlign(LEFT, TOP);
    textSize(65);      
    fill(0);
    noStroke();
    textFont("Georgia"); 
    // 横位置105、縦位置を第5線(200)の少し下(23px)に下げることで、第4線を2つの点が綺麗に挟みます
    text("𝄢", 105, baseLineY + 23); 
    pop();

    // 3. 音符
    let noteObj = config.noteData.find(n => n.name === currentNote);
    if (noteObj) {
      noFill();         
      stroke(0);        
      strokeWeight(3);  
      ellipse(width / 2, noteObj.y, 28, 18); 
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
    if (resultMessage === "正解！") fill(0, 150, 0); 
    if (resultMessage === "まちがい") fill(250, 0, 0); 
    text(resultMessage, width / 2, 100);
    
    // 5. 🛠️ 鍵盤の描画（白鍵10本・黒鍵7本を完璧なサイズで配置）
    let kw = 55;  // 白鍵の幅（10本が画面に綺麗に収まるサイズ）
    let kh = 140; // 白鍵の高さ
    let bY = 430; // 鍵盤の開始Y座標
    
    // ① 白鍵の描画
    for (let k of whiteKeysData) {
      stroke(0);
      strokeWeight(1.5);
      fill(255);
      rect(k.x, bY, kw, kh);
    }
    
    // 🎹 黒鍵（右端に生徒の認識を助ける「半分の黒鍵」を追加）
const blackKeysData = [
  // --- 最初の3本の塊 ---
  { name: "F#_low", x: 137, w: 32 }, // ファ と ソ の間
  { name: "G#",     x: 192, w: 32 }, // ソ と ラ の間
  { name: "A#",     x: 247, w: 32 }, // ラ と シ の間
  
  // 💡 シ と ド の間（265〜320px）は「無し」

  // --- 次の2本の塊 ---
  { name: "C#",     x: 357, w: 32 }, // ド と レ の間
  { name: "D#",     x: 412, w: 32 }, // レ と ミ の間
  
  // 💡 ミ と ファ の間（430〜485px）は「無し」

  // --- 次の3本の塊（ここを 3・2・3 に見せるための修正） ---
  { name: "F#",     x: 522, w: 32 }, // ファ と ソ の間
  { name: "G#_high",x: 577, w: 32 }, // ソ と ラ の間
  
  // ★【追加】最後の「ラ」の右端に置く、次の「シ」との間の黒鍵（幅を半分にして枠内に収めます）
  { name: "A#_high",x: 632, w: 18 }  // ラ と 次のシ の間（幅を通常の32から18に狭めて、鍵盤の右端にピッタリ合わせました）
];

  } else if (gameState === "END") {
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
    "F_low": 174.61,    // 低いファ
    "G": 196.00,       // 低いソ
    "A": 220.00,       // 低いラ
    "B": 246.94,       // 低いシ
    "C": 261.63,       // ド
    "D": 293.66,       // レ
    "E": 329.63,       // ミ
    "F": 349.23,       // ファ
    "G_high": 392.00,  // 高いソ
    "A_high": 440.00   // 高いラ
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
    let b_kw = 32;
    let b_kh = 85;
    let kw = 55;
    let kh = 140;

    // 【判定1】黒鍵がクリックされたら「まちがい」
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

    // 【判定2】白鍵の判定を行う
    if (!clickedBlack) {
      for (let k of whiteKeysData) {
        if (mouseX > k.x && mouseX < k.x + kw && mouseY > bY && mouseY < bY + kh) {
          
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
