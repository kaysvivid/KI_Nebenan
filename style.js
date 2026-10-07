const Hauptcover = document.body
const Button = document.getElementById ("eins");
const buttons = document.getElementById("Navbar").getElementsByTagName("button");

window.scrollTo({ top:0, left:0, behavior: "instant"})
Button.addEventListener ("click", ()=>{Hauptcover.classList.add ("hauptcover")});

function loadPage(pageID) {
    const content = document.getElementById('content'); //eine referenz zu wo das hinsoll am ende

    fetch(pageID + '.html') //das content + die html werden quasi vorbereitet um zusammengefügt zu werden
        .then(response => {
            if (response.status == 200) //200 ist der Standard (ist anscheinend einfach so)
                return response.text(); //wenn es funktioniert geht es zum Text weiter
            else throw new Error(response.status) //wenn es nicht funktioniert gibt es in der Console eine Nachricht
        })
        .then(html => {
            content.innerHTML = html; //die htmls werden hiermit offiziell mit dem content verbunden
        })
        .catch(error => { //wenn was falsch ist, wird alles gewiped damit kein komischer Text da ist und in der Console gibt es eine Nachricht
            content.innerHTML = '';
            console.log(error);
        });

    //markierung in der Nav leiste damit man weiß wo man ist
    for (let button of buttons) {
        if (button.id == pageID)
            button.classList.add("Selected");
        else button.classList.remove("Selected");
    }
}
for (let button of buttons) {
    button.addEventListener("click", () => loadPage(button.id)); //fügt das click event dazu, wo die loadPage mit der jeweiligen id aufgerufen wird damit die id dann den Text überschreibt mit einer anderen html
}

loadPage('indexfrage0'); //unsere Startseite

const scrollDelay = 7000;
const scrollingList = document.getElementById("ScrollingList");
function scheduleNextScroll() { setTimeout(advanceScroll, scrollDelay); }
function advanceScroll() {
    const currentScrollIdx = Math.floor(scrollingList.scrollLeft / scrollingList.scrollWidth * scrollingList.children.length); //beim wievielten zitat sind wir gerade?
    const scrollTarget = ((currentScrollIdx + 1) % scrollingList.children.length) * scrollingList.clientWidth; //wo ist die scroll position vom nächsten zitat?
    scrollingList.scroll({
        top: 0,
        left: scrollTarget,
        behavior: (scrollTarget > 0) ? "smooth" : "instant", //vom letzten zum ersten zitat instant (scrollTarget == 0), sonst mit 'smooth' animation (scrollTarget > 0)
    })
    scheduleNextScroll(); //das nächste scrollen mit delay in die wege leiten
}
scheduleNextScroll(); //das scrollen zum ersten mal starten