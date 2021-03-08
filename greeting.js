const form = document.querySelector(".js-form"); //이 class이름을 가진 위치 중 첫번째를 가져옴
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
//locaStorage : 작은 JS정보를 컴퓨터에 저장하는 방법 -> 이후 이를 다시 가져옴!

const user_LS = "currentUser";
const showing_CN = "showing";

function saveName(text){
  localStorage.setItem(user_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  //event가 발생하면 root까지 올라가서 페이지가 아예 새로고침되는데 이 현상을 막고 있음.
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(showing_CN);
  form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(showing_CN);
  greeting.classList.add(showing_CN);
  greeting.innerText = `Hello ${text}`;
};

function loadName() {
  const currentUser = localStorage.getItem(user_LS);
  //getItem(key)는 그에 대응하는 value(우리 이름)를 가져오겠지
  if(currentUser === null) {
//localstorage에 유저 없을 떄
    askForName();
    //이러고 enter를 누르면 form이 제출됨
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();