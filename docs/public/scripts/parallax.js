// Utility function to produce a background position value.
function calcPosition(){
    return -window.scrollY / 4;
}

window.addEventListener('DOMContentLoaded', function(){
    // If window or screen width is too small, initially, then end script.
    if(window.innerWidth <= 636 || window.screen.width <= 636){
        return;
    }
    
    /*
     Get the position of the bottommost part of the header,
     to act as a limiter for the scrolling function.
    */
    const limit = document.getElementsByClassName('intro')[0].getBoundingClientRect().bottom;
    
    // The cover image in question.
    const cover = document.getElementsByClassName('cover')[0];
    
    cover.style.backgroundPosition = `center ${calcPosition()}px`;
    
    // Catch when the user scrolls
    this.addEventListener('scroll', function(e){
        // If the amount scroll is within the limit, apply background parallax.
        if(window.scrollY < limit){
            cover.style.backgroundPosition = `center ${calcPosition()}px`;
        }
    }, false);
});