
/** Set loading path for node-ffi linking dll */
export function setPathDirectory(path: string): void {
  if (path && typeof path === 'string') {
    const ori = process.env.PATH ? process.env.PATH : ''
    process.env.PATH = `${ori};${path}`
  }
}

