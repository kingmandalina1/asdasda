// Tema Değiştirme Çubuğu
const themeToggleBar = document.getElementById('theme-toggle-bar');
const body = document.body;
const themeIcon = document.getElementById('theme-icon');

// Tema Toggle Fonksiyonu
function toggleTheme() {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Sayfa Yüklenirken Tema Kontrolü
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('light-mode');
        themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Tema Değiştirme Olayı
themeToggleBar.addEventListener('click', () => {
    toggleTheme();
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});
// Poll Formunu İşleme
document.getElementById('poll-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedOption = document.querySelector('input[name="language"]:checked');
    const resultDiv = document.getElementById('poll-result');

    if (selectedOption) {
        const selectedValue = selectedOption.value;
        resultDiv.innerHTML = `<p>Seçiminiz: <strong>${selectedValue}</strong></p>`;
    } else {
        resultDiv.innerHTML = `<p>Lütfen bir seçenek işaretleyin.</p>`;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Temayı değiştirme işlevi
    const themeToggle = document.getElementById('theme-icon');
    const body = document.body;

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });

    // Sayfa geçişleri için animasyon
    const links = document.querySelectorAll('.transition-link');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const href = this.getAttribute('href');
            const transitionDiv = document.createElement('div');
            transitionDiv.className = 'page-transition page-enter';

            document.body.appendChild(transitionDiv);

            setTimeout(() => {
                transitionDiv.classList.remove('page-enter');
                transitionDiv.classList.add('page-enter-active');
            }, 0);

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
})
//oyun
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pinballCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');

    const ball = {
        x: canvas.width / 2,
        y: canvas.height - 30,
        dx: 2,
        dy: -2,
        radius: 10,
    };

    const paddle = {
        height: 10,
        width: 75,
        x: (canvas.width - 75) / 2,
        speed: 7,
    };

    let rightPressed = false;
    let leftPressed = false;

    // Tuş kontrolü
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = false;
        }
    }

    // Topu çizme fonksiyonu
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Paddle'ı çizme fonksiyonu
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.x, canvas.height - paddle.height - 10, paddle.width, paddle.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Topun çarpma kontrolü
    function detectCollision() {
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
            ball.dx = -ball.dx;
        }

        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ball.radius - paddle.height - 10) {
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                ball.dy = -ball.dy;
            } else if (ball.y + ball.dy > canvas.height - ball.radius) {
                alert("Oyun Bitti!");
                document.location.reload();
            }
        }
    }

    // Oyun güncellemesi
    function update() {
        if (rightPressed && paddle.x < canvas.width - paddle.width) {
            paddle.x += paddle.speed;
        } else if (leftPressed && paddle.x > 0) {
            paddle.x -= paddle.speed;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;

        detectCollision();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
    }

    // Oyun döngüsü
    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }

    // Oyun başlatma
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none'; // Butonu gizle
        gameLoop(); // Oyun döngüsünü başlat
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pinballCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const themeToggle = document.getElementById('themeToggle');
    
    // Canvas boyutlarını ayarla
    canvas.width = 480;
    canvas.height = 320;
    
    // Topun özellikleri
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        dx: 2, // x yönünde hız
        dy: 2, // y yönünde hız
        radius: 10,
    };
    
    // Topu çiz
    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Önceki çerçeveyi temizle
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    // Topun hareketini güncelle
    function updateBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Duvarlara çarpma kontrolü (kenarlara çarparsa yönü değiştir)
        if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
    }
    
    // Oyun döngüsü (her çerçevede çalışır)
    function gameLoop() {
        drawBall();
        updateBall();
        requestAnimationFrame(gameLoop);
    }
    
    // Butona tıklayınca oyunu başlat
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none'; // Butonu gizle
        gameLoop(); // Oyun döngüsünü başlat
    });
    
    // Tema değiştirici
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });
});


