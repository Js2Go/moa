// function fn1() {
//   console.log('fn1')
//   console.log('fn1 end')
// }
// function fn2() {
//   console.log('fn2')
//   console.log('fn2 end')
// }
// function fn3() {
//   console.log('fn3')
//   console.log('fn3 end')
// }
// fn3(fn2(fn1()))

async function fn1(next) {
  console.log('fn1')
  next && await next()
  console.log('fn1 end')
}
async function fn2(next) {
  console.log('fn2')
  next && await next()
  console.log('fn2 end')
}
async function fn3(next) {
  console.log('fn3')
  next && await next()
  console.log('fn3 end')
}

// const compose = middlewares => () => {
//   [first, ...others] = middlewares
//   let ret = first()
//   others.forEach(fn => {
//     ret = fn(ret)
//   })
//   return ret
// }

function compose(middlewares) {
  return function() {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}

const middlewares = [fn1, fn2, fn3]
const finalFn = compose(middlewares)
finalFn()

