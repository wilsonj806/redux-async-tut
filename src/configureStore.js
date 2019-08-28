import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose  } from 'redux'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware)), // let's use use async reducers/ actions
  )
}