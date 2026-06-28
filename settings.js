const GAME_CONFIG = {
  treble: {
    clefImg: "treble.png",
    // ト音記号用の鍵盤データ (x座標と幅)
    keys: [
      {note: "F", x: 40, w: 50}, {note: "G", x: 90, w: 50}, {note: "A", x: 140, w: 50},
      {note: "B", x: 190, w: 50}, {note: "C", x: 240, w: 50}, {note: "D", x: 290, w: 50},
      {note: "E", x: 340, w: 50}, {note: "F2", x: 390, w: 50}, {note: "G2", x: 440, w: 50},
      {note: "A2", x: 490, w: 50}, {note: "B2", x: 540, w: 50}
    ],
    // 黒鍵データ（ト音記号用）
    blackKeys: [
      {x: 75, w: 30}, {x: 125, w: 30}, {x: 175, w: 30}, {x: 275, w: 30},
      {x: 325, w: 30}, {x: 425, w: 30}, {x: 475, w: 30}, {x: 525, w: 30}
    ]
  },
  bass: {
    clefImg: "bass.png",
    keys: [
      {note: "G", x: 100, w: 70}, {note: "A", x: 170, w: 70}, {note: "B", x: 240, w: 70},
      {note: "C", x: 310, w: 70}, {note: "D", x: 380, w: 70}, {note: "E", x: 450, w: 70},
      {note: "F", x: 520, w: 70}, {note: "G_high", x: 590, w: 70}
    ],
    blackKeys: [
      {x: 91, w: 20}, {x: 150, w: 40}, {x: 220, w: 40}, {x: 290, w: 40},
      {x: 360, w: 40}, {x: 500, w: 40}, {x: 579, w: 20}
    ]
  }
};

let currentMode = 'treble'; // ここを 'bass' に切り替えるだけでOK！
let config = GAME_CONFIG[currentMode];
