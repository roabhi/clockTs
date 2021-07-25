/*
=============================
IMPORT NEEDED RUNTIME
============================
*/

import 'regenerator-runtime/runtime';

/*
=============================
IMPORT DATA
============================
*/

import * as data from '../data/citymap.json';

/*
=============================
IMPORT LIBRARY
============================
*/

//import {DateTime} from 'luxon';

/*
=============================
IMPORT CLASSES
============================
*/

import {Clock} from './classes/clock';


/*
=============================
IMPORT MODULES
============================
*/

import {labels, search, results} from './globals'; //import const at global scope
import { getTime, getLuxonOffSet, scale, nToLeadingZero } from './utils';

/*
=============================
IMPORT STYLES
============================
*/

import '../scss/global.scss';

/**
 * 
 * 
 * LOGIC
 */

const onResultsClick = (e:Event) =>  {

    const _t = e.target as HTMLElement;

    
    console.log( getLuxonOffSet(_t.dataset.timezone) );

    let myClock = new Clock(getLuxonOffSet(_t.dataset.timezone));




},
onSearch = (e:Event) => {

    const _t = e.currentTarget as HTMLInputElement;

   

    if(_t.value.length > 2) {

        results.innerHTML = '';
        
        for(let i in data) {
            
            if( String(data[i].city).toLowerCase( )== String(_t.value).toLowerCase() ){
                results.innerHTML += `<li data-timezone="${data[i].timezone}">${data[i].city}, ${data[i].country}</li>`;
            }

           
        }

    }else {
        results.innerHTML = '';
    }

},
init = (e:Event):void => {
    
    labels.forEach(el => {         
        
        el.innerHTML = el.textContent
            .split('')
            .map((letter, i) =>  `<span style="transition-delay:${i * 30 }ms">${letter}</span>`)
            .join('')
    });


   
    
    document.removeEventListener('DOMContentLoaded', init, false);

    /**
     * 
     * Listen for keyups on search input
     */

    search.addEventListener('keyup', onSearch, false);

    /**
     * 
     * Listen for clicks on results ul
     */

    results.addEventListener('click', onResultsClick, false);


    /**
     * 
     * SET INTERVAL
     */

    getTime();

    setInterval(getTime, 1000);

    
    
}







document.addEventListener('DOMContentLoaded', init, false);