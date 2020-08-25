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
  // TODO check in MacOS, Windows.
  execSync(
    `lsof -n -i:${port} | grep LISTEN | awk '{ print $2 }' | uniq | xargs -r kill -9`,
  );
};

module.exports = {
  collectModuleRoutes,
  collectSwaggerApi,
  killByPort,
  createCacheDir,
  buildInfo,
};
