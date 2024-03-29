let firstCol = document.getElementById("first-col");
let secondCol = document.getElementById("second-col");
let thirdCol = document.getElementById("back-col");
let viewportBreakpoint = 1024; //viewport width to be considered "desktop"
let crabs = 7; //Neven enough crabs
let midCol = "col-md-6";
let fullCol = "col-lg-12";
let lesCrabes = ".....(\\/)(°,,,,°)(\\/)"
let lesOtherCrabes = "(\\/)(°,,,,°)(\\/)....."
let floatingMenu = document.getElementById("main-menu");
let mainContainer = document.getElementById("main-container");
let crabCounter = 0;

/** starts with correct layout */
if(window.innerWidth <= viewportBreakpoint)
{
    activateOffcanvas();
    activateMobileStyle();
}

/** real-time viewport check to always adjust the layout */
window.addEventListener("resize", () => {
    if(window.innerWidth <= viewportBreakpoint)
    {
        /** if we are in ipad/mobile (or res < 720p) center the content of the third column */
        thirdCol.classList.remove(midCol);
        thirdCol.classList.add(fullCol);

        activateOffcanvas();
        activateMobileStyle();

    }
    else
    {
        thirdCol.classList.remove(fullCol);
        thirdCol.classList.add(midCol);

        deactivateOffcanvas();
        deactivateMobileStyle();
    }
});

/** if an opacity is set and the user clicks wherever, deactivate opacity */
mainContainer.addEventListener("click", () => {
    if(mainContainer.hasAttribute("style"))
    {
        mainContainer.removeAttribute("style");
    }
})

/** remove opacity once the user has ended using the nav button */
document.getElementById("dropdown-menu").addEventListener("click", () => {
    if(mainContainer.hasAttribute("style"))
    {
        mainContainer.removeAttribute("style");
    }
})

/** set opacity when the nav button is pressed */
floatingMenu.addEventListener("click", () => {
    
    if(mainContainer.hasAttribute("style"))
    {
        mainContainer.removeAttribute("style");
    }
    else
    {
        mainContainer.setAttribute("style", "opacity: 0.3;")
    }
})

/** Crab time */
document.getElementById("les-crabes").addEventListener("click", () =>{

    document.getElementById("les-crabes").innerHTML +=  lesOtherCrabes;
    crabCounter++;

    if(crabCounter == 10)
    {
        document.getElementById("les-crabes").style.color = "#cd7f84";
    } else if(crabCounter == 35)
    {
        document.getElementById("les-crabes").style.fontSize = "15px";
    } else if(crabCounter == 60)
    {
        document.getElementById("les-crabes").style.fontSize = "10px";
        let allStrings = Array.from(document.querySelectorAll("p"));
        for(let i = 0; i < allStrings.length; i++)
        {
            if(allStrings[i].id == "les-crabes")
            {
                continue;
            }
            else
            {
                allStrings[i].innerHTML = lesCrabes + ".....";
            }
        }

        allStrings = Array.from(document.querySelectorAll("a"));
        for(let i = 0; i < allStrings.length; i++)
        {
            allStrings[i].innerHTML = lesCrabes + ".....";
        }

        allStrings = Array.from(document.querySelectorAll("th"));
        for(let i = 0; i < allStrings.length; i++)
        {
            allStrings[i].innerHTML = lesCrabes + ".....";
        }

        allStrings = Array.from(document.querySelectorAll("button"));
        for(let i = 0; i < allStrings.length; i++)
        {
            allStrings[i].innerHTML = lesCrabes + ".....";
        }

        allStrings = Array.from(document.getElementsByClassName("accordion-body"));
        for(let i = 0; i < allStrings.length; i++)
        {
            allStrings[i].innerHTML = lesCrabes + ".....";
        }
        
    } else if(crabCounter == 100)
    {
        let url = "https://www.youtube.com/watch?v=cE0wfjsybIQ&ab_channel=Noisestorm"
        window.open(url,'_blank');
    }
})


function activateOffcanvas()
{
    /** if we are in ipad/mobile (or res < 720p) view the second column as an offcanvas */
    secondCol.setAttribute("tabindex", -1);
    secondCol.setAttribute("aria-labelledby", "second-col-label");
    secondCol.classList.remove("main-col");
    secondCol.classList.add("offcanvas");
    secondCol.classList.add("offcanvas-start");
}

function deactivateOffcanvas()
{
    /** if we modify the resolution from under 720 to above 720, reverse the offcanvas to a column */
    secondCol.classList.add("main-col");
    secondCol.classList.remove("offcanvas");
    secondCol.classList.remove("offcanvas-start");
    secondCol.removeAttribute("tabindex");
    secondCol.removeAttribute("aria-labelledby");
    secondCol.removeAttribute("style"); //prevent visual glitches if the user has used the offcanvas mode right before switching to desktop view
}

function activateMobileStyle()
{
    /** Actions that changes the layout to better fit mobile screens */
    document.getElementById("les-crabes").innerHTML=  lesCrabes + ".....";
    document.querySelector("#contacts > p").classList.remove("text-end");
    document.getElementById("alternative-contacts").append(document.getElementById("contacts"));
    document.getElementById("alternative-contacts").removeAttribute("style");
}

function deactivateMobileStyle()
{
    /** rollback to desktop view if the viewport is changed enough */
    document.getElementById("les-crabes").innerHTML= "";

    for(let i = 0; i < crabs; i++)
    {
        document.getElementById("les-crabes").innerHTML += lesCrabes;
    }


    if(document.querySelector("#alternative-contacts > #contacts") != undefined) 
    {
        document.getElementById("back-col").append(document.getElementById("contacts"));
        document.getElementById("alternative-contacts").setAttribute("style", "display: none")
    }
    document.getElementById("les-crabes").innerHTML += ".....";
    document.querySelector("#contacts > p").classList.add("text-end");
}