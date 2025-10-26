
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
    li.dataset.index = index;
    taskList.appendChild(li);
  });

  totalTasks.textContent = tasks.length;
}

function addTask(event) {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (title) {
    tasks.push({ title, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", addTask);

taskList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("deleteButton")) {
    const index = target.closest("li").dataset.index;
    deleteTask(index);
  }
});

taskList.addEventListener("change", (event) => {
  const target = event.target;
  if (target.type === "checkbox") {
    const index = target.closest("li").dataset.index;
    toggleTask(index);
  }
});

renderTasks();
