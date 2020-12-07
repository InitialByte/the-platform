export class CSSNamer {
  constructor() {
    this._counter = 0;
    this._cache = {};
    this._chars = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '_',
      '_0',
      '_1',
      '_2',
      '_3',
      '_4',
      '_5',
      '_6',
      '_7',
      '_8',
      '_9',
    ];

    this._cap = this._chars.length;
  }

  _fromNumber(number) {
    if (
      isNaN(Number(number)) ||
      number === null ||
      number < 0 ||
      !Number.isSafeInteger(number)
    ) {
      throw 'The input is not valid';
    }

    let rest = Math.floor(number);
    let res = '';

    while (true) {
      const rem = rest % this._cap;

      res = this._chars[rem] + res;
      rest = Math.floor(rest / this._cap);

      if (rest === 0) {
        break;
      }
    }

    return res;
  }

  getName(key) {
    if (!this._cache[key]) {
      this._cache[key] = this._fromNumber(this._counter++);
    }

    return this._cache[key];
  }
}
