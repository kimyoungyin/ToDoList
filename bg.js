const body = document.querySelector("body");

const imgNumber = 5;
const image = new Image();

function showImage(event) {
  event.preventDefault();
  image.classList.remove("bgImage");
  image.classList.add("showImage");
}

function paintImage(imgNumber) {
  image.src = `images/${imgNumber}.jpg`;
  body.appendChild(image);
  //너무 큼 근데
  image.classList.add("bgImage");
  //이제 css에서 다뤄보자
  //이미지 툭툭 끊김
  image.addEventListener("load", showImage);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
  const randomNumber = getRandom(1,imgNumber);
  paintImage(randomNumber);

}

init();