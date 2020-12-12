class Clock {
    years; months; days; hours; minutes; seconds;

    getTime() {
        let currentDate = new Date()

        this.hours = ("0" + currentDate.getHours()).slice(-2)
        this.minutes = ("0" + currentDate.getMinutes()).slice(-2)
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
        $(".toolbar-clock").text(this.hours + ":" + this.minutes)
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
}

class Windows {
    static addGoogleWindow() {
        $(".desktop").append(`<div class="screen-window google"><div class="window-head">
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

    static addExitWindowEL() {
        $(".exit-icon").click(() => {
            $(".screen-window").remove()
            $(".active-icon").removeClass("active-icon")
            $(".icon-box:last-child").remove()
            $(".windows").addClass("active-icon")
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
                    window.open("https://github.com/Bippserino","_blank")
                    break;
            }
        })
    }
    
}

class Toolbar {
    static toolbarIconEL() {
        $(".icon-box").click((event) => {
            $(".active-icon").removeClass("active-icon")
            $(event.currentTarget).addClass("active-icon")
            $(".screen-window").remove()
            $(".icon-box:last-child").remove()
            if (event.currentTarget.classList[1] === "chrome") {
                Windows.addGoogleWindow()
                Windows.addExitWindowEL()
                Windows.chromeEL()
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
                window.open("https://drive.google.com/file/d/1Lksm5Z0q2RS_O4w9n68WfkYlq1NSeVUS/view?usp=sharing","_blank")
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

    iconEL()

    Desktop.folderIconEL()
});
   
