const KeyCodeCheck = function () {
    // console.log(window.event);
    if (window.event.keyCode === 13)
    {
        const inputvalue = document.querySelector("#todo-input");
        console.log(inputvalue.value);
        inputvalue.value = "";
    }  
};
