const {join} = require('path');
const {
  readdirSync,
  statSync,
  mkdirSync,
  existsSync,
  readFileSync,
} = require('fs');
const {execSync} = require('child_process');

const commitHash = execSync('git rev-parse --short HEAD').toString();

const buildInfo = (version) => ({
  PACKAGE_VERSION: version,
  BUILD_TIME: new Date().toUTCString(),
  COMMIT_HASH: commitHash,
});

const getDirectories = (path) =>
  readdirSync(path).filter((file) => statSync(`${path}/${file}`).isDirectory());

const createCacheDir = (path) => {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
};

const collectModuleRoutes = (rootPath, workspace, dependencies) => {
  if (!rootPath || !workspace || !dependencies.length) {
    return [];
  }
  const modulesPath = join(rootPath, 'src/frontend/modules');
  const readRouterFile = (filePath, moduleName) => {
    const data = readFileSync(filePath, 'utf8');

    if (data) {
      return data.replace('../../src', join(modulesPath, moduleName, 'src'));
    }

    return data;
  };

  return dependencies.map((moduleName) => {
    const routerFile = join(
      modulesPath,
      moduleName,
      `export/entry/${workspace}.ts`,
    );

    return existsSync(routerFile)
      ? readRouterFile(routerFile, moduleName)
      : null;
  });
};

const collectI18n = (rootPath, workspace, dependencies, rootModuleFolder) => {
  const modulesPath = join(rootPath, 'src/frontend/modules');
  const i18nRootModuleFolder = join(
    rootPath,
    `src/frontend/${rootModuleFolder}`,
    `export/i18n/${workspace}`,
  );
  const modulesWithI18n = dependencies
    .map((moduleName) => {
      const i18nFolder = join(
        modulesPath,
        moduleName,
        `export/i18n/${workspace}`,
      );

      if (existsSync(i18nFolder) && statSync(i18nFolder).isDirectory()) {
        return {
          moduleName,
          folder: i18nFolder,
        };
      }
    })
    .filter(Boolean);

  if (
    existsSync(i18nRootModuleFolder) &&
    statSync(i18nRootModuleFolder).isDirectory()
  ) {
    modulesWithI18n.push({
      moduleName: 'root',
      folder: i18nRootModuleFolder,
    });
  }

  return modulesWithI18n;
};

const collectSwaggerApi = (rootPath) => {
  if (!rootPath) {
    return [];
  }
  const modulesPath = join(rootPath, 'src/backend/nodejs/rest');

  return getDirectories(modulesPath)
    .map((moduleName) => {
      const packageJson = join(modulesPath, moduleName, 'package.json');

      if (existsSync(packageJson)) {
        const {name: fullName, description = ''} = require(packageJson);
        const swaggerFile = join(modulesPath, moduleName, 'swagger.yaml');

        return {
          moduleName,
          fullName,
          description,
          swagger: existsSync(swaggerFile) ? swaggerFile : null,
        };
      }
    })
    .filter(({swagger}) => swagger !== null);
};

const killByPort = (port) => {
  const opsys = process.platform;
  let command = `lsof -n -i:${port} | grep LISTEN | awk '{ print $2 }' | uniq | xargs -r kill -9`;

  if (/^win/i.test(opsys)) {
    command = '';
  } else if (opsys === 'darwin') {
    command = `lsof -i:${port} | grep LISTEN | awk '{print $2}' | uniq | xargs kill -9`;
  }

  execSync(command);
};

class CSSNamer {
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
};

module.exports = {
  collectModuleRoutes,
  collectSwaggerApi,
  createCacheDir,
  collectI18n,
  killByPort,
  buildInfo,
  CSSNamer,
};
