/**
 * For npm package.json
 *
 * @link https://docs.npmjs.com/files/package.json
 */

import { DateISOString } from './alias.js'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NpmPkg {
  name: string
  version?: string
  description?: string
  bin?: NpmPkgStringObj
  browser?: string
  bugs?: NpmPkgStringObj
  bundledDependencies?: string[]
  config?: NpmPkgStringObj
  contributors?: NpmPkgPersion[]
  cpu?: string[]
  dependencies?: NpmPkgStringObj
  devDependencies?: NpmPkgStringObj
  engines?: NpmPkgStringObj
  es2015?: string
  keywords?: string[]
  homepage?: string
  license?: string
  main?: string | string[]
  man?: string | string[]
  module?: string
  optionalDependencies?: NpmPkgStringObj
  os?: string[]
  peerDependencies?: NpmPkgStringObj
  /** @deprecated */
  preferGlobal?: boolean
  private?: boolean
  publishConfig?: NpmPkgPublishConfig
  repository: NpmPkgRepository | string
  scripts?: NpmPkgStringObj
  types?: string
  [key: string]: any
}

export interface NpmPkgDist {
  integrity: string
  shasum: string
  tarball: string
  fileCount?: number
  unpackedSize?: number
  signatures?: {
    keyid: string,
    sig: string,
  }
}

export interface NpmPkgView {
  access?: 'public' | 'private'
  author?: string
  bin?: Record<string, string>
  bugs?: Record<string, string>
  bundleDependencies?: string[]
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  description?: string
  directories?: Record<string, string>
  dist: NpmPkgDist
  engines?: Record<string, string>
  exports?: Record<string, string | Record<string, string>>
  files?: string[]
  gitHead?: string
  homepage?: string
  keywords?: string[]
  license?: string
  main: string
  maintainers?: (NpmPkgPersion | string)[]
  name: string
  'dist-tags': {
    latest: string,
    [name: string]: string,
  }
  private: boolean
  readme: string
  readmeFilename: string
  repository?: {
    type: string,
    url: string,
    directory?: string,
  }
  scripts?: Record<string, string>
  time: Record<string, DateISOString>
  type?: 'module' | 'commonjs' | 'bundle'
  types?: string
  users?: Record<string, boolean>
  version: string
  versions: string[]
  workspaces?: string[]
  _id: string
  _contentLength: number
  _hasShrinkwrap?: boolean
  _nodeVersion: string
  _npmVersion: string
  [key: string]: any
}

export interface NpmPkgPublishConfig {
  access: boolean
  registry: string
  tag: string
  [key: string]: string | boolean
}

export interface NpmPkgRepository {
  type: 'git' | 'svn' | 'hg'
  url: string
  directory?: string
}

export interface NpmPkgPersion {
  name: string
  url?: string
  email?: string
}

export interface NpmPkgStringObj {
  [name: string]: string
}

