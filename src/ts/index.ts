/*
=============================
IMPORT NEEDED RUNTIME
============================
*/

import 'regenerator-runtime/runtime';

/*
=============================
IMPORT STYLES
============================
*/

import '../scss/styles.scss';








const init = (e:Event):void => {
    document.removeEventListener('DOMContentLoaded', init, false);
    console.log('working');
}







document.addEventListener('DOMContentLoaded', init, false);