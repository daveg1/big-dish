var recipes,
    labels,
    filters = [];

// Run only when the page (DOM) is fully loaded and parsed.
window.addEventListener('DOMContentLoaded', function(){
    // Each recipe card.
    recipes = document.getElementsByClassName('recipe');
    
    // Tag filters (i.e., vegan-friendly food, meaty foods, and so on).
    labels = document.getElementById('show').children;
    sort = document.getElementById('sort');
    
    // Set event handlers.
    for(let label of labels){
        label.addEventListener('change', tags, false);
    }
    
    sort.addEventListener('change', sortBy, false);
    
}, false);

function reset(elements){
    for(let i = 0; i < elements.length; ++i){
        elements[i].parentElement.classList.remove('hidden');
    }
}

// Filter the grid items,
// based on the options selected.
function filter(elements, tokens){
    if(!tokens.length){
        return;
    }
    
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

// The filter option labels.
function tags(){
    // Remove the active state on the previous label,
    // then set the newly clicked label to be active.
    if(!this.classList.contains('active')){
        this.classList.add('active');
    } else {
        this.classList.remove('active');
    }
    
    // Get the token from the option.
    const token = this.getAttribute('for');
    
    // If the option has been clicked,
    // insert it into the filter list.
    if(this.firstElementChild.checked){
        filters.push(token);
        
    // Otherwise, if the checkbox was unchecked,
    // remove it from the list.
    } else {
        filters.splice(filters.indexOf(token), 1);
    }
    
    // If there are filters in the filter list,
    // perform a filtration.
    if(filters.length > 0){
        filter(recipes, filters);
    
    // Otherwise, reset it.
    } else {
        reset(recipes);
    }
}

// A nice way to access functions dynamically,
// based on the <select>'s value.
const sortFunctions = {
    aToZ: (a, b) => {
        return a.children[1].innerText.localeCompare(b.children[1].innerText);
    },
    zToA: (a, b) => {
        return b.children[1].innerText.localeCompare(a.children[1].innerText);
    },
    longest: (a,b) => {
        return b.dataset.time - a.dataset.time;
    },
    shortest: (a,b) => {
        return a.dataset.time - b.dataset.time;
    }
}

// The <select>'s event handler.
function sortBy(){
    // Convert node list to array.
    const sorted = [...recipes];
    
    // Perform the necessary sort,
    // based on the <select>'s value.
    sorted.sort(sortFunctions[this.value]);
    
    // Empty the grid.
    document.getElementById('recipe-grid').innerHTML = '';
    
    // For each sorted node,
    // create a new grid item,
    // then insert the recipe.
    for(let node of sorted){
        let item = document.createElement('div');
        item.className = 'item';
        
        item.appendChild(node);
        document.getElementById('recipe-grid').appendChild(item);
    }
    
    // Refresh the recipes list.
    recipes = document.getElementsByClassName('recipe');
    
    // Re-apply the selected filter, if any.
    filter(recipes, filters);
}