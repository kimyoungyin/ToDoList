const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

  function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }
  //그런데 이렇게 하면 새로고침을 해줘야 시간이 업데이트됨.. 매 초마다 업데이트를 시켜줄려면?
  //setInterval(함수, 시간간격(밀리세컨드 기준))

  function init() {
    getTime();
    setInterval(getTime, 1000);
  }

  init();