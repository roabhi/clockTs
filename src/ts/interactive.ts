import { clocksHolder } from "./globals";


export const dragStart = (e:Event):void => {
    console.log('drag start');

    const myDomClock = e.currentTarget as Element;

    myDomClock.classList.add('define');

    Array.from(clocksHolder.querySelectorAll('div.clock-ts-holder:not(.define)')).map((_obj) => {
        _obj.addEventListener('dragenter', dragEnter, false);
        _obj.addEventListener('dragleave', dragLeave, false);
        _obj.addEventListener('dragover', dragOver, false);
        
    });


},


dragEnd = (e:Event):void => {
    console.log('drag end');


    const myDomClock = e.currentTarget as Element;

    Array.from(clocksHolder.querySelectorAll('div.clock-ts-holder')).map((_obj) => {
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
    
    const myHolder = document.querySelector('div.clocks-holder'),
          target = e.currentTarget as HTMLDivElement, //The hovered clock?
          myDragged:HTMLDivElement = document.querySelector('div.clocks-holder div.clock-ts-holder.define'),//The element currently dragging
          afterNode2 = target.nextElementSibling;

        if (myDragged === afterNode2) {
            myHolder.insertBefore(myDragged, target);
        }else{
            myDragged.replaceWith(target);
            myHolder.insertBefore(myDragged, afterNode2);
        }   
}