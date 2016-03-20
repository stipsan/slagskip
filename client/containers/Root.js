import { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Login from './Login'
import App from './App'
import Lobby from '../components/Lobby'
import NotFound from '../components/NotFound'

const Root = ({ store }) => {
  
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('routing').toJS()
  })
  
  return <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Lobby} />
        <Route path="login" component={Login} />
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root