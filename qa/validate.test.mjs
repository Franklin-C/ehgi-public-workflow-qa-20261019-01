import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validate } from './validate.mjs';
test('accepts the generated bounded record', () => {
  assert.deepEqual(validate({ schema: 1, count: 1 }), { schema: 1, count: 1 });
});
test('refuses invalid values and extra fields', () => {
  for (const value of [null, [], {}, { schema: 1, count: 0 },
    { schema: 1, count: 17 }, { schema: 1, count: '1' },
    { schema: 1, count: 1, extra: true }]) assert.throws(() => validate(value));
});
test('preserves input and freezes the returned record', () => {
  const input = { schema: 1, count: 1 };
  const result = validate(input);
  assert.deepEqual(input, { schema: 1, count: 1 });
  assert.notEqual(result, input);
  assert.equal(Object.isFrozen(result), true);
});
test('the actual checked-in fixture is valid', () => {
  const value = JSON.parse(readFileSync(new URL('./input.json', import.meta.url), 'utf8'));
  assert.deepEqual(validate(value), { schema: 1, count: 1 });
});
