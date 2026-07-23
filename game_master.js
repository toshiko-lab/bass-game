// game_master.js

// --- 1. グローバル変数・設定の定義 ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// =========================
// 共通ピアノデータ
// =========================
const PIANO = {

    // 白鍵（2オクターブ）
    whiteKeys: [
        "C3","D3","E3","F3","G3","A3","B3",
        "C4","D4","E4","F4","G4","A4","B4",
        "C5"
    ],

    // 黒鍵が入る位置
    // 「何番目の白鍵の右側に黒鍵があるか」
    blackAfter: [
        0,1,
        3,4,5,
        7,8,
        10,11,12
    ]

};
// configがあればそこから読み込み、なければデフォルト値を使う（今後の拡張に対応！）
const WHITE_KEYS =
(typeof config !== "undefined" && config.WHITE_KEYS)
? config.WHITE_KEYS
: PIANO.whiteKeys;
const NOTE_POSITIONS =
(typeof config !== "undefined" && config.NOTE_POSITIONS)
? config.NOTE_POSITIONS
: {
    "C3": 0,
    "D3": 1,
    "E3": 2,
    "F3": 3,
    "G3": 4,
    "A3": 5,
    "B3": 6,
    "C4": 7,
    "D4": 8,
    "E4": 9,
    "F4": 10,
    "G4": 11,
    "A4": 12,
    "B4": 13,
    "C5": 14
};
const NOTE_POSITIONS =
(typeof config !== "undefined" && config.NOTE_POSITIONS)
? config.NOTE_POSITIONS
: {
    "C3": 0,
    "D3": 1,
    "E3": 2,
    "F3": 3,
    "G3": 4,
    "A3": 5,
    "B3": 6,
    "C4": 7,
    "D4": 8,
    "E4": 9,
    "F4": 10,
    "G4": 11,
    "A4": 12,
    "B4": 13,
    "C5": 14
};

let currentNote = "";
let score = 0;

let resultText = "";
let resultTimer = 0;

// 画像の読み込み（config_bass.jsで定義されている前提、なければここで代入）
const clefImage = new Image();
clefImage.src = config.clefImage;

// ページ読み込み時に初期化
window.onload = function() {
    initGame();
};

function initGame() {
    generateNewNote();
    draw();
}

// --- 2. 問題生成 ---
function generateNewNote() {
    const randomIndex = Math.floor(Math.random() * WHITE_KEYS.length);
    currentNote = WHITE_KEYS[randomIndex];
    
    // UIのテキスト更新（必要に応じて）
    const noteDisplay = document.getElementById("noteDisplay");
    if (noteDisplay) noteDisplay.innerText = "この音はな〜んだ？";
}

// --- 3. 判定ロジック ---
function checkAnswer(inputNote) {
    // 答えの文字（例: "C4" の "C" のみ、または日本語対応ならconfig側で吸収）
    // ここでは単純に、入力された音名（"C"など）と currentNote の頭文字を比較
    const currentLetter = currentNote.charAt(0);
    
if (inputNote.toUpperCase() === currentLetter) {
    score += 10;

    resultText = "YES";
    resultTimer = 60;

    generateNewNote();
    draw();
} else {

    resultText = "NO";
    resultTimer = 60;
}
    
    const scoreDisplay = document.getElementById("scoreDisplay");
    if (scoreDisplay) scoreDisplay.innerText = "スコア: " + score;
}

// --- 4. 描画メイン処理 ---
function draw() {
    // 画面のクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 各パーツの描画
    drawStaff();
    drawClef();
    drawNote(currentNote);
    drawPiano();

    if (resultTimer > 0) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(resultText, canvas.width / 2, 80);

        resultTimer--;
    }
}

// --- 5. 五線譜の描画 ---
const staffTop = 80;       // 五線譜の第5線（一番上の線）のY座標
const lineDistance = 20;   // 線と線の間隔（1間）

function drawStaff() {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;

    // 5本の線を描画（上から順に、第5線、第4線、第3線、第2線、第1線）
    for (let i = 0; i < 5; i++) {
        let y = staffTop + i * lineDistance;
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(canvas.width - 50, y);
        ctx.stroke();
    }
}

// --- 6. ヘ音記号の描画（位置とサイズの修正） ---
function drawClef() {
    // ヘ音記号を第2線〜第5線の幅（間隔3つ分 = lineDistance * 3）に収める
const clefHeight = lineDistance * 4.6;
const clefWidth = clefHeight * 0.9;

const x = 45;
const y = staffTop - 15;

    if (clefImage.complete) {
        ctx.drawImage(clefImage, x, y, clefWidth, clefHeight);
    } else {
        clefImage.onload = function() {
            ctx.drawImage(clefImage, x, y, clefWidth, clefHeight);
        };
    }
}

// --- 7. 音符（たま）の描画 ---
function drawNote(note) {
    const noteIndex = NOTE_POSITIONS[note];
    if (noteIndex === undefined) return;

    // 第1線の一番下（F3）を基準としたY座標の計算
    // 音階が1つ上がる（ステップが1増える）ごとに、lineDistanceの「半分」ずつ上に移動します。
    // 基準となる第1線（G3、インデックス1）のY座標は staffTop + lineDistance * 4
    const firstLineY = staffTop + lineDistance * 4;
    const y = firstLineY - (noteIndex - 1) * (lineDistance / 2);
    const x = canvas.width / 2; // 画面中央に表示

    // 音符の描画
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    // 綺麗な楕円を描画（横幅を少し広く）
    ctx.ellipse(x, y, 14, 10, 0, 0, 2 * Math.PI);
    ctx.fill();

    // 符尾（ぼう：縦の棒）の描画（第3線より上なら下向き、下なら上向きが一般的）
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (noteIndex >= 5) { // D4（第3線）以上の場合は左側に下向きの棒
        ctx.moveTo(x - 14, y);
        ctx.lineTo(x - 14, y + 40);
    } else { // それ未満の場合は右側に上向きの棒
        ctx.moveTo(x + 14, y);
        ctx.lineTo(x + 14, y - 40);
    }
    ctx.stroke();
}

// --- 8. 鍵盤の描画（黒鍵の配置：3・2・半分） ---
function drawPiano() {
    const pianoTop = 260;       // 鍵盤の上端Y座標
    const whiteKeyWidth = 50;   // 白鍵1本の幅
    const whiteKeyHeight = 150; // 白鍵の長さ
    const whiteKeyCount = 15;
　　const startX = (canvas.width - (whiteKeyWidth * whiteKeyCount)) / 2;

    // 白鍵の描画（15本）
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    for (let i = 0; i < whiteKeyCount; i++) {
        let x = startX + i * whiteKeyWidth;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x, pianoTop, whiteKeyWidth, whiteKeyHeight);
        ctx.strokeRect(x, pianoTop, whiteKeyWidth, whiteKeyHeight);
    }

    // 黒鍵の設定
    const blackKeyWidth = whiteKeyWidth * 0.6; // 白鍵の60%の幅
    const blackKeyHeight = whiteKeyHeight * 0.6; // 白鍵の60%の長さ

    // 白鍵10本（F, G, A, B, C, D, E, F, G, A）の「間」に黒鍵を置くかどうかのパターン
    // インデックス i の白鍵と i+1 の白鍵の間に黒鍵があるかを true/false で指定
    // F-G(テ), G-A(テ), A-B(テ), B-C(×), C-D(テ), D-E(テ), E-F(×), F-G(テ), G-A(テ), A-B(半分)
    // ※ 右端（9番目）は、A4の右側（A4と次のB4の間）に半分の黒鍵を描画するためのフラグ
    // 黒鍵の設定
const blackKeyWidth = whiteKeyWidth * 0.6;
const blackKeyHeight = whiteKeyHeight * 0.6;

// 黒鍵の描画
ctx.fillStyle = "#000000";

for (const index of PIANO.blackAfter) {

    let x = startX + (index + 1) * whiteKeyWidth - blackKeyWidth / 2;

    ctx.fillRect(
        x,
        pianoTop,
        blackKeyWidth,
        blackKeyHeight
    );
}
    // 黒鍵の描画
    ctx.fillStyle = "#000000";
    for (let i = 0; i < blackKeyPattern.length; i++) {
        if (!blackKeyPattern[i]) continue;

        // 白鍵と白鍵の境目をまたぐようにX座標を計算
        let x = startX + (i + 1) * whiteKeyWidth - (blackKeyWidth / 2);

        if (blackKeyPattern[i] === true) {
            // 通常の黒鍵
            ctx.fillRect(x, pianoTop, blackKeyWidth, blackKeyHeight);
        } else if (blackKeyPattern[i] === "half") {
            // 右端の半分だけ描画する黒鍵（白鍵の右端を超えないように幅を半分に制限）
            const halfWidth = blackKeyWidth / 2;
            ctx.fillRect(x, pianoTop, halfWidth, blackKeyHeight);
        }
    }
}
alert("game_master.js は最後まで読み込まれました");
