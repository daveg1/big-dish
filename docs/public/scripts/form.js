// Helper Function
Element.prototype.output = function(message){
    document.getElementById('form-output').innerHTML = message;
}

function handleForm(e){
    e.preventDefault();
    
    const form = new FormData(this);
    
    for(let field of form.entries()){
        if(!field[1]){
            return this.output('You haven\'t filled out your ' + field[0]);
        }
    }
    
    let message = `Hello, ${form.get('name').split(' ')[0]}, we'll notify you via email (${form.get('email')}) about your membership status as a <b>${form.get('role')}</b>.`;
    this.output(message);
}

window.addEventListener('DOMContentLoaded', function(){
    
    document.getElementById('role').addEventListener('change', function(){
        this.firstElementChild.disabled = true;
    }, false);
    
    document.getElementById('form-output').addEventListener('click', function(){
        this.innerHTML = '';
    }, false);
    
    document.getElementsByTagName('form')[0].addEventListener('submit', handleForm, false);
}, false);