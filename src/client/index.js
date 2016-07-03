import { render } from 'react-dom'

import store from './store'
import Root from './containers/Root'

render(
  <Root store={store} />,
  document.getElementById('app')
)
