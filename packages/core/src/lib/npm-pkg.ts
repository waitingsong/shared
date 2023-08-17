import assert from 'node:assert'

import type { NpmPkgView } from '@waiting/shared-types'
import { $ } from 'zx'


export type { NpmPkgView }

export async function getNpmPkgViewFromRegistry(
  pkgName: string,
  version = 'latest',
  registry = 'https://registry.npmjs.org',
): Promise<NpmPkgView | undefined> {

  assert(pkgName, 'pkgName empty')
  assert(version, 'version empty')
  assert(registry, 'registry empty')

  const name = `${pkgName}@${version}`
  try {
    $.verbose = false
    const { exitCode, stdout } = await $`npm view ${name} --json --registry=${registry}`
    $.verbose = true
    if (exitCode === 0 && stdout) {
      const info = JSON.parse(stdout) as NpmPkgView
      return info
    }
  }
  catch (ex) {
    $.verbose = true
    if (ex instanceof Error && ex.message.includes('E404')) {
      return
    }
    throw ex
  }
}

