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

  assert($, 'zx.$ empty')

  const ps = pkgName.includes('@') ? '' : '--no-workspaces'

  try {
    $.verbose = false
    // const cmd = `npm view ${ps} ${name} --json --registry=${registry}`
    // void cmd
    const { exitCode, stdout } = await $`npm view ${ps} ${name} --json --registry=${registry}`
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

/**
 * Compare two versions, input format: '1.2.3' without prefix 'v'
 * @returns 0: equal, -1: v1 < v2, 1: v1 > v2
 */
export function compareVersions(version1: string, version2: string): number {
  const v1Parts = version1.split('.').map(Number)
  const v2Parts = version2.split('.').map(Number)

  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i += 1) {
    if ((v1Parts[i] ?? 0) < (v2Parts[i] ?? 0)) { return -1 }
    if ((v1Parts[i] ?? 0) > (v2Parts[i] ?? 0)) { return 1 }
  }
  return 0
}

