// tests/crud.test.js
// Unit tests for addTask, toggleTask, deleteTask state mutation behaviors
// from 02-02-PLAN.md — Phase 2 Plan 02
//
// app.js exposes CRUD functions via CommonJS export.
// Mocks must be set up BEFORE requiring app.js.

'use strict';

const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');

// ─────────────────────────────────────────────
// localStorage mock (same approach as storage.test.js)
// ─────────────────────────────────────────────
global.localStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] !== undefined ? store[key] : null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

// ─────────────────────────────────────────────
// DOM mock — renderTaskList calls getElementById('task-list'),
// getElementById('empty-state'); showBanner calls getElementById('banner');
// showValidationMsg/clearValidationMsg call getElementById('validation-msg')
// ─────────────────────────────────────────────
global.document = {
  getElementById: (id) => {
    if (id === 'task-list') {
      return { innerHTML: '', hidden: false, appendChild: () => {} };
    }
    if (id === 'empty-state') {
      return { hidden: false };
    }
    if (id === 'banner') {
      return {
        set textContent(v) {},
        get textContent() { return ''; },
        classList: { remove: () => {}, add: () => {} }
      };
    }
    if (id === 'validation-msg') {
      return {
        textContent: '',
        classList: { remove: () => {}, add: () => {} }
      };
    }
    return { textContent: '', classList: { remove: () => {}, add: () => {} }, hidden: false };
  },
  createElement: (tag) => ({
    className: '',
    type: '',
    checked: false,
    dataset: {},
    setAttribute: () => {},
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} },
    set textContent(v) {},
    get textContent() { return ''; }
  }),
  addEventListener: () => {}
};

// ─────────────────────────────────────────────
// Load app.js AFTER mocks are in place
// ─────────────────────────────────────────────
const {
  addTask,
  toggleTask,
  deleteTask,
  _resetTasksForTesting
} = require('../app.js');

// ─────────────────────────────────────────────
// Reset in-memory tasks state before each test
// ─────────────────────────────────────────────
beforeEach(() => {
  _resetTasksForTesting();
  global.localStorage.clear();
});

// ─────────────────────────────────────────────
// addTask tests
// ─────────────────────────────────────────────

test('addTask with valid name returns task object with id, name, completed=false, createdAt', () => {
  const task = addTask('Buy milk');
  assert.ok(task, 'addTask should return a task object');
  assert.equal(task.name, 'Buy milk');
  assert.equal(task.completed, false);
  assert.ok(task.id, 'task should have an id');
  assert.ok(task.createdAt, 'task should have createdAt');
});

test('addTask trims leading and trailing whitespace from name', () => {
  const task = addTask('  Trimmed  ');
  assert.ok(task);
  assert.equal(task.name, 'Trimmed');
});

test('addTask with empty string returns null and does not add to state', () => {
  const result = addTask('');
  assert.equal(result, null);
  // Tasks array should still be empty — calling toggleTask on nonexistent id should do nothing
  assert.doesNotThrow(() => toggleTask('any-id'));
});

// ─────────────────────────────────────────────
// toggleTask tests
// ─────────────────────────────────────────────

test('toggleTask flips completed from false to true', () => {
  const task = addTask('Toggle me');
  assert.equal(task.completed, false);
  toggleTask(task.id);
  assert.equal(task.completed, true);
});

test('toggleTask flips completed from true back to false (round-trip)', () => {
  const task = addTask('Toggle round-trip');
  toggleTask(task.id);   // false → true
  assert.equal(task.completed, true);
  toggleTask(task.id);   // true → false
  assert.equal(task.completed, false);
});

test('toggleTask with unknown id does not throw', () => {
  assert.doesNotThrow(() => toggleTask('nonexistent-id'));
});

// ─────────────────────────────────────────────
// deleteTask tests
// ─────────────────────────────────────────────

test('deleteTask removes task from state', () => {
  const task = addTask('Delete me');
  assert.ok(task);
  deleteTask(task.id);
  // After deletion, toggling the same id should warn but not throw
  assert.doesNotThrow(() => toggleTask(task.id));
  // And another delete of same id should not throw
  assert.doesNotThrow(() => deleteTask(task.id));
});

test('deleteTask with unknown id does not throw', () => {
  assert.doesNotThrow(() => deleteTask('nonexistent-id'));
});
