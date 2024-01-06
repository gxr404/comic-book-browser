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