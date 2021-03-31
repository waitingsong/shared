import { genDbDict } from './dict'
import { Db, Db2 } from './types'


export const dict1 = genDbDict<Db>()
export const dict2 = genDbDict<Db2>()

