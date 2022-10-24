import tipJS from "./tipJS.js";

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

const tip2 = createTip(2, 'Copy text into the clipboard 📋');
const tip2Button = document.createElement('button');
tip2Button.textContent = 'Copy text to clipboard';
tip2Button.addEventListener('click', () => {
    const textarea = tip2.querySelector('textarea');
    const text = textarea.value;
    textarea.value = '';
    textarea.setAttribute('placeholder', 'Text copied');
    tipJS.copyTextToClipboard(text);
});
tip2.append(document.createElement('textarea'), document.createElement('p'), tip2Button);

const tip3 = createTip(3, 'Preview image whitout server');
const tip3Button = document.createElement('button');
const tip3Img = document.createElement('img');
tip3Button.textContent = 'Preview image';
tip3Button.addEventListener('click', () => {
    tipJS.previewImage(tip3Img);
});
tip3.append(tip3Button, tip3Img);