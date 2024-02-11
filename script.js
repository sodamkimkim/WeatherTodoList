const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
console.log(savedTodoList);

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData)
    todoContents = storageData.contents;

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");
  newBtn.textContent = "";

  newBtn.addEventListener('click', () => {
    completeTodoFn(newLi, newBtn);
  });

  newLi.addEventListener('dblclick', () => {
    newLi.remove();
    saveItemsFn();
  });

  if (storageData?.complete === true)
    completeTodoFn(newLi, newBtn);

  newSpan.textContent = todoContents;

  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFn();
};

const completeTodoFn = function (newLi, newBtn) {
  newLi.classList.toggle('complete');
  newBtn.textContent = "V";

  saveItemsFn();
};
const keyCodeCheck = function () {
  // console.log(window.event);
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    createTodo();
  }
};
const deleteAll = function () {
  const liList = document.querySelectorAll('#todo-list>li'); // 해당 id의 li를 다 들고온다.
  // for (let i = 0; i < liList.length; i++) {
  //   liList[i].remove();
  // }
  liList.forEach(function (li) {
    li.remove();
  });
  saveItemsFn();
};

const saveItemsFn = function () {
  // localStorage에 데이터 저장
  const saveItems = [];

  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector('li>span').textContent,
      complete: todoList.children[i].classList.contains('complete')
    }
    saveItems.push(todoObj);
  }

  saveItems.length === 0 ?
    localStorage.removeItem('saved-items') :
    localStorage.setItem('saved-items', JSON.stringify(saveItems)); // ** 
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

// OpenWeatherMap API
const weatherSearch = function (position) {
  // fetch(`https://api.openweathermap.org/data/3.0/weather?lat={lat}&lon={lon}&appid={API key}`);
  // console.log(position);

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=d00aad183fd60b5b8bae7f45c445edb2`
  ).then((res) => {
    console.log(res);
    return res.json(); // ** body, header가 존재하는 json 받아올 때 .json() 사용! body만 있으면 Json.Parse() 사용해도 됨
  }).then((jsonData) => {
    console.log(jsonData);
    console.log(jsonData.name, jsonData.weather[0].description);
  }).catch((err) => {
    console.error(err);
  })
};

const accessToGeo = function (position) {
  console.log(position);
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }
  weatherSearch(positionObj);
}

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log(err);
  });
}

askForLocation();

//#region  promiseTest
const promiseTest = function () {
  return new Promise((resolver, reject) => {
    setTimeout(() => {
      resolver(100);
      // reject('error');
    }, 2000); // 통신 2초 후 resolver(100)실행
  });
}

// console.log(promiseTest()); // ** pending 2초 -> fulfilled 됨
// promiseTest().then((res) => { // ** then()을 쓰면 fulfilled 된 후 콜백함수 실행하겠다는 뜻
//   console.log(res);
// });
//#endregion