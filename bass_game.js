let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let currentNoteY = 240; // 今の音符の高さ
let synth;

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
}

function draw() {
  background(255);
  // タイマーとスコア
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }
  textSize(30); fill(0);
  text("Time: " + timer, 50, 40);
  text("Yes: " + scoreYes + "  No: " + scoreNo, 300, 40);

  // 五線譜
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // 全音符（現在の位置）
  fill(0); ellipse(400, currentNoteY, 25, 20);
  
  // 鍵盤エリア（2オクターブ分の枠を配置）
  stroke(0); fill(240);
  for (let i = 0; i < 14; i++) rect(50 + i * 50, 400, 50, 150);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  
  // 鍵盤エリアのクリック判定
  if (mouseY > 400) {
    // どの鍵盤を押したか計算（仮）
    let key = floor((mouseX - 50) / 50);
    
    // ここで音を鳴らす
    synth.amp(0.3, 0.02);
    setTimeout(() => { synth.amp(0, 0.05); }, 200);
    
    // 正誤判定のロジック（ここを先生の指定する音高に合わせます）
    // 一旦、正解したことにしてスコアを増やすテスト
    scoreYes++;
  }
}
