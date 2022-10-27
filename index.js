import tipJS from "./tipJS.js";

function createTip(numTip, titleTip, navigators = [], codeScript = '') {
    const element = document.createElement('div');
    const content = document.createElement('div');
    const code = document.createElement('div');
    const title = document.createElement('h3');

    element.classList.add('tip');
    code.classList.add('code');
    code.hidden = true;
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

    title.appendChild(document.createElement('code'));
    title.querySelector('code').textContent = '<>';
    title.querySelector('code').addEventListener('click', () => {
        code.hidden = !code.hidden;
    });

    element.appendChild(title);
    element.appendChild(content);
    code.appendChild(document.createElement('code'));
    code.querySelector('code').innerHTML = `<pre>${codeScript}</pre>`;

    content.appendChild(code);

    document.body.appendChild(element);

    return content;
}

const tip1 = createTip(1, 'Generate random color in hexadecimal format', ['chrome','firefox','edge'], tipJS.gererateRandomColor);
const tip1Button = document.createElement('button');
tip1Button.textContent = 'Change color';
tip1Button.addEventListener('click', () => {
    const color = tipJS.gererateRandomColor();
    tip1.style.backgroundColor = color;
    tip1.querySelector('p').textContent = color;
});
tip1.append(document.createElement('p'), tip1Button);

const tip2 = createTip(2, 'Copy text into the clipboard', ['chrome','firefox','edge'], tipJS.copyTextToClipboard);
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

const tip3 = createTip(3, 'Preview image locally (no server)', ['chrome','firefox','edge'], tipJS.previewImage);
const tip3Button = document.createElement('button');
const tip3Img = document.createElement('img');
tip3Button.textContent = 'Preview image';
tip3Button.addEventListener('click', () => {
    tipJS.previewImage(tip3Img);
});
tip3.append(tip3Button, tip3Img);

const tip4 = createTip(4, 'Load file CSV locally (no server)', ['chrome','firefox','edge'], tipJS.loadLocalCSV);
const tip4Button = document.createElement('button');
const info4 = document.createElement('p');
info4.textContent = 'Open the browser console to see the result.';
tip4Button.textContent = 'load CSV file';
tip4Button.addEventListener('click', () => {
    tipJS.loadLocalCSV('ISO-8859-1', true)
    .then(res => {
        console.table(res);
    });
});
tip4.append(info4,tip4Button);

const tip5 = createTip(5, 'Take a selfie from WebCam', ['chrome','firefox','edge'], tipJS.takeWebcamSelfie);
const tip5Button = document.createElement('button');
tip5Button.textContent = 'Take a selfie';
tip5Button.addEventListener('click', () => {
    tipJS.takeWebcamSelfie()
    .then(image => {
        tip5.querySelector('img').setAttribute('src', image);
    });
});
tip5.append(tip5Button, document.createElement('img'));

const tip6 = createTip(6, 'Set header Authorization Bearer', ['chrome','firefox','edge'], tipJS.setBearerAutHeader);
const tip6Button = document.createElement('button');
const info6 = document.createElement('p');
info6.textContent = 'Open the browser console to see the result.';
tip6Button.textContent = 'Set Bearer';
tip6Button.addEventListener('click', () => {
    const headers = tipJS.setBearerAutHeader('token secreto').entries();
    for (let header of headers) {
        console.log(header);
    }
});
tip6.append(info6, tip6Button);

const tip7 = createTip(7, 'Convert HTML form in JSON string', ['chrome','firefox','edge'], tipJS.form2json);
const tip7Button = document.createElement('button');
const info7 = document.createElement('p');
const form7 = document.createElement('form');
form7.innerHTML = `
    Name: <input type="text" name="name"><br>
    Password: <input type="password" name="pass"><br>
    Languaje:<select name="lang">
        <option value="-"></option>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
    </select>
`;
tip7Button.textContent = 'Convert';
tip7Button.addEventListener('click', () => {
    info7.textContent = tipJS.form2json(form7);
});
tip7.append(form7, tip7Button, info7);

const tip8 = createTip(8, 'Capture screen', ['chrome','edge','opera'], tipJS.screenCapture);
const tip8Button = document.createElement('button');
tip8Button.textContent = 'Capture';
tip8Button.addEventListener('click', () => {
    tipJS.screenCapture()
    .then(image => {
        tip8.querySelector('img').setAttribute('src', image);
    });
});
tip8.append(tip8Button, document.createElement('img'));

const tip9 = createTip(9, 'Get URL params', ['chrome','edge', 'firefox','opera','safari'], tipJS.getParamsFromURL);
const info9 = document.createElement('div');
const tip9Button = document.createElement('button');
tip9Button.textContent = 'Get params';
tip9Button.addEventListener('click', () => {
    const params = tipJS.getParamsFromURL();
    if (Object.keys(params).length === 0) {
        info9.innerHTML = '<p>The URL contains no parameters</p>';
    } else {
        info9.innerHTML = '';
        for (const param in params) {
            info9.innerHTML += `<p>${param} = ${params[param]}`;
        }
    }
});
tip9.append(tip9Button, info9);

const tip10 = createTip(10, 'Get user divice', ['chrome','edge', 'firefox','opera','safari'], tipJS.getUserDevice);
const info10 = document.createElement('h2');
info10.style.margin = '20px';
info10.style.textAlign = 'center';
const tip10Button = document.createElement('button');
tip10Button.textContent = 'Get device';
tip10Button.addEventListener('click', () => {
    info10.textContent = `You are using a ${tipJS.getUserDevice()} device`;
});
tip10.append(tip10Button, info10);