import { connect } from 'react-redux'

import Disconnected from '../components/Disconnected'

const mapStateToProps = state => ({
  username: state.getIn(['auth', 'username']),
  disconnnected: state.get('disconnnected'),
  connected: state.get('connected'),
  pendingReconnect: state.get('pendingReconnect'),
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(mapStateToProps)(Disconnected)
