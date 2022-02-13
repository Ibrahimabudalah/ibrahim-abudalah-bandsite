const element = (element, className) => {
    const ele = document.createElement(element);
    ele.classList.add(className);
    return ele;
}
const attribute = (element, attribute) => {
    for (key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}
// functions to add elements/blocks and attributes
const defaultComments = [
    {
        name: `Connor Walton`,
        date: `02/17/2021`,
        comment: `This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.`
    },
    {
        name: `Emilie Beach`,
        date: `01/09/2021`,
        comment: `I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.`
    },
    {
        name: `Miles Acosta`,
        date: `12/20/2020`,
        comment: `I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.`
    }
];
//the array of the 3 default comments

const comments = element(`section`, `comments`);
const div = element(`div`, `comments__section`);
const commentsHeading = element(`h1`, `comments__heading`);
const commentsContainer = element(`div`, `comments__container`);
let profilePic = element(`img`, `comments__container--image`);
let form = element(`form`, `comments__form`);
let labelName = element(`label`, `comments__form--label`);
let name = element(`input`, `comments__form--name`);
let labelComments = element(`label`, `comments__form--label`);
let commentValue = element(`textarea`, `comments__form--comment`);
let button = element(`input`, `comments__form--button`);
const formSeparator = element(`div`, `form__separator`);

//creates the html elements and assignes a class name via the element function


