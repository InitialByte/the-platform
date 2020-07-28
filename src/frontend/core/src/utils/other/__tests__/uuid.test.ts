import {generateUUIDv4} from '../uuid';

describe('1. UUID v4.', () => {
  test('1.1: generating correct UUID v4.', () => {
    const pattern = /^[\dA-Fa-f]{8}(?:-[\dA-Fa-f]{4}){3}-[\dA-Fa-f]{12}$/;

    expect(pattern.test(generateUUIDv4())).toBe(true);
    expect(pattern.test(generateUUIDv4())).toBe(true);
    expect(pattern.test(generateUUIDv4())).toBe(true);
    expect(pattern.test(generateUUIDv4())).toBe(true);
    expect(pattern.test(generateUUIDv4())).toBe(true);
  });

  test('1.2: generating not the same UUID v4.', () => {
    expect(generateUUIDv4()).not.toBe(generateUUIDv4());
    expect(generateUUIDv4()).not.toBe(generateUUIDv4());
    expect(generateUUIDv4()).not.toBe(generateUUIDv4());
    expect(generateUUIDv4()).not.toBe(generateUUIDv4());
    expect(generateUUIDv4()).not.toBe(generateUUIDv4());
  });
});
