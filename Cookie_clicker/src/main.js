import { success, info } from "@pnotify/core"
import "@pnotify/core/dist/PNotify.css"
import "@pnotify/core/dist/BrightTheme.css"
import './styles/reset.scss'
import './styles/style.scss'

const htmlElements = {
    cookieButton: document.getElementById('cookieButton'),
    textCounter: document.getElementById('textCounter'),
    resetButton: document.getElementById('resetButton')
}

const CRUNCHSOUND = new Audio('./src/sound/hrust-suharej_001 (mp3cut.net).mp3')
const LEVELS = {
    Newbie: 25,
    'Cookie lover': 50,
    Pro: 100,
    'King of Cookies': 1000
}

let i = Number(localStorage.getItem("cookieCount")) || 0
htmlElements.textCounter.textContent = i

htmlElements.cookieButton.addEventListener('click', () => {
    i++
    
    htmlElements.textCounter.textContent = i
    localStorage.setItem("cookieCount", i)

    htmlElements.cookieButton.classList.add('cookie-shrink')

    setTimeout(() => {
        htmlElements.cookieButton.classList.remove('cookie-shrink')
    }, 200)

    CRUNCHSOUND.currentTime = 0
    CRUNCHSOUND.play()

    Object.entries(LEVELS).forEach(([key, value]) => {
        if (i == value) {
            success({
                text: `Congratulations! You have a new level: ${key}`,
                delay: 2500,
                sticker: false, 
                hide: true,     
            })
        }
    })
})

htmlElements.resetButton.addEventListener('click', () => {
    i = 0
    
    htmlElements.textCounter.textContent = i
    localStorage.setItem("cookieCount", i)

    info({
        text: `The counter has been reset.`,
        delay: 2500,
        sticker: false, 
        hide: true,   
    })
})