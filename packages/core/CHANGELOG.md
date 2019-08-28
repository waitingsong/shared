# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.2.0](https://github.com/waitingsong/node-shared-core/compare/v2.1.0...v2.2.0) (2019-08-28)


### Features

* **types:** add type JsonType ([a4bebf7](https://github.com/waitingsong/node-shared-core/commit/a4bebf7))
* **types:** add type KnownKeys ([4f7db33](https://github.com/waitingsong/node-shared-core/commit/4f7db33))

## [2.1.0](https://github.com/waitingsong/node-shared-core/compare/v2.0.1...v2.1.0) (2019-08-14)


### Features

* add readFileLineRx() ([9da8b50](https://github.com/waitingsong/node-shared-core/commit/9da8b50))

### [2.0.1](https://github.com/waitingsong/node-shared-core/compare/v2.0.0...v2.0.1) (2019-08-11)

## [2.0.0](https://github.com/waitingsong/node-shared-core/compare/v1.9.2...v2.0.0) (2019-08-11)


### Bug Fixes

* **lint:** minors ([02f6c34](https://github.com/waitingsong/node-shared-core/commit/02f6c34))
* catch test error ([5efe156](https://github.com/waitingsong/node-shared-core/commit/5efe156))
* createDir() path resolve under linux ([c6d1274](https://github.com/waitingsong/node-shared-core/commit/c6d1274))
* deps, peerDeps might empty ([e3ab52b](https://github.com/waitingsong/node-shared-core/commit/e3ab52b))
* error TS1345: An expression of type 'void' cannot be tested for truthiness ([0085713](https://github.com/waitingsong/node-shared-core/commit/0085713))
* options not covered within createFile() ([a2ae4e8](https://github.com/waitingsong/node-shared-core/commit/a2ae4e8))
* path require parse by normalize() within createDir() ([371a313](https://github.com/waitingsong/node-shared-core/commit/371a313))
* revert ts-node to '5.0.1' ([cc83ade](https://github.com/waitingsong/node-shared-core/commit/cc83ade))
* rimraf() got "no such file or directory" if unlink a file ([2680611](https://github.com/waitingsong/node-shared-core/commit/2680611))
* rimraf() rm folder ([87fe6d5](https://github.com/waitingsong/node-shared-core/commit/87fe6d5))
* **tslint:** no-unused-variable rule ([d0ce43a](https://github.com/waitingsong/node-shared-core/commit/d0ce43a))
* wrong variable within createFile() ([49ac701](https://github.com/waitingsong/node-shared-core/commit/49ac701))


### Features

* **build:** do not build esm.js default ([ca59ce7](https://github.com/waitingsong/node-shared-core/commit/ca59ce7))
* add assertNever() ([6eb9349](https://github.com/waitingsong/node-shared-core/commit/6eb9349))
* add assertNeverObb() ([91da144](https://github.com/waitingsong/node-shared-core/commit/91da144))
* add isPathAcessible() ([7eb000b](https://github.com/waitingsong/node-shared-core/commit/7eb000b))
* add lib/shared.ts ([6915fb1](https://github.com/waitingsong/node-shared-core/commit/6915fb1))
* add logger() ([5d603c5](https://github.com/waitingsong/node-shared-core/commit/5d603c5))
* add Observable functions ([c9364db](https://github.com/waitingsong/node-shared-core/commit/c9364db))
* change logger() to accept more args ([b5d0ca4](https://github.com/waitingsong/node-shared-core/commit/b5d0ca4))
* compile output bundle file without minify ([0b78ba1](https://github.com/waitingsong/node-shared-core/commit/0b78ba1))
* do isPathAccessible() first within isDirFileExists() ([9ddae98](https://github.com/waitingsong/node-shared-core/commit/9ddae98))
* export basename() from shared ([7e93fd7](https://github.com/waitingsong/node-shared-core/commit/7e93fd7))
* export dirname() ([0db2a50](https://github.com/waitingsong/node-shared-core/commit/0db2a50))
* export native assert() ([683cea8](https://github.com/waitingsong/node-shared-core/commit/683cea8))
* export os.tmpdir() ([1cc1f3e](https://github.com/waitingsong/node-shared-core/commit/1cc1f3e))
* export rmdirAsync() and rimraf() ([4ef519a](https://github.com/waitingsong/node-shared-core/commit/4ef519a))
* export statAsync ([c832590](https://github.com/waitingsong/node-shared-core/commit/c832590))
* output esm.min.js ([f6c729f](https://github.com/waitingsong/node-shared-core/commit/f6c729f))
* parse peerDependencies as external ([dfdd73e](https://github.com/waitingsong/node-shared-core/commit/dfdd73e))
* parseUMDName() ([6e7164f](https://github.com/waitingsong/node-shared-core/commit/6e7164f))
* remove log() and logger() ([27e1e29](https://github.com/waitingsong/node-shared-core/commit/27e1e29))

### [1.9.2](https://github.com/waitingsong/node-shared-core/compare/v1.9.1...v1.9.2) (2019-05-22)


### Bug Fixes

* ab2str() ([de71297](https://github.com/waitingsong/node-shared-core/commit/de71297))



### [1.9.1](https://github.com/waitingsong/node-shared-core/compare/v1.9.0...v1.9.1) (2019-05-22)



## [1.9.0](https://github.com/waitingsong/node-shared-core/compare/v1.8.0...v1.9.0) (2019-05-21)


### Features

* add ab2str(), str2ab(), genRandomInt() ([70d20e8](https://github.com/waitingsong/node-shared-core/commit/70d20e8))



## [1.8.0](https://github.com/waitingsong/node-shared-core/compare/v1.7.0...v1.8.0) (2019-05-21)


### Features

* add ab2buf(), buf2ab() ([77aa8e2](https://github.com/waitingsong/node-shared-core/commit/77aa8e2))



# [1.7.0](https://github.com/waitingsong/node-shared-core/compare/v1.6.0...v1.7.0) (2019-03-01)


### Features

* **types:** add Concat ([a4df3bc](https://github.com/waitingsong/node-shared-core/commit/a4df3bc))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/waitingsong/node-shared-core/compare/v1.3.0...v1.3.1) (2019-02-22)



<a name="1.3.0"></a>
# [1.3.0](https://github.com/waitingsong/node-shared-core/compare/v1.2.1...v1.3.0) (2019-01-21)


### Features

* export const isWin32, userHome ([7106b5a](https://github.com/waitingsong/node-shared-core/commit/7106b5a))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/waitingsong/node-shared-core/compare/v1.2.0...v1.2.1) (2019-01-21)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/waitingsong/node-shared-core/compare/v1.1.0...v1.2.0) (2019-01-21)


### Bug Fixes

* not reading content of COMMIT_EDITMSG with isSkipCommitlint() ([3df87a1](https://github.com/waitingsong/node-shared-core/commit/3df87a1))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/waitingsong/node-shared-core/compare/v1.0.0...v1.1.0) (2019-01-21)


### Features

* genFileFromExample() ([92f4f56](https://github.com/waitingsong/node-shared-core/commit/92f4f56))
* isSkipCommitlint() check whether skip commitlint ([6e6fdbc](https://github.com/waitingsong/node-shared-core/commit/6e6fdbc))
