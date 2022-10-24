export default {
    gererateRandomColor: () => {
        return `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
    },
    copyTextToClipboard: (text) => {
        navigator.clipboard.writeText(text);
    },
    previewImage(element) {
        const inputFile = document.createElement('input');
        inputFile.setAttribute('type', 'file');
        inputFile.setAttribute('accept', 'image/png, image/gif, image/jpeg');
        inputFile.addEventListener('change', () => {
            const file = inputFile.files[0];
            const fileReader  = new FileReader();
            fileReader.onload = function (e) {
                element.setAttribute('src', e.target.result);
            };
            fileReader.readAsDataURL(file);
        })
        inputFile.click();
    }
}