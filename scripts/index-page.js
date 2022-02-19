//Function to create new elements with class names
function element(element, className) {
    const ele = document.createElement(element);
    ele.classList.add(className);
    return ele;
}
function attribute(element, attribute) {
    for (key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}


//declaring the api link where all the comments are stored and the api key used
const herokuURL = `https://project-1-api.herokuapp.com/comments`;
const apiKey = `?api_key=ff335e47-7991-4451-843b-9cbf05cfdd33`;
const commentsAPI = herokuURL + apiKey;


//creates the html elements and assignes a class name via the element function
const comments = element(`section`, `comments`);
const div = element(`div`, `comments__section`);
const commentsHeading = element(`h1`, `comments__heading`);
const commentsContainer = element(`div`, `comments__container`);
let profilePic = element(`img`, `comments__container--image`);
let form = element(`form`, `comments__form`);
let labelName = element(`label`, `comments__form--label`);
let nameValue = element(`input`, `comments__form--name`);
let labelComments = element(`label`, `comments__form--label`);
let commentValue = element(`textarea`, `comments__form--comment`);
let button = element(`input`, `comments__form--button`);
const formSeparator = element(`div`, `form__separator`);

//adding attributes
attribute(labelName, { for: `name` });
attribute(labelComments, { for: `comment` });
attribute(nameValue, {
    type: `text`,
    name: `input_name`,
    placeholder: `Enter your name`,
});
attribute(commentValue, {
    type: `text`,
    name: `input_comment`,
    placeholder: `Add a new comment`,
    rows: `4`,
});
attribute(button, {
    type: `submit`,
    value: `COMMENT`,
});
//adding the profile picture to the appropriate element
attribute(profilePic, { src: `assets/images/Mohan-muruge.jpg` });

//referancing the gallery section in order to place the comments section right below it
const gallery = document.querySelector(`.gallery`);
const insertAfter = (referance, element) => {
    referance.parentNode.insertBefore(element, referance.nextSibling);
};
insertAfter(gallery, comments);
const commentsTitle = document.createComment(` Comments `);
document.body.insertBefore(commentsTitle, comments);

//appending the HTML elements

comments.appendChild(div);
div.append(commentsHeading, commentsContainer);
commentsContainer.appendChild(profilePic);

commentsHeading.innerText = `Join the Conversation`;
//Adding form elements
commentsContainer.appendChild(form);
form.append(
    labelName,
    nameValue,
    labelComments,
    commentValue,
    button
);

labelName.innerText = `Name`;
labelComments.innerText = `Comment`;
div.appendChild(formSeparator);

//Date
const nowTime = new Date();
let dateValue = `${nowTime.getMonth() + 1}/${nowTime.getDate()}/${nowTime.getFullYear()}`;
//dynamicTimeStamp
function dynamicTimeStamp(date) {
    let timeInS = (nowTime - new Date(date)) / 1000;
    let sInYear = 31536000;
    let sInMonth = sInYear / 12;
    let sInWeek = 604800;
    let sInDay = sInWeek / 7;
    let sInHour = 3600;

    if (timeInS / sInYear > 1.5) {
        return `${Math.round(timeInS / sInYear)} years ago`;
    } else if (
        Math.floor(timeInS / sInMonth) === 12 ||
        Math.round(timeInS / sInMonth) === 12
    ) {
        return `1 year ago`;
    } else if (timeInS / sInMonth > 1.5) {
        return `${Math.round(timeInS / sInMonth)} months ago`;
    } else if (Math.floor(timeInS / sInMonth) === 1) {
        return `1 month ago`;
    } else if (timeInS / sInWeek > 1.5) {
        return `${Math.round(timeInS / sInWeek)} weeks ago`;
    } else if (Math.floor(timeInS / sInWeek) === 1) {
        return `1 week ago`;
    } else if (timeInS / sInDay > 1.5) {
        return `${Math.round(timeInS / sInDay)} days ago`;
    } else if (Math.floor(timeInS / sInDay) === 1) {
        return `1 day ago`;
    } else if (timeInS / sInHour > 1.5) {
        return `${Math.round(timeInS / sInHour)} hours ago`;
    } else if (Math.floor(timeInS / sInHour) === 1) {
        return `1 hour ago`;
    } else if (timeInS / 60 > 1.5) {
        return `${Math.round(timeInS / 60)} minutes ago`;
    } else if (Math.floor(timeInS / 60) === 1) {
        return `1 minute ago`;
    } else {
        return `A few seconds ago`;
    }
}

//rendering the comments to the page
function renderComment(element1) {
    let elementContainer = element(`card`, `comments__container`);
    attribute(elementContainer, { id: element1.id });
    let displayElement = element(`div`, `comments__display`);
    let displayContainer = element(`div`, `comments__display--container`);
    let commentsName = element(`h4`, `comments__display--name`);
    let commentsDate = element(`p`, `comments__display--date`);
    let deleteButtonElement = element(`img`, `comments__display--delete-icon`);
    attribute(deleteButtonElement, { src: `./assets/icons/SVG/icon-delete.svg` });
    deleteButtonElement.addEventListener(`click`, deleteValidation);
    let likeButtonElement = element(`img`, `comments__display--like-icon`);
    attribute(likeButtonElement, { src: `./assets/icons/SVG/icon-like.svg` });
    likeButtonElement.addEventListener(`click`, likeComment);
    let likeCounter = element(`p`, `comments__display--like-counter`);
    let commentsText = element(`p`, `text__comments`);
    let commentsImage = element(`img`, `comments__display--image`);
    let modalEl = element(`div`, `modal`);
    let textElement = element(`p`, `text__modal`);
    let yesButtonElement = element(`input`, `modal__button--yes`);
    attribute(yesButtonElement, { type: `button`, value: `\u2713` });
    yesButtonElement.addEventListener(`click`, deleteComment);
    let noButtonElement = element(`input`, `modal__button--no`);
    attribute(noButtonElement, { type: `button`, value: `\u2715` });
    noButtonElement.addEventListener(`click`, deleteValidation);

    commentsName.innerText = element1.name;
    commentsDate.innerText = dynamicTimeStamp(element1.timestamp);
    likeCounter.innerText = `Likes: ${element1.likes}`;
    commentsText.innerText = element1.comment;
    textElement.innerText = `Are you sure?`;

    formSeparator.prepend(elementContainer);
    elementContainer.append(commentsImage, displayElement, modalEl);
    displayElement.append(commentsName, displayContainer, commentsText);
    displayContainer.append(commentsDate, likeCounter, likeButtonElement, deleteButtonElement);
    modalEl.append(textElement, yesButtonElement, noButtonElement);
}

//Display comment function including validation
const addComment = (event) => {
    event.preventDefault();

    let formElements = form.children;
    let nameValue = event.target.input_name.value;
    let commentValue = event.target.input_comment.value;

    if (nameValue === `` || commentValue === ``) {
        nameValue.classList.add(`invalid`);
        commentValue.classList.add(`invalid`);
        alert(`Please fill out all fields.`);
    } else {
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].classList.contains(`invalid`)) {
                formElements[i].classList.remove(`invalid`);
            }
        }

        const commentsObj = {};
        commentsObj.name = nameValue;
        commentsObj.comment = commentValue;

        axios
            .post(commentsAPI, commentsObj)
            .then((result) => {
                renderComment(result.data);
            })
            .catch((error) => console.log(error));

        form.reset();
    }
};

// adding a like function
const likeComment = (event) => {
    let comment = event.target.parentNode.parentNode.parentNode;
    let putRequest = `${herokuURL}/${comment.id}/like${apiKey}`;
    console.log(putRequest);
    axios
        .put(putRequest)
        .then((result) => {
            let commentToLike = document.getElementById(result.data.id);
            let like = commentToLike.children[1].children[1].children[1];
            return (like.innerHTML = `Likes: ${result.data.likes}`);
        })
        .catch((error) => console.log(error));
};


//Delete function
const deleteComment = (event) => {
    let comment = event.target.parentNode.parentNode;
    let deleteRequest = `${herokuURL}/${comment.id}${apiKey}`;
    axios
        .delete(deleteRequest)
        .then((result) => {
            let commentToDelete = document.getElementById(result.data.id);
            commentToDelete.remove();
        })
        .catch((error) => console.log(error));
};

//a function to validate the deletion of a comment
const deleteValidation = (event) => {
    let pathOne = event.target.parentNode.parentNode.parentNode.children[2];
    let pathTwo = event.target.parentNode.parentNode.children[2];

    window.onclick = (event) => {
        if (event.target.className === `comments__display--delete-icon`) {
            pathOne.style.display = `block`;
        } else if (event.target.className === `modal__button--no`) {
            pathTwo.style.display = `none`;
        } else {
            pathOne.style.display = `none`;
        }
    };
};

//pulling the comments from the api
axios
    .get(commentsAPI)
    .then((comment) => {
        let arr = comment.data;
        arr
            .sort((a, b) => {
                return a.timestamp - b.timestamp;
            })
            .forEach((elem) => {
                renderComment(elem);
            });
    })
    .catch((error) => console.log(error));

form.addEventListener(`submit`, addComment);