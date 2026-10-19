export function validate(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)
      || Object.getPrototypeOf(value) !== Object.prototype
      || Object.keys(value).sort().join(',') !== 'count,schema'
      || value.schema !== 1 || !Number.isInteger(value.count)
      || value.count < 1 || value.count > 16) {
    throw new Error('Invalid generated QA fixture');
  }
  return Object.freeze({ schema: 1, count: value.count });
}
