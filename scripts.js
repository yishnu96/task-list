const TodoList = (function () {
  let tasks = [];
  const tasksList = document.getElementById('list');
  const addTaskInput = document.getElementById('add');
  const tasksCounter = document.getElementById('tasks-counter');


  function addTaskToDOM (task) {
    const li = document.createElement('li');

    li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
                    <label for="${task.id}">${task.text}</label>
                    <img src="red-cross-png-red-cross-png-file-2000.png" class="delete" data-id="${task.id}"/>
                    `;
    tasksList.appendChild(li);
  }

  function renderList () {
    // first empty out the list
    tasksList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }

    // set tasks count
    tasksCounter.innerHTML = tasks.length;
  }

  function markTaskAsComplete (taskId) {
    // find the task
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
      // update the task
      tasks[taskIndex].done = !tasks[taskIndex].done;
      renderList();
      return;
    }

    // show error
  }

  function deleteTask (taskId) {
    // filter out the tasks
    const newTasks = tasks.filter(task => task.id !== taskId);

    tasks = newTasks;
    renderList();
  }

  function addTask (task) {
    if (task) {
      tasks.push(task);
      renderList();
      return;
    }

    // show error
  }

  function handleClickLisetner (e) {
    
    if (e.target.className === 'delete') {
      // handle delete task click
      const taskId = e.target.dataset.id;
      deleteTask(taskId);

      return;
    } else if (e.target.className === 'custom-checkbox') {
      // handle marking task as complete
      const taskId = e.target.id;
      markTaskAsComplete(taskId);

      return;
    }
  }

  function handleInputKeypress (e) {
    if (event.key === 'Enter') {
      const text = e.target.value;

      if (!text) {
        return;
      }

      const task = {
        text,
        id: Date.now().toString(),
        done: false
      }
      e.target.value = '';
      addTask(task);
    }
  }

  function initializeTodoList () {
    document.addEventListener('click', handleClickLisetner);
    addTaskInput.addEventListener('keyup', handleInputKeypress);
  }

  function showNotification (type, message) {}

  return {
    init: initializeTodoList
  }
})();
