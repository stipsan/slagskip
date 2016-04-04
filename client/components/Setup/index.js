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
              <Drag
                type="xl"
                index={items.getIn(['xl', 1])}
                defaultIndex={120}
                size={5}
                rotateItem={rotateItem}
                rotated={items.getIn(['xl', 0])}
              >
                <XL
                  rotated={items.getIn(['xl', 0])}
                />
              </Drag>
              <Drag
                type="l"
                index={items.getIn(['l', 1])}
                defaultIndex={126}
                size={4}
                rotateItem={rotateItem}
                rotated={items.getIn(['l', 0])}
              >
                <L
                  rotated={items.getIn(['l', 0])}
                />
              </Drag>
              <Drag
                type="m1"
                index={items.getIn(['m1', 1])}
                defaultIndex={115}
                size={3}
                rotateItem={rotateItem}
                rotated={items.getIn(['m1', 0])}
              >
                <M
                  rotated={items.getIn(['m1', 0])}
                />
              </Drag>
              <Drag
                type="m2"
                index={items.getIn(['m2', 1])}
                defaultIndex={115}
                size={3}
                rotateItem={rotateItem}
                rotated={items.getIn(['m2', 0])}
              >
                <M
                  rotated={items.getIn(['m2', 0])}
                />
              </Drag>
              <Drag
                type="s1"
                index={items.getIn(['s1', 1])}
                defaultIndex={112}
                size={2}
                rotateItem={rotateItem}
                rotated={items.getIn(['s1', 0])}
              >
                <S
                  rotated={items.getIn(['s1', 0])}
                />
              </Drag>
              <Drag
                type="s2"
                index={items.getIn(['s2', 1])}
                defaultIndex={112}
                size={2}
                rotateItem={rotateItem}
                rotated={items.getIn(['s2', 0])}
              >
                <S
                  rotated={items.getIn(['s2', 0])}
                />
              </Drag>
              <Drag
                type="xs1"
                index={items.getIn(['xs1', 1])}
                defaultIndex={110}
                rotateItem={rotateItem}
                rotated={items.getIn(['xs1', 0])}
              >
                <XS
                  rotated={items.getIn(['xs1', 0])}
                />
              </Drag>
              <Drag
                type="xs2"
                index={items.getIn(['xs2', 1])}
                defaultIndex={110}
                rotateItem={rotateItem}
                rotated={items.getIn(['xs2', 0])}
              >
                <XS
                  rotated={items.getIn(['xs2', 0])}
                />
              </Drag>
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