# THE PLATFORM

- [THE PLATFORM](#the-platform)
  - [External Readme](#external-readme)
  - [Synopsis](#synopsis)
    - [Main goals](#main-goals)
    - [You can use the-platform when have](#you-can-use-the-platform-when-have)
  - [Advantages](#advantages)
  - [What is used](#what-is-used)
  - [Core Features](#core-features)
  - [Setup and run the project locally](#setup-and-run-the-project-locally)
    - [Check outdated dependencies](#check-outdated-dependencies)
    - [Automatically intall @types](#automatically-intall-types)
    - [To work with VSCode](#to-work-with-vscode)
    - [Config for VSCode](#config-for-vscode)
    - [Self-signed cert for localhost](#self-signed-cert-for-localhost)
  - [Main Commands](#main-commands)
  - [Folder Structure](#folder-structure)
  - [Optimization](#optimization)
  - [Todo](#todo)

## External Readme

- [FrontEnd](src/README.md)
- [ApiMock](src/apimock/README.md)
- [Core functions](src/core/README.md)
- [How to create a module](src/modules/README.md)
- [UiKit Usage](src/react/uikit//README.md)

## Synopsis

This is scalable fullstack "framework" for configuring complex medium and large SPA projects. Any part of this project can be easy replaced. Here is using mono-repository with modular architecture. Yarn 2 Workspaces gives the ability to build project in a single repo (a.k.a. monorepo). This makes it faster to iterate locally when building components that depends on each other. Monorepo is NOT about mixing everything together inside a project (do not confuse with monolith). Monorepo+modules is about having source codes of multiple applications, services, and libraries that belong to one domain inside a single repository. Using monorepo decreases velocity and maintaining time.

Modular architecture allows multiple teams to work independently from each other, choose their own technology stacks and establish their own release cycles. Bringing micro-services to the frontend requires a layout service that composes a website out of fragments.

### Main goals

- **Cohesion**. Any changes should affect as less code as possible.
- **Reusing**. Identical things should be easy to reuse without copy-pasting.
- **Extendability**. It should be easy to add new functionality to existing code.
- **Stability**. Any new code can be easily disabled using feature toggles.
- **Performance**. 100 point in lighthouse.
- **Code ownership**. The project should be divided into modules, so that it would be easy to assign an owner for each module. This will help us to do codereview. Neat and consistent coding primarily serves to improve the readability and comprehensibility of the source code, which is very important for debugging and modifying code written by other employees, and also to get the most out of your work.
- **CI\CD Speed**. Fast webpack building, code-splitting, tree-shaking and smallest bundles size.

### You can use the-platform when have

- At least one experienced **architect**.
- At least one experienced **dev-ops**, who can cope with the maintenance of few or even several dozen microservices and will be able to manage them.
- Has an additional initial budget for more accurate development of the architecture, the entire system monitoring structure or configuration of orchestration.
- Long development time of an application is expected.
- Many developers are involved in a project.
- Good preparation for long-term development is more important than short time for releasing an MVP version;
- The project involves many fields of IT which increases the chances of using different technologies and programming languages.

## Advantages

- TypeScript presenting a more organized and maintainable code. The static typing of TypeScript improves performance, avoids runtime pitfalls and transpiles to JavaScript.
- Single clone. No need to clone several repositories.
- Access to all parts of the system. Simplified refactoring of the whole system.
- Linting only files to commit.
- Custom light weight nginx 1.19 +alpine Docker build with HTTP/2, TLSv1.3, brotli.
- Extra small size of Docker containers.
- Ability to separate applications, for example, a mobile application and a desktop application in easy way.
- Smoke testing after deploying, which can be used to rollback if deploy was failed.
- Optimized by lighthouse rules.
- [Atomic design](https://atomicdesign.bradfrost.com/) methodology for building UI.
- Easier upgrade of the underlying technologies for each workspace.
- Allow to fit the best the technology to each need.
- Webpack 5 fastest speed and smallest bundle size.
- React Router 6  - decrease size of bundle.
- Ability to proxy google-analytics and yandex metrics via own server  avoid inadvertent blocking by ad blockers.
- Ability make A/B testing for front parts of application.
- Single-symbols classnames in production - lead to decrease size of styles and more security.
- Caching resources via ServiceWorkers.
- Ability to do E2E test related to auto applied data-* attribute instead of className or id.

## What is used

- **Typescript**          - static type-checking along with the latest ECMAScript features.
- **React**               - view layer.
- **Redux toolkit**       - state management.
- **Formik, Yup**         - forms and validation.
- **Ky**                  - http request.
- **SwaggerUI**           - REST-API documentation.
- **Cypress**             - smoke (potentially e2e) testing.
- **Jest, Enzyme**        - unit testing.
- **Webpack**             - bundle JavaScript files for usage in a browser.
- **Yarn2**               - organize npm dependencies and workspaces.
- **StoryBook**           - developing UI components in isolation mode.
- **MaterialUI**          - react UI framework.
- **NodeJS**              - JS platform for backend.
- **ExpressJS**           - nodejs server.
- **Nodemon**             - tool that helps develop node.js based applications.
- **Nginx**               - main web-server for production web-application.
- **Docker**              - container for production build.

## Core Features

- authentication: (JWT, CryptoPro [TODO]);
- omni-channel [TODO];
- http-request, jsonp transfer, web-sockets [TODO], web-workers;
- cookies, localStorage, cacheStorage, sessionStorage (with prefix and expires data);
- index-db [TODO];
- browser fingerprint;
- error-tracking (including send to server);
- i18n, l10n;
- heart-beating;
- print (pdf, image, text) + preview [TODO];
- save files;
- PWA;
- apiMock (rest) server;

## Setup and run the project locally

* [install nodejs](https://nodejs.org/en/download/) recommended 14.x
* Clone repository `git clone git@github.com:initialbyte/the-platform.git && cd ./the-platform`
* [install yarn](https://yarnpkg.com/lang/en/docs/install/)

Installing Yarn 2.x globally is discouraged. Yarn team advise to keep Yarn 1.x as your global binary and install Yarn v2. per-project install strategy. [Hot to install Yarn 2+](https://yarnpkg.com/getting-started/install#per-project-install).

```bash
cd <PROJECT_PATH>
yarn set version berry
yarn policies set-version latest
```

* Run `yarn`
* Run `yarn start`

To test it as on production side or for some other purposes you may install [Docker](https://docs.docker.com/get-docker/) and [docker-composer](https://docs.docker.com/compose/install/) locally, then you can run the entire app: front-end + backend + infrastructure (postgres, redis etc.):

```bash
docker network create -d bridge --subnet 172.25.0.0/16 platform
yarn go
```

After it you can open https://localhost with this web-application.

### Check outdated dependencies

Add an additional plugin.
`yarn plugin import interactive-tools`
and run
`yarn upgrade`

### Automatically intall @types

`yarn plugin import typescript`

### To work with VSCode

`yarn dlx @yarnpkg/pnpify --sdk vscode`

[more info](https://yarnpkg.com/advanced/editor-sdks#tools-currently-supported),
[configuring vscode with pnp](https://yarnpkg.com/getting-started/editor-sdks)

### Config for VSCode

```json
{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescriptreact",
    "typescript"
  ],
  "eslint.nodePath": ".yarn/sdks",
  "prettier.prettierPath": ".yarn/sdks/prettier/index.js",
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### Self-signed cert for localhost

It may be suitable for dev purposes, e.g. test ssl connection in nginx via localhost.

See [mkcert](https://github.com/FiloSottile/mkcert) github repository.

MacOS

```bash
brew install mkcert nss
```

Linux

```bash
cd ~/tmp
wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.1/mkcert-v1.4.1-linux-amd64
mv mkcert-v1.4.1-linux-amd64 mkcert
chmod +x mkcert
sudo cp mkcert /usr/local/bin/
```

```bash
mkcert -install
mkcert -key-file <YOUR_PATH>/configs/docker/nginx/certs/wildcard.localhost.key.pem -cert-file <YOUR_PATH>/configs/docker/nginx/certs/wildcard.localhost.cert.pem localhost ::1 127.0.0.1
```

## Main Commands

- `yarn go` Run the entire app: front-end + backend + infrastructure (postgres, redis etc.).

---

- `yarn start` Start webpack-dev-server.
- `yarn build` Build production app via webpack.

---

- `yarn apimock` Run API mock server.
- `yarn smoke` Run smoke testing via cypress.
- `yarn swagger` Run SwaggerAPI.
- `yarn storybook` Run storybook.

---

- `yarn tslint` Run typescript (tsc) validation and type-checking.
- `yarn lint` Lint typescript source code.
- `yarn lint:staged` Used to run tests and linting in pre-commit phase.
- `yarn test` Run app's tests.
- `yarn fixcode` Auto-fix source files.
- `yarn check` Run tests, typescript checking and eslint.

---

- `yarn upgrade` Update dependencies versions.

## Folder Structure

```nothing
/dist                          # production stuff
/public                        # assets, html-templates, webmanifest etc.
/configs                       # config files
├──/docker                     # nginx config and shell script for docker
├──/webpack                    # webpack configs
/src                           # sources
├──/__mocks__                  # jest mocks
├──/@types                     # app's types for typescripts
├──/apimock                    # api mock server for local development
├──/core                       # core modules and utils (jsonp, storages etc.)
├──/modules                    # external modules (auth, register etc.)
├──/react                      # react app
│   └──/uikit                  # layouts, dumb components
│   └──/web-desktop            # main point of the web application
├──/smoke                      # smoke testing (cypress)
├──/storybook                  # storybook
├──/swagger                    # swagger UI
```

## Optimization

Keep it fast. How to check:

1. Use [lighthouse](https://developers.google.com/web/tools/lighthouse/) in Chrome dev tools.
2. React profiler from browser's [extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).

## Todo

- Add http3 into web-app nginx.
- Add SSR.
- Add PWA application.
- Add [Istanbul](https://istanbul.js.org/).
- Add ability disallow commit if tests not in green zone.
- Add ability disallow commit if cover zone of tests is happened less then before.
- Add testing via [visual](https://applitools.com/) or [wix](https://github.com/wix-incubator/match-screenshot).
- Add [Content editor](https://github.com/wix-incubator/rich-content).
- Add mount point for modules without routing.
- Add type check i18n dictionaries with TypeScript [SO](https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript).
