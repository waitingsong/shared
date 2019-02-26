
/** Set loading path for node-ffi linking dll */
export function SetPathDirectory(path: string): void {
  if (path && typeof path === 'string' && process && process.env) {
    process.env.PATH = `${process.env.PATH};${path}`
  }
}
