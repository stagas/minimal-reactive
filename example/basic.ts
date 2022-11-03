import { dep, effect } from '../src'

const a = dep(3)
const b = dep(4)

effect({ a, b }, ({ a, b }) => {
  // a + b are unboxed here
  const result = a + b // 7
  console.log(result)

  return () => {
    // dispose
  }
})
