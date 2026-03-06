/**
 * petals.js — Falling flower petals canvas animation
 * Applied to the cover section only
 */

const canvas = document.getElementById('petalsCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let petals = [];
    let animationId;
    let isVisible = true;

    // Petal colors — soft pinks and whites
    const petalColors = [
        'rgba(212, 135, 127, 0.6)',   // soft rose
        'rgba(201, 168, 124, 0.5)',   // warm gold
        'rgba(232, 213, 192, 0.7)',   // cream
        'rgba(255, 255, 255, 0.6)',   // white
        'rgba(184, 166, 148, 0.4)',   // warm gray
        'rgba(220, 180, 170, 0.5)',   // blush
    ];

    function resize() {
        const section = canvas.closest('.cover-section');
        if (section) {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        }
    }

    class Petal {
        constructor() {
            this.reset();
            // Start at random Y for initial spread
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 0.8 + 0.3;
            this.speedX = Math.random() * 0.6 - 0.3;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.y += this.speedY;
            this.wobble += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobble) * 0.5;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height + 20) {
                this.reset();
            }
            if (this.x < -20 || this.x > canvas.width + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;

            // Draw petal shape
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(
                this.size * 0.3, -this.size * 0.5,
                this.size, -this.size * 0.3,
                this.size, 0
            );
            ctx.bezierCurveTo(
                this.size, this.size * 0.3,
                this.size * 0.3, this.size * 0.5,
                0, 0
            );
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function initPetals() {
        const count = Math.min(25, Math.floor(canvas.width / 18));
        petals = [];
        for (let i = 0; i < count; i++) {
            petals.push(new Petal());
        }
    }

    function animate() {
        if (!isVisible) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach((petal) => {
            petal.update();
            petal.draw();
        });
        animationId = requestAnimationFrame(animate);
    }

    // Visibility observer — pause when not in viewport
    const coverSection = canvas.closest('.cover-section');
    if (coverSection) {
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    animate();
                } else {
                    cancelAnimationFrame(animationId);
                }
            },
            { threshold: 0.1 }
        );
        visibilityObserver.observe(coverSection);
    }

    // Initialize
    resize();
    initPetals();
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        resize();
        initPetals();
    });
}
