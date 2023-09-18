import assert from 'node:assert/strict'

import { retrieveArgsFromProcess } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should retrieveArgsFromProcess() work', () => {
    it('common', async () => {
      const argv = retrieveArgsFromProcess()
      console.log({ argv })
      assert(argv)
      assert(Array.isArray(argv._), JSON.stringify(argv))
      if (argv._.length) {
        assert(argv._[0] === 'test/**/*.test.ts', JSON.stringify(argv))
        assert(argv.ui === 'bdd', JSON.stringify(argv))
      }
    })

    it('pass argv', async () => {
      const argv = retrieveArgsFromProcess(process.argv)
      assert(argv)
      assert(Array.isArray(argv._), JSON.stringify(argv))
      if (argv._.length) {
        assert(argv._[0] === 'test/**/*.test.ts', JSON.stringify(argv))
        assert(argv.ui === 'bdd', JSON.stringify(argv))
      }
    })

    it('pass argv equal default', async () => {
      const argv = retrieveArgsFromProcess()
      const argv2 = retrieveArgsFromProcess(process.argv)
      assert.deepEqual(argv, argv2)
    })
  })

})
