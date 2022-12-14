// grab the texts div tag and the button tags
const $app = document.querySelector("#app");
const $rec = document.querySelector(".rec");
const button1 = document.querySelector("#btn1");
const button2 = document.querySelector("#btn2");
const button3 = document.querySelector("#btn3");

//set up the speech recognition WebKit
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'de-DE';
recognition.continuous = true;
recognition.interimResults = true;

//creating a new p tag
let p = document.createElement("p");
$app.appendChild(p)

//create an event listener for our recognition
recognition.addEventListener("result", (e) => {
  console.log(e.results)
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  console.log(text)
  p.textContent = text;
});


button1.addEventListener("mousedown", (e) => {
  recognition.start();
});

button1.addEventListener("mouseup", (e) => {
  recognition.stop();
});

button2.addEventListener("click", (e) => {
  p.textContent = '';
});

recognition.addEventListener("audiostart", (e) => {
  $rec.classList.add('active')
});

recognition.addEventListener("audioend", (e) => {
  $rec.classList.remove('active')
});


button3.addEventListener("click", (e) => {
    toggleFullScreen();
    if(document.fullscreenElement) {
      button3.textContent = 'Fullscreen'
    } else {
      button3.textContent = 'Exit Fullscreen'
    }
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}