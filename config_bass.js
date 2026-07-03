// --- Start of file ---
// --- Keep this ---
// --- Keep this ---
const config = {
  title: "ヘ音記号 ト～ト",
  clefImg: "bass.png",
  clefX: 50, clefY: 185, clefW: 80, clefH: 135,
  startY: 300, timeLimit: 60,
  noteData: [
    {name: "G", y: 290},      // 下の第1間
    {name: "A", y: 280},      // 第1線
    {name: "B", y: 270},      // 第1間
    {name: "C", y: 260},      // 第2線
    {name: "D", y: 250},      // 第2間
    {name: "E", y: 240},      // 第3線
    {name: "F", y: 230},      // 第3間
    {name: "G_high", y: 220}  // 第4線（ヘ音記号の基準線）
  ],
  keys: [
    {note: "G", x: 100, w: 70}, 
    {note: "A", x: 170, w: 70}, 
    {note: "B", x: 240, w: 70},
    {note: "C", x: 310, w: 70}, 
    {note: "D", x: 380, w: 70}, 
    {note: "E", x: 450, w: 70},
    {note: "F", x: 520, w: 70}, 
    {note: "G_high", x: 590, w: 70}
  ],
  // 白鍵の境目に合わせて綺麗に配置（シド・ミファの間は無し）
  blackKeys: [
    {note: "G#", x: 150, w: 40},  // ソとラの境目
    {note: "A#", x: 220, w: 40},  // ラとシの境目
    // B(シ)とC(ド)の間は無し
    {note: "C#", x: 360, w: 40},  // ドとレの境目
    {note: "D#", x: 430, w: 40},  // レとミの境目
    // E(ミ)とF(ファ)の間は無し
    {note: "F#", x: 570, w: 40}   // ファとソの境目
  ]
};
