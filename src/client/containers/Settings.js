import { connect } from 'react-redux'

import Settings from '../components/Settings'

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect()(Settings)
