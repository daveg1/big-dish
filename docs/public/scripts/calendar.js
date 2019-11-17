var currMonth = (new Date).getMonth()+1;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// The main calendar table on the actual webpage.
var calendar;

// Object holding event dates.
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

// Run only when the page (DOM) is fully loaded and parsed.
window.addEventListener('DOMContentLoaded', function(){
    // Grab Main Calendar Element
    calendar = document.getElementById('calendar');

    // Add Event Listeners.
    const buttons = document.querySelectorAll('.slider-arrows .arrow');
    for(let btn of buttons){
        btn.addEventListener('click', changeSlide, false);
    }

    // Initialising the table, by choosing
    // the current month and day
    // and generating a slide based off that.
    generateSlide(months[currMonth])
    document.getElementById('month').innerHTML = monthNames[currMonth-1];
    setToToday();
}, false);

// Handles each of the slide
// arrows' click event.
function changeSlide(){
    currMonth += +this.dataset.pivot;

    // Allows the calendar to
    // loop round if the limit
    // is exceeded.
    if(currMonth > 12){
        currMonth = 1;
    } else if(currMonth < 1){
        currMonth = 12;
    }
    
    // Generate a slide based on that month.
    document.getElementById('month').innerHTML = monthNames[currMonth-1];
    generateSlide(months[currMonth]);
}

// If there are no events for that month,
// it is pointless to generate a blank table.
// So, instead, output a message.
function blankMonth(){
    const tbody = document.createElement('tbody');

    tbody.innerHTML = '<tr><th colspan="7">Sorry, there are no events planned for this month. Try next month.</th></tr>';

    calendar.appendChild(tbody);
}

// Generates the cells for the table.
function generateSlide(month){
    // Check if <tbody> already exists.
    if(calendar.children[1]){
        calendar.removeChild(calendar.children[1]);
    }

    // If no events, avoid generating a blank.
    if(!month){
        return blankMonth();
    }

    // Object destructuring
    let {initialGap, finalGap, length} = month;
    
    // Counts the actual cells on the table.
    // I.e., the cells with numbers.
    let dayCount = 1;
    
    // The main body of the slide.
    let slide = document.createElement('tbody');

    // For each row (maximum possible rows is 6).
    for(let i = 0; i < 6; ++i){
        // The current row to store the <td>s in.
        let row = document.createElement('tr');

        // For each day of the week.
        for(let j = 0; j < 7; ++j){
            // Current cell
            let day = document.createElement('td');
            
            // The initial gap is the number of blank cells
            // to place before the first of the month,
            // so that it lines up correctly with the
            // day of the week it lands on.
            if(initialGap){
                day.setAttribute('rel', 'blank');
                initialGap--;
                
            // The actual dates (cells with numbers).
            } else if(dayCount <= length){
                day.innerHTML = dayCount;
                day.onclick = makeActive;
                
                // If this day has an event, set it so.
                if(month.events[dayCount]){
                    day.setAttribute('rel', 'event');
                }

                dayCount++;
                
            // The final cells to fill up the rows.
            } else {
                day.setAttribute('rel', 'blank');
            }

            // Add each cell to the current row.
            row.appendChild(day);
        }

        // Add the current row to the main body.
        slide.appendChild(row);
    }

    // Finally, add the slide to the table.
    calendar.appendChild(slide);
}

// Updates the event information to the left of the calendar,
// if there is an event present.
function changeEvent(day){
    // If day object is non-existent, it means there
    // is no event on that day. Skip it.
    if(!day){
        return;
    }

    document.getElementById('event-image').style.backgroundImage = `url('../public/assets/events/${day.image}.png')`;
    document.getElementById('event-title').innerHTML = day.title;
    document.getElementById('event-date').innerHTML = day.date;
    document.getElementById('event-description').innerHTML = day.description;
}

// Finds the current date clicked on,
// removes its active state, and sets
// the newly selected cell to an active state.
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

// Initialising the table to make the current day active.
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