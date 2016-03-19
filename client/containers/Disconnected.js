/* eslint no-undef: 1 */
import { connect } from 'react-redux'

import Disconnected from '../components/Disconnected'

const mapStateToProps = state => ({
  username: state.auth.username,
  disconnnected: state.disconnnected,
});

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(mapStateToProps)(Disconnected)