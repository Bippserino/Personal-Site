
function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
        
    setRotation(".clock-second-hand", secondsRatio)
    setRotation(".clock-minute-hand", minutesRatio)
    setRotation(".clock-hour-hand", hoursRatio)
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


$(document).ready(function() {
    setClock()
    setInterval(setClock, 1000)
    swingAnimation()
});
   
