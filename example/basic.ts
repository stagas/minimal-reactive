import { dep, effect } from '../src'

const a = dep(3)
const b = dep(4)

effect({ a, b }, ({ a, b }) => {
  // a + b are unboxed here
  const result = a + b

  console.log(result)

  return () => {
    // dispose
  }
}) // prints 7

// changing values
a.value = 2 // prints 6
b.value = 3 // prints 5
