let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

// ヘ音記号の第1線(G)から第4間(G)までの正しい座標設定
// 線の間隔が20pxなので、それを基準に配置します
let notes = [
  { name: "G2", y: 240, freq: 98.0 },  // 第1線（下から1本目）
  { name: "A2", y: 230, freq: 110.0 }, // 第1間
  { name: "B2", y: 220, freq: 123.5 }, // 第2線
  { name: "C3", y: 210, freq: 130.8 }, // 第2間
  { name: "D3", y: 200, freq: 146.8 }, // 第3線
  { name: "E3", y: 190, freq: 164.8 }, // 第3間
  { name: "F3", y: 180, freq: 174.6 }, // 第4線
  { name: "G3", y: 170, freq: 196.0 }  // 第4間
];
let currentNoteIndex = 0;

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
  newQuestion();
}

function newQuestion() {
  currentNoteIndex = floor(random(notes.length));
}

function draw() {
  background(255);
  // タイマーとスコア表示
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }
  textSize(24); fill(0);
  text("Time: " + timer + "   Yes: " + scoreYes + "   No: " + scoreNo, 50, 40);

  // 五線譜（Y=160から20間隔で5本）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 160 + i * 20, 700, 160 + i * 20);
  
  // 全音符を中央に描画
  fill(0); 
  ellipse(400, notes[currentNoteIndex].y, 25, 20);
  
  // 鍵盤
  stroke(0); fill(240);
  for (let i = 0; i < 8; i++) rect(50 + i * 85, 400, 85, 150);
}

function playTone(freq) {
  synth.freq(freq);
  synth.amp(0.3, 0.02);
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  
  if (mouseY > 400) {
    let keyIndex = floor((mouseX - 50) / 85);
    if (keyIndex >= 0 && keyIndex < 8) {
      playTone(notes[keyIndex].freq);
      
      // 正解・不正解に関わらず、即座に次の問題へ進む（テンポを止めない）
      if (keyIndex === currentNoteIndex) {
        scoreYes++;
      } else {
        scoreNo++;
      }
      newQuestion(); // どちらの結果でも、即座に次の問題へ
    }
  }
}
