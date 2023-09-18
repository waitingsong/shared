import minimist from 'minimist'


export function retrieveArgsFromProcess(processArgv: string[] = process.argv): minimist.ParsedArgs {
  const ps = processArgv.slice(2)
  const argv = minimist(ps)
  return argv
}


