#!/usr/bin/env tsx
/* eslint-disable no-await-in-loop */
import assert from 'node:assert'

import { $ } from 'zx'

import { genRandomString, isDirExists, isFileExists } from '../utils.js'

import type { CreateUserOptions } from './user.types.js'


export async function createGroup(user: CreateUserOptions): Promise<void> {
  if (user.gid && user.gid > 0) {
    await $`groupadd -g ${user.gid} ${user.username}`
  }
}

export async function createUser(user: CreateUserOptions): Promise<void> {
  const ps: string[] = []
  user.uid && ps.push(`-u ${user.uid}`)
  user.gid && ps.push(`-g ${user.gid}`)
  user.createHomeDir || ps.push('-M')
  if (user.shell) {
    ps.push(`-s`)
    ps.push(user.shell)
  }

  await $`useradd ${ps} ${user.username}`

  if (await isDirExists(`/home/${user.username}`)) {
    if (! await isFileExists(`/home/${user.username}/.ssh/id_ed25519`)) {
      await $`rm -f /home/${user.username}/.ssh/id_ed25519.pub`
      await $`sudo -u ${user.username} sh -c "ssh-keygen -q -t ed25519 -N '' -f ~/.ssh/id_ed25519"`
    }

    await $`mkdir -p /home/${user.username}/.vim/swp`
    await $`chown -R ${user.username}:${user.username} /home/${user.username}/.vim`
  }
}

export async function setUserPassword(userName: string, passwd?: string): Promise<void> {
  // pwgen -s 64 1 | passwd ${user} --stdin
  // tr -dc '[:alnum:]' < /dev/urandom | fold -w 64 | head -n 1
  assert(userName, 'userName is required')
  const pass = passwd ?? genRandomString()
  assert(pass.length >= 8, 'password length must be greater than 8')
  await $`echo ${pass} | passwd ${userName} --stdin`
}

export async function setUserSudo(user: string, sudoWithoutPasswd: boolean | undefined): Promise<void> {
  assert(user, 'user is required')
  await $`rm -f /etc/sudoers.d/${user}`

  await $`echo "Defaults: ${user}   timestamp_timeout=15" > /etc/sudoers.d/${user}`
  if (sudoWithoutPasswd) {
    await $`echo "${user} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/${user}`
  }
  else {
    await $`echo "${user} ALL=(ALL) ALL" >> /etc/sudoers.d/${user}`
  }

  await $`chmod 440 /etc/sudoers.d/*`
  await $`chown root:root /etc/sudoers.d/*`
}

export async function modifyUserGroup(user: CreateUserOptions): Promise<void> {
  if (! Array.isArray(user.groups) || ! user.groups.length) {
    return
  }
  const groups = user.groups.map(str => str.trim()).join(',')
  await $`usermod -G ${groups} ${user.username}`
}

export async function userExists(userName: string): Promise<boolean> {
  assert(userName, 'userName is required')
  const { stdout, exitCode } = await $`getent passwd ${userName}`
    .catch((resp) => {
      if (resp.exitCode === 2) { // 2: user not found
        return { stdout: '', exitCode: 2 }
      }
      console.error(resp)
      process.exit(resp.exitCode ?? 1)
    })

  if (exitCode === 2) {
    return false
  }
  return stdout.startsWith(`${userName}:`)
}

