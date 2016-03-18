import 'babel-polyfill'
import './scss/index.scss'
import { render } from 'react-dom'
import store from './store'
import { init } from './actions/init'
import Root from './containers/Root'

if('production' !== process.env.NODE_ENV) {
  global.store = store
}

store.dispatch(init())

render(
  <Root store={store} />,
  document.getElementById('app')
)