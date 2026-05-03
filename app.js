// app.js — Pivota TodoApp
// ─────────────────────────────────────────────
// 1. Constants
// ─────────────────────────────────────────────
const STORAGE_KEY = 'todoapp_tasks';
const MAX_NAME_LENGTH = 500;

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

// Node.js test export (non-breaking in browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateTaskName, generateId, STORAGE_KEY, MAX_NAME_LENGTH };
}
