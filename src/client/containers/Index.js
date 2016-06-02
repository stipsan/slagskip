import { connect } from 'react-redux'

import Index from '../components/Index'

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect()(Index)
