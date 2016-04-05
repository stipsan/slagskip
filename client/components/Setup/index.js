import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import shallowCompare from 'react-addons-shallow-compare'
import Avatar from 'react-user-avatar'

import classNames from 'classnames'

import style, {
  section as sectionClassName,
  yard as yardClassName,
  wrapper as wrapperClassName,
} from './style.scss'
import { Grid, SetupCanvas, Item } from '../Board'
import Cell from './Cell'
import Loading from '../Loading'

const {
  Drag,
  XL,
  L,
  M,
  S,
  XS,
  DragPreview
} = Item

// @TODO merge duplicated code
const defaultColors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ecf0f1',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d'
]

const types = [
  ['xl', 5, <XL />],
  ['l', 4, <L />],
  ['m1', 3, <M />],
  ['m2', 3, <M />],
  ['s1', 2, <S />],
  ['s2', 2, <S />],
  ['xs1', 1, <XS />],
  ['xs2', 1, <XS />],
]

const getDefaultIndex = (type, items, size) => {
  
  let defaultIndex = 111
  let insertOffset = 0
  
  console.warn(types)
  switch(type) {
    case 'xs1':
      defaultIndex += items.getIn(['s1', 1]) === -1 ? 2 : 0
    case 's1':
      defaultIndex += items.getIn(['m1', 1]) === -1 ? 3 : 0
    case 'm1':
      defaultIndex += items.getIn(['xl', 1]) === -1 ? 5 : 0
      insertOffset = 10 - ((defaultIndex % 10) + size)
      console.error(type, insertOffset)
    case 'xl':
      insertOffset = (defaultIndex % 10) + 5
    //  console.error(type, defaultIndex, insertOffset, size)
      defaultIndex += items.getIn(['l', 1]) === -1 ? 4 : 0
    case 'l':
      defaultIndex += items.getIn(['m2', 1]) === -1 ? 3 : 0
      
      insertOffset = (defaultIndex % 10) + 4
      console.error(type, size, (defaultIndex % 10), defaultIndex, insertOffset)
      console.error((10 - (defaultIndex % 10)), (defaultIndex % 10) > 4, defaultIndex)
      //defaultIndex += (defaultIndex % 10) > 4 ? (10 - (defaultIndex % 10)) : 0
      
      
    case 'm2':
      defaultIndex += items.getIn(['s2', 1]) === -1 ? 2 : 0
    case 's2':
      defaultIndex += items.getIn(['xs2', 1]) === -1 ? 1 : 0
  
    /*  
    case 'xs2':
      defaultIndex += items.getIn(['xs1', 1]) === -1 ? 1 : 0
    case 's2':
      defaultIndex += items.getIn(['s1', 1]) === -1 ? 2 : 0
    case 's1':
      defaultIndex += items.getIn(['m2', 1]) === -1 ? 3 : 0
    case 'm2':
      defaultIndex += items.getIn(['m1', 1]) === -1 ? 3 : 0
    case 'm1':
      defaultIndex += items.getIn(['l', 1]) === -1 ? 4 : 0
    case 'l':
      defaultIndex += items.getIn(['xl', 1]) === -1 ? 5 : 0
    case 'xs1':
      defaultIndex += items.getIn(['s2', 1]) === -1 ? 2 : 0
    //*/
    default:
      defaultIndex += defaultIndex % 10 > 8 ? 1 : 0
      defaultIndex += defaultIndex % 10 < 1 ? 1 : 0
  }
  
  
  
  console.log('offset', defaultIndex % 10, 'type', type, 'items', items, 'size', size, 'defaultIndex', defaultIndex)
  return defaultIndex
}

class Setup extends Component {
  
  static contextTypes = {
    router: PropTypes.object
  }
  
  handleNewGame = event => {
    event.preventDefault()
    
    this.props.newGame(this.props.routeParams.versus, this.props.board)
  }
  
  handleJoinGame = event => {
    event.preventDefault()
    
    this.props.joinGame(this.props.routeParams.game, this.props.board)
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  componentDidMount() {
    const { friends, friendsTotal, fetchFriends } = this.props

    if(friends.size !== friendsTotal) {
      fetchFriends()
    }
    
    if(this.props.routeParams.game) {
      this.props.loadGame(this.props.routeParams.game)
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.friendsTotal !== this.props.friendsTotal) {
      nextProps.fetchFriends()
    }
    
    if(nextProps.gameId !== this.props.gameId && nextProps.gameId > 0 && nextProps.gameState === 'waiting') {
      this.context.router.push({ pathname: `/game/${nextProps.gameId}` })
    }
    if(nextProps.gameState === 'ready' && !this.props.routeParams.versus && nextProps.gameId > 0) {
      this.context.router.push({ pathname: `/game/${nextProps.gameId}` })
    }
  }
  
  render() {
    const {
      grid,
      items,
      addItem,
      moveItem,
      rotateItem,
      username,
      friends,
      routeParams,
      isValid,
      bots,
    } = this.props
    
    if(!friends) return <Loading />

    const versusId = routeParams.game ? this.props.versus : routeParams.versus
    const versus = friends.get(versusId) || bots.find(bot => bot.get('id') === versusId)
    
    if(!versus) return <Loading />
    
    const versusUsername = versus.get('username')
    const startGameButtonClassName = classNames(style.startGame, {
      [style.startGameDisabled]: !isValid
    })

    return <DocumentTitle title={`Epic | New Game vs ${versusUsername}`}>
      <section className={sectionClassName}>
        <header className={style.header}>
          <div className={style.headerLeft}>
            <Link to="/new" className={style.linkToPrevous}>❮ Back</Link>
          </div>
          <div className={style.headerCenter}>
            <h1 className={style.headerTitle}>
              You vs {versusUsername}
            </h1>
          </div>
          <div className={style.headerRight}>
            {routeParams.game && <button disabled={!isValid} onClick={this.handleJoinGame} className={startGameButtonClassName}>Join</button>}
            {routeParams.versus && <button disabled={!isValid} onClick={this.handleNewGame} className={startGameButtonClassName}>Start</button>}
          </div>
        </header>
        <div className={wrapperClassName}>
          <SetupCanvas addItem={addItem} moveItem={moveItem}>
            <Grid>
              {types.map(([type, size, component], index) => {
                return <Drag
                  key={type}
                  type={type}
                  index={items.getIn([type, 1])}
                  defaultIndex={getDefaultIndex(type, items, size)}
                  size={size}
                  rotateItem={rotateItem}
                  rotated={items.getIn([type, 0])}
              >
                {component}
              </Drag>})}
              <DragPreview name="item" />
            </Grid>
          </SetupCanvas>
        </div>
        <div></div>
      </section>
    </DocumentTitle>
  }
}

export default Setup