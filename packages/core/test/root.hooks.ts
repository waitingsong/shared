
// const opts = process.env['NODE_OPTIONS'] ?? ''
// process.env['NODE_OPTIONS'] = opts + ' --enable-source-maps'
// export NODE_OPTIONS='--enable-source-maps --no-warnings'

/**
 * @see https://mochajs.org/#root-hook-plugins
 * beforeAll:
 *  - In serial mode(Mocha’s default ), before all tests begin, once only
 *  - In parallel mode, run before all tests begin, for each file
 * beforeEach:
 *  - In both modes, run before each test
 */
export const mochaHooks = async () => {
  // avoid run multi times
  if (! process.env['mochaRootHookFlag']) {
    process.env['mochaRootHookFlag'] = 'true'
  }

  return {
    beforeAll: async () => {
      return
    },

    afterAll: async () => {
      return
    },
  }

}

