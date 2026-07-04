// game_master.js

// --- 1. グローバル変数・設定の定義 ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 音名リスト（白鍵10本：低いファ[F3] 〜 高いラ[A4]）
const WHITE_KEYS = ["F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"];

// 五線譜の音階位置（ヘ音記号用：第1線の下から順に配置するためのマッピング）
// ヘ音記号の第1線（一番下の線）＝ ソ(G3) となるのが一般的です。
const NOTE_POSITIONS = {
    "F3": 0,  // 第1線の下のスペース
    "G3": 1,  // 第1線（一番下の線）
    "A3": 2,  // 第1間
    "B3": 3,  // 第2線
    "C4": 4,  // 第2間（中央のドより1オクターブ下）
    "D4": 5,  // 第3線
    "E4": 6,  // 第3間
    "F4": 7,  // 第4線（ヘ音記号の基準線）
    "G4": 8,  // 第4間
    "A4": 9   // 第5線
};

let currentNote = "";
let score = 0;

// 画像の読み込み（config_bass.jsで定義されている前提、なければここで代入）
const clefImage = new Image();
clefImage.src = "bass_clef.png"; // ヘ音記号の画像パス

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
        alert("正解！");
        generateNewNote();
        draw();
    } else {
        alert("ざんねん！ちがうよ。");
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
    const clefHeight = lineDistance * 3; 
    const clefWidth = clefHeight * 0.85; // 一般的なヘ音記号の縦横比（約1:0.85）
    
    const x = 60; // 描画するX位置
    
    // 【重要】ヘ音記号の「書き始めの大きなドット」は第4線上にきます。
    // 画像自体のデザインにもよりますが、上端を「第5線」に合わせると綺麗に収まります。
    // 第5線のY座標は staffTop です。
    const y = staffTop; 

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
    const startX = (canvas.width - (whiteKeyWidth * 10)) / 2; // 中央寄せ

    // 白鍵の描画（10本）
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
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
    const blackKeyPattern = [
        true,  // F-G 間 （3本組の1本目）
        true,  // G-A 間 （3本組の2本目）
        true,  // A-B 間 （3本組の3本目）
        false, // B-C 間 （隙間）
        true,  // C-D 間 （2本組の1本目）
        true,  // D-E 間 （2本組の2本目）
        false, // E-F 間 （隙間）
        true,  // F-G 間 （3本組の1本目）
        true,  // G-A 間 （3本組の2本目）
        "half" // A-B 間 （右端：次のシとの間を半分だけ描画）
    ];

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
