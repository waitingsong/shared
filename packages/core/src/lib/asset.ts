
export function assertNever(x: never): never {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  throw new Error('Assert Never Unexpected object: ' + x)
}
/**
 * @description use rxjs/NEVER instead
 */
// export function assertNeverRx(x: never): Observable<never> {
//   // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
//   return throwError(() => new Error('Assert Never Unexpected object: ' + x))
// }

