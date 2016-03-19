import { Component } from 'react'
import DocumentTitle from 'react-document-title'

class Loading extends Component {
  render() {    
    return <DocumentTitle title="Loading...">
      <section className="section section--loading">
        <h1>Loading game…</h1>
      </section>
    </DocumentTitle>
  }
}

export default Loading