# Asynchronous Actions
## Overview
This is an overview of asynchronous actions with Redux, Redux Thunk.

## Basics
First things first, we need to review what function currying is. Currying lets you change a function with multiple arguments, into a chain of functions with a single argument. Given the below:
```js
  const multiply = (a, b, c) => {
    return a * b * c
  }

  console.log(multiply(1, 2, 3)) // returns 6
```

If we curry the function, we get the below:
```js
  const curriedMultiply = (a) => {
    return (b) => {
      return (c) => {
        return a * b * c
      }
    }
  }
  // Or cleaning it up
  const curriedMultiply = (a) => (b) => (c) => a * b * c
  console.log(curriedMuliply(1, 2, 3)) // returns 6
```

As all of functions returned in the curried function are scoped locally, we have access to `a`, `b`, and `c` in the lowest level function.

## Async Action Types
So async actions need to have different action types to handle each scenario, initated, failure, success. That way you know how many actions are in progress/ failed/ resolved properly. There are a couple of different ways to do it. You can identify different variations of the action type only with the `type` key like so:
```js
{ type: 'FETCH_STUFF_INIT }
{ type: 'FETCH_STUFF_FAILURE }
{ type: 'FETCH_STUFF_SUCCESS }
```

You can also add your own dedicated field for it like so:
```js
{ type: 'FETCH_STUFF', status: 'INIT' }
{ type: 'FETCH_STUFF', status: 'FAILURE' }
{ type: 'FETCH_STUFF', status: 'SUCCESS' }
```