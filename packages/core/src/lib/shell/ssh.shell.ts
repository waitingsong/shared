#!/usr/bin/env tsx
import { appendFile } from 'node:fs/promises'

import { $ } from 'zx'


export async function updateSshAllowUser(userName: string): Promise<void> {
  const file = '/etc/ssh/sshd_config'
  const date = new Date().toISOString()
  await $`cp ${file} ${file}.${date}`

  const userSet = new Set<string>()
  userSet.add(userName.trim())

  const { stdout } = await $`grep -E '^\\s*AllowUsers' ${file}`.catch(() => ({ stdout: '' }))
  console.info({ stdout })
  if (stdout) {
    await $`sed -i '/^\\s*AllowUsers.*/d' ${file}`
    const users: string[] = stdout.trim().split(' ').slice(1)
    users.forEach(name => userSet.add(name.trim()))
  }

  const txt = Array.from(userSet).join(' ')
  await appendFile(file, `AllowUsers ${txt}\n`)
}
