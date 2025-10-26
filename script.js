
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;

    if (task.isEditing) {
      li.innerHTML = `
        <input type="text" class="editInput" value="${task.title}">
        <div class="buttons">
            <button class="saveButton">Save</button>
        </div>
      `;
    } else {
      li.innerHTML = `
        <input type="checkbox" id="task_${index}" ${task.completed ? "checked" : ""}>
        <label for="task_${index}">${task.title}</label>
        <div class="buttons">
            <button class="editButton">Edit</button>
            <button class="deleteButton">Delete</button>
        </div>
      `;
    }

    if (task.completed) {
        li.classList.add('completed');
    }


    taskList.appendChild(li);
  });

  totalTasks.textContent = tasks.length;
}

function addTask(event) {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (title) {
    tasks.push({ title, completed: false, isEditing: false });
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

function enterEditMode(index) {
    tasks.forEach((task, i) => {
        task.isEditing = (i == index);
    });
    renderTasks();
}

function saveEditedTask(index, newTitle) {
    if (newTitle) {
        tasks[index].title = newTitle;
    }
    tasks[index].isEditing = false;
    saveTasks();
    renderTasks();
}


taskForm.addEventListener("submit", addTask);

taskList.addEventListener("click", (event) => {
  const target = event.target;
  const li = target.closest("li");
  if (!li) return;
  const index = li.dataset.index;

  if (target.classList.contains("deleteButton")) {
    deleteTask(index);
  } else if (target.classList.contains("editButton")) {
    enterEditMode(index);
  } else if (target.classList.contains("saveButton")) {
    const newTitle = li.querySelector(".editInput").value.trim();
    saveEditedTask(index, newTitle);
  }
});

taskList.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target.classList.contains("editInput") && event.key === "Enter") {
        const li = target.closest("li");
        const index = li.dataset.index;
        const newTitle = li.querySelector(".editInput").value.trim();
        saveEditedTask(index, newTitle);
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
