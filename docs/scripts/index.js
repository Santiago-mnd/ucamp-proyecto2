// Tenemos mayor legibilidad usando esta función =>
const $ = (selector) => document.querySelector(selector);

const mainForm = $('#mainForm');
const todosList = $('#todoList');
const completedTodosList = $('#completedTodosList');
const completedTodosListContainer = $('#completedTodosListContainer');
let todosArray = [];

// Functions

const createItem = (actividad) => {
  const item = {
    todo: actividad,
    isCompleted: false,
  };
  todosArray.push(item);
  return item;
};

const saveTodo = () => {
  localStorage.setItem('todos', JSON.stringify(todosArray));
  printTodos();
  printCompletedTodos();
};

const deleteTodo = (todo) => {
  todosArray = todosArray.filter((item) => item.todo !== todo);
  saveTodo();
};

const editTodo = (todo) => {
  const newTodo = prompt('Edita tu tarea', todo);
  todosArray.forEach((item) => {
    if (newTodo === null || newTodo === '') {
      return;
    }

    if (item.todo === todo) {
      item.todo = newTodo;
    }
  });
  saveTodo();
};

updateTodo = (todo) => {
  todosArray.forEach((item) => {
    if (item.todo === todo) {
      item.isCompleted = !item.isCompleted;
    }
  });
  saveTodo();
};

const printTodos = () => {
  todosArray = JSON.parse(localStorage.getItem('todos'));
  if (todosArray === null) todosArray = [];
  todosList.innerHTML = '';
  todosArray.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const isButtonEven = isEven
      ? 'bg-fuchsia-900 hover:bg-amber-200 hover:text-fuchsia-900'
      : 'bg-amber-200 text-fuchsia-900 hover:bg-fuchsia-100 ';
    const li = document.createElement('li');
    li.innerHTML = `
    <p
      class="text-sm whitespace-pre-line text-center mb-4 md:mb-0 md:text-left md:whitespace-normal"
    >
      ${item.todo}
    </p>
    <div class="flex items-center md:justify-end md:w-1/3 gap-2">
      <button
        onclick="updateTodo('${item.todo}')"
        class="text-amber-200 flex items-center justify-center transition-colors duration-300 ease-out ${isButtonEven} rounded-md px-2 py-1" id="${index}-done"
      >
        ${
          item.isCompleted
            ? '<ion-icon name="arrow-undo-outline"></ion-icon>'
            : '<ion-icon name="checkmark-done-outline"></ion-icon>'
        }
      </button>
      <button
        onclick="editTodo('${item.todo}')"
        class="text-amber-200 flex items-center justify-center transition-colors duration-300 ease-out ${isButtonEven} rounded-md px-2 py-1" id="${index}-edit"
      >
        <ion-icon name="pencil-outline"></ion-icon>
      </button>
      <button
        onclick="deleteTodo('${item.todo}')"
        class="text-amber-200 flex items-center justify-center transition-colors duration-300 ease-out ${isButtonEven} rounded-md px-2 py-1" id="${index}-delete"
        aria-label="Eliminar tarea"
      >
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </div>`;

    if (isEven) {
      li.classList.add(
        'w-full',
        'flex',
        'flex-col',
        'md:flex-row',
        'items-center',
        'justify-between',
        'bg-fuchsia-100',
        'rounded-md',
        'p-2'
      );
    } else {
      li.classList.add(
        'w-full',
        'flex',
        'flex-col',
        'md:flex-row',
        'items-center',
        'justify-between',
        'bg-fuchsia-900',
        'text-fuchsia-200',
        'rounded-md',
        'p-2'
      );
    }

    !item.isCompleted && todosList.appendChild(li);
  });
};

const printCompletedTodos = () => {
  completedTodosArray = JSON.parse(localStorage.getItem('todos'));
  if (completedTodosArray === null) completedTodosArray = [];
  completedTodosArray = completedTodosArray.filter((item) => item.isCompleted);
  completedTodosList.innerHTML = '';
  completedTodosArray.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const isButtonEven = isEven
      ? 'bg-fuchsia-900 hover:bg-amber-200 hover:text-fuchsia-900'
      : 'bg-amber-200 text-fuchsia-900 hover:bg-fuchsia-100 ';
    const li = document.createElement('li');
    li.innerHTML = `
    <p
      class="text-sm whitespace-pre-line text-center mb-4 md:mb-0 md:text-left md:whitespace-normal"
    >
      ${item.todo}
    </p>
    <div class="flex items-center md:justify-end md:w-1/3 gap-2">
      <button
        onclick="updateTodo('${item.todo}')"
        class="text-amber-200 flex items-center justify-center transition-colors duration-300 ease-out ${isButtonEven} rounded-md px-2 py-1" id="${index}-undo"
        aria-label="Eliminar tarea"
      >
        ${
          item.isCompleted
            ? '<ion-icon name="arrow-undo-outline"></ion-icon>'
            : '<ion-icon name="checkmark-done-outline"></ion-icon>'
        }
      </button>
      <button
        onclick="deleteTodo('${item.todo}')"
        class="text-amber-200 flex items-center justify-center transition-colors duration-300 ease-out ${isButtonEven} rounded-md px-2 py-1" id="${index}-delete"
        aria-label="Eliminar tarea"
      >
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </div>`;
    if (isEven) {
      li.classList.add(
        'w-full',
        'flex',
        'flex-col',
        'md:flex-row',
        'items-center',

        'justify-between',
        'bg-fuchsia-100',
        'rounded-md',
        'p-2'
      );
    } else {
      li.classList.add(
        'w-full',
        'flex',
        'flex-col',
        'md:flex-row',
        'items-center',
        'justify-between',
        'bg-fuchsia-900',
        'text-fuchsia-200',
        'rounded-md',
        'p-2'
      );
    }
    completedTodosList.appendChild(li);
  });
};

const printAllTodos = () => {
  printTodos();
  printCompletedTodos();
};
// Events

mainForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = $('#newTask').value;

  if (newTask.length < 3) {
    alert('La tarea debe tener al menos 3 caracteres');
    return;
  }

  createItem(newTask);
  saveTodo();
  mainForm.reset();
});

document.addEventListener('DOMContentLoaded', printAllTodos);
