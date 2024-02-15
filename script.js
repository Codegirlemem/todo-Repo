const task = document.createElement("template");
task.innerHTML = `
<label for="task">
  <div id="task">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
  </div>
  <span><slot></slot></span>
  <button>x</button>
</label>
`;

class TodoTask extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(task.content.cloneNode(true));
    shadow.adoptedStyleSheets = [toDo];
    this.label = shadow.querySelector("label");
    this.div = shadow.querySelector("div");
    this.span = shadow.querySelector("span");
    this.button = shadow.querySelector("button");
    this.host = shadow.host;
  }

  connectedCallback() {
    this.div.style.backgroundColor = "white";

    this.host.addEventListener("mouseover", () => {
      this.button.style.display = "block";
      this.deleteTask();
    });

    this.host.addEventListener("mouseout", () => {
      this.button.style.display = "none";
    });

    this.div.addEventListener("click", () => {
      this.showTask();
    });
  }

  deleteTask() {
    this.button.addEventListener("click", (e) => {
      this.host.remove();
    });
  }

  showTask() {
    if (this.getAttribute("completed") === "false") {
      this.div.style.backgroundColor = "#abea6e";
      this.setAttribute("completed", "true");
    } else {
      this.div.style.backgroundColor = "white";
      this.setAttribute("completed", "false");
    }
    getCompletedTasks();
  }
}

customElements.define("todo-task", TodoTask);

// Timeline section
const timeline = document.createElement("template");
timeline.innerHTML = `
<button>
    <slot></slot>
</button>
`;

class TimeLine extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [sheet];
    shadow.append(timeline.content.cloneNode(true));

    this.buttonStyle = shadow.querySelector("button").style;
    this.buttonStyle.backgroundColor = this.getAttribute("color");
  }
}

customElements.define("time-line", TimeLine);

// functions to update progress bar from todo tasks completed
function getCompletedTasks() {
  let todoArray = document.querySelectorAll("todo-task");

  const completedTasksArr = [...todoArray].filter((arr) => {
    return arr.getAttribute("completed") === "true";
  });

  setProgressPercent(completedTasksArr, todoArray);
}

function setProgressPercent(complete, todoArray) {
  const completedTasks = complete.length;
  const percentCompletion = (completedTasks / todoArray.length) * 100;
  updateProgressBar(percentCompletion);
}

function updateProgressBar(taskPercent) {
  const progressText = document.querySelector("#progress-text");
  const progress = document.querySelector("#progress");

  progressText.textContent = `
  ${taskPercent.toFixed(0)}% complete
  `;

  progress.style.width = `
  ${taskPercent.toFixed(0)}%
  `;
}

// ADDING MORE Tasks to the todo lists
const createTasks = document.querySelector(".create-tasks");
const btnPlus = document.querySelector(".btn-plus");

const inputContainer = document.createElement("div");
inputContainer.setAttribute("class", "input-container");

const inputField = document.createElement("input");
inputField.setAttribute("type", "text");
inputField.classList.add("enter-task");
inputField.placeholder = "Add a new task";

const submitInput = document.createElement("button");
submitInput.classList.add("submit-task");
submitInput.textContent = "Add";

inputContainer.append(inputField, submitInput);

btnPlus.addEventListener("click", () => {
  showTaskInput();
});

function showTaskInput() {
  const newInputTask = document.querySelector(".input-container");

  if (newInputTask) {
    newInputTask.remove();
  } else {
    createTasks.appendChild(inputContainer);
  }

  const submitTask = document.querySelector(".submit-task");

  submitTask.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event.target);
    appendUserTask();
  });
}

function appendUserTask() {
  const enterTask = document.querySelector(".enter-task");
  const taskValue = enterTask.value.trim();

  // create new todo-task component and add its slot content
  const newTodoTask = document.createElement("todo-task");
  newTodoTask.setAttribute("completed", "false");
  newTodoTask.textContent = taskValue;

  const tasks = document.querySelector(".tasks");
  tasks.appendChild(newTodoTask);
  enterTask.value = "";
  newInputTask.remove();
}

// function getUserTask() {
//     const taskValue = enterTask.value.trim();

// }
