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
        inputFile.setAttribute('accept', 'image/*');
        inputFile.addEventListener('change', () => {
            const file = inputFile.files[0];
            const fileReader  = new FileReader();
            fileReader.onload = function (e) {
                element.setAttribute('src', e.target.result);
            };
            fileReader.readAsDataURL(file);
        })
        inputFile.click();
    },
    loadLocalCSV(format = 'UTF-8', withHeader = false) {
        return new Promise((resolve, reject) => {
            const inputFile = document.createElement('input');
            inputFile.setAttribute('type', 'file');
            inputFile.setAttribute('accept', '.csv');
            inputFile.addEventListener('change', () => {
                const file = inputFile.files[0];
                const fileReader  = new FileReader();
                fileReader.onload = function (e) {
                    let data = [];
                    let headers = null;
                    const lines = e.target.result.split("\n");
                    lines.forEach((line, id) => {
                        if (line.trim() !== '') {
                            const columns = line.split(';');
                            if (id === 0 && withHeader) {
                                headers = [];
                                columns.forEach(col => headers.push(col))
                            } else {
                                if (headers) {
                                    let reg = {};
                                    headers.forEach((col, id) => {
                                        reg[col] = columns[id];
                                    });
                                    data.push(reg);
                                } else {
                                    data.push(columns);
                                }
                            }
                        }
                    });
                    const header = lines[0].split(';');
                    resolve(data);
                };
                fileReader.readAsText(file, format);
            })
            inputFile.click();
        });
    }
}