/* eslint no-undef: 1 */
import { connect } from 'react-redux'

import Disconnected from '../components/Disconnected'

const mapStateToProps = state => ({
  username: state.getIn(['auth', 'username']),
  disconnnected: state.get('disconnnected'),
})

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(mapStateToProps)(Disconnected)