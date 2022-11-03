import { dep, effect } from '../src/minimal-reactive'

describe('dep(x)', () => {
  it('fires immediately', () => {
    const a = dep(0)

    let fired = 0
    let ra
    effect({ a }, ({ a }) => {
      ra = a
      fired++
    })

    expect(ra).toEqual(0)
    expect(fired).toEqual(1)
  })

  it('fires when dependency changes', () => {
    const a = dep(0)

    let fired = 0
    let ra
    effect({ a }, ({ a }) => {
      ra = a
      fired++
    })

    expect(ra).toEqual(0)
    expect(fired).toEqual(1)

    a.value = 2
    expect(ra).toEqual(2)
    expect(fired).toEqual(2)
  })

  it('runs dispose', () => {
    const a = dep(0)

    let fired = 0
    let disposed = 0
    let ra
    effect({ a }, ({ a }) => {
      ra = a
      fired++
      return () => {
        disposed++
      }
    })

    expect(ra).toEqual(0)
    expect(fired).toEqual(1)
    expect(disposed).toEqual(0)

    a.value = null
    expect(ra).toEqual(0)
    expect(fired).toEqual(1)
    expect(disposed).toEqual(1)
  })

  it('does not fire immediately', () => {
    const a = dep<number>(null)

    let fired = 0
    let ra
    effect({ a }, ({ a }) => {
      ra = a
      fired++
    })

    expect(ra).toBeUndefined()
    expect(fired).toEqual(0)

    a.value = 1
    expect(ra).toEqual(1)
    expect(fired).toEqual(1)
  })

  it('can dispose effect', () => {
    const a = dep(0)

    let fired = 0
    let disposed = 0
    let ra
    const dispose = effect({ a }, ({ a }) => {
      ra = a
      fired++
      return () => {
        disposed++
      }
    })

    expect(ra).toEqual(0)
    expect(fired).toEqual(1)
    expect(disposed).toEqual(0)

    dispose()

    a.value = 1
    expect(ra).toEqual(0)
    expect(fired).toEqual(1)
    expect(disposed).toEqual(1)
  })
})

describe('multiple dep(x)', () => {
  it('fires immediately', () => {
    const a = dep(0)
    const b = dep([])

    let fired = 0
    let ra
    let rb
    effect({ a, b }, ({ a, b }) => {
      ra = a
      rb = b
      fired++
    })

    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)
  })

  it('fires when dependency changes', () => {
    const a = dep(0)
    const b = dep([])

    let fired = 0
    let ra
    let rb
    effect({ a, b }, ({ a, b }) => {
      ra = a
      rb = b
      fired++
    })

    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)

    a.value = 2
    expect(ra).toEqual(2)
    expect(fired).toEqual(2)
  })

  it('fires dispose when dependency changes', () => {
    const a = dep(0)
    const b = dep([])

    let fired = 0
    let disposed = 0
    let ra
    let rb
    effect({ a, b }, ({ a, b }) => {
      ra = a
      rb = b
      fired++
      return () => {
        disposed++
      }
    })

    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)
    expect(disposed).toEqual(0)

    a.value = 2
    expect(ra).toEqual(2)
    expect(fired).toEqual(2)
    expect(disposed).toEqual(1)
  })

  it('runs dispose', () => {
    const a = dep(0)
    const b = dep<any[]>([])

    let fired = 0
    let disposed = 0
    let ra
    let rb
    effect({ a, b }, ({ a, b }) => {
      ra = a
      rb = b
      fired++
      return () => {
        disposed++
      }
    })

    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)
    expect(disposed).toEqual(0)

    a.value = null
    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)
    expect(disposed).toEqual(1)

    b.value = null
    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)
    expect(disposed).toEqual(1)

    a.value = 1
    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)
    expect(disposed).toEqual(1)

    b.value = null
    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)
    expect(disposed).toEqual(1)

    b.value = [1]
    expect(ra).toEqual(1)
    expect(rb).toEqual([1])
    expect(fired).toEqual(2)
    expect(disposed).toEqual(1)
  })

  it('does not fire immediately', () => {
    const a = dep(0)
    const b = dep<any[]>()

    let fired = 0
    let ra
    let rb
    effect({ a, b }, ({ a, b }) => {
      ra = a
      rb = b
      fired++
    })

    expect(ra).toBeUndefined()
    expect(rb).toBeUndefined()
    expect(fired).toEqual(0)

    b.value = []
    expect(ra).toEqual(0)
    expect(rb).toEqual([])
    expect(fired).toEqual(1)
  })
})
