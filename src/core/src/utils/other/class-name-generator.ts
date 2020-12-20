class CSSNamer {
  private cache: Record<string, string> = {};

  private counter: number = 0;

  private readonly cap: number;

  private readonly chars: string[] = [
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

  constructor() {
    this.cap = this.chars.length;
  }

  getName(key: string): string {
    if (!this.cache[key]) {
      this.cache[key] = this.fromNumber(this.counter += 1);
    }

    return this.cache[key];
  }

  private fromNumber(number: number): string {
    if (
      // eslint-disable-next-line no-restricted-globals
      isNaN(Number(number)) ||
      number === null ||
      number < 0 ||
      !Number.isSafeInteger(number)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw 'The input is not valid';
    }

    let rest = Math.floor(number);
    let res = '';

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const rem = rest % this.cap;

      res = this.chars[rem] + res;
      rest = Math.floor(rest / this.cap);

      if (rest === 0) {
        break;
      }
    }

    return res;
  }
}

// eslint-disable-next-line no-underscore-dangle
const isProduction = window?.__INITIAL_STATE__?.env?.mode === 'production';

type GenerateId = (
  rule: {
    key: string,
  },
  styleSheet: {
    options: {
      classNamePrefix: string,
    },
  },
) => string;

export const generateClassName = (): GenerateId => {
  const names: number[] = [];
  const cssNamer = new CSSNamer();
  let ruleCounter = 0;
  const tho = 31;
  const hashCode = (s: string): string => {
    let h: number = 0;
    for (let i = 0; i < s.length; i += 1) {
      // eslint-disable-next-line no-bitwise
      h = (Math.imul(tho, h) + s.charCodeAt(i)) | 0;
    }

    return h.toString();
  };

  return (rule, styleSheet): string => {
    const {classNamePrefix} = styleSheet?.options ?? {};
    const {key = ''} = rule;
    const suffix = `${key}-${ruleCounter += 1}`;

    if (isProduction) {
      const hash = hashCode(suffix);

      if (!names[hash]) {
        names[hash] = cssNamer.getName(hash);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return names[hash];
    }

    if (classNamePrefix) {
      return `${classNamePrefix.replace('Mui', '')}-${suffix}`;
    }

    return suffix;
  };
};
