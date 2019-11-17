// Initialise global nodes.
var people, tooltip, tooltipBox;

window.addEventListener('DOMContentLoaded', function(){
    // Only when page loads, set global nodes.
    people = document.getElementsByClassName('person');
    tooltip = document.getElementById('tooltip');
    
    // How far the members section is from the left of the page.
    tooltipBox = tooltip.parentElement.getBoundingClientRect();
    
    // Set the event handlers for each member cutout.
    for(let person of people){
        person.addEventListener('mouseover', moveTooltip, false);
        person.addEventListener('mouseout', hideTooltip, false);
    }
    
}, false);

function moveTooltip(e){
    let dims = this.getBoundingClientRect();
    let offset = +this.dataset.offset || 0;
    
    // let left = (tooltipBox.left - tooltipBox.width) + (dims.left + dims.width) + (tooltip.offsetWidth / 2) - 12;
    let left = dims.left - (tooltipBox.width / 2) + (tooltip.offsetWidth / 2) + offset;
    tooltip.style.left = `${left}px`
    
    // Name header.
    tooltip.children[0].innerHTML = this.dataset.name;
    
    // Role paragraph.
    tooltip.children[1].innerHTML = this.dataset.role;
}

// In the CSS, if the tooltip has a style attribute, it's visible,
// therefore, removing it would make it hidden again.
function hideTooltip(){
    tooltip.removeAttribute('style');
}