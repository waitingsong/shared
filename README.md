# Shared types and utils


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/shared.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/badge/lang-TypeScript-blue.svg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## Initialization

```sh
npm run repo:init
```


## Update

```sh
npm run bootstrap
```


## Test

- Use `npm run lint` to check code style.
- Use `npm run test` to run unit test.


## Note

- Run `npm run clean` before `npm run build`, if any file under typescript outDir folder was deleted manually.
- Default publish registry is `NPM`, configurated in file `lerna.json`


## Packages

| Package   | Version                  | Dependencies                   | DevDependencies                  |
| --------- | ------------------------ | ------------------------------ | -------------------------------- |
| [`types`] | [![types-svg]][types-ch] | [![types-d-svg]][types-d-link] | [![types-dd-svg]][types-dd-link] |
| [`core`]  | [![core-svg]][core-ch]   | [![core-d-svg]][core-d-link]   | [![core-dd-svg]][core-dd-link]   |


[`types`]: https://github.com/waitingsong/shared/tree/master/packages/types
[types-svg]: https://img.shields.io/npm/v/@waiting/shared-types.svg?maxAge=86400
[types-ch]: https://github.com/waitingsong/shared/tree/master/packages/types/CHANGELOG.md
[types-d-svg]: https://david-dm.org/waitingsong/@waiting/shared-types.svg?path=packages/@waiting/shared-types
[types-d-link]: https://david-dm.org/waitingsong/@waiting/shared-types.svg?path=packages/@waiting/shared-types
[types-dd-svg]: https://david-dm.org/waitingsong/@waiting/shared-types/dev-status.svg?path=packages/@waiting/shared-types
[types-dd-link]: https://david-dm.org/waitingsong/@waiting/shared-types?path=packages/@waiting/shared-types#info=devDependencies

[`core`]: https://github.com/waitingsong/shared/tree/master/packages/core
[core-svg]: https://img.shields.io/npm/v/@waiting/shared-core.svg?maxAge=86400
[core-ch]: https://github.com/waitingsong/shared/tree/master/packages/demo/CHANGELOG.md
[core-d-svg]: https://david-dm.org/waitingsong/@waiting/shared-core.svg?path=packages/@waiting/shared-core
[core-d-link]: https://david-dm.org/waitingsong/@waiting/shared-core.svg?path=packages/@waiting/shared-core
[core-dd-svg]: https://david-dm.org/waitingsong/@waiting/shared-core/dev-status.svg?path=packages/@waiting/shared-core
[core-dd-link]: https://david-dm.org/waitingsong/@waiting/shared-core?path=packages/@waiting/shared-core#info=devDependencies

