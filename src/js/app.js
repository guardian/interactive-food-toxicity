console.log('app loaded');

// JS file that is loaded asynchronously
import shop from './modules/shop.js';
import scroll from './modules/scroll.js';

function defer() {
    if (window.$) {
        shop.init();
        scroll.init();
    } else {
        setTimeout(function() { defer() }, 50);
    }
}

defer();
