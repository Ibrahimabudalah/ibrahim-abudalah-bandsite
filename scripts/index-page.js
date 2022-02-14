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
let form = element(`form`, `comments__container__form`);
let labelName = element(`label`, `comments__form--label`);
let nameValue = element(`input`, `comments__form--name`);
let labelComments = element(`label`, `comments__form--label`);
let commentValue = element(`textarea`, `comments__form--comment`);
let button = element(`input`, `comments__button`);
const formSeparator = element(`div`, `form__separator`);

//creates the html elements and assignes a class name via the element function


attribute(labelName, { for: `name` });
attribute(labelComments, { for: `comment` });
//Inputs
attribute(nameValue, {
    type: `text`,
    name: `input_name`,
    placeholder: `Enter your name`
});
attribute(commentValue, {
    type: `text`,
    name: `input_comment`,
    placeholder: `Add a new comment`,
    rows: `4`
});
attribute(button, {
    type: `submit`,
    value: `COMMENT`
});
//profile picture
attribute(profilePic, { src: `assets/images/Mohan-muruge.jpg` });
//referancing the gallery section in order to place the comments section below it
const gallery = document.querySelector(`.gallery`);
const insertAfter = (referance, element) => {
    referance.parentNode.insertBefore(element, referance.nextSibling);
};
insertAfter(gallery, comments);
const commentsTitle = document.createComment(` Comments `);
document.body.insertBefore(commentsTitle, comments);

//appending the HTML elements

comments.appendChild(div);
div.append(
    commentsHeading,
    commentsContainer);
commentsContainer.appendChild(profilePic);

commentsHeading.innerText = `Join the Conversation`;
//Adding form elements
commentsContainer.appendChild(form);
form.append(
    labelName,
    nameValue,
    labelComments,
    commentValue,
    button);

labelName.innerText = `NAME`;
labelComments.innerText = `COMMENT`;
//Adding divider
div.appendChild(formSeparator);

//a function to display the comments on the page

function displayComment(array) {
    let arrayElements = element(`div`, `comments--array`);
    div.appendChild(arrayElements);

    array.forEach(elem => {
        let commentsContainer = element(`div`, `comments__container`);
        let nameAndDate = element(`div`, `comments__display`);
        let picture = element(`img`, `comments__display--image`);
        let profileName = element(`h4`, `comments__display--name`);
        let displayDate = element(`p`, `comments__display--date`)
        let displayComments = element(`p`, `text__comments`);
        let seperator = element(`div`, `separator`);

        profileName.innerText = elem.name;
        displayDate.innerText = (elem.date);
        displayComments.innerText = elem.comment;

        arrayElements.appendChild(commentsContainer);
        commentsContainer.append(
            picture,
            nameAndDate);
        nameAndDate.append(
            profileName,
            displayDate,
            displayComments);
        arrayElements.appendChild(seperator);
    })
}

displayComment(defaultComments);

//this is to add a new comment from the user input to an array

let addComment = (event) => {
    event.preventDefault();

    let formElements = form.children;
    let nameValue = event.target.input_name.value;
    let commentValue = event.target.input_comment.value;

    if (nameValue === `` || commentValue === ``) {
        nameValue.classList.add(`invalid`);
        commentValue.classList.add(`invalid`);
        alert(`Please fill out all fields.`);
    } else {
        let commentsObj = {};

        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].classList.contains(`invalid`)) {
                formElements[i].classList.remove(`invalid`);
            }
        }

        commentsObj.name = nameValue;
        commentsObj.date = dynamicTimeStamp(dateValue);
        commentsObj.comment = commentValue;

        let arr = document.querySelector(`.comments--array`);
        arr.remove();
        defaultComments.unshift(commentsObj);
        displayComment(defaultComments);
        form.reset();
    }
}

form.addEventListener(`submit`, addComment);


const nowTime = new Date();
let dateValue = (nowTime.getMonth() + 1) + `/` + nowTime.getDate() + `/` + nowTime.getFullYear();

//dynamicTimeStamp
function dynamicTimeStamp(date) {
    let timeInS = ((nowTime - new Date(date)) / 1000);
    let sInYear = 31536000;
    let sInMonth = sInYear / 12;
    let sInWeek = 604800;
    let sInDay = sInWeek / 7;

    if ((timeInS / sInYear) > 1) {
        return Math.round(timeInS / sInYear) + ` years ago`;
    } else if ((Math.floor(timeInS / sInMonth)) === 12) {
        return `1 year ago`;
    } else if (timeInS / sInMonth > 1) {
        return Math.round(timeInS / sInMonth) + ` months ago`;
    } else if (Math.floor(timeInS / sInMonth) === 1) {
        return `1 month ago`;
    } else if (timeInS / sInWeek > 1) {
        return Math.round(timeInS / sInWeek) + ` weeks ago`;
    } else if (Math.floor(timeInS / sInWeek) === 1) {
        return `1 week ago`;
    } else if (timeInS / sInDay > 1) {
        return Math.round(timeInS / sInDay) + ` days ago`;
    } else if (Math.floor(timeInS / sInDay) === 1) {
        return `1 day ago`;
    } else {
        return `A few seconds ago`;
    }
}