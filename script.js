const task = document.createElement("template");
task.innerHTML = `
<label for="task">
  <div id="task">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
  </div>
  <slot></slot>
  <slot id="show" name="updateTask"></slot>
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
  }

  connectedCallback() {
    this.div.style.backgroundColor = "white";
    this.div.addEventListener("click", () => {
      this.showTask();
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
