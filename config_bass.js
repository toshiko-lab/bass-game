// --- Start of file ---
// --- Keep this ---
// --- Keep this ---
const config = {
  title: "ヘ音記号 ト～ト",
  clefImg: "bass.png",
  clefX: 50, clefY: 185, clefW: 80, clefH: 135,
  startY: 300, timeLimit: 60,
  noteData: [
    {name: "G", y: 290},      // 下の第1間（下から1番目の線の下側スペース）
    {name: "A", y: 280},      // 第1線（一番下の線）
    {name: "B", y: 270},      // 第1間（下から1番目と2番目の線の間）
    {name: "C", y: 260},      // 第2線
    {name: "D", y: 250},      // 第2間
    {name: "E", y: 240},      // 第3線（真ん中の線）
    {name: "F", y: 230},      // 第3間
    {name: "G_high", y: 220}  // 第4線（上から2番目の線 = ヘ音記号の基準線）
  ],
  keys: [
    {note: "G", x: 100, w: 70}, {note: "A", x: 170, w: 70}, {note: "B", x: 240, w: 70},
    {note: "C", x: 310, w: 70}, {note: "D", x: 380, w: 70}, {note: "E", x: 450, w: 70},
    {note: "F", x: 520, w: 70}, {note: "G_high", x: 590, w: 70}
  ],
  blackKeys: [
    {note: "F#", x: 91, w: 20}, {note: "G#", x: 120, w: 40}, {note: "A#", x: 190, w: 40},
    {note: "C#", x: 330, w: 40}, {note: "D#", x: 400, w: 40}, {note: "F#_middle", x: 540, w: 40},
    {note: "F#_high", x: 609, w: 20}
  ]
};
