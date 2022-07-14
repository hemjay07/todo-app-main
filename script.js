"Use strict";
// localStorage.clear();
const newTodo = document.querySelector(".todo-input");
const all = document.querySelector(".all");
const alll = document.querySelector(".alll");
const numberActive = document.querySelectorAll(".number-active");
const clearCompleted = document.querySelectorAll(".clear-completed");
const allButton = document.querySelectorAll(".all-button");
const activeButton = document.querySelectorAll(".active-button");
const completedButton = document.querySelectorAll(".completed-button");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const imgMD = document.querySelector(".img-md");
const desktopModeSummary = document.querySelector(".desktop-mode-summary");
const summary = document.querySelector(".summary");
const clear = document.querySelector(".clear");
const root = document.querySelector(":root");

/////////////
/////////////    SET MODE
/////////////

// if there is no mode already set in the local storage(meaning this is the first time the user is opening the site) set mode to light
if (!localStorage.getItem("mode")) {
  localStorage.setItem("mode", "light");
}
//else set mode to the last mode used by the user
mode = localStorage.getItem("mode");

/////////////
/////////////   SET VIEW
/////////////

// create mediaquerylist object
// this checks if the viewport is less than 800px
const mmobj = window.matchMedia("(max-width:800px)");
view();

function view() {
  //   if viewport less than 800px, set mobile view
  if (mmobj.matches) {
    mobile();

    // if viewport is greater than 800px, set desktop view
  } else {
    desktop();
  }
}
//add an event listener to the object created such that anytime it changes(the viewport switches at the 800px breakpoint) the funtion view is called so that the view is changed
mmobj.addEventListener("change", view);

/////////////
/////////////   UPDATE UI
/////////////
//update the ui by getting the todo list if present from the local storage.
updateUI();
function updateUI() {
  //if a todo list is present in the local storage
  if (localStorage.getItem("html")) {
    //   get the html(the innerhtml of the created todo are saved in an array called html in storage)
    const items = JSON.parse(localStorage.getItem("html"));
    items.forEach((todo) => {
      // using each of the item in the array create a todo
      const html = `<div class="todo all">${todo}</div>`;

      // insert the new html
      alll.insertAdjacentHTML("beforeend", html);

      //   add event listener to the newly created element for the check-box and cancel button
      listeners();
    });
  }
  updateActive();
}
/////////////
/////////////
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
/////////////
/////////////
function deleteTodo(e) {
  //Since the class where the listener was added is just a child of the todo div created , select the parent node and then delete it
  const item = e.currentTarget.parentNode;
  item.remove();
  updateStorage();
  updateActive();
}
/////////////
/////////////
function completed(e) {
  // add a class 'completed' once the circle is checked
  const list = e.currentTarget.classList;
  // At first click, active is toggled off and completed is toggled on. vice-versa happens upon subsequent clicks
  list.toggle("completed");
  list.toggle("active");

  //   to the element that comes after(the p : the todo text) add a class "line-through" which strikes through the todo
  const siblingElement = e.currentTarget.nextElementSibling;
  siblingElement.classList.toggle("line-through");
  updateStorage();
  updateActive();
}

/////////////
/////////////  CREATING NEW TODO
/////////////
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
  alll.insertAdjacentHTML("beforeend", html);

  //   add event listener to the newly created element for the check-box and cancel button
  listeners();

  //   inform storage of the newly inserted todos
  updateStorage();
  updateActive();
}
/////////////
/////////////
function updateStorage() {
  const innerHtml = [];
  localStorage.clear();

  // get all todo elements  and create an array which will contain the innerhtml of every one of them
  const todo = [...document.querySelectorAll(".all")];

  todo.forEach((e) => innerHtml.push(e.innerHTML));
  localStorage.setItem("html", JSON.stringify(innerHtml));
  //   since you cleared storage above you have to update the mode in the storage to the current mode
  localStorage.setItem("mode", `${mode}`);
}
/////////////
/////////////
function updateActive() {
  // update the number displayed as the number of active items
  const count = document.querySelectorAll(".active").length;

  //since in the html this particular element was created twice one for the mobile and one for the desktop mode, we have to select each of them and update the count of active items
  numberActive.forEach((e) => {
    e.textContent = `${count} ${count > 1 ? "items" : "item"} left`;
  });
}
clearCompleted.forEach((button) => {
  //since in the html this particular element was created twice one for the mobile and one for the desktop mode, we have to select each of them and add the event listeners to clear the completed todo
  button.addEventListener("click", function () {
    const completedTodo = [...document.querySelectorAll(".completed")];
    completedTodo.forEach((completed) => {
      const parent = completed.parentNode;
      parent.remove();
    });
    updateStorage();
  });
});

/////////////
/////////////
/////////////
////since in the html this particular element was created twice one for the mobile and one for the desktop mode, we have to select each of them and add the event listener
completedButton.forEach((button) => {
  button.addEventListener("click", completedState);
});
function completedState(e) {
  //select all completed todo list (all elements with the class completed), for each of them  remove the invisibility class
  const completedTodo = [...document.querySelectorAll(".completed")];
  completedTodo.forEach((active) => {
    active.parentNode.classList.remove("invisibility");
  });

  //select all active todo list (all elements with the class active), for each of them add  the invisibility class
  const activeTodo = [...document.querySelectorAll(".active")];
  activeTodo.forEach((active) => {
    active.parentNode.classList.add("invisibility");
  });
  //highlight the element by changing the color to blue
  //reset the color of active and all
  e.currentTarget.style.color = "hsl(220, 98%, 61%)";
  activeButton.forEach((button) => (button.style.color = "hsl(234, 11%, 52%)"));
  allButton.forEach((button) => (button.style.color = "hsl(234, 11%, 52%)"));
}
/////////////
/////////////
/////////////
/////similar idea as the completedState function
activeButton.forEach((button) => {
  button.addEventListener("click", activeState);
});
function activeState(e) {
  const activeTodo = [...document.querySelectorAll(".active")];
  activeTodo.forEach((active) => {
    active.parentNode.classList.remove("invisibility");
  });

  const completedTodo = [...document.querySelectorAll(".completed")];
  completedTodo.forEach((active) => {
    active.parentNode.classList.add("invisibility");
  });
  e.currentTarget.style.color = "hsl(220, 98%, 61%)";
  completedButton.forEach(
    (button) => (button.style.color = "hsl(234, 11%, 52%)")
  );
  allButton.forEach((button) => (button.style.color = "hsl(234, 11%, 52%)"));
}
/////////////
/////////////
/////////////
/////similar idea to the completedState function
allButton.forEach((button) => {
  button.addEventListener("click", allState);
});
function allState(e) {
  const activeTodo = [...document.querySelectorAll(".active")];
  activeTodo.forEach((active) => {
    active.parentNode.classList.remove("invisibility");
  });

  const completedTodo = [...document.querySelectorAll(".completed")];
  completedTodo.forEach((active) => {
    active.parentNode.classList.remove("invisibility");
  });
  e.currentTarget.style.color = "hsl(220, 98%, 61%)";
  activeButton.forEach((button) => (button.style.color = "hsl(234, 11%, 52%)"));
  completedButton.forEach(
    (button) => (button.style.color = "hsl(234, 11%, 52%)")
  );
}
/////////////
/////////////
/////////////
function mobile() {
  if (mode === "dark") {
    mobileDark();
  } else {
    mobileLight();
  }
}
function desktop() {
  if (mode === "dark") {
    desktopDark();
  } else {
    desktopLight();
  }
}

/////////////
/////////////
/////////////
sun.addEventListener("click", function () {
  if (!mmobj.matches) {
    if (mode === "dark") {
      desktopLight();
      mode = "light";
      localStorage.setItem("mode", "light");
    } else {
      desktopDark();
      mode = "dark";
      localStorage.setItem("mode", "dark");
    }

    //   if viewport less than 800px, set mobile view
  } else {
    if (mode === "dark") {
      mobileLight();
      mode = "light";
      localStorage.setItem("mode", "light");
    } else {
      mobileDark();
      mode = "dark";
      localStorage.setItem("mode", "dark");
    }
  }
});
