//function to create elements with the appropriate class name
function newElem(elem, className) {
    let newElem = document.createElement(elem);
    newElem.classList.add(className);
    return newElem;
}

//declaring the api link where all the comments are stored and the api key used
const herokuURL = `https://project-1-api.herokuapp.com/showdates`;
const apiKey = `?api_key=20e3e4b5-3154-46d4-ad0e-59daafff561d`;
const showsAPI = herokuURL + apiKey;

const shows = newElem(`section`, `shows`);
const showsSection = newElem(`div`, `shows__section`);
const showsHeading = newElem(`h1`, `text__header--section`);
const showsContainer = newElem(`div`, `shows__container`);
const showsTable = newElem(`table`, `shows__table`);
const showsRow = newElem(`tr`, `shows__table--header-row`);
const showsRowDate = newElem(`th`, `text__header--table`);
const showsRowVenue = newElem(`th`, `text__header--table`);
const showsRowLoc = newElem(`th`, `text__header--table`);
showsHeading.innerText = `Shows`;
showsRowDate.innerText = `Date`;
showsRowVenue.innerText = `Venue`;
showsRowLoc.innerText = `Location`;
//the referance element to show the shows after the hero section
const hero = document.querySelector(`.hero`);

function insertAfter(ref, elem) {
    ref.parentNode.insertBefore(elem, ref.nextSibling);
}

insertAfter(hero, shows);
const showsTitle = document.createComment(` Shows `);
document.body.insertBefore(showsTitle, shows);

//appending
shows.appendChild(showsSection);
showsSection.append(showsHeading, showsContainer);
showsContainer.appendChild(showsTable);
showsTable.appendChild(showsRow);
showsRow.append(showsRowDate, showsRowVenue, showsRowLoc);

//using axios to pull the data from the api
axios
    .get(showsAPI)
    .then((show) => {
        let showsData = show.data;

        //this method is to display shows data
        showsData.forEach((elem) => {
            let rowEl = newElem(`tr`, `shows__table--row`);
            let dateHeaderEl = newElem(`td`, `text__header--mobile`);
            let dateEl = newElem(`td`, `text--shows-date`);
            let venueHeaderEl = newElem(`td`, `text__header--mobile`);
            let venueEl = newElem(`td`, `text--shows-venue`);
            let locationHeaderEl = newElem(`td`, `text__header--mobile`);
            let locationEl = newElem(`td`, `text--shows-location`);
            let buttonContainerEl = newElem(`td`, `shows__table--button-container`);
            let buttonEl = newElem(`button`, `shows__table--button`);
            buttonEl.setAttribute(`type`, `button`);

            //date formating the shows dates
            let fullDate = new Date((JSON.parse(elem.date)));
            let commaRegex = /,/g;
            const options = {
                weekday: `short`,
                year: `numeric`,
                month: `short`,
                day: `2-digit`,
            };
            let dateValue = fullDate
                .toLocaleDateString(`en-US`, options)
                .replace(commaRegex, ``);

            dateEl.innerText = dateValue;
            venueEl.innerText = elem.place;
            locationEl.innerText = elem.location;
            buttonEl.innerText = `Buy Tickets`;

            showsTable.appendChild(rowEl);
            rowEl.append(
                dateHeaderEl,
                dateEl,
                venueHeaderEl,
                venueEl,
                locationHeaderEl,
                locationEl,
                buttonContainerEl
            );
            buttonContainerEl.appendChild(buttonEl);
            
        });
    })
    .catch((error) => console.log(error));