import { Component } from 'react'
import { connect } from 'react-redux'

import Index from '../components/Index'

class IndexContainer extends Component {
  static propTypes = {
    
  }
  
  render() {
    const {
      
    } = this.props

    return <Index />
  }
}

// move this to grandchildren so the root don't need to subscribe to Redux
export default connect(
  null,
  null
)(IndexContainer)