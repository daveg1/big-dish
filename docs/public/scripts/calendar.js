var currMonth = (new Date).getMonth()+1;
var calendar;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const months = {
    9: {
        // Amount of blank days to add to the beginning.
        initialGap: 6,

        // List of Days which Have Events
        events: {
            3: {
                title: "WW3",
                date: "September 3rd at 6:30pm",
                image: "helmet",
                description: "The battle of the foods has begun. When north meets west, east and south, the country that holds the most powerful dish will be victorious. Join the team of your choice and prepare to battle."
            },
            21: {
                title: "Master Chef",
                date: "September 21st at 7:00pm",
                image: "chef-hat",
                description: "Think you can cook? Have you been told Gordon Ramsay has nothing on your skills as a chef? At Master Chef, we put your skills to the test. Random Ingredients, a time limit, your way. It's that simple."
            }
        },

        // Month Length
        length: 30
    },
    10: {
        initialGap: 1,
        events: {
            7: {
                title: "Cake Face",
                date: "October 7th at 6:00pm",
                image: "cupcake",
                description: "Good at baking? Be the face of this year's baking champion. Use any ingredients you wish and make it as tasty as can be."
            },
            25: {
                title: "Lectures",
                date: "October 25th at 5:30pm",
                image: "copybook",
                description: "No oven gloves, no pots and pans, just a relaxed environment with some of RGU's most experienced cooks, ranging from staff to alumni and other students. Come and learn."
            },
            31: {
                title: "Trick or Treat",
                date: "October 31st at 6:30pm",
                image: "pumpkin",
                description: "Knock, knock—who's there? Correctly guess what we have stuffed inside of various pumpkins to win prizes!"
            }
        },
        length: 31
    },
    11: {
        initialGap: 4,
        events: {
            22: {
                title: "Santa's Grotto",
                date: "December 22nd at 7:00pm",
                image: "santa-hat",
                description: "'Tis the season to be jolly—let's celebrate the tail end of the year with a Christmas cook. Experiment with turkey, sprouts and everything nice. The question remains: what dish will you make?"
            }
        },
        length: 30
    }
}

window.addEventListener('DOMContentLoaded', function(){
    // Grab Main Calendar Element
    calendar = document.getElementById('calendar');

    // Add Event Listeners.
    const buttons = document.querySelectorAll('.slider-arrows .arrow');
    for(let btn of buttons){
        btn.addEventListener('click', changeSlide, false);
    }

    // Generate Initial Slide
    generateSlide(months[currMonth])
    document.getElementById('month').innerHTML = monthNames[currMonth-1];
    setToToday();
}, false);

function changeSlide(){
    currMonth += +this.dataset.pivot;

    if(currMonth > 12){
        currMonth = 1;
    } else if(currMonth < 1){
        currMonth = 12;
    }

    document.getElementById('month').innerHTML = monthNames[currMonth-1];
    generateSlide(months[currMonth]);
}

function blankMonth(){
    const tbody = document.createElement('tbody');

    tbody.innerHTML = '<tr><td colspan="7">Sorry, there are no events planned for this month. Try next month.</td></tr>';

    calendar.appendChild(tbody);
}

function generateSlide(month){
    // Check if <tbody> already exists.
    if(calendar.children[1]){
        calendar.removeChild(calendar.children[1]);
    }

    if(!month){
        return blankMonth();
    }

    let {initialGap, finalGap, length} = month;
    let dayCount = 1;
    let slide = document.createElement('tbody');

    for(let i = 0; i < 6; ++i){
        let row = document.createElement('tr');

        for(let j = 0; j < 7; ++j){
            let day = document.createElement('td');

            if(initialGap){
                day.setAttribute('rel', 'blank');
                initialGap--;
            } else if(dayCount <= length){
                day.innerHTML = dayCount;
                day.onclick = makeActive;

                if(month.events[dayCount]){
                    day.setAttribute('rel', 'event');
                }

                dayCount++;
            } else {
                day.setAttribute('rel', 'blank');
            }

            row.appendChild(day);
        }

        slide.appendChild(row);
    }

    calendar.appendChild(slide);
}

function changeEvent(day){
    if(!day){
        return;
    }

    document.getElementById('event-image').style.backgroundImage = `url('../public/assets/events/${day.image}.png')`;
    document.getElementById('event-title').innerHTML = day.title;
    document.getElementById('event-date').innerHTML = day.date;
    document.getElementById('event-description').innerHTML = day.description;
}

function makeActive(){
    if(this.className){
        return;
    }

    if(document.querySelector('td.active')){
        document.querySelector('td.active').removeAttribute('class');
    }
    this.className = 'active';
    changeEvent(months[currMonth].events[+this.innerText]);
}

function setToToday(){
    const day = (new Date()).getDate();
    const cells = document.querySelectorAll('td:not([rel="blank"])');

    for(let cell of cells){
        if(cell.innerText == day){
            cell.className = 'active';
            changeEvent(months[currMonth].events[day]);
            break;
        }
    }
}
