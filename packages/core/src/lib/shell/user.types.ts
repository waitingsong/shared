
export interface CreateUserOptions {
  username: string
  createHomeDir: boolean
  /**
   * Use default shell if not specified
   */
  shell?: UserShell
  uid?: number
  /**
   * The primary group of the user
   * - undefined: create a group with the same name as the user
   * - false: do not create a group
   */
  gid?: number | false
  groups?: string[]
  /**
   * The date on which the user account will be disabled. The date is specified in the format YYYY-MM-DD
   */
  expireDate?: string
  /**
   * undefined: false
   */
  hasSudo?: boolean
  /**
   * undefined: false
   */
  sudoWithoutPassword?: boolean
  sshAllowUser?: boolean
}

export enum UserShell {
  nologin = '/sbin/nologin',
  binFalse = '/bin/false',
}

