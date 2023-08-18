import assert from 'node:assert'

import type { NpmPkgView } from '@waiting/shared-types'
import { Shell, Options } from 'zx'


let $: (Shell & Options) | undefined

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

  if (! $) {
    // zx is pure ESM module and cannot via require(), so use dynamic import for bundler cjs
    $ = await import('zx').then(mod => mod.$)
  }
  assert($, 'zx.$ empty')

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

