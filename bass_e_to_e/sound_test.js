function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(220);

  textAlign(CENTER, CENTER);
  textSize(24);
  text("画面をタップ", width / 2, height / 2);
}

function mousePressed() {

  userStartAudio();
  getAudioContext().resume();

  let osc = new p5.Oscillator('sine');

  osc.freq(440);
  osc.start();
  osc.amp(0.5, 0.05);

  setTimeout(() => {
    osc.stop();
  }, 500);
}
