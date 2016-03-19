import { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import { syncHistoryWithStore, replace } from 'react-router-redux'
import Index from './Index'
import Login from './Login'
import App from './App'
import Lobby from '../components/Lobby'
import NotFound from '../components/NotFound'

function Foo() {
  return <section className="section section--foo">
    <h1>Foo</h1>
    <Link to="/">Home</Link>
  </section>
}

function Dashboard() {
  return <section className="section section--dashboard">
    <h1>Dashboard</h1>
    <Link to="/">Home</Link>
  </section>
}

const Root = ({ store }) => {
  
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)
  
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