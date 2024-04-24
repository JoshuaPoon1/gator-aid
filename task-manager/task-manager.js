function initializeTaskManager() {
    var toggleButton = document.getElementById('toggle-task-manager');
    var taskListContainer = document.getElementById('task-list-container');
    var addButton = document.getElementById('add-task-btn');
    var input = document.getElementById('new-task-input');

    toggleButton.addEventListener('click', function() {
        taskListContainer.classList.toggle('hide');
    });

    addButton.addEventListener('click', addTask);
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
}

function addTask() {
    var input = document.getElementById('new-task-input');
    var newTask = input.value.trim();
    if (newTask) {
        var li = document.createElement('li');
        li.textContent = newTask;
        var removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', function() {
            this.parentElement.remove();
            saveTasks();
        });
        li.appendChild(removeBtn);
        document.getElementById('task-list').appendChild(li);
        input.value = '';
        saveTasks();
    }
}

function saveTasks() {
    var tasks = [];
    document.querySelectorAll('#task-list li').forEach(function(taskLi) {
        tasks.push(taskLi.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(function(task) {
            var li = document.createElement('li');
            li.textContent = task;
            var removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', function() {
                this.parentElement.remove();
                saveTasks();
            });
            li.appendChild(removeBtn);
            document.getElementById('task-list').appendChild(li);
        });
    }
}

// Initialize the task manager after the content is loaded
document.addEventListener('DOMContentLoaded', initializeTaskManager);
