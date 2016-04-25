import { render } from 'react-dom'

import store from './store'
import Root from './containers/Root'
import { init } from './actions/init'

store.dispatch(init())

render(
  <Root store={store} />,
  document.getElementById('app')
)
