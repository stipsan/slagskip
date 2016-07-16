import { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import About from '../components/About'
import App from './App'
import Dashboard from './Dashboard'
import Forgot from '../components/Forgot'
import Game from './Game'
import Games from './Games'
import NewGame from './NewGame'
import NotFound from '../components/NotFound'
import Settings from './Settings'
import Setup from './Setup'

const Root = ({ store }) => {

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('routing').toJS()
  })

  return <Provider store={store}>
    <Router history={history}>
      <Route path="/about" component={About} />
      <Route path="/forgot" component={Forgot} />
      <Route component={App}>
        <Route path="/" component={Dashboard}>
          <IndexRoute component={Games} />
          <Route path="settings" component={Settings} />
        </Route>
        <Route path="/setup/:versus" component={Setup} />
        <Route path="/join/:game" component={Setup} />
        <Route path="/new" component={NewGame} />
        <Route path="/game/:game" component={Game} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
