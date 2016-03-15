import 'babel-polyfill'
import './scss/index.scss'
import { render } from 'react-dom'
import store from './store'
import Root from './containers/Root'

console.info('AUTO_RECONNECT_OPTIONS', process.env.AUTO_RECONNECT_OPTIONS);

render(
  <Root store={store} />,
  document.getElementById('app')
)