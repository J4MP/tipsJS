export default {
    gererateRandomColor: () => {
        return `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
    },
    copyTextToClipboard: (text) => {
        navigator.clipboard.writeText(text);
    },
    previewImage: (element) => {
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
    loadLocalCSV: (format = 'UTF-8', withHeader = false) => {
        return new Promise((resolve, reject) => {
            const inputFile = document.createElement('input');
            inputFile.setAttribute('type', 'file');
            inputFile.setAttribute('accept', '.csv');
            inputFile.addEventListener('change', () => {
                const file = inputFile.files[0];
                const fileReader  = new FileReader();
                fileReader.onerror = err => reject(err);
                fileReader.onload = e => {
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
                    resolve(data);
                };
                fileReader.readAsText(file, format);
            })
            inputFile.click();
        });
    },
    takeWebcamSelfie: () => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        video.setAttribute('autoplay', true);

        return new Promise((resolve, reject) => {            
            const cam = navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            cam.then(stream => {
                let stream_settings = stream.getVideoTracks()[0].getSettings();
                video.style.width = stream_settings.width + 'px';
                canvas.setAttribute('width', stream_settings.width);
                video.style.height = stream_settings.height + 'px';
                canvas.setAttribute('height', stream_settings.height);
                video.srcObject = stream;
                video.onloadedmetadata = function(e) {
                    canvas.getContext('2d')
                        .drawImage(video, 0, 0, canvas.width, canvas.height);
                    stream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                    resolve(canvas.toDataURL('image/jpeg'));                  
                };                
            })
            .catch(function(err) { console.log(err.name); }); 
        })
    },
    setBearerAutHeader: (token = '', type = 'application/json') => {
        const config = {
            'Content-Type': type
        };
        if (token) {
            config['Authorization'] = 'Bearer ' + token;
        }
        return new Headers(config);
    },
    form2json: (formElement) => {
        const data = new FormData(formElement);
        return JSON.stringify(Object.fromEntries(data.entries()));
    },
    screenCapture: (cursor = true) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        video.setAttribute('autoplay', true);

        return new Promise((resolve, reject) => {            
            const cam = navigator.mediaDevices.getDisplayMedia({ video: {cursor}, audio: false });
            cam.then(stream => {
                let stream_settings = stream.getVideoTracks()[0].getSettings();
                video.style.width = stream_settings.width + 'px';
                canvas.setAttribute('width', stream_settings.width);
                video.style.height = stream_settings.height + 'px';
                canvas.setAttribute('height', stream_settings.height);
                video.srcObject = stream;
                video.onloadedmetadata = function(e) {
                    canvas.getContext('2d')
                        .drawImage(video, 0, 0, canvas.width, canvas.height);
                    stream.getTracks().forEach(function(track) {
                            track.stop();
                        });
                    resolve(canvas.toDataURL('image/jpeg'));                  
                };                
            })
            .catch(function(err) { console.log(err.name); }); 
        })  
    },
    getParamsFromURL: (param = null) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (param) {
            return urlParams.get(param);
        }
        const params = {};
        urlParams.forEach( (value, key) => {
            params[key] = value;
        });
        return params;
    },
    getUserDevice: () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
          return "tablet";
        } else if (
          /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
          )
        ) {
          return  "mobile";
        } else if ('getBattery' in navigator) {
          return 'laptop';
        } else {
          return  "desktop";
        }
    }    
}