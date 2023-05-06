let countdown;
const timerDisplay = document.querySelector('display_time-left');
const endTime = document.querySelector('display_end-time');
const buttons = document.querySelectorAll('[data-time]');
const audio = document.querySelector('audio');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');

function timer(seconds) {
    // clear all existing timers
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    progressBar.style.width = `0px`;
}