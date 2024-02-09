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
  if (window.event.keyCode === 13 && todoInput.value !== "") {
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
    localStorage.setItem('saved-items', JSON.stringify(saveItems));
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}