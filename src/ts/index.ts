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

import {DateTime} from 'luxon';

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

import {labels, search, results, formHolder, clocksArr, submitBtn, clocksObjArr, clocksHolder} from './globals'; //import const at global scope
import {getLuxonOffSet, showClocks } from './utils';

/*
=============================
IMPORT STYLES
============================
*/

import '../scss/global.scss';




/**
 * 
 * MAIN
 * 
 * 
 */

 const getTime = ():void => {

     //const now = DateTime.now().toUTC();
     // console.log(now.c, now.c.hour + ':' + now.c.minute + ':' + now.c.second); 

   if(clocksArr.length){

        clocksArr.forEach((el,i) => {

            //el.setClock(now.c.hour, now.c.minute, now.c.second);
            el.getLocalTime();

        });   
   }

   if(clocksObjArr.length) {

        clocksObjArr.forEach((el,i) => {

            

            

        });

   }
   
   

},


runClock = ():void => {
    /**
     * 
     * SET INTERVAL
     */

     getTime();

     setInterval(getTime, 1000);
     
}



/**
 * 
 * 
 * LOGIC
 */

const onSubmit = (e:Event):void =>  {

    const _btn = e.target as HTMLButtonElement;

    e.preventDefault();

    showClocks();

    runClock();



},


onResultsClick = (e:Event):void =>  {

    const _t = e.target as HTMLElement;

    
    // console.log( getLuxonOffSet(_t.dataset.timezone) );

    //let myClock = new Clock(getLuxonOffSet(_t.dataset.timezone));

    // clocksArr.push(myClock);

    // console.log(clocksArr);

    let myCityObj: {
        city:string,
        country:string,
        iana:string,
        offset:number
    } = {
        city: _t.innerHTML.substr(0,_t.innerHTML.indexOf(',')),
        country: _t.innerHTML.substr(_t.innerHTML.lastIndexOf(',') + 2, _t.innerHTML.length),
        iana: _t.dataset.timezone,
        offset: getLuxonOffSet(_t.dataset.timezone)
    }


    let myClock = new Clock(myCityObj);

    clocksArr.push(myClock);
    clocksObjArr.push(myCityObj);

    



},


onSearch = (e:Event):void => {

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
// themeSwitcher = (e:Event):void => {
//     const html:Element = document.querySelector('html'),
//           target = e.target as HTMLElement; //Typescript specific to cast the event

//     if(html.classList.contains('dark')) {
//         html.classList.remove('dark');
//         target.innerHTML = 'Dark Mode';
//     }else {
//         html.classList.add('dark');
//         target.innerHTML = 'Light Mode';
//     }
// },


init = (e:Event):void => {
    
    
    !formHolder.classList.contains('show') ? formHolder.classList.add('show'): null;
    
    
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
     * Listen for clicks on submit btn
     */

     submitBtn.addEventListener('click', onSubmit, false);

     /**
      * 
      * 
      * Listen for clicks on the toggle
      */

     //toggle.addEventListener('click', themeSwitcher, false);

    
    //runClock();
    
    
}







document.addEventListener('DOMContentLoaded', init, false);