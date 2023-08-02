const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");

let tasks = [];

// function to render tasks in the list
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="task_${index}" ${
      task.completed ? "checked" : ""
    }>
      <label for="task_${index}" class="${task.completed ? "completed" : ""}">${
      task.title
    }</label>
      <button class="deleteButton">Delete</button>
    `;
    taskList.appendChild(li);

    const deleteButton = li.querySelector(".deleteButton");
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    const taskCheckbox = li.querySelector(`#task_${index}`);
    taskCheckbox.addEventListener("change", () => {
      task.completed = !task.completed;
      if (task.completed) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
    });
  });

  totalTasks.textContent = tasks.length;
}

// function to add a new task to the list
function addTask() {
  const title = taskInput.value.trim();
  if (title) {
    tasks.push({ title, completed: false });
    renderTasks();
    taskInput.value = "";
  }
}

// event listener for the add button
addButton.addEventListener("click", addTask);

// event listener for the enter key press in the task input
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// initial rendering of tasks
renderTasks();
