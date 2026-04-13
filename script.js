
const dueDate = new Date("2026-04-16T23:59:59").getTime();

const toggle        = document.getElementById("complete-toggle");
const toggleSwitch  = toggle.closest(".toggle-switch");
const todoTitle     = document.getElementById("todo-title");
const statusBadge   = document.getElementById("status-badge");
const timeRemaining = document.getElementById("time-remaining");
const editBtn       = document.getElementById("edit-btn");
const deleteBtn     = document.getElementById("delete-btn");

function getTimeRemaining() {
  const diff = dueDate - Date.now();
  if (diff <= 0) return "Overdue";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days >= 2) return `Due in ${days} days`;
  if (days === 1) return "Due tomorrow";
  return "Due now!";
}
function updateTimeRemaining() {
  timeRemaining.textContent = getTimeRemaining();
}
updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);

toggle.addEventListener("change", () => {
  const isCompleted = toggle.checked;

  todoTitle.classList.toggle("completed", isCompleted);


  toggleSwitch.classList.toggle("checked", isCompleted);

  if (isCompleted) {
    statusBadge.textContent = "Done";
    statusBadge.classList.remove("badge-pending");
    statusBadge.classList.add("badge-done");
  } else {
    statusBadge.textContent = "Pending";
    statusBadge.classList.remove("badge-done");
    statusBadge.classList.add("badge-pending");
  }
});

editBtn.addEventListener("click", () => alert("edit clicked"));
deleteBtn.addEventListener("click", () => alert("Delete clicked"));
