import { connect } from 'react-redux'
import Setup from '../components/Setup'

const mapStateToProps = state => ({
  grid: state.getIn(['board', 'grid']),
})

export default connect(mapStateToProps)(Setup)