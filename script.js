const KeyCodeCheck = function () {
  // console.log(window.event);
  if (window.event.keyCode === 13) {
    const todoInput = document.querySelector("#todo-input");
    const todoList = document.querySelector("#todo-list");
    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");
    newSpan.textContent = todoInput.value;
    newLi.appendChild(newSpan);
    console.log(newLi);
      todoList.appendChild(newLi);
      todoInput.value= "";
  }
};
