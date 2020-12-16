var pythonFunctionAnimationIndex = 0
var lampStatus = 0

class Clock {
    years; months; days; hours; minutes; seconds;

    getTime() {
        let currentDate = new Date()

        this.hours = currentDate.getHours()
        this.minutes = currentDate.getMinutes()
        this.seconds = currentDate.getSeconds()
        this.days = ("0" + currentDate.getDate()).slice(-2)
        this.months = ("0" + (currentDate.getMonth() + 1)).slice(-2)
        this.years = currentDate.getFullYear()
    }

    setClock() {
        let secondsRatio = this.seconds / 60
        let minutesRatio = (secondsRatio + this.minutes) / 60
        let hoursRatio = (minutesRatio + this.hours) / 12

        this.setRotation(".clock-second-hand", secondsRatio)
        this.setRotation(".clock-minute-hand", minutesRatio)
        this.setRotation(".clock-hour-hand", hoursRatio)
        
        let hoursString = ("0" + this.hours).slice(-2)
        let minutesString = ("0" + this.minutes).slice(-2)

        $(".toolbar-clock").text(hoursString + ":" + minutesString)
        $(".date").text(this.days + "." + this.months + "." + this.years + ".")
    }

    setRotation(element, rotationRatio) {
        $(element).get(0).style.setProperty("--rotate", rotationRatio * 360)
    }

    updateClock() {
        this.getTime()
        this.setClock()
    }
}

class Animations {
    static swingAnimation() {
        $(".picture-on-wall").hover(function() {
            $(this).addClass("animation-swing");
        });
            
        $(".picture-on-wall").bind('webkitAnimationEnd mozAnimationEnd animationEnd', function() {
            $(this).removeClass("animation-swing");
        });
    }

    static toggleLampLight() {
        $(".lamp-switch").click(() => {
            lampStatus = 1 - lampStatus
            $(".lamp-light").css("width",`calc(11% * ${lampStatus})`)
        })
    }

    static moveMouse() {
        $(".monitor-screen").mousemove((event) => {
            let screenOffset = $(".monitor-screen").offset()
            let screenTop = screenOffset.top - $(document).scrollTop()
            let screenLeft = screenOffset.left - $(document).scrollLeft()

            let screenWidth = $(".monitor-screen").width()
            let screenHeight = $(".monitor-screen").height()

            let mousePositionTop = ((event.clientY - screenTop) / screenHeight) * 100
            let mousePositionLeft = ((event.clientX - screenLeft) / screenWidth) * 100
            $(".mouse").css("transform",`scale(${(mousePositionTop / 100) * 0.3  + 1})`)
            $(".mouse").css({"top": `${mousePositionTop}%`, "left": `calc(${mousePositionLeft + 0.2 * mousePositionTop}%`})
        })
    }
}

class Windows {
    static addGoogleWindow() {
        $(".desktop").append(`<div class="screen-window google"><div class="window-head">
                <div class="window-logo">
                    <img src="img/chrome.svg">
                </div>
                <p class="window-title">Google Chrome</p>
                <img src="img/exit.svg" alt="exit" class="exit-icon">
            </div>
            <div class="web-address">
                <p>https://bippserino.com/links</p> 
            </div>
            <div class="links">
                <div class="page-icon-box facebook">
                    <img src="img/facebook.svg" alt="certificates icon" class="page-icon-img facebook" draggable="false">
                    <p class="title">Facebook</p>
                </div>
                <div class="page-icon-box github">
                    <img src="img/github.svg" alt="certificates icon" class="page-icon-img github" draggable="false">
                    <p class="title">Github</p>
                </div>
                <div class="page-icon-box linkedin">
                    <img src="img/linkedin.svg" alt="certificates icon" class="page-icon-img linkedin" draggable="false">
                    <p class="title">LinkedIn</p>
                </div>
            </div>
            </div>`)
    }

    static addFolderWindow(folderName) {
        $(".desktop").append(`<div class="screen-window folder"><div class="window-head">
                <p class="window-title">${folderName}</p>
                <img src="img/exit.svg" alt="exit" class="exit-icon">
            </div>
            <div class="window-path">
                <p>C:\\Users\\Bojan\\Desktop\\${folderName}\\</p> 
            </div>
            <div class="folder-icon-box html-certificate">
                <img src="img/pdf.svg" alt="certificates icon" class="desktop-icon-img certificate" draggable="false">
                <p class="title">Coursera-HTML 5</p>
            </div>
            <div class="folder-icon-box python-certificate">
                <img src="img/pdf.svg" alt="certificates icon" class="desktop-icon-img certificate" draggable="false">
                <p class="title">Coursera-Python</p>
            </div>
            <div class="folder-icon-box ieeextreme-certificate">
                <img src="img/pdf.svg" alt="certificates icon" class="desktop-icon-img certificate" draggable="false" title="3rd place in Croatia, 146th in the world">
                <p class="title">IEEExtreme 13.0</p>
            </div>
        </div>`)
    }

    static addPythonWindow() {
        $(".desktop").append(`<div class="screen-window python-window"><div class="window-head">
                <div class="window-logo">
                    <img src="img/python.svg">
                </div>
                <p class="window-title">Python</p>
                <img src="img/exit.svg" alt="exit" class="exit-icon">
            </div>
            <p class="python-version">Python 3.7.4. Type "help", "copyright", "credits" or "license()" for more information.</p>
            <p class="python-shell"><span class="shell-arrows">>>></span><span class="shell-function">Type something: </span><div class="cursor">|</div></p>
            <p class="shell-response"></p>
            </div>`)
    }

    static addExitWindowEL() {
        $(".exit-icon").click(() => {
            $(".screen-window").remove()
            $(".active-icon").removeClass("active-icon")
            $(".icon-box:last-child").remove()
            $(".windows").addClass("active-icon")
            pythonFunctionAnimationIndex = 0
        })
    }

    static folderEL() {
        $(".folder-icon-box ").click((event) => {
            switch (event.currentTarget.classList[1]) {
                case "html-certificate":
                    window.open("https://drive.google.com/file/d/1jBywQLzUrpU7QRoFSB9PpIt5c34VNNGb/view?usp=sharing","_blank")
                    break;
                
                case "python-certificate":
                    window.open("https://drive.google.com/file/d/1Ww_esPAXZHUHQPQD9ace_ykMR0R_bvor/view?usp=sharing","_blank")
                    break;
    
                case "ieeextreme-certificate":
                    window.open("https://drive.google.com/file/d/13X4rb8wLNGjp8FGrgjmpB7958nZ-mo1b/view?usp=sharing","_blank")
                    break;
            }
        })
    }

    static chromeEL() {
        $(".page-icon-box ").click((event) => {
            switch (event.currentTarget.classList[1]) {
                case "facebook":
                    window.open("https://www.facebook.com/bojan.mandic.9","_blank")
                    break;
                
                case "github":
                    window.open("https://github.com/Bippserino","_blank")
                    break;
    
                case "linkedin":
                    window.open("https://www.linkedin.com/in/bojan-mandi%C4%87/","_blank")
                    break;
            }
        })
    }

    static toggleCursor() {
        $(".cursor").toggle("hidden")
    }

    static typingAnimationEL() {
        $("body").keypress(() => {
            Windows.typingAnimation()
        })

        $(".screen-window").on("click",() => {

            $(".screen-window").off("click")
            for (let i = 1; i < 30; i++) {
                setTimeout(Windows.typingAnimation, i * 100)
            }
            
        })
    }

    static typingAnimation() {
        let wantedString = "getPythonSkillLevel(\"Bojan\")"
        let responses = ['Swapping time and space...', 'Trying to hack Rock\'s Instagram account...', 'Trying to find Waldo...', 'Downloading more RAM...']
        let afterResponses =['Converting matter to energy... ' , 'HaircutError: \'hair\' is not defined. ', 'Don\'t rush me, it\'s realy hard. OK?! ', 'Just kidding. Deleting Sys32. ']

        $(".python-shell").append(wantedString[pythonFunctionAnimationIndex])
        pythonFunctionAnimationIndex++
        if (pythonFunctionAnimationIndex == wantedString.length + 1) {
            $(".icon-box").off("click")
            let randomChoice = Math.floor(Math.random() * 4);
            console.log(randomChoice)
            $(".shell-response").append("Getting all perimiters... ")
            setTimeout(() => {
                $(".shell-response").append(responses[randomChoice])
            }, 1000)
            setTimeout(() => {
                $(".shell-response").append(afterResponses[randomChoice])
            }, 2000)
            setTimeout(() => {
                $(".shell-response").append(`<span class="skill-level">Current Python Skill Level: 3 - intermediate</span>`)
                $("body").off("keypress")
                $(".cursor").remove()
                $(".python-window").append(`<p class="python-shell"><span class="shell-arrows">>>></span><span class="shell-function"></span><div class="cursor">|</div></p>`)
                setInterval(Windows.toggleCursor(), 500)
                Toolbar.toolbarIconEL()
            },3000)
            
        }
    }
    
}

class Toolbar {
    static toolbarIconEL() {
        $(".icon-box").click((event) => {
            pythonFunctionAnimationIndex = 0
            $("body").off("keypress")
            $(".active-icon").removeClass("active-icon")
            $(event.currentTarget).addClass("active-icon")
            $(".screen-window").remove()
            $(".icon-box:last-child").remove()
            if (event.currentTarget.classList[1] === "chrome") {
                Windows.addGoogleWindow()
                Windows.addExitWindowEL()
                Windows.chromeEL()
            }

            else if (event.currentTarget.classList[1] === "python") {
                Windows.addPythonWindow()
                var cursor = setInterval(Windows.toggleCursor, 500)
                Windows.addExitWindowEL()
                Windows.typingAnimationEL()
            }
        })
    }
}

class Desktop {
    static desktopIconEL() {
        $(".desktop-icon-box").click((event) => {
            let iconPath = event.currentTarget.classList[2]
            $(".active-icon").removeClass("active-icon")
    
            if (iconPath === "folder") {
                $(".icons").append(`<div class="icon-box">
                    <img src="img/${iconPath}-icon.svg" alt="${iconPath} icon" class="icon ${iconPath}" draggable="false"></div>`)
                $(".icon-box:last-child").addClass("active-icon")
            }
    
            if (iconPath === "pdf") {
                window.open("https://drive.google.com/file/d/1861EsTNRAAiWFO9TZ9CmIFxO7n1a7Lfd/view?usp=sharing","_blank")
            }
        })
    }
    
    static folderIconEL() {
        $(".folder").click((event) => {
            let folderName = event.currentTarget.classList[1]
            folderName = folderName.charAt(0).toUpperCase() + folderName.slice(1)
            Windows.addFolderWindow(folderName)
            Windows.addExitWindowEL()
            Windows.folderEL()
        })
    }
}

function iconEL() {
    Toolbar.toolbarIconEL()
    Desktop.desktopIconEL()
}



var clock
$(document).ready(function() {
    clock = new Clock()
    clock.updateClock()
    setInterval(() => {
        clock.updateClock()
    }, 1000)

    Animations.swingAnimation()
    Animations.toggleLampLight()
    Animations.moveMouse()

    iconEL()

    Desktop.folderIconEL()
});
   
