// Tenemos mayor legibilidad usando esta función =>
const $ = (selector) => document.querySelector(selector);

const mainForm = $('#mainForm');
const todosList = $('#todoList');
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
};

const deleteTodo = (todo) => {
  // let indexArray;
  // todosArray.forEach((item, index) => {
  //   if (item.todo === todo) {
  //     indexArray = index;
  //   }
  // });
  // todosArray.splice(indexArray, 1);
  // saveTodo();

  todosArray = todosArray.filter((item) => item.todo !== todo);
  saveTodo();
};

const editTodo = (todo) => {
  /*
    let indexArray = todosArray.findIndex((item) => item.todo === todo);
    todosArray[indexArray].isCompleted = true;
    saveTodo();
  */

  const newTodo = prompt('Edita tu tarea', todo);
  todosArray.forEach((item) => {
    if (item.todo === todo) {
      item.todo = newTodo;
    }
  });
  saveTodo();
};

const updateTodo = (todo) => {
  todosArray = todosArray.map((item) => {
    if (item.todo === todo) {
      item.isCompleted = !item.isCompleted;
    }
    return item;
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
        class="text-amber-200 flex items-center justify-center transition-colors duration-300 ease-out ${isButtonEven} rounded-md px-2 py-1"
      >
        <ion-icon name="checkmark-done-outline"></ion-icon>
      </button>
      <button
        class="text-amber-200 flex items-center justify-center transition-colors duration-300 ease-out ${isButtonEven} rounded-md px-2 py-1"
      >
        <ion-icon name="pencil-outline"></ion-icon>
      </button>
      <button
        class="text-amber-200 flex items-center justify-center transition-colors duration-300 ease-out ${isButtonEven} rounded-md px-2 py-1"
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

    todosList.appendChild(li);
  });
};

// Events

mainForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = $('#newTask').value;

  createItem(newTask);
  saveTodo();
  mainForm.reset();
});

document.addEventListener('DOMContentLoaded', printTodos);

todosList.addEventListener('click', (e) => {
  e.preventDefault();
});
