const todoInput = document.querySelector("#todo-input");

const createTodo = function () {
  const todoList = document.querySelector("#todo-list");
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");
  const vSpan = document.createElement("span");
  vSpan.innerText = "V";

  newBtn.addEventListener('click', () => {
    newLi.classList.toggle('complete'); // 클릭할 때 마다 compelete class 붙었다 뗐다 됨.
    if (newBtn.contains(vSpan))
      newBtn.removeChild(vSpan);
    else
      newBtn.appendChild(vSpan);
  });

  newLi.addEventListener('dblclick', () => {
    todoList.removeChild(newLi);
  });

  newSpan.textContent = todoInput.value;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);

  todoList.appendChild(newLi);
  todoInput.value = "";
};

const keyCodeCheck = function () {
  // console.log(window.event);
  if (window.event.keyCode === 13 && todoInput.value !== "") {
    createTodo();
  }
};