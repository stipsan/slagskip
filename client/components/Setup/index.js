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
import { Grid, SetupCanvas, Item as ItemTest } from '../Board'
import Cell from './Cell'
import Item from './Item'
import ItemPreview from './ItemPreview'
import Loading from '../Loading'

console.log(ItemTest)

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
          <SetupCanvas>
            <Grid>
              <ItemTest.XL rotated={items.getIn(['xl', 0])} index={items.getIn(['xl', 1])} />
              <ItemTest.L rotated={items.getIn(['l', 0])} index={items.getIn(['l', 1])} />
              <ItemTest.M1 rotated={items.getIn(['m1', 0])} index={items.getIn(['m1', 1])} />
              <ItemTest.M2 rotated={items.getIn(['m2', 0])} index={items.getIn(['m2', 1])} />
              <ItemTest.S1 rotated={items.getIn(['s1', 0])} index={items.getIn(['s1', 1])} />
              <ItemTest.S2 rotated={items.getIn(['s2', 0])} index={items.getIn(['s2', 1])} />
              <ItemTest.XS1 rotated={items.getIn(['xs1', 0])} index={items.getIn(['xs1', 1])} />
              <ItemTest.XS2 rotated={items.getIn(['xs2', 0])} index={items.getIn(['xs2', 1])} />
              {JSON.stringify(items.toJS())}
              {items.filter(item => item.get(1) === -1).map((item, type) => <Item
                key={type}
                type={type}
                coordinates={item}
                addItem={addItem}
              />)}
              <ItemPreview name="item" />
            </Grid>
          </SetupCanvas>
        </div>
        <div></div>
      </section>
    </DocumentTitle>
  }
}

export default Setup