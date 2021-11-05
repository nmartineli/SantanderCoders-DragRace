const form = document.querySelector('form');

const input = document.querySelector('input');

let setTimer;
let min = 0;
let sec = 0;
let cen = 0;
let time;

function formatTimer(cen, sec, min) {
  return (time = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}:${
    cen < 10 ? '0' + cen : cen
  }`);
}

function setToStorage(key, value) {
  const prefix = '--RegisteredTimes--';
  window.sessionStorage.setItem(prefix + key, value);
  console.log('Session: ', window.sessionStorage);
  const registeredTimes = Object.keys(window.localStorage).filter((item) =>
    item.includes(prefix)
  );

  if (registeredTimes.length) {
    const [registerKey] = registeredTimes;
    if (value < +window.localStorage.getItem(registerKey)) {
      localStorage.removeItem(registerKey);
      window.localStorage.setItem(prefix + key, value);
      console.log('LocalStorage', window.localStorage);
    }
  } else {
    window.localStorage.setItem(prefix + key, value);
    console.log('LocalStorage', window.localStorage);
  }
}

function createRegister(time, name) {
  let container = document.querySelector('ul');
  const li = document.createElement('li');
  li.textContent = `${name} - ${time}`;
  container.appendChild(li);
}

function getTotalTime() {
  let calculateTotalTime =
    parseInt(cen) + parseInt(sec) * 100 + parseInt(min) * 6000;
  return calculateTotalTime;
}

function stopTimer() {
  clearInterval(setTimer);
  createRegister(time, input.value);
  let totalTime = getTotalTime();
  setToStorage(input.value, totalTime);
}

function clearTimer() {
  min = 0;
  sec = 0;
  cen = 0;
  document.querySelector('.timer').innerText = '00:00:00';
  form.reset();
}

function showTimer() {
  cen++;
  if (cen == 99) {
    cen = 0;
    sec++;
    if (sec == 59) {
      sec = 0;
      min++;
    }
  }
  time = formatTimer(cen, sec, min);
  document.querySelector('.timer').innerText = time;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let name = input.value;
  if (name) {
    setTimer = setInterval(() => {
      showTimer();
    }, 10);
  }
});
