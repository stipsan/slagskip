import 'babel-polyfill'
import store from './store'
import { init } from './actions/init'
import { render } from 'react-dom'
import Root from './containers/Root'

store.dispatch(init())

render(
  <Root store={store} />,
  document.getElementById('app')
)