import Pong from './pong';

require('./style.css');

window.pong = new Pong(document.getElementById('pong'));
window.pong.start();
