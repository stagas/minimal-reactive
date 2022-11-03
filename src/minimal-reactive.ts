export interface Dep<T> {
  subscribers: Set<any>
  value: T | null | undefined
}
export type BoxedDeps<T> = {
  [K in keyof T]: Dep<T[K]>
}

export type Deps<T extends BoxedDeps<T>> = {
  [K in keyof T]-?: NonNullable<T[K]['value']>
}

export type Values<T extends BoxedDeps<T>> = {
  [K in keyof T]: T[K]['value']
}

export type Dispose = () => any

export type DepCallback = <T>(prevValue: T | null | undefined, nextValue: T | null | undefined) => void

export type Fx<T extends BoxedDeps<T>> = (deps: Deps<T>) => Dispose | void

export function dep<T>(value?: T | null | undefined): Dep<T> {
  return {
    subscribers: new Set<DepCallback>(),
    get value() {
      return value
    },
    set value(newValue) {
      if (!Object.is(newValue, value)) {
        const oldValue = value
        value = newValue
        this.subscribers.forEach((fn) => fn(oldValue, newValue))
      }
    }
  }
}


export function effect<T extends BoxedDeps<any>>(deps: T, fn: Fx<T>): Dispose {
  let prev: Deps<T>

  const values = (): Values<T> =>
    Object.fromEntries(
      Object.entries(deps).map(
        ([key, dep]) =>
          [key, dep.value] as [keyof T, T[keyof T]['value']]
      )
    ) as Values<T>

  let dispose: Dispose | null | void

  const A = (next: Values<T>) => {
    if (Object.values(next).every((value) => value != null)) {
      strategy = B
      dispose = fn(prev = next as Deps<T>)
    }
  }

  const B = (next: Values<T>) => {
    const entries = Object.entries(next)

    if (
      entries.some(
        ([key, value]) =>
          !Object.is(prev[key], value)
      )
    ) {
      dispose?.()
      dispose = null
      if (
        entries.some(
          ([, value]) =>
            value == null
        )
      ) {
        strategy = A
      } else {
        dispose = fn(prev = next as Deps<T>)
      }
    }
  }

  let strategy = A

  const callback = () => strategy(values())

  Object.values(deps).forEach((dep) => {
    dep.subscribers.add(callback)
  })

  callback()

  return () => {
    Object.values(deps).forEach((dep) => {
      dep.subscribers.delete(callback)
    })
    dispose?.()
  }
}
