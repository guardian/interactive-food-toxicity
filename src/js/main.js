// Javascript that is inline. Should be used for anything that needs to be immediate
import jquery from 'jquery';
window.$ = jquery;

import share from './modules/share.js';
import shop from './modules/shop.js';
import scroll from './modules/scroll.js';

share.init();
shop.init();
scroll.init();
