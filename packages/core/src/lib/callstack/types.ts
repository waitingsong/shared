
export interface CallerInfo {
  path: string
  // from StackFram
  fileName: string
  className: string
  funcName: string
  methodName: string
  lineNumber: number
  columnNumber: number
  enclosingLineNumber: number
  enclosingColNumber: number
  line: number
  column: number
}

// export interface StackFrame {
//   getTypeName: () => string
//   getFunctionName: () => string
//   getMethodName: () => string
//   getFileName: () => string
//   getLineNumber: () => number
//   getColumnNumber: () => number
//   isNative: () => boolean
// }

