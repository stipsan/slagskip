import { Component } from 'react'
import DocumentTitle from 'react-document-title'
import {
  section as sectionClassName,
} from './style.scss'

class Setup extends Component {
  render() {    
    return <DocumentTitle title="Setup New Game">
      <section className={sectionClassName}>
        <h1>Loading game…</h1>
      </section>
    </DocumentTitle>
  }
}

export default Setup