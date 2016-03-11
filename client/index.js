import 'babel-polyfill'
import './scss/index.scss'
import { render } from 'react-dom'
import store from './store'
import Root from './containers/Root'

// temp
global.faker = require('faker');

render(
  <Root store={store} />,
  document.getElementById('app')
)