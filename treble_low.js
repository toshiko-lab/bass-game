let baseY = 300;
let question = "G";
let result = "";

let notes = ["G","A","B","C","D","E","F","G_high"];

function setup() {
  createCanvas(800, 600);
  newQuestion();
}

function draw() {
  background(230);

  drawStaff();
  drawNote();

  fill(0);
  textSize(32);
  textAlign(CENTER);
  text(result, width/2, 80);
}

function drawStaff() {
  stroke(0);

  for (let i = 0; i < 5; i++) {
    line(100, baseY - i * 20, 700, baseY - i * 20);
  }
}

function drawNote() {

  let noteYMap = {
    "G": baseY + 40,
    "A": baseY + 30,
    "B": baseY + 20,
    "C": baseY + 10,
    "D": baseY,
    "E": baseY - 10,
    "F": baseY - 20,
    "G_high": baseY - 30
  };

  let y = noteYMap[question];

  fill(0);
  ellipse(300, y, 25, 18);
}

function newQuestion() {
  let i = floor(random(notes.length));
  question = notes[i];
}

function mousePressed() {
  result = question;
  newQuestion();
}
