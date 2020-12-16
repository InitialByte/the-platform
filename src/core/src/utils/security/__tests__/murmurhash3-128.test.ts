import {murmurhash3} from '../murmurhash3-128';

describe('1. Murmurhash3 x64, 128 bit.', () => {
  it('1.1: should return correct value for hashing some string with seed = 0.', () => {
    expect(murmurhash3('foo')).toBe('e271865701f545617eaf87e42bba7d87');
    expect(murmurhash3('foo baz baz')).toBe('a7563c8ba8f04e97ddc1ff1df884465f');
    expect(murmurhash3('Some ASCII data.,!&#@(*)#$')).toBe(
      'fc6c754f28628dd95bfd4af77a2a5aeb',
    );
  });

  it('1.2: should return correct value for hashing some string with seed = 24.', () => {
    expect(murmurhash3('foo', 24)).toBe('31c016bbdbb3eeaf1d4ca8addf37d023');
    expect(murmurhash3('foo baz baz', 24)).toBe(
      'e4d88bed3813da0e58c69de116cb5d4d',
    );
    expect(murmurhash3('Some ASCII data.,!&#@(*)#$', 24)).toBe(
      '790cc95aec1be5e5f88d0d8b1e9b618b',
    );
  });
});
