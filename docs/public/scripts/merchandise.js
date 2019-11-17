var colour;
const path = "../public/assets/merch/?/?.png";

window.addEventListener('DOMContentLoaded', function(){
    
    // Grab the colour buttons.
    colours  = document.getElementsByClassName('colour');
    
    // Set event handlers.
    for(let clr of colours){
        clr.addEventListener('mouseover', switchColour, false);
    }
    
}, false);

function switchColour(){
    let target = document.querySelector(`[data-garment="${this.parentElement.dataset.for}"]`);
    let colour = this.classList[1];
    
    let image = path
        .replace('?', target.dataset.garment)
        .replace('?', colour);
    
    target.style.backgroundImage = `url('${image}')`;
}