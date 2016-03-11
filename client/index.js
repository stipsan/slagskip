import 'babel-polyfill'
import './scss/index.scss'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import App from './containers/App'

let store = createStore(reducers);

render(<App />, document.getElementById('app'))