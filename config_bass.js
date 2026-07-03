// --- Start of file ---
// --- Keep this ---
// --- Keep this ---
const config = {
  title: "ヘ音記号 ト～ト（判定完全一致版）",
  timeLimit: 60,
  
  // 五線譜（baseLineY=200）に対して、ヘ音記号の正しい位置（ソ〜ソ）をミリ単位で修正！
  noteData: [
    {name: "G", y: 280},      // 第1線（低いソ）
    {name: "A", y: 270},      // 第1間（低いラ）
    {name: "B", y: 260},      // 第2線（低いシ）
    {name: "C", y: 250},      // 第2間（ド）
    {name: "D", y: 240},      // 第3線（レ）
    {name: "E", y: 230},      // 第3間（ミ）
    {name: "F", y: 220},      // 第4線（ファ）
    {name: "G_high", y: 210}  // 第4間（高いソ）
  ],
  
  // 白鍵
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
  
  // 黒鍵
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
