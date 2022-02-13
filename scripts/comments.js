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