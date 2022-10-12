let teamData, main, map;
let lastPage = "home";
const maxMembersOnHome = 5;
const arrow_back =`<div id="arrowAnim">
<div class="arrowSliding">
  <div class="arrow"></div>
</div>
<div class="arrowSliding delay1">
  <div class="arrow"></div>
</div>
<div class="arrowSliding delay2">
  <div class="arrow"></div>
</div>
<div class="arrowSliding delay3">
  <div class="arrow"></div>
</div>
</div>`;

/* return x (maxMembersOnHome) random members */
var randomMembers = function (obj) {
    var keys = Object.keys(obj);
    var result = [];
    var resultNames = [];
    while (result.length < maxMembersOnHome) {
        let elem = obj[keys[ keys.length * Math.random() << 0]];
        if (resultNames.indexOf(elem["name"]) == -1) {
            result.push(elem);
            resultNames.push(elem["name"]);
        }
    }
    return result;
};

/* compare function to order team by name for team page */
function compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
}

/* show/hide burger menu & burger button change */
function burgerButtonClick() {
    if (window.innerWidth < 700) {
        let elem = document.querySelector("nav");
        let burgerButton = document.querySelector(".burger-button");
        if (elem.style.width == "150px") {
            burgerButton.classList.remove("burger-button-change");
            elem.style.width = "0";
            elem.style.border = "0px solid #333";
        } else {
            burgerButton.classList.add("burger-button-change");
            elem.style.width = "150px";
            elem.style.border = "1px solid #333";
        }
    }
}

/* empty main */
function clearMain() {
    [].forEach.call(document.querySelectorAll("main *"), function(x) {
        x.remove();
    });
}

/* dark mode on/off */
function darkMode(mode) {
    let html = document.querySelector('html');
    let body = document.querySelector('body');
    let moon = document.querySelector('.moon');
    let brightness = document.querySelector('.brightness');
    let styles = getComputedStyle(body);
    if (mode == "light" || styles.getPropertyValue('--active-text-color') != styles.getPropertyValue('--light-mode-text')) {
        setCookie("lightMode", "light", 300);
        brightness.classList.add("hide");
        moon.classList.remove("hide");
        body.style.setProperty('--active-text-color', styles.getPropertyValue('--light-mode-text'));
        body.style.setProperty('--active-background-color', styles.getPropertyValue('--light-mode-background'));
        html.style.setProperty('background-color', styles.getPropertyValue('--light-mode-background'));
    } else {
        setCookie("lightMode", "dark", 300);
        moon.classList.add("hide");
        brightness.classList.remove("hide");
        body.style.setProperty('--active-text-color', styles.getPropertyValue('--dark-mode-text'));
        body.style.setProperty('--active-background-color', styles.getPropertyValue('--dark-mode-background'));
        html.style.setProperty('background-color', styles.getPropertyValue('--dark-mode-background'));
    }
}

/* make pictures and name links on home and team page */
function setTeamLinks() {
    const links = document.querySelectorAll("section div.member-link");
    for (let i=0; i < links.length; i++)
    {
        links[i].addEventListener('click', function() {
            const member = this.dataset.member;
            clearMain();
            main.innerHTML += "<div><img src=\"" + teamData[member]["photoURL"] + "\" alt=\"Photo miniature de " + teamData[member]["name"] + ".\" />" + arrow_back + "</div>";
            main.innerHTML += "<div class=\"details\"><h3>" + teamData[member]["name"] + "</h3><p>" + teamData[member]["description"] +"</p></div>";
            document.getElementById("arrowAnim").addEventListener("click", function() { clearMain(); burgerButtonClick(); loadContent(lastPage); });
            window.scrollTo(0, 0);
        });
    }
}

/* picture border change on hover/unhover */
function pictures_hover(element) {
    element.setAttribute('src', './assets/images/picture_border_hover.png');
}

function pictures_unhover(element) {
    element.setAttribute('src', './assets/images/picture_border.png');
}
/*                                       */



function setBodyWidthVar() {
    const body = document.querySelector("body");
    body.style.setProperty("--body-width", body.offsetWidth);
    console.log(body.offsetWidth);
}

/* js to set/get cookie */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";SameSite=None;Secure;path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
/*                      */

/* main changing content after menu click */
function loadContent(content) {
    lastPage = content;
    main = document.querySelector("main");
    burgerButtonClick();
    clearMain();

    switch(content) {
        case "team":
            main.innerHTML += "<div><img src=\"assets/images/team.jpg\" alt=\"Photo de groupe.\"/><p></p></div>";

            for (let teamMember in teamData) {
                main.innerHTML += "<section><div class=\"member-link thumb_" + teamMember + "\" data-member=\"" + teamMember + "\"><img src=\"./assets/images/picture_border.png\" onmouseover=\"pictures_hover(this);\" onmouseout=\"pictures_unhover(this);\" alt=\"Photo de " + teamData[teamMember]["name"] + ".\"/></div></section>";
                main.innerHTML += "<section><div class=\"member-link link\" data-member=\"" + teamMember + "\">" + teamData[teamMember]["name"] + "</div></section>";

                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                let avatar = new Image();
                avatar.src = teamData[teamMember]["photoURL"];
                avatar.addEventListener('load', function() {
                    if(teamData[teamMember]["gender"] == "male") {
                        ctx.drawImage(avatar, 100, 80, 700, 500, 0, 0, 350, 250);
                    } else {
                        ctx.drawImage(avatar, 100, 170, 700, 500, 0, 0, 350, 250);
                    }
                    let url = canvas.toDataURL();
                    document.getElementsByClassName("thumb_" + teamMember)[0].style.backgroundImage = 'url(\'' + url + '\')';
                }, false);
            }
            setTeamLinks();
            break;
        case "about":
            main.innerHTML += "<div><img src=\"assets/images/wild.jpg\" alt=\"Publicité de la Wild Code School.\"/><p></p></div>";
            main.innerHTML += "<section><div>Développeur web et web mobile</div></section>";
            main.innerHTML += "<section><div>Actuellement en formation, notre équipe va devenir la meilleure équipe de développement web de l'entreprise.</div></section>";
            main.innerHTML += "<section><div>La team pain au chocolat</div></section>";
            main.innerHTML += "<section><div>Contrairement à nos confrères de Marseille, notre équipe ne mange que des pains au chocolat certifiés 100% non chocolatine.</div></section>";
            main.innerHTML += "<section class=\"school\"><div>Notre école: La Wild Code School @Nantes</div></section>";
            main.innerHTML += "<section class=\"school school_map\"><div id=\"map\"></div></section>";
            if (map == undefined) {
                var script = document.createElement('script');
                script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB9yx2IQdSHi7szSs4hdnfpUTEXXfr64v8&callback=initMap';
                script.async = true;
                document.head.appendChild(script);
                function initMap() {
                    try {
                        map = new google.maps.Map(document.getElementById("map"), {
                            center: { lat: 47.211332473444585, lng: -1.5475160636762386 },
                            zoom: 17
                        });
                        const image = "./assets/images/wild-icon.png";
                        const beachMarker = new google.maps.Marker({
                        position: { lat: 47.211332473444585, lng: -1.5475160636762386 }, 
                        map,
                        icon: image,
                        });
                    } catch {}
                }
                window.initMap = initMap;
            } else {
                window.initMap();
            }
            break;
        case "contact_us":
            main.innerHTML += "<div><img src=\"assets/images/contact-us.png\" alt=\"Nous contacter.\"/><p></p></div>";
            main.innerHTML += "<form name=\"contactus\" action=\"mailto:samy-lamiri_student2022@wilder.school\" method=\"get\" enctype=\"text/plain\"><section><div>Pour nous contacter:</div></section>";
            main.innerHTML += "<section><div>Remplissez le formulaire ci-dessous.</div></section>";
            main.innerHTML += "<section><div><label for=\"name\">Nom:</label></div></section>";
            main.innerHTML += "<section><div><input type=\"text\" name=\"name\" placeholder=\"John Doe\" /></div></section>";
            main.innerHTML += "<section><div><label for=\"mail\">Mail:</label></div></section>";
            main.innerHTML += "<section><div><input type=\"text\" name=\"mail\" placeholder=\"john.doe@mail.com\" /></div></section>";
            main.innerHTML += "<section><div><label for=\"message\">Message:</label></div></section>";
            main.innerHTML += "<section><div><textarea name=\"message\" placeholder=\"Texte...\"></textarea></div></section>";
            main.innerHTML += "<section><div>Lorsque vous êtes prêt, cliquez sur <b>Envoyer</b>.</section>";
            main.innerHTML += "<section><div><button onclick=\"document.getElementsByName('contactus')[0].submit();\">Envoyer</button></section></form>";
            break;
        case "home":
        default:
            main.innerHTML += "<div><img src=\"assets/images/petit-lu.png\" alt=\"Logo des Dev-o-Beurre.\"/><p></p></div>";
            let homeMembers = randomMembers(teamData);
            for (let teamMember in homeMembers) {
                for (let member in teamData) {
                    if (teamData[member]["name"] == homeMembers[teamMember]["name"]) {
                        main.innerHTML += "<section><div class=\"member-link thumb_" + member + "\" data-member=\"" + member + "\"><img src=\"./assets/images/picture_border.png\" onmouseover=\"pictures_hover(this);\" onmouseout=\"pictures_unhover(this);\" alt=\"Photo de " + homeMembers[teamMember]["name"] + ".\"/></div></section>";
                        main.innerHTML += "<section><div class=\"member-link link\" data-member=\"" + member + "\">" + homeMembers[teamMember]["name"] + "</div></section>";

                        let canvas = document.createElement("canvas");
                        let ctx = canvas.getContext('2d');
                        let avatar = new Image();
                        avatar.src = homeMembers[teamMember]["photoURL"];
                        avatar.addEventListener('load', function() {
                            if(homeMembers[teamMember]["gender"] == "male") {
                                ctx.drawImage(avatar, 100, 80, 700, 500, 0, 0, 350, 250);
                            } else {
                                ctx.drawImage(avatar, 100, 170, 700, 500, 0, 0, 350, 250);
                            }
                            let url = canvas.toDataURL();
                            document.getElementsByClassName("thumb_" + member)[0].style.backgroundImage = 'url(\'' + url + '\')';
                        }, false);
                    }
                }
            }
            setTeamLinks();
            break;
    }
}

window.addEventListener("DOMContentLoaded", async (event) => {
    window.addEventListener("resize", setBodyWidthVar);
    setBodyWidthVar();
    /* make menu click event */
    var menu_elements = document.querySelectorAll('nav ul li');
    menu_elements[0].addEventListener('click', function() { 
        // Accueil
        loadContent("home");
    });
    menu_elements[1].addEventListener('click', function() { 
        // L'équipe
        loadContent("team");
    });
    menu_elements[2].addEventListener('click', function() { 
        // À propos
        loadContent("about");
    });
    menu_elements[3].addEventListener('click', function() { 
        // Contactez nous
        loadContent("contact_us");
    });
    /* show burger menu before content loading */
    burgerButtonClick();
    
    /* load team from file */
    const request = new Request("./assets/data.json");
    const response = await fetch(request);
    teamData = await response.json();
    teamData.sort(compare);
    /* load content */
    loadContent("home");
    const lightMode = getCookie("lightMode");
    if (lightMode != undefined && lightMode != null) {
        darkMode(lightMode);
    }
});