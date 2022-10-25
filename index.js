import tipJS from "./tipJS.js";

function createTip(numTip, titleTip, navigators = []) {
    const element = document.createElement('div');
    const content = document.createElement('div');
    const title = document.createElement('h3');

    element.classList.add('tip');
    title.classList.add('tip-title');
    content.classList.add('tip-content');
    title.textContent = `#${numTip} ${titleTip}`;
    element.id = `tip${numTip}`;

    navigators.forEach(nav => {
        const icon = document.createElement('img');
        icon.classList.add('navigator-icon');
        icon.setAttribute('src', `./assets/images/${nav}.png`);
        title.appendChild(icon);
    });

    element.appendChild(title);
    element.appendChild(content);

    document.body.appendChild(element);

    return content;
}

const tip1 = createTip(1, 'Generate random color in hexadecimal format', ['chrome','firefox','edge']);
const tip1Button = document.createElement('button');
tip1Button.textContent = 'Change color';
tip1Button.addEventListener('click', () => {
    const color = tipJS.gererateRandomColor();
    tip1.style.backgroundColor = color;
    tip1.querySelector('p').textContent = color;
});
tip1.append(document.createElement('p'), tip1Button);

const tip2 = createTip(2, 'Copy text into the clipboard', ['chrome','firefox','edge']);
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

const tip3 = createTip(3, 'Preview image locally (no server)', ['chrome','firefox','edge']);
const tip3Button = document.createElement('button');
const tip3Img = document.createElement('img');
tip3Button.textContent = 'Preview image';
tip3Button.addEventListener('click', () => {
    tipJS.previewImage(tip3Img);
});
tip3.append(tip3Button, tip3Img);

const tip4 = createTip(4, 'Load file CSV locally (no server)', ['chrome','firefox','edge']);
const tip4Button = document.createElement('button');
tip4Button.textContent = 'load CSV file';
tip4Button.addEventListener('click', () => {
    tipJS.loadLocalCSV('ISO-8859-1', true)
    .then(res => {
        console.log(res);
    });
});
tip4.append(tip4Button);

const tip5 = createTip(5, 'Take a selfie from WebCam', ['chrome','firefox','edge']);
const tip5Button = document.createElement('button');
tip5Button.textContent = 'Take a selfie';
tip5Button.addEventListener('click', () => {
    tipJS.takeWebcamSelfie()
    .then(image => {
        tip5.querySelector('img').setAttribute('src', image);
    });
});
tip5.append(tip5Button, document.createElement('img'));

const tip6 = createTip(6, 'Set header Authorization Bearer', ['chrome','firefox','edge']);
const tip6Button = document.createElement('button');
tip6Button.textContent = 'Set Bearer';
tip6Button.addEventListener('click', () => {
    const headers = tipJS.setBearerAutHeader('token secreto').entries();
    for (let header of headers) {
        console.log(header);
    }
});
tip6.append(tip6Button, document.createElement('img'));

