/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */


export type TrimStart<T extends string> = T extends ` ${infer Rest}` ? TrimStart<Rest> : T
export type TrimEnd<T extends string> = T extends `${infer Rest} ` ? TrimEnd<Rest> : T
export type Trim<T extends string> = TrimStart<TrimEnd<T>>

