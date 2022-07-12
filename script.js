"Use strict";
// localStorage.clear();

const newTodo = document.querySelector(".todo-input");
const todoRow = document.querySelector(".row--todo");
const numberActive = document.querySelector(".number-active");
const clearCompleted = document.querySelector(".clear-completed");
const allButton = document.querySelector(".all-button");
const activeButton = document.querySelector(".active-button");
const completedButton = document.querySelector(".completed-button");

updateUI();
function updateUI() {
  if (localStorage.getItem("html")) {
    //   get the html(the innerhtml of the created todo are saved in an array called html in storage)
    const items = JSON.parse(localStorage.getItem("html"));
    items.forEach((todo) => {
      // using each of the item in the array create a todo
      const html = `<div class="todo all">${todo}</div>`;

      // insert the new html
      todoRow.insertAdjacentHTML("beforeend", html);

      //   add event listener to the newly created element for the check-box and cancel button
      listeners();
    });
  }
  updateActive();
}
function listeners() {
  // event listener for the check-box
  const checkCircle = document.querySelectorAll(".check-circle-todo");
  checkCircle.forEach((element) => {
    // only add event listener if there isnt one already
    if (!element.addEventListener("click", completed)) {
      element.addEventListener("click", completed);
    }
  });

  //   event listener for the cancel button
  const cancelled = document.querySelectorAll(".cancelled");
  cancelled.forEach((element) => {
    //   only add event listener if there isnt one already
    if (!element.addEventListener("click", deleteTodo)) {
      !element.addEventListener("click", deleteTodo);
    }
  });
}
function completed(e) {
  // add a class 'completed' once the circle is checked
  const list = e.currentTarget.classList;
  list.toggle("completed");
  list.toggle("active");

  //   to the element that comes after(the p : the todo text) add a class "line-through" which strikes through the todo
  const siblingElement = e.currentTarget.nextElementSibling;
  siblingElement.classList.toggle("line-through");
  updateStorage();
  updateActive();
}

function deleteTodo(e) {
  const item = e.currentTarget.parentNode;
  item.remove();
  updateStorage();
  updateActive();
}

// create newTodo
newTodo.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    // upon pressing enter at the input
    const todo = e.target.value;
    if (todo !== "") {
      createTodo(todo);
    }
  }
});

function createTodo(todo) {
  // empty the input field
  newTodo.value = "";

  //   create a new html element with the new todo
  const html = `  <div class="todo all">
  <span class="material-symbols-outlined check-circle check-circle-todo active"> check_small </span>
  <p class="todo-text">${todo}</p>
  <span class=" cancelled material-symbols-outlined">
    close
    </span>
</div>`;
  // insert the new html
  todoRow.insertAdjacentHTML("beforeend", html);

  //   add event listener to the newly created element for the check-box and cancel button
  listeners();

  //   inform storage of the newly inserted todos
  updateStorage();
  updateActive();
}

function updateStorage() {
  const innerHtml = [];
  localStorage.clear();

  // get all todo elements  and create an array which will contain the innerhtml of every one of them
  const todo = [...document.querySelectorAll(".all")];
  todo.forEach((e) => innerHtml.push(e.innerHTML));
  localStorage.setItem("html", JSON.stringify(innerHtml));
}

function updateActive() {
  numberActive.textContent = `${
    document.querySelectorAll(".active").length
  } items left`;
}

clearCompleted.addEventListener("click", function () {
  const completedTodo = [...document.querySelectorAll(".completed")];
  completedTodo.forEach((completed) => {
    const parent = completed.parentNode;
    parent.remove();
  });
  updateStorage();
});

completedButton.addEventListener("click", completedState);
function completedState(e) {
  const completedTodo = [...document.querySelectorAll(".completed")];
  completedTodo.forEach((active) => {
    active.parentNode.classList.remove("invisibility");
  });

  const activeTodo = [...document.querySelectorAll(".active")];
  activeTodo.forEach((active) => {
    active.parentNode.classList.add("invisibility");
  });
  e.currentTarget.style.color = "white";
  activeButton.style.color = "hsl(234, 11%, 52%)";
}

activeButton.addEventListener("click", activeState);
function activeState(e) {
  const activeTodo = [...document.querySelectorAll(".active")];
  activeTodo.forEach((active) => {
    active.parentNode.classList.remove("invisibility");
  });

  const completedTodo = [...document.querySelectorAll(".completed")];
  completedTodo.forEach((active) => {
    active.parentNode.classList.add("invisibility");
  });
  e.currentTarget.style.color = "white";
  completedButton.style.color = "hsl(234, 11%, 52%)";
  allButton.style.color = "hsl(234, 11%, 52%)";
}

allButton.addEventListener("click", allState);
function allState(e) {
  console.log(2);
  const activeTodo = [...document.querySelectorAll(".active")];
  activeTodo.forEach((active) => {
    active.parentNode.classList.remove("invisibility");
  });

  const completedTodo = [...document.querySelectorAll(".completed")];
  completedTodo.forEach((active) => {
    active.parentNode.classList.remove("invisibility");
  });
  e.currentTarget.style.color = "white";

  completedButton.style.color = "hsl(234, 11%, 52%)";

  activeButton.style.color = "hsl(234, 11%, 52%)";
}
