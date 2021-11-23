function sendMessageToFront(obj) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        obj.id = guidGenerator()
        chrome.tabs.sendMessage(
            tabs[0].id,
            obj,
            function (response) {
                console.log(response)
            }
        );
        function guidGenerator() {
            const S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }
    });
}


function hexToRgb(hex) {
    hex = hex.replace('#', '')
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

const diyClassName = 'a0d7b8e2dfb30cdf7460'
const data = {}

const dataDefault = {
    color: '#66ee66',
    opacity: 20,
    isShow: true,
}


function sendMsg() {
    const newColor = `rgba(${hexToRgb(data.color)}, ${data.opacity / 100})`
    chrome.storage.sync.set({
        isShow: data.isShow,
        colorStr: newColor,
        color: data.color,
        opacity: data.opacity
    }, function () {
        console.log('Change has been saved.');
    })
    sendMessageToFront({
        show: data.isShow,
        color: newColor
    })
}


for (const el of document.getElementsByClassName(diyClassName)) {
    el.addEventListener('change', function (e) {
        const key = e.target.dataset.name
        data[key] = e.target.type == 'checkbox' ? e.target.checked : e.target.value
        sendMsg()
    })
}

const t = setTimeout(() => {
    chrome.storage.sync.get(dataDefault, function (config) {
        data.color = config.color
        data.opacity = config.opacity
        data.isShow = config.isShow
        for (const el of document.getElementsByClassName(diyClassName)) {
            const key = el.dataset.name
            if (el.type == 'checkbox') {
                el.checked = config[key]
            } else {
                el.value = config[key]
            }
        }
    })
}, 120)
