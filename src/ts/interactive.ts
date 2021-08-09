import { clocksHolder } from "./globals";


export const dragStart = (e:Event):void => {
    console.log('drag start');

    const myDomClock = e.currentTarget as Element;

    myDomClock.addEventListener('drop', dragDrop, false);

},


dragEnd = (e:Event):void => {
    console.log('drag end');


    const myDomClock = e.currentTarget as Element;

    // Array.from(clocksHolder.querySelectorAll('div.clock-ts-holder:not(.define)')).map((_obj) => {
    //     //_obj.addEventListener('dragenter', dragEnter, false);
    //     _obj.removeEventListener('dragleave', dragLeave, false);
    //     _obj.removeEventListener('dragover', dragOver, false);
        
    // });

    // myDomClock.removeEventListener('dragstart', dragStart, false);
    // myDomClock.removeEventListener('dragend', dragEnd, false);
    //myDomClock.removeEventListener('drop', dragDrop, false);

    myDomClock.removeAttribute('draggable');
    myDomClock.classList.remove('define');


},

dragOver = (e:Event):void => {
    
    console.log('drag over');

    // const myDomClock = e.currentTarget as Element;

    // myDomClock.classList.add('hovered');

    // console.log(myDomClock)

    e.preventDefault();
},
dragEnter = (e:Event):void => {
    console.log('drag enter');
    
    const myDomClock = e.currentTarget as Element;

    myDomClock.classList.add('hovered');

    e.preventDefault();

    // console.log(myDomClock)
},

dragLeave = (e:Event):void => {
    console.log('drag leave');

    const myDomClock = e.currentTarget as Element;

    myDomClock.classList.remove('hovered');
    
},

dragDrop = (e:Event):void => {
    
    const myDomClock = e.currentTarget as Element;

    console.log('drag drop', myDomClock);

    
},

mouseDown = (e:Event):void => {
    
    const myDomClock = e.currentTarget as Element;

    
    myDomClock.classList.add('define');
    myDomClock.setAttribute('draggable', 'true');

    Array.from(clocksHolder.querySelectorAll('div.clock-ts-holder:not(.define)')).map((_obj) => {
        _obj.addEventListener('dragenter', dragEnter, false);
        _obj.addEventListener('dragleave', dragLeave, false);
        _obj.addEventListener('dragover', dragOver, false);
        
    });

    

    myDomClock.addEventListener('dragstart', dragStart, false);
    myDomClock.addEventListener('dragend', dragEnd, false);
    



},
mouseUp = (e:Event):void => {
    const myDomClock = e.currentTarget as Element;

    myDomClock.classList.contains('define') ? myDomClock.classList.remove('define') : null;
}