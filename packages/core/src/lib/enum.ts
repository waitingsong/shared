import assert from 'node:assert'


/**
 * Get the key of an enum by its value
 * @returns keyof EnumType | undefined
 */
export function getKeyByEnumValue<T extends Record<string, unknown>>(
  enumType: T,
  enumValue: string | number,
): keyof T | undefined {

  assert(typeof enumType === 'object', 'enumType must be an object')
  assert(enumType)
  const ret = Object.keys(enumType).find(key => enumType[key] === enumValue)
  if (! ret) {
    return
  }
  return ret as keyof T
}
