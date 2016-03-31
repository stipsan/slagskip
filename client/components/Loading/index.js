import { Component } from 'react'
import DocumentTitle from 'react-document-title'
import style from './style.scss'

class Loading extends Component {
  render() {    
    return <DocumentTitle title="Epic | Loading...">
      <section className={style.hero}>
        <div className={style.heroContent}>
          <div className={style.container}>
            <h1 className={style.title}>Loading…</h1>
          </div>
        </div>
      </section>
    </DocumentTitle>
  }
}

export default Loading