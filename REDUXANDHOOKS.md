# Redux and React Hooks
## Overview
An overview of Redux and how you can use it in conjunction with React Hooks.

## React Hooks
So as a brief overview, React Hooks fundamentally change how you build a React app. It lets you track and update state within a **function** component rather than a class component.

In addition React Hooks are built to allow for much easier state "lifecycle" in comparison to `componentDidMount`, `componentWillUpdate`, and etc. This is because React hooks were built to allow for easy separation of concerns

## Redux and Hooks
React Redux recently(v7.1.0) added some new stuff that includes React Hooks.

The ones used here are `useSelector` and `useDispatch`

`useSelector` allows you to extract data from store state. Usage is as below:
```ts
  interface selectorFn {
    (state: ReduxState): ReduxState | ReduxStatePortion
  }
  const result : any = useSelector(selector: selectorFn, equalityFn ?: Function)
```

And in the context of this app, we use it to fetch parts of our state like so:
```js
  const postsBySubreddit = useSelector(state => state.postsBySubreddit)
  const selectedSubreddit = useSelector(state => state.selectedSubreddit)
```

`useDispatch` on the other hand lets you fetch the Redux dispatch function so you can use it to trigger actions.