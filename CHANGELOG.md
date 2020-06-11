# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.0.0](/compare/v3.5.1...v4.0.0) (2020-06-11)


### Bug Fixes

* **core:** createFileAsync() types of param `data` d19f510


### Features

* increase pkg.engines.node to >=12.13.0 b296c00





## [3.5.1](/compare/v3.5.0...v3.5.1) (2020-03-18)

**Note:** Version bump only for package @waiting/shared





# [3.5.0](/compare/v3.4.0...v3.5.0) (2020-03-18)


### Features

* **types:** add `Spread` 1927800





# [3.4.0](/compare/v3.3.1...v3.4.0) (2020-03-03)


### Features

* **types:** add type DateISOString (ISO 8601) 285eb43





## [3.3.1](/compare/v3.3.0...v3.3.1) (2020-01-09)


### Bug Fixes

* **types:** expose alias d02805f





# [3.3.0](/compare/v3.2.0...v3.3.0) (2020-01-09)


### Features

* **types:** add alias.ts 1e08c0f





# [3.2.0](/compare/v3.1.0...v3.2.0) (2019-11-26)


### Features

* add type NpmPkg for package.json e65b717





# 3.1.0 (2019-11-16)


### Bug Fixes

* **lint:** minors ecc3672
* ab2str() 0a09e04
* not reading content of COMMIT_EDITMSG with isSkipCommitlint() 54bf9b5


### Features

* add ab2buf(), buf2ab() 56b99c7
* add ab2str(), str2ab(), genRandomInt() 8914fae
* add readFileLineRx() 39c69c5
* add SetPathDirectory() 658218f
* add src files d8e21f7
* add types 1a2d9cd
* add validateDllFile() c7de681
* change types JsonResp ea34168
* export helper d85170c
* export isDirFileExists() dd56e9d
* update type JsonResp 9700bcd
* **types:** add Concat 2f71b17
* **types:** add type JsonType 3cad591
* **types:** add type KnownKeys 8f05f43
* **types:** add types below 0109140
* export const isWin32, userHome 03da0fa
* genFileFromExample() bb8ea22
* isSkipCommitlint() check whether skip commitlint 8845ad3


### BREAKING CHANGES

* use `code` instead of `err`, and generics accepts `any`
