function initializeTaskManager() {
  var toggleButton = document.getElementById('toggle-task-manager');
  var taskListContainer = document.getElementById('task-list-container');
  var taskManager = document.getElementById('task-manager');
  var addButton = document.getElementById('add-task-btn');
  var input = document.getElementById('new-task-input');
  var dueDateInput = document.getElementById('due-date-input');
  var dueTimeInput = document.getElementById('due-time-input');
  var groupInput = document.getElementById('group-input');

  toggleButton.addEventListener('click', function () {
    taskListContainer.classList.toggle('hide');
    taskManager.classList.toggle('minimized');
  });

  addButton.addEventListener('click', addTask);

  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  dueDateInput.addEventListener('change', function () {
    var today = new Date().toISOString().split('T')[0];
    if (this.value < today) {
      this.value = today;
    }
  });

  loadTasks();
}

function addTask() {
  var input = document.getElementById('new-task-input');
  var dueDateInput = document.getElementById('due-date-input');
  var dueTimeInput = document.getElementById('due-time-input');
  var groupInput = document.getElementById('group-input');

  var newTask = input.value.trim();
  var dueDate = dueDateInput.value;
  var dueTime = dueTimeInput.value;
  var group = groupInput.value.trim();

  if (newTask) {
    var taskData = {
      text: newTask,
      dueDate: dueDate,
      dueTime: dueTime,
      group: group
    };

    saveTasks(taskData);
    renderTaskList();

    input.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
    groupInput.value = '';
  }
}

function renderTaskList() {
  var taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear existing tasks

  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  var groupedTasks = tasks.reduce(function (groups, task) {
    var group = task.group || 'Ungrouped';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(task);
    return groups;
  }, {});

  for (var group in groupedTasks) {
    var groupHeader = document.createElement('div');
    groupHeader.classList.add('group-header');
    var headerText = document.createElement('h3');
    headerText.textContent = group;
    groupHeader.appendChild(headerText);
    taskList.appendChild(groupHeader);

    var sortedTasks = groupedTasks[group].sort(function (a, b) {
      return new Date(a.dueDate + ' ' + a.dueTime) - new Date(b.dueDate + ' ' + b.dueTime);
    });

    var groupTaskList = document.createElement('ul');
    groupTaskList.classList.add('group-task-list');

    sortedTasks.forEach(function (task) {
      var li = document.createElement('li');
      var taskText = document.createElement('span');
      taskText.textContent = '- ' + task.text;
      li.appendChild(taskText);

      if (task.dueDate && task.dueTime) {
        var dueDateTime = new Date(task.dueDate + ' ' + task.dueTime);
        var formattedDueDateTime = ' -> ' + (dueDateTime.getMonth() + 1) + '/' + dueDateTime.getDate() + '/' + dueDateTime.getFullYear().toString().slice(-2) + ' @ ' + dueDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var dueDateTimeSpan = document.createElement('span');
        dueDateTimeSpan.textContent = formattedDueDateTime;
        li.appendChild(dueDateTimeSpan);
      }

      var removeBtn = document.createElement('button');
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', function () {
        this.parentElement.remove();
        removeTask(task);
        renderTaskList();
      });
      li.appendChild(removeBtn);

      groupTaskList.appendChild(li);
    });

    taskList.appendChild(groupTaskList);
  }
}

function saveTasks(taskData) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskData);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskToRemove) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(function (task) {
    return task.text !== taskToRemove.text || task.dueDate !== taskToRemove.dueDate || task.dueTime !== taskToRemove.dueTime || task.group !== taskToRemove.group;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  renderTaskList();
}

// Initialize the task manager after the content is loaded
document.addEventListener('DOMContentLoaded', initializeTaskManager);