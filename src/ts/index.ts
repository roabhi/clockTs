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
import {createMessage, getLuxonOffSet, toggleScrens, isAlreadyOnList, fetchData, isAlreadyOnPage } from './utils';

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

     //const now = DateTime.now().toUTC();
     // console.log(now.c, now.c.hour + ':' + now.c.minute + ':' + now.c.second); 

   if(clocksArr.length){

        clocksArr.forEach((el,i) => {

            //el.setClock(now.c.hour, now.c.minute, now.c.second);
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
        !info.classList.contains('show') ? info.classList.add('show') : info.classList.remove('show');
    }

},


onAddClocks = (e:Event):void => {

    console.log(e);

    toggleScrens();

},


onSubmit = (e:Event):void =>  {

    const _btn = e.target as HTMLButtonElement;

    e.preventDefault();

    toggleScrens();

    !clockIsRunning.init ? runClock() : null;

    //runClock();



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


    //console.log(clocksHolder.querySelectorAll('div.clock-ts-holder').length);

    let myClock = new Clock(myCityObj);    

    clocksArr.push(myClock);   

    console.log(clocksArr);


    localStorage.setItem('clockTsData', JSON.stringify(clocksArr));

    //console.log(clocksArr);

    const _message = createMessage(myCityObj.city, myCityObj.country, 'add');

    messages.appendChild(_message);

    removeFromDom(_message.parentNode, _message, 1500);


},


onSearch = (e:Event):void => {

    const _t = e.currentTarget as HTMLInputElement;   

    if(_t.value.length > 3) {

        results.innerHTML = '';

        //Call API

        // let result = fetchData(String(_t.value).toLowerCase())
        // .then(  
        //     (_d) => {       
          
        //     for(let i in _d)  {

      
        //         if( String(_d[i].city).toLowerCase() == String(_t.value).toLowerCase() ){

                    
        //             // !isAlreadyOnPage(String(_d[i].city), String(_d[i].country)) ? results.innerHTML += `<li data-timezone="${_d[i].timezone}">${_d[i].city}, ${_d[i].country}</li>` : null;
    
        //             // console.log(isAlreadyOnPage( String(_d[i].city), String(_d[i].country) ));
                
        //             //results.innerHTML += `<li data-timezone="${_d[i].timezone}">${_d[i].city}, ${_d[i].country}</li>`;

        //             if(!isAlreadyOnPage(String(_d[i].city), String(_d[i].country))) {

        //                 const li = `<li data-timezone="${_d[i].timezone}">${_d[i].city}, ${_d[i].country}</li>`;

        //                 if(!isAlreadyOnList(li)){
        //                     results.innerHTML += `<li data-timezone="${_d[i].timezone}">${_d[i].city}, ${_d[i].country}</li>`;
        //                 }

        //             }
          
            
        //         } 

        //     }                
                  


        // },(error) => {
        //     console.log('error');
        // });


        

        //DEV
        
        for(let i in data) {
            
            if( String(data[i].city).toLowerCase() == String(_t.value).toLowerCase() ){



                !isAlreadyOnPage(String(data[i].city), String(data[i].country)) ? results.innerHTML += `<li data-timezone="${data[i].timezone}">${data[i].city}, ${data[i].country}</li>` : null;

                // console.log(isAlready( String(data[i].city), String(data[i].country) ));

                // results.innerHTML += `<li data-timezone="${data[i].timezone}">${data[i].city}, ${data[i].country}</li>`;


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


    /**
     * 
     * 
     * Local Storage logic
     * 
     */

    


     if( typeof localStorage.clockTsData === 'undefined' ){
        console.log('Not clockTsData present');

        !formHolder.classList.contains('show') ? formHolder.classList.add('show'): null;


     }else {
         //console.log(JSON.parse(localStorage.clockTsData));

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
                position: _obj.position
            }
        
        
            let myClock = new Clock(myCityObj);
        
            clocksArr.push(myClock);

            console.log(clocksArr);

           

            
            
        });

        runClock();

        clockIsRunning.init = true;

        //Rearrange Objects?

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