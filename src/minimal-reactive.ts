import type { StringKeys } from 'everyday-types'
import { once } from 'everyday-utils'

export interface IDep<T> {
  subs: Set<any>
  value: T | null | undefined
  current: T | null | undefined
  stackErr?: Error
  accessors: {
    get(): T | null | undefined,
    set(value: T): boolean
  }
  trigger(): void
}

export type Dep<T> = IDep<NonNullable<T>>

export type Boxs<T> = {
  [K in StringKeys<T>]: Dep<T[K]>
}

export type Unboxs<T extends Boxs<T>> = {
  [K in keyof T]-?: NonNullable<T[K]['value']>
}

export type Vals<T extends Boxs<T>> = {
  [K in keyof T]: T[K]['value']
}

export type OffFx = (reconnect?: boolean, disconnect?: boolean) => any

export type Sub = <T>(prevValue: T | null | undefined, nextValue: T | null | undefined) => void

export type Fx<T extends Boxs<T>> = (deps: Unboxs<T>, changes: Change[], prev: Unboxs<T>) => OffFx | void

const equals = (value: any, next: any) =>
  value != null && next != null && typeof value === 'object' && 'equals' in value
    ? (value as any).equals(next, value)
    : Object.is(next, value)

export function dep<T>(value?: T | null | undefined): Dep<T> {
  const d: IDep<T> = {
    subs: new Set<Sub>(),

    get value() {
      return value
    },
    set value(next) {
      if (!equals(value, next)) {
        if (effect.debug) {
          this.stackErr = new Error()
        }
        const prev = value
        value = next
        this.subs.forEach(function callSub(fn) { fn(prev, next) })
      }
    },

    // alias for jsx refs
    get current() {
      return this.value
    },
    set current(newValue) {
      this.value = newValue
    },

    // convenience for creating accessors in a state object
    accessors: {
      get() {
        return value
      },
      set(value: T) {
        d.value = value
        return true
      }
    },

    trigger() {
      this.subs.forEach((fn) => fn(value, value))
    }
  }
  return d as Dep<T>
}

export function deps<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) =>
      [key, dep(value)]
    )
  ) as Boxs<T>
}

let count = 0
let clearCountTimeout: any
const clearCount = () => {
  count = 0
}
function infiniteLoopGuard() {
  if (++count >= effect.maxUpdates) {
    console.warn(`Infinite loop detected (>${effect.maxUpdates} updates within ${effect.maxUpdatesWithinMs}ms)`)
    return true
  } else {
    clearTimeout(clearCountTimeout)
    clearCountTimeout = setTimeout(clearCount, effect.maxUpdatesWithinMs)
  }
}
// let ms = 0, now = 0

export interface Change { key: string, prev: any, next: any }

export const effect = Object.assign(function effect<T extends Boxs<any>>(deps: T, fn: Fx<T>): OffFx {
  // let prev: Unboxs<T>

  // let stackErr: Error
  // if ((effect as any).debug) {
  // stackErr = new Error()
  // }

  let values: Unboxs<T>
  let dispose: OffFx | void

  const A = function strategyNull() {
    if (infiniteLoopGuard()) {
      throw new Error(`Infinite loop for deps: ${Object.keys(deps)}`)
    }

    for (const key in deps)
      if (deps[key].value == null) return

    strategy = B

    const changes: Change[] = []
    values = Object.create(null)
    for (const key in deps) {
      if (values[key] == null) {
        changes.push({ key, prev: values[key], next: deps[key].value })
      }

      values[key] = deps[key].value
    }

    dispose = once(fn(values, changes, {} as any))
  }

  const B = function strategyFill() {
    if (infiniteLoopGuard()) {
      throw new Error(`Infinite loop for deps: ${Object.keys(deps)}`)
    }

    const changes: Change[] = []
    let hasVoid = false

    const prev = { ...values }

    for (const key in deps) {
      if (!equals(values[key], deps[key].value)) {
        // now = performance.now()
        // console.groupCollapsed(`${key} +${(now - ms).toFixed(2)}ms`)
        // ms = now
        // console.log(stackErr)
        // console.groupEnd()

        changes.push({ key, prev: values[key], next: deps[key].value })
        values[key] = deps[key].value
        if (deps[key].value == null) hasVoid = true
      }
    }

    if (changes.length) {
      // if ((effect as any).debug) {
      //   (effect as any).debug(
      //     changed,
      //     fn,
      //     ...changed
      //       .map(([key]) =>
      //         deps[key].stackErr
      //       ),
      //     stackErr,
      //   )
      // }
      if (hasVoid) {
        // !reconnect && !disconnect === becomes void
        dispose?.()
        strategy = A
      } else {
        // reconnect && !disconnect === is updating
        dispose?.(true)
        dispose = once(fn(values, changes, prev))
      }
    }
  }

  let strategy = A

  const callback = function depCallback() { strategy() }

  Object.values(deps).forEach((dep) => {
    dep.subs.add(callback)
  })

  callback()

  return (reconnect = false, disconnect = true) => {
    Object.values(deps).forEach((dep) => {
      dep.subs.delete(callback)
    })
    // !reconnect && disconnect === is disposed
    dispose?.(reconnect, disconnect)
  }
}, {
  maxUpdates: 2000,
  maxUpdatesWithinMs: 10,
  debug: false as (
    false
    | ((changed: [string, any][], fn: Fx<any>, ...stackErr: Error[]) => void
    )
  )
})
