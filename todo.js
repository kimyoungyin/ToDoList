const toDolist = document.querySelector(".js-toDoList");
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");

const todos_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
  //이벤트가 일어난 그 부모를 찾는 방법.. parentNode
  const btn = event.target;
  const li = btn.parentNode;
  //이래야 딱 이벤트가 일어난 곳의 부모를 가져올 수 있음.
  toDolist.removeChild(li);
  //위 단계 것만 하면 새로고침 했을 때 되돌아옴
  //filter도  forEach처럼 각 요소에 한번씩 실행 : 괄호 안 조건이 true인 애들만 모아서 array 형성
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
    //console.log로 확인해보니 li.id 가 string이여서 숫자로 변환해서 비교함
    //아닌게 true인 것이 모여야 클릭했던 것만 사라지고 나머지만 남음
  });
  //그리고 이 cleanToDos array를 toDos랑 교체하면 됨.
  toDos = cleanToDos;
  //근데 toDos는 const 였으므로 let으로 바꿔줘야함
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(todos_LS, JSON.stringify(toDos));
  //하지만 localStorage는 object던 다른 것이던 string으로 저장하려 하기 때문에.. 
  //JSON.stringify를 활용하자(object -> string)
}


function paintToDo(text) {
  //원하는 태그를 만들려면?
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  //부모 안에 넣는 법
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  //id 추가 -> 나중에 어떤 리스트를 삭제할지 알도록
  toDolist.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  //리스트를 localStorage에 저장하려면 array를 형성해야함
  saveToDos();
  //push한 후에 이거 실행시켜야.. 
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value="";
  //엔터 누르면 값 사라지게
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(todos_LS);
  if(loadedToDos !== null) {   
    //이대로 loadedToDos를 가져오면 string이기 때문에, 또 JSON.parse를 활용해서 Object로 되돌려주자
    const parsedToDos =JSON.parse(loadedToDos);
    //기억하자 toDOs는 빈 array고, parsedToDos에 object가 들어있다는 걸
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    })
    //forEach는 각 인덱스에 함수 한번 씩 실행
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();