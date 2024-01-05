
export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function getCSSVar(varName: string) {
  return getComputedStyle(document.body).getPropertyValue(varName).trim()
}

export function excludeProperty(obj: any, propertyArr: string[]) {
  const res: any = {}
  for (const [key,value] of Object.entries(obj)) {
    if (!propertyArr.includes(key)) {
      res[key] = value
    }
  }
  return res
}