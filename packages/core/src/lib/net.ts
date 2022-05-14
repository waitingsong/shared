import { NetworkInterfaceInfo, networkInterfaces } from 'node:os'


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

