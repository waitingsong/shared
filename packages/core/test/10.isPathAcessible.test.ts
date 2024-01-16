import assert from 'node:assert/strict'
import { rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, normalize } from 'node:path'

import {
  createDirAsync,
  isPathAccessible,
} from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


const tmpDir = join(tmpdir(), 'test-tmp')

describe(fileShortPath(import.meta.url) + ':isPathAccessible()', () => {

  before(async () => {
    await createDirAsync(tmpDir)
  })
  after(async () => {
    await rm(tmpDir, { recursive: true, force: true })
  })

  const fnName = 'isPathAccessible'

  it(`Should ${fnName}() work`, async () => {
    const dir = tmpdir()

    assert(isPathAccessible(dir), `system temp path should accessible: "${dir}"`)
  })

  it(`Should ${fnName}() work with invalid value`, async () => {
    const dir = join(tmpDir, Math.random().toString())

    if (await isPathAccessible('')) {
      return assert(false, 'should return false with blank path')
    }

    if (await isPathAccessible(dir)) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    if (await isPathAccessible(dir)) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    await createDirAsync(dir)
    if (! await isPathAccessible(dir)) {
      return assert(false, `path should accessible: "${dir}"`)
    }
  })

})


