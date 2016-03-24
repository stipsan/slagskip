import { Component } from 'react'
import DocumentTitle from 'react-document-title'
import {
  section as sectionClassName,
  yard as yardClassName,
  wrapper as wrapperClassName,
} from './style.scss'
import Grid from './Grid'

class Setup extends Component {
  render() {
    const { grid } = this.props
    console.log(grid)
    return <DocumentTitle title="Setup New Game">
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <Grid grid={grid} />
          <div className={yardClassName}>
          <button onClick={event => this.props.dispatch({
            type: 'ADD_ITEM',
            item: 'xl',
            position: [0,0]
          })}>Add XL on x0y0</button>
          <button onClick={event => this.props.dispatch({
            type: 'ADD_ITEM',
            item: 'l',
            position: [4,1],
            rotated: 1
          })}>Add L on x4y1</button>
          <button onClick={event => this.props.dispatch({
            type: 'ADD_ITEM',
            item: 'm1',
            position: [5,4],
            rotated: 0
          })}>Add M1 on x5y4</button>
          <button onClick={event => this.props.dispatch({
            type: 'ADD_ITEM',
            item: 'm2',
            position: [7,5],
            rotated: 1
          })}>Add M2 on x7y5</button>
          <button onClick={event => this.props.dispatch({
            type: 'ADD_ITEM',
            item: 's1',
            position: [6,0],
            rotated: 1
          })}>Add S1 on x6y0</button>
          <button onClick={event => this.props.dispatch({
            type: 'ADD_ITEM',
            item: 's2',
            position: [6,2],
            rotated: 0
          })}>Add S2 on x6y2</button>
          <button onClick={event => this.props.dispatch({
            type: 'ADD_ITEM',
            item: 'xs1',
            position: [8,2]
          })}>Add XS1 on x8y2</button>
          <button onClick={event => this.props.dispatch({
            type: 'ADD_ITEM',
            item: 'xs2',
            position: [8,0]
          })}>Add XS2 on x8y0</button>
          </div>
        </div>
        <div></div>
      </section>
    </DocumentTitle>
  }
}

export default Setup