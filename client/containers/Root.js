import { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './App'
import Dashboard from './Dashboard'
import Setup from './Setup'
import Game from './Game'
import Games from './Games'
import Friends from './Friends'
import NotFound from '../components/NotFound'

const Root = ({ store }) => {
  
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('routing').toJS()
  })
  
  return <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={Dashboard}>
          <IndexRoute component={Games} />
          <Route path="friends" component={Friends} />
        </Route>
        <Route path="setup" component={Setup} />
        <Route path="game/:game" component={Game} />
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root