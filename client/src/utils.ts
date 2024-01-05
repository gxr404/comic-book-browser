export function toReversed<T = any>(arr: T[]) {
  const newArr: T[] = []
  arr.forEach(item => newArr.unshift(item))
  return newArr
}