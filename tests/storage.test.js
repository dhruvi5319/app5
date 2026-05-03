// tests/storage.test.js
// TDD test suite for storage functions — RED phase
// Tests for isStorageAvailable, loadTasks, saveTasks behaviors from 02-01-PLAN.md
//
// app.js exposes storage functions via CommonJS export.
// We require() it here for the Node test environment.

'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

// ─────────────────────────────────────────────
// DOM + localStorage mocks (must be set up BEFORE requiring app.js)
// ─────────────────────────────────────────────

// Banner spy state
let lastBannerMessage = null;
let lastBannerVariant = null;

function resetBannerSpy() {
  lastBannerMessage = null;
  lastBannerVariant = null;
}

// Minimal DOM mock for banner/validation elements
global.document = {
  getElementById: (id) => {
    if (id === 'banner') {
      return {
        get textContent() { return ''; },
        set textContent(val) { lastBannerMessage = val; },
        classList: {
          remove: () => {},
          add: (cls) => { lastBannerVariant = cls; }
        }
      };
    }
    // Other elements (task-form, task-list, empty-state, etc.)
    return {
      textContent: '',
      classList: { remove: () => {}, add: () => {} },
      addEventListener: () => {}
    };
  },
  addEventListener: () => {}
};

// localStorage mock — supports throw injection via _setThrow
global.localStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] !== undefined ? store[key] : null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    _store: () => store,     // test helper: inspect store
    _setThrow: null          // test helper: set to Error instance to make setItem throw
  };
})();

// Override setItem to support throw injection
const _origSetItem = global.localStorage.setItem;
global.localStorage.setItem = function(key, value) {
  if (global.localStorage._setThrow) {
    const err = global.localStorage._setThrow;
    global.localStorage._setThrow = null;
    throw err;
  }
  _origSetItem.call(this, key, value);
};

// ─────────────────────────────────────────────
// Load app.js (AFTER mocks are set up)
// ─────────────────────────────────────────────

const { isStorageAvailable, loadTasks, saveTasks, STORAGE_KEY } = require('../app.js');

// ─────────────────────────────────────────────
// Helper: reset localStorage between tests
// ─────────────────────────────────────────────
function resetStorage() {
  global.localStorage.clear();
  global.localStorage._setThrow = null;
}

// ─────────────────────────────────────────────
// isStorageAvailable() tests
// ─────────────────────────────────────────────

test('isStorageAvailable: returns false when localStorage.setItem throws', () => {
  const err = new Error('Storage disabled');
  global.localStorage._setThrow = err;
  const result = isStorageAvailable();
  assert.equal(result, false);
  resetStorage();
});

test('isStorageAvailable: returns true when localStorage.setItem succeeds', () => {
  resetStorage();
  const result = isStorageAvailable();
  assert.equal(result, true);
});

// ─────────────────────────────────────────────
// loadTasks() tests
// ─────────────────────────────────────────────

test('loadTasks: returns [] and calls showBanner when storage unavailable', () => {
  resetStorage();
  resetBannerSpy();
  // Make isStorageAvailable() return false by making setItem throw
  global.localStorage._setThrow = new Error('Storage unavailable');
  const result = loadTasks();
  assert.deepEqual(result, []);
  assert.equal(lastBannerMessage, 'Storage is unavailable. Tasks will not be saved between sessions.');
  resetStorage();
});

test('loadTasks: returns [] silently when STORAGE_KEY not present', () => {
  resetStorage();
  resetBannerSpy();
  // Storage is available, but no key stored
  const result = loadTasks();
  assert.deepEqual(result, []);
  // No banner should be shown
  assert.equal(lastBannerMessage, null);
});

test('loadTasks: returns [] silently when stored value is not valid JSON', () => {
  resetStorage();
  resetBannerSpy();
  global.localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{{');
  const result = loadTasks();
  assert.deepEqual(result, []);
  // No banner for JSON parse error (console only)
  assert.equal(lastBannerMessage, null);
});

test('loadTasks: returns [] when stored value is object (not array)', () => {
  resetStorage();
  resetBannerSpy();
  global.localStorage.setItem(STORAGE_KEY, '{"foo":1}');
  const result = loadTasks();
  assert.deepEqual(result, []);
});

test('loadTasks: returns parsed task array when valid JSON array is stored', () => {
  resetStorage();
  resetBannerSpy();
  const tasks = [{ id: '1', name: 't', completed: false, createdAt: '2026-01-01' }];
  global.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  const result = loadTasks();
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '1');
  assert.equal(result[0].name, 't');
});

// ─────────────────────────────────────────────
// saveTasks() tests
// ─────────────────────────────────────────────

test('saveTasks: serialises tasks and writes to localStorage under STORAGE_KEY', () => {
  resetStorage();
  saveTasks([]);
  assert.equal(global.localStorage.getItem(STORAGE_KEY), '[]');
});

test('saveTasks: calls showBanner with "Storage full" message on QuotaExceededError', () => {
  resetStorage();
  resetBannerSpy();
  const err = new DOMException('QuotaExceededError', 'QuotaExceededError');
  global.localStorage._setThrow = err;
  saveTasks([{ id: '1', name: 'test', completed: false, createdAt: '2026-01-01' }]);
  assert.equal(lastBannerMessage, 'Storage full — task not saved');
  resetStorage();
});

test('saveTasks: calls showBanner with "Changes could not be saved" message on generic error', () => {
  resetStorage();
  resetBannerSpy();
  const err = new Error('Generic storage error');
  global.localStorage._setThrow = err;
  saveTasks([{ id: '1', name: 'test', completed: false, createdAt: '2026-01-01' }]);
  assert.equal(lastBannerMessage, 'Changes could not be saved — storage unavailable');
  resetStorage();
});
