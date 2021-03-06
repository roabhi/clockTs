import { nToLeadingZero, scale } from "../utils";
import * as interactive from '../interactive';
import {DateTime} from 'luxon';


export class Clock {

    clockHolder:HTMLElement;
    clockShape:HTMLElement;
    clockRemove:HTMLElement;
    city:string;
    country:string;
    iana:string;
    offset:number;
    container:HTMLElement;
    clockLabel:HTMLHeadingElement;
    clock:HTMLElement;
    markerTwelve:HTMLElement;
    markerSix:HTMLElement;
    markerThree:HTMLElement;
    markerNine:HTMLElement;
    hourEl:HTMLElement;
    minuteEl:HTMLElement;
    secondEl:HTMLElement;
    centerPoint:HTMLElement;
    timeEl:HTMLElement;
    dateEl:HTMLElement;
    days:string[];
    months:string[];
    _position:number;

    constructor (_o:{city:string, country:string, iana:string, offset:number, position:number}) {
        

        //console.log(_o);

        this.city = _o.city;
        this.country = _o.country;
        this.iana = _o.iana;
        this.offset = _o.offset;
        
        this.clockHolder = document.getElementById('clocks-holder');
        
        this.container = document.createElement('div');

        //Create HTMLNodes
        this.clockLabel = document.createElement('h4');
        this.clockRemove = document.createElement('div');
        this.clockShape = document.createElement('div');
        this.clock = document.createElement('div');

        this.markerTwelve = document.createElement('div');
        this.markerSix = document.createElement('div');
        this.markerThree = document.createElement('div');
        this.markerNine = document.createElement('div');

        this.hourEl = document.createElement('div');
        this.minuteEl = document.createElement('div');
        this.secondEl = document.createElement('div');
        this.centerPoint = document.createElement('div');
        this.timeEl = document.createElement('div');
        this.dateEl = document.createElement('div');
        
        this.container.className = 'clock-ts-holder';
        this.clockLabel.className = 'clock-label';
        this.clock.className = 'clock';

        this.clockShape.className = 'clock-shape';
        this.clockRemove.className = 'clock-remove';
        this.markerTwelve.className = 'marker twelve';
        this.markerSix.className = 'marker six';
        this.markerThree.className = 'marker three';
        this.markerNine.className = 'marker nine';

        this.clockRemove.innerHTML = '-';


        this.hourEl.className = 'needle hour';
        this.minuteEl.className = 'needle minute';
        this.secondEl.className = 'needle second';
        this.centerPoint.className = 'center-point';
        this.timeEl.className = 'time';
        this.dateEl.className = 'date';

        this.clockLabel.innerHTML = `${_o.city}, ${_o.country}`;

        
        this.clock.appendChild(this.markerTwelve);
        this.clock.appendChild(this.markerSix);
        this.clock.appendChild(this.markerThree);
        this.clock.appendChild(this.markerNine);
        this.clock.appendChild(this.hourEl);
        this.clock.appendChild(this.minuteEl);
        this.clock.appendChild(this.secondEl);
        this.clock.appendChild(this.centerPoint);

        

        this.clockShape.appendChild(this.clock);

        this.container.appendChild(this.clockLabel);
        this.container.appendChild(this.clockRemove);
        this.container.appendChild(this.clockShape);
        this.container.appendChild(this.timeEl);
        this.container.appendChild(this.dateEl);

        

        
        this._position = _o.position;

        /**
         * 
         * ADD interacive
         */

        
        this.clockShape.addEventListener('click', interactive.clockRemove, false);

        this.container.setAttribute('draggable', 'true'); //Make draggable
        this.container.setAttribute('data-position', _o.position.toString());
        this.container.addEventListener('dragstart', interactive.dragStart, false);
        this.container.addEventListener('dragend', interactive.dragEnd, false);
        this.container.addEventListener('drop', interactive.dragDrop, false);
        

 
        this.clockHolder.insertBefore(this.container, document.getElementById('add-clock'));
    }


   

    setClock(_h:number, _m:number, _s:number):void {
        this.hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(_h, 0, 12, 0, 360)}deg)`;
        this.minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(_m, 0, 60, 0, 360)}deg)`;
        this.secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(_s, 0, 60, 0, 360)}deg)`;
        this.timeEl.innerHTML = `${nToLeadingZero(_h)}:${nToLeadingZero(_m)}:${nToLeadingZero(_s)}`;
    }

    getLocalTime():void {        

        let myLocalTime = DateTime.fromObject({}, {zone: this.iana})
        this.setClock(myLocalTime.hour, myLocalTime.minute, myLocalTime.second);
        
    }

    set position(_i:number) {
        this._position = _i;
    }

    get position():number {
        return this._position;
    }
}