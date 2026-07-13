let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

let notes = [
  { name: "G2", y: 280, freq: 98.0 },
  { name: "A2", y: 260, freq: 110.0 },
  { name: "B2", y: 240, freq: 123.5 },
  { name: "C3", y: 220, freq: 130.8 },
  { name: "D3", y: 200, freq: 146.8 },
  { name: "E3", y: 180, freq: 164.8 },
  { name: "F3", y: 160, freq: 174.6 },
  { name: "G3", y: 140, freq: 196.0 }
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
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }
  
  textSize(30); fill(0);
  text("Time: " + timer + "   Yes: " + scoreYes + "   No: " + scoreNo, 50, 50);

  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  textSize(50); noStroke(); fill(0);
  text("𝄢", 30, 235);

  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y, 25, 20);
  
  for (let i = 0; i < 8; i++) {
    stroke(0); fill(255);
    rect(50 + i * 85, 400, 85, 150);
  }
  fill(0);
  rect(115, 400, 40, 90); rect(200, 400, 40, 90);
  rect(370, 400, 40, 90); rect(455, 400, 40, 90); rect(540, 400, 40, 90);
}

function playTone(freq) {
  synth.freq(freq); synth.amp(0.3, 0.02);
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let keyIndex = floor((mouseX - 50) / 85);
    if (keyIndex >= 0 && keyIndex < 8) {
      playTone(notes[keyIndex].freq);
      if (keyIndex === currentNoteIndex) scoreYes++; else scoreNo++;
      newQuestion();
    }
  }
}
