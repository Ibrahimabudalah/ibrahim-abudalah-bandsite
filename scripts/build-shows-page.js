//function to create elements with the appropriate class name
function ele(element, className) {
    let ele = document.createElement(element);
    ele.classList.add(className);
    return ele;
}

const shows = ele(`section`, `shows`);
const showsSection = ele(`div`, `shows__section`);
const showsHeading = ele(`h1`, `text__header--section`);
const showsContainer = ele(`div`, `shows__container`)
const showsTable = ele(`table`, `shows__table`);
const showsRow = ele(`tr`, `shows__table--header-row`);
const showsRowDate = ele(`th`, `text__header--table`);
const showsRowVenue = ele(`th`, `text__header--table`);
const showsRowLoc = ele(`th`, `text__header--table`);
showsHeading.innerText = `Shows`;
showsRowDate.innerText = `Date`;
showsRowVenue.innerText = `Venue`;
showsRowLoc.innerText = `Location`;
//the referance element to show the shows after the hero section
const hero = document.querySelector(`.hero`);

function insertAfter(referance, elem) {
    referance.parentNode.insertBefore(elem, referance.nextSibling);
};

insertAfter(hero, shows);
const showsTitle = document.createComment(` Shows `);
document.body.insertBefore(showsTitle, shows);

//shows array
const showsArray = [
    {
        date: `Mon Sept 06 2021`,
        venue: `Ronald Lane`,
    },
    {
        date: `Tue Sept 21 2021`,
        venue: `Pier 3 East`,
    },
    {
        date: `Fri Oct 15 2021`,
        venue: `View Lounge`,
    },
    {
        date: `Sat Nov 06 2021`,
        venue: `Hyatt Agency`,
    },
    {
        date: `Fri Nov 26 2021`,
        venue: `Moscow Center`,
    },
    {
        date: `Wed Dec 15 2021`,
        venue: `Press Club`,
    }
];
shows.appendChild(showsSection);
showsSection.append(
    showsHeading,
    showsContainer);
//adding table and table headers
showsContainer.appendChild(showsTable);
showsTable.appendChild(showsRow);
showsRow.append(
    showsRowDate,
    showsRowVenue,
    showsRowLoc
);

//Function to display all shows
function displayShows(arr) {
    arr.forEach(elem => {
        let rowEl = ele(`tr`, `shows__table--row`);
        let dateHeaderEl = ele(`td`, `text__header--mobile`);
        let dateEl = ele(`td`, `text--shows-date`);
        let venueHeaderEl = ele(`td`, `text__header--mobile`);
        let venueEl = ele(`td`, `text--shows-venue`);
        let locationHeaderEl = ele(`td`, `text__header--mobile`)
        let locationEl = ele(`td`, `text--shows-location`);
        let buttonContainerEl = ele(`td`, `shows__table--button-container`)
        let buttonEl = ele(`button`, `shows__table--button`);
        buttonEl.setAttribute(`type`, `button`);

        dateHeaderEl.innerText = `Date`;
        dateEl.innerText = elem.date;
        venueHeaderEl.innerText = `Venue`;
        venueEl.innerText = elem.venue;
        locationHeaderEl.innerText = `Location`;
        locationEl.innerText = `San Francisco, CA`
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
};
displayShows(showsArray);
