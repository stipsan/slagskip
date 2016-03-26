import { Component } from 'react'
import DocumentTitle from 'react-document-title'
import shallowCompare from 'react-addons-shallow-compare'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { default as TouchBackend } from 'react-dnd-touch-backend'
import {
  section as sectionClassName,
  yard as yardClassName,
  wrapper as wrapperClassName,
} from './style.scss'
import Grid from './Grid'
import {
  ExtraLarge,
  Large,
  Medium1,
  Medium2,
  Small1,
  Small2,
  ExtraSmall1,
  ExtraSmall2,
} from './Item'
import ItemPreview from './ItemPreview'


class Setup extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    const { grid, items } = this.props
    
    console.log('grid', grid)
    return <DocumentTitle title="Setup New Game">
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <Grid grid={grid} />
          <div className={yardClassName}>
            
            <Large type="l" />
            <ExtraSmall1 type="xs1" />
            <ExtraSmall2 type="xs2" />
            <Medium1 type="m1" />
            
            <Small1 type="s1" />
            <Small2 type="s2" />
            <Medium2 type="m2" />
            <ExtraLarge type="xl" />
            
            
            <ItemPreview name="item" />
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

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Setup)