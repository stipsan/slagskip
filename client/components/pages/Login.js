import { Component, PropTypes } from 'react';

const placeholderLabel = 'Username';
const buttonLabel = 'Enter';

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };
  
  state = {value: ''};

  handleChange = event => this.setState({value: event.target.value.trim()});

  handleSubmit = event => {
    event.preventDefault();
    
    this.props.handleSubmit(this.state.value);
  };

  render(){
    const { handleSubmit, handleChange } = this;
    const { value } = this.state;
    return <section className="section section--login">
      <form onSubmit={handleSubmit}>
        <input placeholder={placeholderLabel} value={value} onChange={handleChange} minLength={4} required={true} />
        <button type="submit" onClick={handleSubmit}>{buttonLabel}</button>
      </form>
    </section>;
  }
};

export default Login;