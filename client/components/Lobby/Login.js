import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions'

const placeholderLabel = 'Username';
const buttonLabel = 'Enter';

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };
  
  state = {value: ''};

  handleChange = event => this.setState({value: event.target.value.trim()});

  handleSubmit = event => {
    if(this.state.value.length < 3) return;

    event.preventDefault();
    
    
    this.props.dispatch(login(this.state.value));
  };

  render(){
    const { handleSubmit, handleChange } = this;
    const { value } = this.state;
    return <section className="section section--login">
      <form onSubmit={handleSubmit}>
        <input placeholder={placeholderLabel} value={value} onChange={handleChange} minLength={3} required={true} autoFocus={true} />
        <button type="submit" onClick={handleSubmit}>{buttonLabel}</button>
      </form>
    </section>;
  }
};

export default connect()(Login);