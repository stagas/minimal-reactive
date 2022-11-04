export interface Dep<T> {
  subs: Set<any>
  value: T | null | undefined
}
export type Boxs<T> = {
  [K in keyof T]: Dep<T[K]>
}

export type Deps<T extends Boxs<T>> = {
  [K in keyof T]-?: NonNullable<T[K]['value']>
}

export type Vals<T extends Boxs<T>> = {
  [K in keyof T]: T[K]['value']
}

export type Off = () => any

export type Sub = <T>(prevValue: T | null | undefined, nextValue: T | null | undefined) => void

export type Fx<T extends Boxs<T>> = (deps: Deps<T>) => Off | void

export function dep<T>(value?: T | null | undefined): Dep<T> {
  return {
    subs: new Set<Sub>(),
    get value() {
      return value
    },
    set value(newValue) {
      if (!Object.is(newValue, value)) {
        const oldValue = value
        value = newValue
        this.subs.forEach((fn) => fn(oldValue, newValue))
      }
    }
  }
}

export function effect<T extends Boxs<any>>(deps: T, fn: Fx<T>): Off {
  let prev: Deps<T>

  const values = (): Vals<T> =>
    Object.fromEntries(
      Object.entries(deps).map(
        ([key, dep]) =>
          [key, dep.value] as [keyof T, T[keyof T]['value']]
      )
    ) as Vals<T>

  let dispose: Off | null | void

  const A = (next: Vals<T>) => {
    if (Object.values(next).every((value) => value != null)) {
      strategy = B
      dispose = fn(prev = next as Deps<T>)
    }
  }

  const B = (next: Vals<T>) => {
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
    dep.subs.add(callback)
  })

  callback()

  return () => {
    Object.values(deps).forEach((dep) => {
      dep.subs.delete(callback)
    })
    dispose?.()
  }
}
