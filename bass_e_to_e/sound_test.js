function setup() {
  createCanvas(400, 200);

  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(220);
  text("画面をタップ", width / 2, height / 2);
}

function mousePressed() {
  userStartAudio();

  alert("AudioContext = " + getAudioContext().state);
}
