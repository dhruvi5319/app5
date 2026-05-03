// app.js — Pivota TodoApp
// ─────────────────────────────────────────────
// 1. Constants
// ─────────────────────────────────────────────
const STORAGE_KEY = 'todoapp_tasks';
const MAX_NAME_LENGTH = 500;

// ─────────────────────────────────────────────
// 2. State
// ─────────────────────────────────────────────
let tasks = [];

// ─────────────────────────────────────────────
// 3. Storage functions
// ─────────────────────────────────────────────

function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

function loadTasks() {
  if (!isStorageAvailable()) {
    showBanner({ message: 'Storage is unavailable. Tasks will not be saved between sessions.', variant: 'persistent' });
    return [];
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error('ERR_STORAGE_PARSE', e);
    return [];
  }
  if (!Array.isArray(parsed)) {
    console.warn('ERR_STORAGE_PARSE: stored value is not an array', parsed);
    return [];
  }
  return parsed;
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.code === 22)) {
      showBanner({ message: 'Storage full — task not saved', variant: 'dismissible' });
    } else {
      showBanner({ message: 'Changes could not be saved — storage unavailable', variant: 'dismissible' });
    }
  }
}

// ─────────────────────────────────────────────
// 4. Task functions
// ─────────────────────────────────────────────

function addTask(name) {
  const result = validateTaskName(name);
  if (!result.valid) {
    showValidationMsg(result.errorMessage);
    return null;
  }
  clearValidationMsg();
  const newTask = {
    id: generateId(),
    name: name.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.unshift(newTask);
  saveTasks(tasks);
  renderTaskList(tasks);
  return newTask;
}

function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    console.warn('ERR_TASK_NOT_FOUND', taskId);
    return;
  }
  task.completed = !task.completed;
  saveTasks(tasks);
  renderTaskList(tasks);
}

function deleteTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    console.warn('ERR_TASK_NOT_FOUND', taskId);
    return;
  }
  tasks = tasks.filter(t => t.id !== taskId);
  saveTasks(tasks);
  renderTaskList(tasks);
}

// ─────────────────────────────────────────────
// 5. Render functions
// ─────────────────────────────────────────────

function renderTaskList(tasks) {
  const taskList = document.getElementById('task-list');
  const emptyState = document.getElementById('empty-state');
  taskList.innerHTML = '';  // safe: clearing container, no user content involved
  if (tasks.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;
  tasks.forEach(task => taskList.appendChild(renderTaskItem(task)));
}

function renderTaskItem(task) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' task-item--completed' : '');
  li.dataset.taskId = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', 'Toggle completion');

  const nameSpan = document.createElement('span');
  nameSpan.className = 'task-name';
  nameSpan.textContent = task.name;  // XSS PREVENTION: textContent only

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'task-delete';
  deleteBtn.type = 'button';
  deleteBtn.setAttribute('aria-label', 'Delete task: ' + task.name);
  deleteBtn.textContent = '×';  // XSS PREVENTION: textContent only

  li.appendChild(checkbox);
  li.appendChild(nameSpan);
  li.appendChild(deleteBtn);
  return li;
}

function showBanner(options) {
  const banner = document.getElementById('banner');
  banner.textContent = options.message;  // textContent, not innerHTML
  banner.classList.remove('banner--persistent', 'banner--dismissible');
  banner.classList.add('banner--' + options.variant);
  if (options.variant === 'dismissible') {
    setTimeout(clearBanner, options.dismissAfterMs != null ? options.dismissAfterMs : 5000);
  }
}

function clearBanner() {
  const banner = document.getElementById('banner');
  banner.textContent = '';
  banner.classList.remove('banner--persistent', 'banner--dismissible');
}

function showValidationMsg(message) {
  const msg = document.getElementById('validation-msg');
  msg.textContent = message;  // NOT innerHTML
  msg.classList.add('validation-msg--visible');
}

function clearValidationMsg() {
  const msg = document.getElementById('validation-msg');
  msg.textContent = '';
  msg.classList.remove('validation-msg--visible');
}

// ─────────────────────────────────────────────
// Utility / Helper Functions
// ─────────────────────────────────────────────

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function validateTaskName(rawName) {
  // Treat null/undefined as empty
  const trimmed = (rawName == null) ? '' : String(rawName).trim();

  if (trimmed.length === 0) {
    return {
      valid: false,
      errorCode: 'ERR_EMPTY_TASK',
      errorMessage: 'Task name cannot be empty'
    };
  }

  if (trimmed.length > MAX_NAME_LENGTH) {
    return {
      valid: false,
      errorCode: 'ERR_TASK_TOO_LONG',
      errorMessage: 'Task name must be 500 characters or fewer'
    };
  }

  return { valid: true };
}

// ─────────────────────────────────────────────
// 6. Event handlers
// ─────────────────────────────────────────────

function handleFormSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('task-input');
  const task = addTask(input.value);
  if (task !== null) {
    input.value = '';
    input.focus();
  }
  // If addTask returned null: validation failed; do NOT clear input
}

function handleTaskListClick(event) {
  const li = event.target.closest('[data-task-id]');
  if (!li) return;  // click outside task items
  const taskId = li.dataset.taskId;
  if (event.target.type === 'checkbox') {
    toggleTask(taskId);
  } else if (event.target.classList.contains('task-delete')) {
    deleteTask(taskId);
  }
}

// ─────────────────────────────────────────────
// 7. Init
// ─────────────────────────────────────────────

function initApp() {
  if (!isStorageAvailable()) {
    tasks = [];
    showBanner({ message: 'Storage is unavailable. Tasks will not be saved between sessions.', variant: 'persistent' });
  } else {
    tasks = loadTasks();
  }
  renderTaskList(tasks);

  const form = document.getElementById('task-form');
  form.addEventListener('submit', handleFormSubmit);

  const taskList = document.getElementById('task-list');
  taskList.addEventListener('click', handleTaskListClick);
}

// Guard: only wire DOM events in browser environment (not Node.js test runner)
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initApp);
}

// ─────────────────────────────────────────────
// Node.js test export (non-breaking in browser)
// ─────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateTaskName,
    generateId,
    STORAGE_KEY,
    MAX_NAME_LENGTH,
    isStorageAvailable,
    loadTasks,
    saveTasks,
    addTask,
    toggleTask,
    deleteTask,
    _resetTasksForTesting: () => { tasks = []; },
  };
}
