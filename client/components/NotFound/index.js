import { Component } from 'react'

class NotFound extends Component {
  
  render() {
    const { children } = this.props
    
    return <section className="section section--404">
      <h1>Error 404!</h1>
    </section>
  }
}

export default NotFound