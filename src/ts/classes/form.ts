export class Form {

    
    
    constructor () {

        const myBody:HTMLElement = document.body;

        const myHTML:string = `
        <div class="container-form">
        <h3>New Clock</h3>
            <div class="form-control">
                <input type="text" required>
                <label>Enter a City</label>
            </div>
            <div class="form-control">
                <input type="text" required>
                <label>Assign a Label</label>
            </div>
            <button class="btn">Ok</button>        
        </div>        
        `;

    }

}