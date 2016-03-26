import { Component, PropTypes } from 'react'

class Game extends Component {
  static propTypes = {
    
  };
  
  render(){
    console.log(this.props)
    return <section className="section section--game">
      Loading game…
    </section>
  }
}

export default Game