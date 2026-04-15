let todo = {
  title: "pick outfit for outing",
  description: "the outfit theme is corporate casual, so a cute button down and jeans with flats would work. also make sure the colors are neutral. navy, white, or black would work great together",
  priority: "High",
  status: "Pending",
  dueDate: "2026-04-16",
  completed: false
};

const COLLAPSE_THRESHOLD = 85;
let isExpanded = false;
let originalTodo = null;

const els = {
  card: document.querySelector('[data-testid="test-todo-card"]'),
  title: document.getElementById("todo-title"),
  description: document.getElementById("todo-description"),
  expandToggle: document.getElementById("expand-toggle"),
  completeToggle: document.getElementById("complete-toggle"),
  toggleSwitch: document.querySelector(".toggle-switch"),
  priorityIndicator: document.getElementById("priority-indicator"),
  priorityBadge: document.getElementById("priority-badge"),
  statusBadge: document.getElementById("status-badge"),
  timeRemaining: document.getElementById("time-remaining"),
  overdueIndicator: document.getElementById("overdue-indicator"),
  dueDateEl: document.getElementById("due-date"),
  statusControl: document.getElementById("status-control"),
  editOverlay: document.getElementById("edit-overlay"),
  editTitle: document.getElementById("edit-title"),
  editDescription: document.getElementById("edit-description"),
  editPriority: document.getElementById("edit-priority"),
  editDueDate: document.getElementById("edit-due-date"),
  saveBtn: document.getElementById("save-btn"),
  cancelBtn: document.getElementById("cancel-btn"),
  editBtn: document.getElementById("edit-btn"),
};
function calculateTimeRemaining(dueDateStr) {
  const due = new Date(dueDateStr + "T23:59:59").getTime();
  const diff = due - Date.now();

  if (diff <= 0) {
    const overdueDiff = Math.abs(diff);
    const days = Math.floor(overdueDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(overdueDiff / (1000 * 60 * 60));
    const mins = Math.floor(overdueDiff / (1000 * 60));

    let text = "Overdue";
    if (days >= 1) text = `Overdue by ${days} day${days > 1 ? "s" : ""}`;
    else if (hours >= 1) text = `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`;
    else if (mins >= 1) text = `Overdue by ${mins} minute${mins > 1 ? "s" : ""}`;

    return { text, overdue: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days >= 2) return { text: `Due in ${days} days`, overdue: false };
  if (days === 1) return { text: "Due tomorrow", overdue: false };
  if (hours >= 1) return { text: `Due in ${hours} hour${hours > 1 ? "s" : ""}`, overdue: false };
  if (mins >= 1) return { text: `Due in ${mins} minute${mins > 1 ? "s" : ""}`, overdue: false };
  return { text: "Due very soon", overdue: false };
}

function updateTimeDisplay() {
  if (todo.status === "Done") {
    els.timeRemaining.textContent = "Completed";
    els.timeRemaining.style.color = "#166534";
    els.overdueIndicator.classList.add("hidden");
    els.card.classList.remove("is-overdue");
    return;
  }

  const result = calculateTimeRemaining(todo.dueDate);
  els.timeRemaining.textContent = result.text;
  els.timeRemaining.style.color = result.overdue ? "#dc2626" : "#1f2937";
  els.overdueIndicator.classList.toggle("hidden", !result.overdue);
  els.card.classList.toggle("is-overdue", result.overdue);
}

function renderTodo() {
  // Title
  els.title.textContent = todo.title;
  els.title.classList.toggle("completed", todo.completed);

  els.card.classList.toggle("is-done", todo.status === "Done");

  const fullDesc = todo.description;
  const isLong = fullDesc.length > COLLAPSE_THRESHOLD;

  els.description.textContent = fullDesc;

  if (isLong) {
    els.description.classList.toggle("clamped", !isExpanded);
    els.expandToggle.classList.remove("hidden");
    els.expandToggle.textContent = isExpanded ? "Collapse ▲" : "Expand ▼";
    els.expandToggle.setAttribute("aria-expanded", isExpanded);
  } else {
    els.description.classList.remove("clamped");
    els.expandToggle.classList.add("hidden");
  }

  els.priorityBadge.textContent = todo.priority;
  els.priorityIndicator.className = `priority-indicator ${todo.priority.toLowerCase()}`;


  els.statusBadge.textContent = todo.status;
  const statusClass = `badge badge-${todo.status.toLowerCase().replace(" ", "-")}`;
  els.statusBadge.className = statusClass;
  els.completeToggle.checked = todo.completed;
  els.toggleSwitch.classList.toggle("checked", todo.completed);
  els.statusControl.value = todo.status;

  els.dueDateEl.textContent = new Date(todo.dueDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  updateTimeDisplay();
}

function openEditModal() {
  originalTodo = { ...todo };

  els.editTitle.value = todo.title;
  els.editDescription.value = todo.description;
  els.editPriority.value = todo.priority;
  els.editDueDate.value = todo.dueDate;

  els.editOverlay.classList.remove("hidden");
  void els.editOverlay.offsetWidth;
  els.editOverlay.classList.add("visible");

  els.editTitle.focus();
}

function closeEditModal() {
  els.editOverlay.classList.remove("visible");
  setTimeout(() => {
    els.editOverlay.classList.add("hidden");
  }, 300);

  els.editBtn.focus();
}

function saveChanges() {
  todo.title = els.editTitle.value.trim() || todo.title;
  todo.description = els.editDescription.value.trim();
  todo.priority = els.editPriority.value;
  todo.dueDate = els.editDueDate.value || todo.dueDate;

  renderTodo();
  closeEditModal();
}

function cancelEdit() {
  todo = { ...originalTodo };
  renderTodo();
  closeEditModal();
}

function updateStatus(newStatus) {
  todo.status = newStatus;
  todo.completed = newStatus === "Done";
  renderTodo();
}

function setupListeners() {
  els.completeToggle.addEventListener("change", () => {
    todo.completed = els.completeToggle.checked;
    todo.status = todo.completed ? "Done" : "Pending";
    renderTodo();
  });
  els.statusControl.addEventListener("change", (e) => updateStatus(e.target.value));
  els.expandToggle.addEventListener("click", () => {
    isExpanded = !isExpanded;
    renderTodo();
  });
  els.editBtn.addEventListener("click", openEditModal);
  els.saveBtn.addEventListener("click", saveChanges);
  els.cancelBtn.addEventListener("click", cancelEdit);
  els.editOverlay.addEventListener("click", (e) => {
    if (e.target === els.editOverlay) cancelEdit();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.editOverlay.classList.contains("hidden")) {
      cancelEdit();
    }
  });

 
  document.getElementById("delete-btn").addEventListener("click", () => {
    if (confirm("Delete this todo?")) alert("Todo deleted.");
  });
}



renderTodo();
setupListeners();
setInterval(updateTimeDisplay, 30000);
