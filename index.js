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

function toolbarIconEL() {
    $(".icon-box").click((event) => {
        $(".active-icon").removeClass("active-icon")
        $(event.currentTarget).addClass("active-icon")
        $(".screen-window").remove()
        $(".icon-box:last-child").remove()
    })
}

function desktopIconEL() {
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

function folderEL() {
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

function iconEL() {
    toolbarIconEL()
    desktopIconEL()
}

function addFolderViewEL() {
    $(".folder").click((event) => {
        let folderName = event.currentTarget.classList[1]
        folderName = folderName.charAt(0).toUpperCase() + folderName.slice(1)

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
            <img src="img/pdf.svg" alt="certificates icon" class="desktop-icon-img certificate" draggable="false">
            <p class="title">IEEExtreme 13.0</p>
        </div>
    </div>`)
    addExitFolderEL()
    folderEL()
    })
}

// Handle press on exit button
function addExitFolderEL() {
    $(".exit-icon").click(() => {
        $(".screen-window").remove()
        $(".active-icon").removeClass("active-icon")
        $(".icon-box:last-child").remove()
        $(".windows").addClass("active-icon")
        
    })
}

$(document).ready(function() {
    clock()
    swingAnimation()
    iconEL()
    addFolderViewEL()
});
   
