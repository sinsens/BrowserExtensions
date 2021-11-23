function createId() {
    const length = 10
    let id = ''

    for (; id.length < length;) {
        let num = Math.round(Math.random() * 100)
        while (num < 64 || num > 90) {
            num = Math.round(Math.random() * 100)
        }
        const c = String.fromCharCode(num)
        id += c
    }
    return id
}


const musk = document.createElement('div')
musk.style.background = 'rgba(10, 10, 10, 0.5)'
musk.style.position = 'fixed'
musk.style.width = '100%'
musk.style.height = '100%'
musk.style.zIndex = 99999
musk.style.pointerEvents = 'none'
//musk.style.display = 'none'
musk.style.bottom = 0

const dataDefault = {
    color: '#66ee66',
    opacity: 20,
    isShow: true,
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.show) {
        musk.style.background = request.color
        musk.id = request.id
        document.querySelector('body').prepend(musk)
    } else {
        musk.remove()
    }
    sendResponse({ fromcontent: 'SuperMusk:Ok!' });
});

chrome.storage.sync.get(dataDefault, function (config) {
    if (config.isShow) {
        musk.style.background = config.colorStr
        document.querySelector('body').prepend(musk)
    } else {
        musk.remove()
    }        
})