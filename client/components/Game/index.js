import { Component, PropTypes } from 'react';

class Game extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  };
  
  componentWillReceiveProps(nextProps) {
    
  }
  
  render(){
    return <section className="section section--game">
      Loading game…
    </section>;
  }
};

export default Game;