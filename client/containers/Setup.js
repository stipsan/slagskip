import { connect } from 'react-redux'
import Setup from '../components/Setup'

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect()(Setup)