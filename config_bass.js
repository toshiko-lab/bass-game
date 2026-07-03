// --- Start of file ---
// --- Keep this ---
// --- Keep this ---
const config = {
  title: "ヘ音記号 ト～ト",
  clefImg: "bass.png",
  clefX: 50, clefY: 185, clefW: 80, clefH: 135,
  startY: 300, timeLimit: 60,
  
  // 出題される音符のデータ（Gから高いGまで）
  noteData: [
    {name: "G", y: 290},      // 下の第1間
    {name: "A", y: 280},      // 第1線
    {name: "B", y: 270},      // 第1間
    {name: "C", y: 260},      // 第2線
    {name: "D", y: 250},      // 第2間
    {name: "E", y: 240},      // 第3線
    {name: "F", y: 230},      // 第3間
    {name: "G_high", y: 220}  // 第4線
  ],
  
  // 画面に並べる白鍵（見た目のために左右にファとラを広げています）
  keys: [
    {note: "F_low", x: 60, w: 68}, // 見た目用（クリックしても反応しない、またはハズレ）
    {note: "G", x: 128, w: 68}, 
    {note: "A", x: 196, w: 68}, 
    {note: "B", x: 264, w: 68},
    {note: "C", x: 332, w: 68}, 
    {note: "D", x: 400, w: 68}, 
    {note: "E", x: 468, w: 68},
    {note: "F", x: 536, w: 68}, 
    {note: "G_high", x: 604, w: 68},
    {note: "A_high", x: 672, w: 68} // 見た目用
  ],
  
  // 白鍵の隙間にぴったり合わせて配置した黒鍵（幅36）
  blackKeys: [
    // ファ・ソ・ラ・シの間の黒鍵（3本グループ）
    {note: "F#_low", x: 110, w: 36}, // ファとソの間
    {note: "G#", x: 178, w: 36},     // ソとラの間
    {note: "A#", x: 246, w: 36},     // ラとシの間
    
    // ド・レ・ミの間の黒鍵（2本グループ）
    {note: "C#", x: 382, w: 36},     // ドとレの間
    {note: "D#", x: 450, w: 36},     // レとミの間
    
    // ファ・ソ・ラの間（次の3本グループの始まり）
    {note: "F#", x: 586, w: 36},     // ファとソの間
    {note: "G#_high", x: 654, w: 36} // ソとラの間
  ]
};
