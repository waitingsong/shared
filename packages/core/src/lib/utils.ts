/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  access,
  chmod,
  close,
  copyFile,
  mkdir,
  open,
  readdir,
  readFile,
  rmdir,
  stat,
  unlink,
  write,
  writeFile,
  WriteFileOptions,
} from 'fs'
import {
  basename,
  dirname,
  join,
  normalize,
  resolve as pathResolve,
  sep,
} from 'path'
import { promisify, TextDecoder, TextEncoder } from 'util'

import {
  defer,
  from as ofrom,
  of,
  Observable,
} from 'rxjs'
import {
  concatMap,
  last,
  map,
  mapTo,
  mergeMap,
  scan,
} from 'rxjs/operators'


export const closeAsync = promisify(close)
export const chmodAsync = promisify(chmod)
export const copyFileAsync = promisify(copyFile)
export const mkdirAsync = promisify(mkdir)
export const openAsync = promisify(open)
export const readFileAsync = promisify(readFile)
export const readDirAsync = promisify(readdir)
export const rmdirAsync = promisify(rmdir)
export const statAsync = promisify(stat)
export const unlinkAsync = promisify(unlink)
export const writeAsync = promisify(write)
export const writeFileAsync = promisify(writeFile)
export {
  basename,
  dirname,
  join,
  normalize,
  pathResolve,
  promisify,
}
export { tmpdir } from 'os'

/** Return path if accessible, blank if not accessible */
export function pathAccessible(path: string): Observable<string> {
  return defer(() => isPathAccessible(path)).pipe(
    map(exists => exists ? normalize(path) : ''),
  )
}
// support relative file ('./foo')
export function isPathAccessible(path: string): Promise<boolean> {
  return path
    ? new Promise(resolve => access(path, err => resolve(! err)))
    : Promise.resolve(false)
}

/** Check folder path exists, return path if exists, blank if not exists */
export function dirExists(path: string): Observable<string> {
  if (! path) {
    return of('')
  }
  const dir = normalize(path)
  return defer(() => isDirExists(dir)).pipe(
    map(exists => exists ? dir : ''),
  )
}
export function isDirExists(path: string): Promise<boolean> {
  return path ? isDirFileExists(path, 'DIR') : Promise.resolve(false)
}


/** Check file exists, return path if exists, blank if not exists */
export function fileExists(path: string): Observable<string> {
  const file = normalize(path)
  return defer(() => isFileExists(file)).pipe(
    map(exists => exists ? file : ''),
  )
}
export function isFileExists(path: string): Promise<boolean> {
  return path ? isDirFileExists(path, 'FILE') : Promise.resolve(false)
}


export function isDirFileExists(path: string, type: 'DIR' | 'FILE'): Promise<boolean> {
  if (path) {
    return isPathAccessible(path)
      .then((accessible) => {
        return accessible
          ? statAsync(path).then((stats) => {
            return type === 'DIR' ? stats.isDirectory() : stats.isFile()
          })
          : false
      })
  }
  else {
    return Promise.resolve(false)
  }
}

export function createDir(absolutePath: string): Observable<string> {
  return defer(() => createDirAsync(absolutePath))
}

/** create directories recursively */
export async function createDirAsync(path: string): Promise<string> {
  if (path) {
    const target = normalize(path) // ! required for '.../.myca' under win32
    /* istanbul ignore else */
    if (! await isDirExists(target)) {
      await mkdirAsync(path, { recursive: true })
    }

    return target
  }
  else {
    throw new Error('value of path param invalid')
  }
}


/**
 * Create file
 * Buffer will be written as binary
 * Object will be written as JSON string
 *
 * @requires string - created file path
 */
export async function createFileAsync(file: string, data: any, options?: WriteFileOptions): Promise<string> {
  const dir = dirname(file)

  /* istanbul ignore next */
  if (! dir) {
    throw new Error('folder empty')
  }
  if (! await isDirExists(dir)) {
    await createDirAsync(dir)
  }
  const path = normalize(file)

  /* istanbul ignore else */
  if (! await isFileExists(path)) {
    const opts: WriteFileOptions = options ? options : { mode: 0o640 }

    if (Buffer.isBuffer(data)) {
      await writeFileAsync(path, data, opts)
    }
    else if (typeof data === 'object') {
      await writeFileAsync(path, JSON.stringify(data))
    }
    else {
      await writeFileAsync(path, data, opts)
    }
  }

  return path
}


/**
 * @deprecated in favor of using child_process['ExecFileOptions']
 */
export interface ExecFileOptions {
  cwd?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  env?: object
  encoding?: 'utf8' | string
  timeout?: 0 | number
  maxBuffer?: number
  killSignal?: string
  uid?: number
  gid?: number
  windowsHide?: boolean
  windowsVerbatimArguments?: boolean
}


/* istanbul ignore next */
/**
 * Remove directory recursively
 * @see https://stackoverflow.com/a/42505874/3027390
 */
export async function rimraf(path: string): Promise<void> {
  if (! path) {
    return
  }
  await _rimraf(path)
  if (await isDirExists(path)) {
    await rmdirAsync(path)
  }
}
/* istanbul ignore next */
async function _rimraf(path: string): Promise<void> {
  if (! path) {
    return
  }

  if (await isPathAccessible(path)) {
    if (await isFileExists(path)) {
      await unlinkAsync(path)
      return
    }
    const entries = await readDirAsync(path)

    if (entries.length) {
      for (const entry of entries) {
        // eslint-disable-next-line no-await-in-loop
        await _rimraf(join(path, entry))
      }
    }
    else {
      await rmdirAsync(path)
    }
  }
}


/**
 * Validate dll file exists for node-ffi
 */
export async function validateDllFile(path: string): Promise<void> {
  if (! path) {
    throw new Error('File path empth ')
  }
  // only filename. can be loaded by search path such as %system%
  if (! path.includes('/')) {
    return
  }
  // absolute path
  if (await isPathAccessible(path)) {
    return
  }
  throw new Error('File not exists: ' + path)
}


/**
 * Convert js ArrayBuffer to Node.js Buffer
 *
 * @see https://stackoverflow.com/a/14737423
 */
export function ab2buf(ab: ArrayBuffer): Buffer {
  return Buffer.from(ab)
}

/**
 * Convert Node.js Buffer to js ArrayBuffer
 *
 * @see https://stackoverflow.com/a/14737423
 */
export function buf2ab(buf: Buffer): ArrayBuffer {
  return Uint8Array.from(buf).buffer
}


/**
 * Convert ArrayBuffer/TypedArray to String via TextDecoder
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
 */
export function ab2str(
  input: ArrayBuffer | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array,
  outputEncoding: 'utf8' | 'utf-16' = 'utf8',
): string {
  const decoder = new TextDecoder(outputEncoding)
  return decoder.decode(input)
}

/**
 * Convert String to ArrayBuffer via TextEncoder
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
 */
export function str2ab(input: string): ArrayBuffer {
  const view = str2Uint8Array(input)
  return view.buffer
}

/** Convert String to Uint8Array */
export function str2Uint8Array(input: string): Uint8Array {
  const encoder = new TextEncoder()
  const view = encoder.encode(input)
  return view
}


/**
 * Generate random integer
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function genRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}
