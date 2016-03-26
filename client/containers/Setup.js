import { connect } from 'react-redux'
import { addItem } from '../actions'
import Setup from '../components/Setup'

const mapStateToProps = state => ({
  grid: state.getIn(['board', 'grid']),
  items: state.getIn(['board', 'items'])
})

const mapDispatchToProps = dispatch => ({
  addItem: (type, startIndex) => {
    dispatch(addItem(type, startIndex))
  },
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Setup)