/**
 * calendar.js — Render calendar for the wedding month
 * Wedding: 2026-05-02 (Saturday)
 */

const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 5; // May (1-indexed)
const WEDDING_DAY = 2;

const calendarGrid = document.getElementById('calendarGrid');

function renderCalendar() {
    if (!calendarGrid) return;

    const dayHeaders = ['일', '월', '화', '수', '목', '금', '토'];

    // Day headers
    dayHeaders.forEach((day, i) => {
        const el = document.createElement('div');
        el.className = 'calendar-day-header';
        if (i === 0) el.classList.add('sunday');
        if (i === 6) el.classList.add('saturday');
        el.textContent = day;
        calendarGrid.appendChild(el);
    });

    // Get first day of month and total days
    const firstDay = new Date(WEDDING_YEAR, WEDDING_MONTH - 1, 1).getDay();
    const totalDays = new Date(WEDDING_YEAR, WEDDING_MONTH, 0).getDate();

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const el = document.createElement('div');
        el.className = 'calendar-day empty';
        calendarGrid.appendChild(el);
    }

    // Day cells
    for (let d = 1; d <= totalDays; d++) {
        const el = document.createElement('div');
        el.className = 'calendar-day';

        const dayOfWeek = (firstDay + d - 1) % 7;
        if (dayOfWeek === 0) el.classList.add('sunday');
        if (dayOfWeek === 6) el.classList.add('saturday');

        if (d === WEDDING_DAY) {
            el.classList.add('wedding-day');
        }

        el.textContent = d;
        calendarGrid.appendChild(el);
    }
}

renderCalendar();
