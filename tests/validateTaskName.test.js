// tests/validateTaskName.test.js
// TDD test suite for validateTaskName — RED phase
// All 11 cases from the behavior table in 01-02-PLAN.md
//
// app.js exposes validateTaskName via CommonJS export:
//   if (typeof module !== 'undefined' && module.exports) {
//     module.exports = { validateTaskName, ... };
//   }
// We require() it here for the Node test environment.

'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { validateTaskName } = require('../app.js');

// ─── Empty / whitespace / null / undefined cases → ERR_EMPTY_TASK ───────────

test('empty string returns ERR_EMPTY_TASK', () => {
  const result = validateTaskName('');
  assert.equal(result.valid, false);
  assert.equal(result.errorCode, 'ERR_EMPTY_TASK');
  assert.equal(result.errorMessage, 'Task name cannot be empty');
});

test('whitespace-only string returns ERR_EMPTY_TASK', () => {
  const result = validateTaskName('   ');
  assert.equal(result.valid, false);
  assert.equal(result.errorCode, 'ERR_EMPTY_TASK');
  assert.equal(result.errorMessage, 'Task name cannot be empty');
});

test('tab+newline whitespace returns ERR_EMPTY_TASK', () => {
  const result = validateTaskName('\t\n');
  assert.equal(result.valid, false);
  assert.equal(result.errorCode, 'ERR_EMPTY_TASK');
  assert.equal(result.errorMessage, 'Task name cannot be empty');
});

test('null returns ERR_EMPTY_TASK', () => {
  const result = validateTaskName(null);
  assert.equal(result.valid, false);
  assert.equal(result.errorCode, 'ERR_EMPTY_TASK');
  assert.equal(result.errorMessage, 'Task name cannot be empty');
});

test('undefined returns ERR_EMPTY_TASK', () => {
  const result = validateTaskName(undefined);
  assert.equal(result.valid, false);
  assert.equal(result.errorCode, 'ERR_EMPTY_TASK');
  assert.equal(result.errorMessage, 'Task name cannot be empty');
});

// ─── Valid inputs → { valid: true } ─────────────────────────────────────────

test('"Buy milk" returns valid true', () => {
  const result = validateTaskName('Buy milk');
  assert.equal(result.valid, true);
  assert.equal(result.errorCode, undefined);
});

test('string with leading/trailing spaces is trimmed and returns valid true', () => {
  const result = validateTaskName('  Buy milk  ');
  assert.equal(result.valid, true);
  assert.equal(result.errorCode, undefined);
});

test('exactly 500 chars returns valid true', () => {
  const result = validateTaskName('x'.repeat(500));
  assert.equal(result.valid, true);
  assert.equal(result.errorCode, undefined);
});

// ─── Too long → ERR_TASK_TOO_LONG ───────────────────────────────────────────

test('501 chars returns ERR_TASK_TOO_LONG', () => {
  const result = validateTaskName('x'.repeat(501));
  assert.equal(result.valid, false);
  assert.equal(result.errorCode, 'ERR_TASK_TOO_LONG');
  assert.equal(result.errorMessage, 'Task name must be 500 characters or fewer');
});

test('spaces + 500 chars returns ERR_TASK_TOO_LONG after trim', () => {
  const result = validateTaskName('  ' + 'x'.repeat(500));
  assert.equal(result.valid, false);
  assert.equal(result.errorCode, 'ERR_TASK_TOO_LONG');
  assert.equal(result.errorMessage, 'Task name must be 500 characters or fewer');
});

test('spaces + 499 chars returns valid true after trim', () => {
  const result = validateTaskName('  ' + 'x'.repeat(499));
  assert.equal(result.valid, true);
  assert.equal(result.errorCode, undefined);
});
