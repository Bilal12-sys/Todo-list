const input = document.getElementById("inp");
const ul = document.getElementById("ul");
const themeBtn = document.getElementById("themeToggle");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Toggle Dark Mode
themeBtn.onclick = () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  themeBtn.innerHTML = isDark ? "☀️" : "🌙";
};

function renderTodos() {
  ul.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    
    const span = document.createElement("span");
    span.textContent = todo;

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "🖉";
    editBtn.onclick = () => startEdit(li, span, index);

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑️";
    delBtn.className = "del-btn";
    delBtn.onclick = () => {
      todos.splice(index, 1);
      save();
    };

    btnGroup.append(editBtn, delBtn);
    li.append(span, btnGroup);
    ul.appendChild(li);
  });
}

function startEdit(li, span, index) {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = todos[index];

  li.replaceChild(editInput, span);
  editInput.focus();

  const finishEdit = () => {
    const val = editInput.value.trim();
    if (val) todos[index] = val;
    save();
  };

  editInput.onkeydown = (e) => { if (e.key === "Enter") finishEdit(); };
  editInput.onblur = finishEdit;
}

function addTodo() {
  const val = input.value.trim();
  if (!val) return;
  todos.push(val);
  input.value = "";
  save();
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

input.onkeydown = (e) => { if (e.key === "Enter") addTodo(); };

renderTodos();