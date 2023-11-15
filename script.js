//CONSTANTS
const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoList = document.querySelector(".todo-container");

//FUNCTION TO ADD THE TODO IN TODO LIST AND SAVE IT TO LOCAL STORAGE
const addTodo = () => {
  todos.push(input.value);
  localStorage.setItem("todos", JSON.stringify(todos));
  input.value = "";
  showTodos(todos);
};
addBtn.addEventListener("click", addTodo);

//FUNCTION TO DISPLAY TODOS IN THE TODO LIST
function showTodos(todos) {
  if (todos.length < 1) {
    todoList.innerHTML = "NO TODO FOUND!"
    todoList.classList.add("empty-todo-list")
  } else {
    todoList.classList.remove("empty-todo-list")
    todoList.innerHTML = todos
      .map(
        (todo, i) =>
          `<li class="todo" data-todo-id=${i}>
          <input type="checkbox" id="${i}">
          <label id="${i}" class="todo-text">${todo}</label>
          <i class="fa-solid fa-trash delete-btn"></i>
          </li>`
      )
      .join("");
  }
}

//FUNCTION TO TOGGLE COMPLETED TASK AND DELETE TASK
function toggleCompletedTodo(event) {
  const todoId = event.target.id;
  if (todoId) {
    document.getElementById(`${todoId}`).checked = !document.getElementById(
      `${todoId}`
    ).checked;
    event.target.classList.toggle("completed-todo");
  }
  if (event.target.className.includes("delete-btn")) {
    event.target.parentElement.remove();
    const todoText = event.target.parentElement.children[1].innerHTML;
    todos = todos.filter((text) => text !== todoText);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
    showTodos(todos)
  }
}
todoList.addEventListener("click", toggleCompletedTodo);

//FUNCTION TO TO DISPLAY TODOS IN THE TODO LIST ON LOAD
window.addEventListener("DOMContentLoaded", () => {
  showTodos(todos);
});
