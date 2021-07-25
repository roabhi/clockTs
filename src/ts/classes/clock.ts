export class Clock {

    offset:number;
    template:string;

    constructor (_offset:number) {
        this.offset = _offset;
        this.template = `<h1>00:00:00<h1>`;
        this.appendToBody();
    }


    appendToBody(){
        document.body.innerHTML += this.template;
    }

    printOffset(){
        console.log(this.offset);
    }
}