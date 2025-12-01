class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
        this.taskCount = document.getElementById('taskCount');
        this.clearCompletedBtn = document.getElementById('clearCompleted');

        this.initEventListeners();
        this.renderTasks();
    }

    initEventListeners() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (text) {
            const task = {
                id: Date.now(),
                text: text,
                completed: false
            };
            this.tasks.push(task);
            this.taskInput.value = '';
            this.saveTasks();
            this.renderTasks();
        }
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveTasks();
        this.renderTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="toggle-btn" onclick="app.toggleTask(${task.id})">
                        ${task.completed ? 'Reactivar' : 'Completar'}
                    </button>
                    <button class="delete-btn" onclick="app.deleteTask(${task.id})">
                        Eliminar
                    </button>
                </div>
            `;
            this.taskList.appendChild(li);
        });

        this.updateStats();
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        this.taskCount.textContent = `Total: ${total} tareas (${completed} completadas)`;
    }
}

// Inicializar la aplicación
const app = new TodoApp();