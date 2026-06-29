config = {
  title: "ト音記号 ト～1点ト",
  clefImg: "treble.png",
  clefX: -10, clefY: 210, clefW: 110, clefH: 160,
  startY: 250, gap: 20,
  noteData: [
    {name: "G", y: 250 + 20 * 3.5}, {name: "A", y: 250 + 20 * 3},
    {name: "B", y: 250 + 20 * 2.5}, {name: "C", y: 250 + 20 * 2},
    {name: "D", y: 250 + 20 * 1.5}, {name: "E", y: 250 + 20 * 1},
    {name: "F", y: 250 + 20 * 0.5}, {name: "G_high", y: 250}
  ],
  keys: [
    {x: 40, y: 520, w: 50, h: 120}, {x: 90, y: 520, w: 50, h: 120},
    // ...すべての白鍵データをここに入れる
  ],
  blackKeys: [
    {x: 75, y: 520, w: 30, h: 80}, {x: 125, y: 520, w: 30, h: 80},
    // ...すべての黒鍵データをここに入れる
  ]
};
