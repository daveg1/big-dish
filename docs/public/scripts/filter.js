window.addEventListener('DOMContentLoaded', function(){
    var recipes = document.getElementsByClassName('recipe');
    var labels = document.getElementById('show').children;
    var filters = [];
    
    for(let i = 0; i < labels.length; ++i){
        labels[i].onchange = function(){
            if(!this.classList.contains('active')){
                this.classList.add('active')
            } else {
                this.classList.remove('active')
            }
            
            const token = this.getAttribute('for');
            
            if(this.firstElementChild.checked){
                filters.push(token);
            } else {
                filters.splice(filters.indexOf(token), 1);
            }
            
            if(filters.length > 0){
                filter(recipes, filters);
            } else {
                reset(recipes);
            }
        }
    }
}, false);

function reset(elements){
    for(let i = 0; i < elements.length; ++i){
        elements[i].parentElement.classList.remove('hidden');
    }
}

function filter(elements, tokens){
    for(let i = 0; i < elements.length; ++i){
        if(tokens.indexOf(elements[i].dataset.meal) > -1){
            elements[i].parentElement.classList.remove('hidden');
        } else {
            if(!elements[i].parentElement.classList.contains('hidden')){
                elements[i].parentElement.classList.add('hidden');
            }
        }
    }
}