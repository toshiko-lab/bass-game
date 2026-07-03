/ --- Start of file ---
// --- Keep this ---
// --- Keep this ---
const config = {
  title: "ヘ音記号 ト～ト（完全一致版）",
  timeLimit: 60,
  
  // 【不具合修正】Y座標を1音分（10px）下にずらすことで、
  // 画面の見た目と、プログラムの正解判定（鍵盤）を完全に一致させました！
  noteData: [
    {name: "G", y: 290},      // 第1線（低いソ）
    {name: "A", y: 280},      // 第1間（低いラ）
    {name: "B", y: 270},      // 第2線（低いシ）
    {name: "C", y: 260},      // 第2間（ド）       ★これで見た目も判定も「ド」になります！
    {name: "D", y: 250},      // 第3線（レ）
    {name: "E", y: 240},      // 第3間（ミ）
    {name: "F", y: 230},      // 第4線（ファ）
    {name: "G_high", y: 220}  // 第4間（高いソ）
  ],
  
  // 白鍵（変更なし）
  keys: [
    {note: "F_low", x: 75, w: 65}, 
    {note: "G", x: 140, w: 65},     
    {note: "A", x: 205, w: 65},     
    {note: "B", x: 270, w: 65},     
    {note: "C", x: 335, w: 65},     
    {note: "D", x: 400, w: 65},     
    {note: "E", x: 465, w: 65},     
    {note: "F", x: 530, w: 65},     
    {note: "G_high", x: 595, w: 65},
    {note: "A_high", x: 660, w: 65} 
  ],
  
  // 黒鍵（変更なし）
  blackKeys: [
    {note: "F#_low", x: 122, w: 36},
    {note: "G#", x: 187, w: 36},
    {note: "A#", x: 252, w: 36},
    {note: "C#", x: 382, w: 36},
    {note: "D#", x: 447, w: 36},
    {note: "F#", x: 577, w: 36},
    {note: "G#_high", x: 642, w: 36}
  ]
};
// --- End of file ---
