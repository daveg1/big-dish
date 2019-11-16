const scrollAmount = 4;

// Utility function to produce a background position value.
function calcPosition(elem){
    return -window.scrollY / scrollAmount;
}

window.addEventListener('DOMContentLoaded', function(){
    // If window or screen width is too small, initially, then cancel the script.
    if(window.innerWidth <= 636 || window.screen.width <= 636){
        return;
    }

    const parallax = document.getElementsByClassName('parallax');
    const limits = [];
    const covers = document.querySelectorAll('.parallax .cover');

    for(let i = 0; i < parallax.length; ++i){
        let height = parallax[i].offsetHeight,
            top = parallax[i].offsetTop,
            bottom = top + height;

        limits[i] = { bottom, top }

        if(window.scrollY > bottom){
            covers[i].style.backgroundPosition = `center ${-height / scrollAmount}px`;
        } else if(window.scrollY < top){
            covers[i].style.backgroundPosition = 'center 0';
        } else {
            covers[i].style.backgroundPosition = `center ${calcPosition(parallax[i])}px`;
        }
    }

    // Catch when the user scrolls
    this.addEventListener('scroll', function(e){
        console.log(window.scrollY, limits);
        // If the amount scroll is within the limit, apply background parallax.
        for(let i = 0; i < parallax.length; ++i){
            if((window.scrollY + window.innerHeight) > limits[i].top && window.scrollY < limits[i].bottom){
                covers[i].style.backgroundPosition = `center ${calcPosition(parallax[i])}px`;
            }
        }
    }, false);
});
