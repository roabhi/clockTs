/**
 * 
 * 
 * UTILS
 */


import {DateTime} from 'luxon';
import { formHolder, search, results, clocksHolder, clocksArr } from './globals';


export const getLuxonOffSet = (_tz:string):number => {

    let _lx = DateTime.fromObject( {}, {zone: _tz} );
    return (_lx.o / 60);    

},
scale = (num:number, in_min:number, in_max:number, out_min:number, out_max:number):number => {

    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
},  
nToLeadingZero = (num:number):string => {

    return num < 10 ? '0'+num : num.toString();
},
showForm = ():void => {
    clocksHolder.classList.contains('show') ? clocksHolder.classList.remove('show') : null;
    !formHolder.classList.contains('show') ? formHolder.classList.add('show') : null;
},
toggleScrens = ():void => {
    !clocksHolder.classList.contains('show') ? clocksHolder.classList.add('show') : clocksHolder.classList.remove('show');
    formHolder.classList.contains('show') ? formHolder.classList.remove('show') : formHolder.classList.add('show');

    const myTempInput = search as HTMLInputElement;

    while(results.lastChild) results.removeChild(results.lastChild); 

    myTempInput.value = '';

    
},
createMessage = (city:string, country:string):HTMLElement => {
    const _m = document.createElement('p');
    _m.className = 'message';
    _m.innerHTML = `Added ${city}, ${country}`;

    return _m;

    
},
isAlready = (_city:string, _country:string):boolean => {
    
    let answer:boolean = false;
    
    if(clocksArr.length){

        for(let _x in clocksArr) {
            
            console.log(_city.toLowerCase(), clocksArr[_x].city.toLowerCase());
            console.log(_country.toLowerCase(), clocksArr[_x].country.toLowerCase());
            
            if(_city.toLocaleLowerCase() == clocksArr[_x].city.toLocaleLowerCase()){

                if(_country.toLowerCase() == clocksArr[_x].country.toLowerCase()) {
                    answer = true;
                }

            }

        }

    }
    
    return answer;

    
    
}