let tasksContainer = JSON.parse(localStorage.getItem("tasks_data")) || [];

let screen = document.getElementById("screen");

function updateScreen() {
  if (!screen) return;
  screen.innerHTML = "";

  tasksContainer.forEach((u) => {
    let color = "gray";

    let p = u.priority.toLowerCase();
    if (p === "high") color = "red";
    if (p === "medium") color = "orange";
    if (p === "low") color = "green";

    let textStyle =
      u.status === "completed"
        ? "text-decoration: line-through; opacity: 0.6;"
        : "";

    screen.innerHTML += `
  <div class="task-card" style="border-left: 5px solid ${color}; padding: 18px; margin: 12px 0; background: #fff; border-radius: 14px; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); ${textStyle}">
    <div style="margin-bottom: 12px;">
        <p style="font-weight: 700; font-size: 1.05rem; margin-bottom: 4px;">${u.taskName}</p> 
        <span style="font-size: 0.75rem; color: ${color}; background: ${color}15; padding: 4px 10px; border-radius: 20px; font-weight: 700; text-transform: uppercase;">${u.priority}</span>
    </div>
    
    <div style="display: flex; align-items: center;">
        <button class="btn-toggle" onclick="toggleStatus(${u.id})">
            ${u.status === "pending" ? "Mark Done" : "Undo"}
        </button>
        <button class="btn-delete" onclick="deleteTask(${u.id})">Delete</button>
    </div>
  </div>`;
  });
}

function addTask() {
  let inputOne = document.getElementById("input-1");
  let priorityInput = document.getElementById("task-priority");

  if (inputOne.value.trim() === "") {
    alert("Please enter task");
    return;
  }

  let taskObject = {
    id: Date.now(),
    taskName: inputOne.value,
    priority: priorityInput.value,
    status: "pending",
  };

  tasksContainer.push(taskObject);
  localStorage.setItem("tasks_data", JSON.stringify(tasksContainer));

  inputOne.value = "";
  updateScreen();
}

function toggleStatus(itemTasks) {
  tasksContainer.forEach((item) => {
    if (item.id === itemTasks) {
      item.status = item.status === "pending" ? "completed" : "pending";
    }
  });

  localStorage.setItem("tasks_data", JSON.stringify(tasksContainer));
  updateScreen();
}

function deleteTask(para) {
  tasksContainer = tasksContainer.filter((p) => p.id !== para);
  localStorage.setItem("tasks_data", JSON.stringify(tasksContainer));
  updateScreen();
}

updateScreen();
