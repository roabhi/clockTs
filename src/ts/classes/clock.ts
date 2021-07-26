import { nToLeadingZero, scale } from "../utils";
import {DateTime} from 'luxon';


export class Clock {

    clockHolder:HTMLElement;
    city:string;
    country:string;
    iana:string;
    offset:number;
    container:HTMLElement;
    clockLabel:HTMLHeadingElement;
    clock:HTMLElement;
    hourEl:HTMLElement;
    minuteEl:HTMLElement;
    secondEl:HTMLElement;
    centerPoint:HTMLElement;
    timeEl:HTMLElement;
    dateEl:HTMLElement;
    days:string[];
    months:string[];

    constructor (_o:{city:string, country:string, iana:string, offset:number}) {
        

        console.log(_o);

        this.city = _o.city;
        this.country = _o.country;
        this.iana = _o.iana;
        this.offset = _o.offset;
        
        this.clockHolder = document.getElementById('clocks-holder');
        
        this.container = document.createElement('div');

        //Create HTMLNodes
        this.clockLabel = document.createElement('h4');
        this.clock = document.createElement('div');
        this.hourEl = document.createElement('div');
        this.minuteEl = document.createElement('div');
        this.secondEl = document.createElement('div');
        this.centerPoint = document.createElement('div');
        this.timeEl = document.createElement('div');
        this.dateEl = document.createElement('div');
        
        this.container.className = 'clock-ts-holder';
        this.clockLabel.className = 'clock-label';
        this.clock.className = 'clock';
        this.hourEl.className = 'needle hour';
        this.minuteEl.className = 'needle minute';
        this.secondEl.className = 'needle second';
        this.centerPoint.className = 'center-point';
        this.timeEl.className = 'time';
        this.dateEl.className = 'date';

        this.clockLabel.innerHTML = `${_o.city}, ${_o.country}`;

        this.clock.appendChild(this.hourEl);
        this.clock.appendChild(this.minuteEl);
        this.clock.appendChild(this.secondEl);
        this.clock.appendChild(this.centerPoint);

        this.container.appendChild(this.clockLabel);
        this.container.appendChild(this.clock);
        this.container.appendChild(this.timeEl);
        this.container.appendChild(this.dateEl);

        

        this.clockHolder.appendChild(this.container);
    }


   

    setClock(_h:number, _m:number, _s:number):void {
        //console.log(`${nToLeadingZero(_h + this.offset)} : ${nToLeadingZero(_m)} : ${nToLeadingZero(_s)}`);

        this.hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(_h, 0, 12, 0, 360)}deg)`;
        this.minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(_m, 0, 60, 0, 360)}deg)`;
        this.secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(_s, 0, 60, 0, 360)}deg)`;

        this.timeEl.innerHTML = `${nToLeadingZero(_h)}:${nToLeadingZero(_m)}:${nToLeadingZero(_s)}`;
        //dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;

    }

    getLocalTime():void {
        

        let myLocalTime = DateTime.fromObject({}, {zone: this.iana})

        console.log(myLocalTime);

        this.setClock(myLocalTime.hour, myLocalTime.minute, myLocalTime.second);

    }
}