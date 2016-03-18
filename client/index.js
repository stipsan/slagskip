import 'babel-polyfill'
import './scss/index.scss'
import { render } from 'react-dom'
import store from './store'
import { checkCapabilities } from './actions/capabilities'
import Root from './containers/Root'

if('production' !== process.env.NODE_ENV) {
  global.store = store
}

store.dispatch(checkCapabilities())

render(
  <Root store={store} />,
  document.getElementById('app')
)