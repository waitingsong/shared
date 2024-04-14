
import { access } from 'node:fs/promises'
import { join } from 'node:path'


/**
 * @example genModuleAbsolutePathIfExists(genCurrentDirname(import.meta.url), 'node_modules/@mwcp/share')
 */
export async function genModuleAbsolutePathIfExists(projectDir: string, modulePath: string): Promise<string> {
  const moduleAbsolutePath = join(projectDir, modulePath)
  const needle = join(moduleAbsolutePath, 'package.json')

  const mwcpShareExists = await access(needle).then(() => true)
    // .catch((ex) => {
    //   console.error(ex)
    //   return false
    // })
    .catch(() => false)

  if (mwcpShareExists) {
    return moduleAbsolutePath
  }
  return '.'
}
