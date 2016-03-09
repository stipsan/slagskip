import 'babel-polyfill';
import './scss/index.scss';
import { render } from 'react-dom';
import App from './components/App';

render(<App />, document.getElementById('app'));