type anyFn = (...args: any[]) => any

const caches = new Map<any, Map<any, any>>()

function mementoFn<T extends anyFn> (fn:T): T {
  const resFn = (...args: any[]) => {
    let currentCache = caches.get(fn)
    if (!currentCache) {
      currentCache = new Map()
      caches.set(fn, currentCache)
    }

    let cacheKey: any = args.join('_')
    if (args.length == 0) {
      cacheKey = fn
    }
    const cacheRes = currentCache.get(cacheKey)
    if (cacheRes) {
      return cacheRes
    }

    const res = fn(...args)
    if (res instanceof Promise) {
      const resPromise = res.then(function(value) {
        currentCache!.set(cacheKey, Promise.resolve(value))
        return value
      })
      currentCache.set(cacheKey, resPromise)
      return res
    }
    currentCache.set(cacheKey, res)
    return res
  }
  return resFn as T
}

function cleanCache() {
  caches.clear()
}

export {
  caches,
  mementoFn,
  cleanCache
}