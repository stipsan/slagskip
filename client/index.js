import 'babel-polyfill';
import './scss/index.scss';
import { render } from 'react-dom';
import App from './containers/App';

render(<App />, document.getElementById('app'));