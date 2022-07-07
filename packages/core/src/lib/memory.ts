import assert from 'node:assert'
// import { writeFile } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import v8 from 'node:v8'


/**
 * Create a heap snapshot and save it to a file.
 */
export function saveHeapSnapshot(path: string): Promise<void> {
  assert(path)

  const snapshotStream = v8.getHeapSnapshot()

  return new Promise((done, reject) => {
    const fileStream = createWriteStream(path)

    const cbRError = (err: Error) => {
      fileStream.removeAllListeners()
      reject(err)
    }
    snapshotStream.once('error', cbRError)

    const cbWError = (err: Error) => {
      snapshotStream.removeAllListeners()
      fileStream.removeAllListeners()
      reject(err)
    }
    fileStream.once('error', cbWError)

    const cbWClose = () => {
      snapshotStream.removeAllListeners()
      fileStream.off('error', cbWError)
      done()
    }
    fileStream.once('close', cbWClose)

    snapshotStream.pipe(fileStream)
  })

  // not work
  // await writeFile(
  //   path,
  //   v8.getHeapSnapshot(),
  // )
}

