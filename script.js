const todoList = document.getElementById('todoList');
const newTodoInput = document.getElementById('newTodo');
const itemsLeft = document.getElementById('itemsLeft');
const allFilter = document.getElementById('allFilter');
const activeFilter = document.getElementById('activeFilter');
const completedFilter = document.getElementById('completedFilter');
const clearCompleted = document.getElementById('clearCompleted');

let todos = [];
let filter = 'all';

function renderTodos() {
  todoList.innerHTML = '';
  let filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} 
        onclick="toggleComplete(${index})" />
      <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <button onclick="deleteTodo(${index})">❌</button>
    `;
    todoList.appendChild(todoItem);
  });

  updateItemsLeft();
}

function addTodo() {
  const text = newTodoInput.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    newTodoInput.value = '';
    renderTodos();
  }
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function updateItemsLeft() {
  const itemsLeftCount = todos.filter(todo => !todo.completed).length;
  itemsLeft.textContent = `${itemsLeftCount} items left`;
}

function setFilter(newFilter) {
  filter = newFilter;
  renderTodos();
}

function clearCompletedTodos() {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
}

newTodoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

allFilter.addEventListener('click', () => setFilter('all'));
activeFilter.addEventListener('click', () => setFilter('active'));
completedFilter.addEventListener('click', () => setFilter('completed'));
clearCompleted.addEventListener('click', clearCompletedTodos);

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

renderTodos();
