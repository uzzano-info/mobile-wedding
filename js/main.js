/**
 * main.js — Core interactions for Mobile Wedding Invitation
 * - Scroll fade-in (Intersection Observer)
 * - Gallery lightbox
 * - Account toggle (accordion)
 * - Copy to clipboard + toast
 */

// === Fade-in on scroll ===
const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach((el) => {
    fadeObserver.observe(el);
});

// === Gallery Lightbox ===
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && lightbox && lightboxImage) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// === Account Toggle (Accordion) ===
document.querySelectorAll('.account-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        const isOpen = targetEl.classList.contains('open');

        // Close all
        document.querySelectorAll('.account-details').forEach((d) => d.classList.remove('open'));
        document.querySelectorAll('.account-toggle-btn').forEach((b) => b.classList.remove('open'));

        // Toggle current
        if (!isOpen) {
            targetEl.classList.add('open');
            btn.classList.add('open');
        }
    });
});

// === Copy Account Number ===
const toast = document.getElementById('toast');
let toastTimer = null;

function showToast(message = '복사되었습니다') {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

document.querySelectorAll('.account-copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
        const account = btn.dataset.account;
        if (!account) return;

        try {
            await navigator.clipboard.writeText(account);
            btn.classList.add('copied');
            btn.textContent = '✓ 복사됨';
            showToast('계좌번호가 복사되었습니다');

            setTimeout(() => {
                btn.classList.remove('copied');
                btn.textContent = '복사하기';
            }, 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = account;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('계좌번호가 복사되었습니다');
        }
    });
});
