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
import Item from './Item'
import ItemPreview from './ItemPreview'


class Setup extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    const {
      grid,
      items,
      addItem,
      username,
      versus,
    } = this.props
    
    if(!versus) return <h1>Loading…</h1>
    
    const versusUsername = versus.get('username')
    
    console.log('items', items)
    return <DocumentTitle title={`Epic | ${versusUsername} vs ${username}`}>
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <Grid grid={grid} />
          <div className={yardClassName}>
            {items.filter(item => item.get(1) === -1).map((item, type) => <Item
              key={type}
              type={type}
              coordinates={item}
              addItem={addItem}
            />)}
            <ItemPreview name="item" />
          </div>
        </div>
        <div></div>
      </section>
    </DocumentTitle>
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Setup)