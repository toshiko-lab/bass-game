function drawKeyboard() {
  // 白鍵の描画
  for (let k of config.keys) {
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(k.x, 430, k.w, 140); // 押しやすいように少し縦長に
  }

  // 黒鍵の描画
  fill(0);
  noStroke();
  for (let b of config.blackKeys) {
    // config.blackKeysに定義された座標（b.x）を使って正確に描画
    rect(b.x, 430, b.w, 85);
  }
}
