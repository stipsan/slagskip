import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import shallowCompare from 'react-addons-shallow-compare'
import Avatar from 'react-user-avatar'
import { shuffle } from 'lodash'

import cx from './style.scss'
import { Grid, SetupCanvas, Item } from '../Board'
import Navbar from '../Navbar'
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

const incDefaultIndex = (previousIndex, type, items, size) => {

  if(items.getIn([type, 1]) !== -1) {
    return [previousIndex, 0]
  }

  const nextIndex = previousIndex + size

  const previousRemainder = previousIndex % 10
  const nextRemainder = previousRemainder + size

  const nextRow = (Math.floor(previousIndex / 10) * 10) + 11
  const incrementedIndex = nextRemainder > 9 ?
    nextRow :
    previousIndex
  return [incrementedIndex, size]
  const sanitizedIndex = incrementedIndex + (
    incrementedIndex % 10 < 1 ?
    1 :
    incrementedIndex % 10 > 8 ? 
    2 :
    0
  )

  return sanitizedIndex
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
  
  componentWillMount() {
    this.types = shuffle(types)
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
    const startGameButtonClassName = cx('startGame', {
      startGameDisabled: !isValid
    })
    
    let defaultIndex = 111
    
    const navbarLeft = <Link to="/new" className={cx('linkToPrevous')}>
      ❮ <span className={cx('buttonLabel')}>Back</span>
    </Link>
    const navbarRight = routeParams.game ?
      <button
        disabled={!isValid}
        onClick={this.handleJoinGame}
        className={startGameButtonClassName}
      >
        Join
      </button> : 
      routeParams.versus ?
      <button
        disabled={!isValid}
        onClick={this.handleNewGame}
        className={startGameButtonClassName}
      >
        Start
      </button> :
      false

    return <DocumentTitle title={`Epic | New Game vs ${versusUsername}`}>
      <section className={cx('section')}>
        <Navbar left={navbarLeft} right={navbarRight}>
          <h1 className={cx('headerTitle')}>
            You vs {versusUsername}
          </h1>
        </Navbar>
        <div className={cx('wrapper')}>
          <SetupCanvas addItem={addItem} moveItem={moveItem}>
            <Grid>
              {this.types.map(([type, size, component], index) => {
                const [previousIndex, nextSize] = incDefaultIndex(defaultIndex, type, items, size)
                defaultIndex = previousIndex + nextSize
                return <Drag
                  key={type}
                  type={type}
                  index={items.getIn([type, 1])}
                  defaultIndex={previousIndex}
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