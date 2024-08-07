import type { NetworkInterfaceInfo } from 'node:os'
import { networkInterfaces } from 'node:os'


/**
* 获取第一个网络信息，不包括回环地址信息
*/
export function retrieveFirstIp(family: NetworkInterfaceInfo['family'] = 'IPv4'): NetworkInterfaceInfo | undefined {
  const ips = retrieveExternalNetWorkInfo()
  for (const info of ips) {
    if (info.family === family) {
      return info
    }
  }
}


/**
 * 获取网络信息，不包括回环地址信息
 */
export function retrieveExternalNetWorkInfo(): NetworkInterfaceInfo[] {
  return Object.entries(networkInterfaces()).reduce(
    (acc: NetworkInterfaceInfo[], curr) => {
      const [, nets] = curr
      /* istanbul ignore if */
      if (! nets) {
        return acc
      }
      nets.forEach((net) => {
        // Skip over internal (i.e. 127.0.0.1) addresses
        if (! net.internal) {
          acc.push(net)
        }
      })
      return acc
    },
    [],
  )
}

