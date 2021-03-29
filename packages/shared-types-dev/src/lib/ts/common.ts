import { LiteralObject } from '@waiting/shared-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript'


export function createObjectLiteralExpression(
  input: LiteralObject,
): ts.ObjectLiteralExpression {

  const arr: ts.ObjectLiteralElementLike[] = Object.entries(input).map(([key, value]) => {
    if (Array.isArray(value)) {
      throw new TypeError('property value not literal object, but array. key: ' + key)
    }
    else if (typeof value === 'string') {
      const node = createPropertyAssignmentOfString(key, value)
      return node
    }
    else if (typeof value === 'object' && Object.keys(value).length) {
      const node = createPropertyAssignmentOfObject(key, value)
      return node
    }
    throw new TypeError('property value not literal object. key: ' + key)
  })
  const ret = ts.factory.createObjectLiteralExpression(arr, true)
  return ret
}

function createPropertyAssignmentOfString(
  key: string,
  value: string,
): ts.PropertyAssignment {

  const ret = ts.factory.createPropertyAssignment(
    ts.factory.createIdentifier(key),
    ts.factory.createStringLiteral(value),
  )
  return ret
}


function createPropertyAssignmentOfObject(
  key: string,
  value: LiteralObject,
): ts.PropertyAssignment {

  const id = ts.factory.createIdentifier(key)
  const expression = createObjectLiteralExpression(value)

  const arr = ts.factory.createPropertyAssignment(
    id,
    expression,
  )
  return arr
}

