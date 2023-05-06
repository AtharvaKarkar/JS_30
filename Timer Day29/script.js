let countdown;  //let keyword has block level scope. variable with let can be assigned but cannot be redeclared within the same scope.
const timerDisplay = document.querySelector('.display_time-left');
const endTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');
const audio = document.querySelector('audio');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);
  progressBar.style.width = `0px`;

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);  /*It calls the displayTimeLeft() & displayEndTime() function to update the display. */
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    const timePassed = seconds - secondsLeft;

    // check if we should stop it!
    if (secondsLeft < 0) {
      audio.play();
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
    progressBar.style.width = `${500 * (timePassed / seconds)}px`;
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  // below line of code is creating a formatted string that displays the minutes and seconds left in a timer.
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;   // the 'remainderSeconds' variable is less than 10. If it is less than 10, it adds a leading zero to the output string, Otherwise it adds an empty string. /*his line of code creates a formatted string that displays the minutes and seconds left in a timer in the format "mm:ss", with a leading zero added to the seconds if they are less than 10.*/
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (isNaN(mins)) return this.reset();
  timer(mins * 60);
  this.reset();
});