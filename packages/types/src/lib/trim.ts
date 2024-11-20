
export type TrimStart<T extends string, K extends string = ' '> = T extends `${K}${infer Rest}` ? TrimStart<Rest, K> : T
export type TrimEnd<T extends string, K extends string = ' '> = T extends `${infer Rest}${K}` ? TrimEnd<Rest, K> : T
export type Trim<T extends string, K extends string = ' '> = TrimStart<TrimEnd<T, K>, K>

