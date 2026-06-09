let synth;

function setup() {
  createCanvas(400, 200);
  synth = new p5.MonoSynth();
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("画面をタップ", width/2, height/2);
}

function mousePressed() {

  userStartAudio();
  getAudioContext().resume();

  synth.play("C4", 0.8, 0, 0.5);

}
