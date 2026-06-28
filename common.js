function drawKeyboard() {
  // 白鍵の描画
  for (let k of config.keys) {
    fill(255);
    stroke(0);
    rect(k.x, 450, k.w, 120);
  }

  // 黒鍵の描画
  fill(0);
  noStroke();
  for (let b of config.blackKeys) {
    rect(b.x, 450, b.w, 80);
  }
}
