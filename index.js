
class Clock {
    static setClock() {
        const currentDate = new Date()
        const secondsRatio = currentDate.getSeconds() / 60
        const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
        const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
        
        Clock.setRotation(".clock-second-hand", secondsRatio)
        Clock.setRotation(".clock-minute-hand", minutesRatio)
        Clock.setRotation(".clock-hour-hand", hoursRatio)
    }

    static setRotation(element, rotationRatio) {
        $(element).get(0).style.setProperty("--rotate", rotationRatio * 360);
    }
}

Clock.setClock()
setInterval(Clock.setClock, 1000)