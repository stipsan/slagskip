import { Component } from 'react'
import DocumentTitle from 'react-document-title'
import {
  section as sectionClassName,
} from './style.scss'

class Loading extends Component {
  render() {    
    return <DocumentTitle title="Loading...">
      <section className={sectionClassName}>
        <h1>Loading…</h1>
      </section>
    </DocumentTitle>
  }
}

export default Loading