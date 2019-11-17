var viewer, garment;

window.addEventListener('DOMContentLoaded', function(){
    
    viewer = document.getElementById('viewer');
    
    // Set garment to enlargen.
    garment = document.getElementById('enlarge');
    
    // Add event listeners.
    viewer.addEventListener('mousedown', close, false);
    garment.addEventListener('mousedown', enlargen, false);
    
}, false);

function enlargen(){
    const img = document.createElement('img');
    img.src = this.style.backgroundImage.replace('url("', '').replace('")', '');
    
    viewer.appendChild(img);
    viewer.className = 'shown'
}

function close(e){
    e.preventDefault();
    
    this.removeAttribute('class');
    this.removeChild(this.firstElementChild);
}