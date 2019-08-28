import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import HooksAsyncApp from './HooksAsyncApp'

const store = configureStore()

const Root = () => (
  <Provider store={store}>
    <HooksAsyncApp />
  </Provider>
)

export default Root;