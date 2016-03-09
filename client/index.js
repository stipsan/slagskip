import 'babel-polyfill';
import './style.css';
import { render } from 'react-dom';
import App from './components/App';

render(<App />, document.getElementById('app'));