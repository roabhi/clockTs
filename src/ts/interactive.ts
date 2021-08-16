import { Clock } from "./classes/clock";
import { clocksHolder, clocksArr, messages } from "./globals";
import { createMessage, isAlreadyOnPage } from "./utils";


export const dragStart = (e:Event):void => {
    console.log('drag start');

    const myDomClock = e.currentTarget as Element;

    myDomClock.classList.add('define');

    Array.from(clocksHolder.querySelectorAll('div.clock-ts-holder:not(.define)')).map((_obj:Element) => {
        _obj.addEventListener('dragenter', dragEnter, false);
        _obj.addEventListener('dragleave', dragLeave, false);
        _obj.addEventListener('dragover', dragOver, false);
        
    });


},


dragEnd = (e:Event):void => {
    console.log('drag end');


    const myDomClock = e.currentTarget as Element;

    Array.from(clocksHolder.querySelectorAll('div.clock-ts-holder')).map((_obj:Element) => {
        _obj.removeEventListener('dragenter', dragEnter, false);
        _obj.removeEventListener('dragleave', dragLeave, false);
        _obj.removeEventListener('dragover', dragOver, false);
        _obj.classList.remove('hovered');
        _obj.classList.remove('define');
        
    });



},

dragOver = (e:Event):void => {
    
    console.log('drag over');

    const myDomClock = e.currentTarget as Element;

    myDomClock.classList.add('hovered');

    e.preventDefault();
},
dragEnter = (e:Event):void => {

    e.preventDefault();

},

dragLeave = (e:Event):void => {

    const myDomClock = e.currentTarget as Element;

    myDomClock.classList.remove('hovered');
    
},

dragDrop = (e:Event):void => {
    
    const myHolder:HTMLDivElement = document.querySelector('div.clocks-holder'),
          target = e.currentTarget as HTMLDivElement, //The hovered clock?
          myDragged:HTMLDivElement = document.querySelector('div.clocks-holder div.clock-ts-holder.define'),//The element currently dragging
          afterNode2:Element = target.nextElementSibling;

        if (myDragged === afterNode2) {
            myHolder.insertBefore(myDragged, target);
        }else{
            myDragged.replaceWith(target);
            myHolder.insertBefore(myDragged, afterNode2);
        }   
},
clockRemove = (e:Event):void => {
    const _el = e.currentTarget as Element,
          _country:string = _el.parentNode.querySelector('h4').textContent.substr( _el.parentNode.querySelector('h4').textContent.indexOf(',')+ 1).trim(),
          _city:string = _el.parentNode.querySelector('h4').textContent.substr( 0, _el.parentNode.querySelector('h4').textContent.indexOf(',')),
          _message = createMessage(_city,_country,'remove');

    // console.log(`the clock about to remove is city ${_city}, and country ${_country}`);

   

   let index:number;
    
    clocksArr.forEach((_el:Clock, _i:number) => {

       
        if(clocksArr[_i].country == _country && clocksArr[_i].city == _city) {
            index = _i;
        }
        
          
    });

    removeFromDom(clocksHolder, _el.parentNode as Element, 0);

    clocksArr.splice(index,1);

    localStorage.setItem('clockTsData', JSON.stringify(clocksArr));

    // console.log(JSON.parse(localStorage.clockTsData), clocksArr);    

    messages.appendChild(_message);

    removeFromDom(_message.parentNode, _message, 1500);


},
removeFromDom = (_parent:Node, _el:Element, _delay:number):void => {

    setTimeout( () => {
        _parent.removeChild(_el);
    }, _delay);

}