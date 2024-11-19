import minimist from 'minimist'


// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function retrieveArgsFromProcess<T extends minimist.ParsedArgs = minimist.ParsedArgs>(processArgv: string[] = process.argv): T {
  const ps = processArgv.slice(2)
  const argv = minimist(ps)
  return argv as T
}


