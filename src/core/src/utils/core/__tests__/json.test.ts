import {parseJson, stringifyJson} from '../json';

describe('1. Json.', () => {
  describe('1.1: Parse.', () => {
    it('1.1.1: should parse string to object.', () => {
      expect(parseJson('{"1":"baz","foo":"bar"}')).toEqual({
        foo: 'bar',
        1: 'baz',
      });
    });
  });

  describe('1.2: Stringify.', () => {
    it('1.2.1: should stringify object.', () => {
      expect(stringifyJson({foo: 'bar', 1: 'baz'})).toBe(
        '{"1":"baz","foo":"bar"}',
      );
    });
  });
});
