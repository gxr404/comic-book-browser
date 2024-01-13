import os from 'node:os'

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

/**
 * 对源对象排除某些字段返回新对象(字段浅拷贝)
 */
export function excludeProperty(obj: any, propertyArr: string[]) {
  const res: any = {}
  for (const [key,value] of Object.entries(obj)) {
    if (!propertyArr.includes(key)) {
      res[key] = value
    }
  }
  return res
}

/** 获取本机ip地址 */
export function getIPAdress() {
  const interfaces = os.networkInterfaces()
  for (const [, iface] of Object.entries(interfaces)) {
    if (!iface) continue
    for (const alias of iface) {
      if (alias.family === 'IPv4'
        && alias.address !== '127.0.0.1'
        && !alias.internal) {
        return alias.address
      }
    }
  }
  return '127.0.0.1'
}
