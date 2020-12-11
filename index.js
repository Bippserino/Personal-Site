function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12

    const hours = ("0" + currentDate.getHours()).slice(-2)
    const minutes = ("0" + currentDate.getMinutes()).slice(-2)
    const day = ("0" + currentDate.getDate()).slice(-2)
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2)
    const year = currentDate.getFullYear()
    
        
    setRotation(".clock-second-hand", secondsRatio)
    setRotation(".clock-minute-hand", minutesRatio)
    setRotation(".clock-hour-hand", hoursRatio)
    $(".toolbar-clock").text(hours + ":" + minutes)
    $(".date").text(day + "." + month + "." + year + ".")
}

function setRotation(element, rotationRatio) {
    $(element).get(0).style.setProperty("--rotate", rotationRatio * 360);
}

function swingAnimation() {
    $(".picture-on-wall").hover(function() {
        $(this).addClass("animation-swing");
    });
        
    $(".picture-on-wall").bind('webkitAnimationEnd mozAnimationEnd animationEnd', function() {
        $(this).removeClass("animation-swing");
    });
}

function clock() {
    setClock()
    setInterval(setClock, 1000)
}

$(document).ready(function() {
    clock()
    swingAnimation()
});
   
