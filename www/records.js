var React = require('react');
var ReactDOM = require('react-dom/client');
import { Boards } from './components/Boards.js'

const appElement = document.getElementById('app');
ReactDOM.createRoot(appElement).render(<Boards mode="records" sort="date" sort_order={1}/>);