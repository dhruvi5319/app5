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

// STUB — always returns valid (RED phase: tests MUST fail)
function validateTaskName(rawName) {
  return { valid: true };
}

// Node.js test export (non-breaking in browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateTaskName, generateId, STORAGE_KEY, MAX_NAME_LENGTH };
}
