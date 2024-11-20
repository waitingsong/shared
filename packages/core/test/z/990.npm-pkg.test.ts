import assert from 'node:assert/strict'

import type { NpmPkgView } from '##/index.js'
import { getNpmPkgViewFromRegistry } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const pkgName = 'npm'
  const pkgVer = '10.0.0'
  const pkgReg = 'https://registry.npmjs.org'
  const pkgRegMirror = 'https://registry.npmmirror.com'

  const pkgNameFake = 'npmFakeName' + Date.now().toString()
  const pkgVerFake = '3.14159265358979'
  const pkgRegFake = 'https://www.npmjs.com'

  describe('should getNpmPkgViewFromRegistry() work', () => {
    it(pkgName, async () => {
      const info: NpmPkgView | undefined = await getNpmPkgViewFromRegistry(pkgName)
      // console.info(info)
      assert(info)
      assert(info.author, 'author empty')
      assert(info.name === pkgName, 'name not match')

      const latest = info['dist-tags'].latest
      assert(latest, 'latest not exist')
      assert(info._id === `${pkgName}@${latest}`, '_id not match')

      assert(info.versions.length > 0, 'versions empty')
      assert(info.versions.includes(latest), 'latest not in versions')
    })

    it(`${pkgName} --registry ${pkgReg}`, async () => {
      const info: NpmPkgView | undefined = await getNpmPkgViewFromRegistry(pkgName, 'latest', pkgReg)
      assert(info)
      assert(info.author, 'author empty')
      assert(info.name === pkgName, 'name not match')

      const latest = info['dist-tags'].latest
      assert(latest, 'latest not exist')
      assert(info._id === `${pkgName}@${latest}`, '_id not match')

      assert(info.versions.length > 0, 'versions empty')
      assert(info.versions.includes(latest), 'latest not in versions')

      const { dist } = info
      assert(dist)
      assert(dist.tarball)
      assert(dist.tarball.startsWith(`${pkgReg}/${pkgName}/-/${pkgName}-`))
    })

    it(`${pkgName} --registry ${pkgRegMirror}`, async () => {
      const info: NpmPkgView | undefined = await getNpmPkgViewFromRegistry(pkgName, 'latest', pkgRegMirror)
      assert(info)
      assert(info.author, 'author empty')
      assert(info.name === pkgName, 'name not match')

      const latest = info['dist-tags'].latest
      assert(latest, 'latest not exist')
      assert(info._id === `${pkgName}@${latest}`, '_id not match')

      assert(info.versions.length > 0, 'versions empty')
      assert(info.versions.includes(latest), 'latest not in versions')

      const { dist, version } = info
      assert(version, 'version empty')
      assert(dist)
      assert(dist.tarball)
      assert(dist.tarball.startsWith(`${pkgRegMirror}/${pkgName}/-/${pkgName}-`), `dist.tarball: ${dist.tarball}`)
    })

    it(`${pkgName} --registry ${pkgRegMirror} ${pkgVer}`, async () => {
      const info: NpmPkgView | undefined = await getNpmPkgViewFromRegistry(pkgName, pkgVer, pkgRegMirror)
      assert(info)
      assert(info.author, 'author empty')
      assert(info.name === pkgName, 'name not match')

      const latest = info['dist-tags'].latest
      assert(latest, 'latest not exist')
      assert(info._id === `${pkgName}@${pkgVer}`, '_id not match')

      assert(info.versions.length > 0, 'versions empty')
      assert(info.versions.includes(latest), 'latest not in versions')

      const { dist, version } = info
      assert(version === pkgVer, `version: ${version}, expected: ${pkgVer}`)
      assert(dist)
      assert(dist.tarball)
      assert(dist.tarball.startsWith(`${pkgRegMirror}/${pkgName}/-/${pkgName}-${pkgVer}`), `dist.tarball: ${dist.tarball}`)
    })

    it(`${pkgNameFake}`, async () => {
      const info: NpmPkgView | undefined = await getNpmPkgViewFromRegistry(pkgNameFake, 'latest', pkgRegMirror)
      assert(! info, 'should not exist')
    })

    it(`${pkgName} ${pkgVerFake}`, async () => {
      const info: NpmPkgView | undefined = await getNpmPkgViewFromRegistry(pkgName, pkgVerFake, pkgRegMirror)
      assert(! info, 'should not exist')
    })

    it(`${pkgName} --registry ${pkgRegFake}`, async () => {
      try {
        await getNpmPkgViewFromRegistry(pkgName, 'latest', pkgRegFake)
        assert(false, 'should throw error')
      }
      catch (ex) {
        assert(ex instanceof Error, 'should be Error')
        assert(ex.message.includes('FETCH_ERROR'))
      }
    })
  })

})
