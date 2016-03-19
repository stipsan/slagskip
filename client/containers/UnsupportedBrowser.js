/* eslint no-undef: 1 */
import { connect } from 'react-redux'

import UnsupportedBrowser from '../components/UnsupportedBrowser'

const mapStateToProps = state => ({
  browsers: global.SUPPORTED_BROWSERS,
});

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(mapStateToProps)(UnsupportedBrowser)