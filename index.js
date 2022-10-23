import tipJS from "./tipJS";

function createTip(numTip, titleTip) {
    const element = document.createElement('div');
    const content = document.createElement('div');
    const title = document.createElement('h3');

    title.textContent = `#${numTip} ${titleTip}`;
    element.id = `tip${numTip}`;
    element.appendChild(title);
    element.appendChild(content);

    document.body.appendChild(element);

    return content;
}

const tip1 = createTip(1, 'Generate random color in hexadecimal format');
const tip1Button = document.createElement('button');
tip1Button.textContent = 'Change color';
tip1Button.addEventListener('click', () => {
    const color = tipJS.gererateRandomColor();
    tip1.style.backgroundColor = color;
    tip1.querySelector('p').textContent = color;
});
tip1.append(document.createElement('p'), tip1Button);