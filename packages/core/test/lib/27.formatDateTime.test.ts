import assert from 'node:assert/strict'

import { formatDateTime } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should genISO8601String() work', () => {
    it('number', async () => {
      const ret = formatDateTime(Date.now())
      assertsRet(ret)
    })

    it('Date', async () => {
      const ret = formatDateTime(new Date())
      assertsRet(ret)
    })

    it('date string', async () => {
      const str = '2020/12/20 11:23:16'
      const ret = formatDateTime(str)
      assertsRet(ret)
    })
  })

})

function assertsRet(input: string): void {
  assert(input)
  assert(input.length === 19)
  assert(input.includes('/'))
  assert(input.includes(':'))
}
