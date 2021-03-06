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

import {labels, search, results, formHolder, heading, info, clocksArr, submitBtn, addClocksBtn, messages, clocksHolder, clockIsRunning} from './globals'; //import const at global scope
import {createMessage, getLuxonOffSet, toggleScrens, isAlreadyOnList, fetchData, isAlreadyOnPage, orderClocks } from './utils';

/*
=============================
IMPORT STYLES
============================
*/

import '../scss/global.scss';
import { removeFromDom } from './interactive';




/**
 * 
 * MAIN
 * 
 * 
 */

 const getTime = ():void => {

   if(clocksArr.length){

        clocksArr.forEach((el,i) => {

            el.getLocalTime();

        });   
   }     

},


runClock = ():void => {

     getTime();
     setInterval(getTime, 1000);
     
}



/**
 * 
 * 
 * LOGIC
 */

const onHeadingClick = (e:Event):void => {

    const _t = e.target as Element;

    if(_t.classList.contains('info-toggler')) {
        !document.body.classList.contains('showing-info') ? document.body.classList.add('showing-info') : document.body.classList.remove('showing-info');
    }

},


onAddClocks = (e:Event):void => {

    toggleScrens();

},


onSubmit = (e:Event):void =>  {

    const _btn = e.target as HTMLButtonElement;

    e.preventDefault();

    toggleScrens();

    !clockIsRunning.init ? runClock() : null;

},


onResultsClick = (e:Event):void =>  {

    const _t = e.target as HTMLElement;

    _t.classList.add('selected');

    let myCityObj: {
        city:string,
        country:string,
        iana:string,
        offset:number,
        position:number
    } = {
        city: _t.innerHTML.substr(0,_t.innerHTML.indexOf(',')),
        country: _t.innerHTML.substr(_t.innerHTML.lastIndexOf(',') + 2, _t.innerHTML.length),
        iana: _t.dataset.timezone,
        offset: getLuxonOffSet(_t.dataset.timezone),
        position: clocksHolder.querySelectorAll('div.clock-ts-holder').length
    }


    let myClock = new Clock(myCityObj);    

    clocksArr.push(myClock);   

    localStorage.setItem('clockTsData', JSON.stringify(clocksArr));

    const _message = createMessage(myCityObj.city, myCityObj.country, 'add');

    messages.appendChild(_message);

    removeFromDom(_message.parentNode, _message, 1500);


},


onSearch = (e:Event):void => {

    const _t = e.currentTarget as HTMLInputElement,
          _f = _t.parentNode as Element;

    if(_t.value.length > 3) {

        

        results.innerHTML = '';


        //Call API

        //_f.classList.add('loading');

        // let result = fetchData(String(_t.value).toLowerCase())
        // .then(  
        //     (_d) => {       
          
        //     for(let i in _d)  {

      
        //         if( String(_d[i].city).toLowerCase() == String(_t.value).toLowerCase() ){                    
                    

        //             if(!isAlreadyOnPage(String(_d[i].city), String(_d[i].country))) {

        //                 const li = `<li data-timezone="${_d[i].timezone}">${_d[i].city}, ${_d[i].country}</li>`;

        //                 if(!isAlreadyOnList(li)){
        //                     results.innerHTML += `<li data-timezone="${_d[i].timezone}">${_d[i].city}, ${_d[i].country}</li>`;
        //                 }

        //             }
          
            
        //         } 

        //     }                
                  
        //     _f.classList.remove('loading');

        // },(error) => {
        //     console.log('error');
        // });


        

        //DEV
        
        for(let i in data) {
            
            if( String(data[i].city).toLowerCase() == String(_t.value).toLowerCase() ){

                !isAlreadyOnPage(String(data[i].city), String(data[i].country)) ? results.innerHTML += `<li data-timezone="${data[i].timezone}">${data[i].city}, ${data[i].country}</li>` : null;

            }

           
        }

       

    }else {
        results.innerHTML = '';
    }


    /**
     * 
     * Interactive
     */

    

},

init = (e:Event):void => {


    /**
     * 
     * 
     * Local Storage logic
     * 
     */

 
     if( typeof localStorage.clockTsData === 'undefined'){

        !formHolder.classList.contains('show') ? formHolder.classList.add('show'): null;
    
     }else if(JSON.parse(localStorage.clockTsData).length == 0){

        !formHolder.classList.contains('show') ? formHolder.classList.add('show'): null;

     }else {

         const _data = JSON.parse(localStorage.clockTsData);

        _data.map((_obj) => {

            let myCityObj: {
                city:string,
                country:string,
                iana:string,
                offset:number,
                position:number
            } = {
                city: _obj.city,
                country: _obj.country,
                iana: _obj.iana,
                offset: _obj.offset,
                position: _obj._position
            }
        
        
            let myClock = new Clock(myCityObj);
        
            clocksArr.push(myClock);
            
            
        });

        orderClocks();

        runClock();

        clockIsRunning.init = true;

        !clocksHolder.classList.contains('show') ? clocksHolder.classList.add('show') : null;

     }
    
    
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
      * Listen for clicks on the + button from clocks panel to goback to form
      * 
      */

     addClocksBtn.addEventListener('click', onAddClocks, false);

       /**
      * 
      * Listen for clicks on the i button to show info
      * 
      */

     heading.addEventListener('click', onHeadingClick, false);



     /**
      * 
      * 
      * Listen for clicks on the toggle
      */

     //toggle.addEventListener('click', themeSwitcher, false);

    
    //runClock();
    
    
}







document.addEventListener('DOMContentLoaded', init, false);