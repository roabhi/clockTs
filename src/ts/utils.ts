/**
 * 
 * 
 * UTILS
 */


import {DateTime} from 'luxon';
import { formHolder, clocksHolder } from './globals';


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
showClocks = ():void => {
    !clocksHolder.classList.contains('show') ? clocksHolder.classList.add('show') : null;
    formHolder.classList.contains('show') ? formHolder.classList.remove('show') : null;
}