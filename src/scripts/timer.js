const interval = document.querySelector('.timer').dataset.interval;
let timeLeft = interval;

const hh = document.querySelector('#hh');
const mm = document.querySelector('#mm');
const ss = document.querySelector('#ss');

let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
let secs = Math.floor((timeLeft % (1000 * 60)) / 1000);

hh.innerHTML = `0${hours}`.slice(-2);
mm.innerHTML = `0${mins}`.slice(-2);
ss.innerHTML = `0${secs}`.slice(-2);

const reload = () => {
  window.location = '';
};

setInterval(reload, interval);

setInterval(() => {
  if (timeLeft > 0) {
    timeLeft = timeLeft - 1000;
  } else {
    timeLeft = window.interval;
  }

  hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  secs = Math.floor((timeLeft % (1000 * 60)) / 1000);

  hh.innerHTML = `0${hours}`.slice(-2);
  mm.innerHTML = `0${mins}`.slice(-2);
  ss.innerHTML = `0${secs}`.slice(-2);
}, 1000);

// const timer = document.querySelector('.timer__numbers');

console.log(`${hh.innerHTML}:${mm.innerHTML}:${ss.innerHTML}`);
