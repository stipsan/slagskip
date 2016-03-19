import { Component } from 'react'

class Index extends Component {
  
  render() {
    const { children } = this.props
    
    return <section className="section section--index">
      <h1>Welcome to the index!</h1>
    </section>
  }
}

export default Index