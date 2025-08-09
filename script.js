const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
let keys = {};

let player = {
    x: 50,
    y: 300,
    width: 40,
    height: 60,
    dy: 0,
    grounded: false,
    img: new Image()
};

player.img.src = 'logo.png';

let platforms = [
    {x: 0, y: 360, width: 800, height: 40},
    {x: 200, y: 300, width: 100, height: 20},
    {x: 400, y: 250, width: 100, height: 20}
];

// Musik latar
let bgMusic = new Audio('music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;
bgMusic.play().catch(() => {
    console.log("Music will start after user interaction.");
});

// Kontrol layar sentuh
document.getElementById('btnLeft').addEventListener('touchstart', () => keys['ArrowLeft'] = true);
document.getElementById('btnLeft').addEventListener('touchend', () => keys['ArrowLeft'] = false);
document.getElementById('btnRight').addEventListener('touchstart', () => keys['ArrowRight'] = true);
document.getElementById('btnRight').addEventListener('touchend', () => keys['ArrowRight'] = false);
document.getElementById('btnJump').addEventListener('touchstart', () => {
    if (player.grounded) {
        player.dy = -10;
        player.grounded = false;
    }
});

// Kontrol keyboard
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    if (keys['ArrowRight']) player.x += 5;
    if (keys['ArrowLeft']) player.x -= 5;

    player.y += player.dy;
    player.dy += gravity;

    player.grounded = false;
    platforms.forEach(p => {
        if (player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y) {
            player.y = p.y - player.height;
            player.dy = 0;
            player.grounded = true;
        }
    });

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#654321';
    platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
    ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
}

player.img.onload = () => {
    update();
};
