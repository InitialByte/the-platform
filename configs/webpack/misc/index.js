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

module.exports = {
  collectModuleRoutes,
  collectI18n,
  collectSwaggerApi,
  killByPort,
  createCacheDir,
  buildInfo,
};
