import { Clock } from "./classes/clock";

export const toggle:Element = document.querySelector('.toggle'),
             formHolder:Element = document.getElementById('form-holder'),
             clocksHolder:Element = document.getElementById('clocks-holder'),
             labels:Element[] = Array.from(document.querySelectorAll('.form-control label')),
             search:Element = document.getElementById('search'),
             submitBtn:Element = document.getElementById('submit'),
             results:Element = document.getElementById('results'),
             messages:Element = document.getElementById('messages'),
             clocksArr:Clock[] = [],
             clocksObjArr:Object[] = [];



