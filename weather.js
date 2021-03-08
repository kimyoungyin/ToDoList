const API_KEY = "c82d1ace9b530a15a0a719747f796c95";
const COORDS = 'coords';
const weather = document.querySelector(".js-weather");

//JS를 통해 url(웹사이트)로 요청을 보내고 데이터를 받아오는데, 이는 새로 고침 없이 자동으로 refresh됨 ex)이메일
//http부분은 넣어주자
function getWeather(lat, lon){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    //단위 변경 뒤에 붙이기(밑 참고)
    //.then은 웹에서 데이터를 다 받아왔을 때 실행할 함수 설정
    ).then(function(response){
      return response.json();
      //웹사이트에서 받아온 것들이 JavaScript object인데, 이게 json임
    }).then(function(json){
      const temperature = json.main.temp; // 이건 console.log(json) 내부를 살펴보면 쉬움
      const place = json.name;
      weather.innerText = `Temp : ${temperature}℃ / Location : ${place}`;
    })
    //각 단계가 완료되기까지 기다려야 하므로 나눠준거..
    //JS 강의 들으래..
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    //key 랑 value랑 같으면 그냥 이렇게
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("Cant access geoloaction");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    askForCoords();
  } else {
    //날씨 정보가 들어왔을 때
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    //Network 탭에서 확인 -. header, request랑 response도 확인해보자.. 온도는 섬씨 아님
    //API 문서들의 단위들이 궁금하면 units of measurement 확인 -> url 수정
  }
}

function init() {
  loadCoords();
}

init();