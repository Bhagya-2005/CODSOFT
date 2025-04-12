let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-title">${task.title}</div>
      <div class="task-meta">⏰ ${task.time || "Not set"} | 🚦 Priority: ${task.priority || "Normal"}</div>
      <div class="task-actions">
        <button onclick="removeTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addNewTask() {
  const title = prompt("Task title:");
  const time = prompt("Due time (e.g., 4:30 PM):");
  const priority = prompt("Priority (Low / Medium / High):");

  if (title) {
    tasks.push({ title, time, priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function searchTasks() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const taskItems = document.querySelectorAll("#taskList li");

  taskItems.forEach(item => {
    const title = item.querySelector(".task-title").textContent.toLowerCase();
    item.style.display = title.includes(query) ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", renderTasks);
