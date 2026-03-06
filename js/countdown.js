/**
 * countdown.js — Real-time D-Day countdown timer
 * Target: 2026-05-02 13:00:00 KST
 */

const WEDDING_DATE = new Date('2026-05-02T13:00:00+09:00');

const countDays = document.getElementById('countDays');
const countHours = document.getElementById('countHours');
const countMinutes = document.getElementById('countMinutes');
const countSeconds = document.getElementById('countSeconds');
const dDayText = document.getElementById('dDayText');

function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
        // Wedding day or past
        if (countDays) countDays.textContent = '0';
        if (countHours) countHours.textContent = '0';
        if (countMinutes) countMinutes.textContent = '0';
        if (countSeconds) countSeconds.textContent = '0';
        if (dDayText) dDayText.textContent = 'D-Day';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (countDays) countDays.textContent = days;
    if (countHours) countHours.textContent = hours;
    if (countMinutes) countMinutes.textContent = minutes;
    if (countSeconds) countSeconds.textContent = seconds;
    if (dDayText) dDayText.textContent = `${days}일`;
}

// Initial update
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);
