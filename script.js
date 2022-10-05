function burgerButtonClick() {
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

function clearMain() {
    [].forEach.call(document.querySelectorAll("main *"), function(x) {
        x.remove();
    });
}

function darkMode() {
    let body = document.querySelector('body');
    let moon = document.querySelector('.moon');
    let brightness = document.querySelector('.brightness');
    let styles = getComputedStyle(body);
    if (styles.getPropertyValue('--active-text-color') != styles.getPropertyValue('--light-mode-text')) {
        brightness.classList.add("hide");
        moon.classList.remove("hide");
        body.style.setProperty('--active-text-color', styles.getPropertyValue('--light-mode-text'));
        body.style.setProperty('--active-background-color', styles.getPropertyValue('--light-mode-background'));
    } else {
        moon.classList.add("hide");
        brightness.classList.remove("hide");
        body.style.setProperty('--active-text-color', styles.getPropertyValue('--dark-mode-text'));
        body.style.setProperty('--active-background-color', styles.getPropertyValue('--dark-mode-background'));
    }
}

function loadContent(content) {
    burgerButtonClick();
    clearMain();
    let main = document.querySelector("main");

    switch(content) {
        case "team":
            main.innerHTML += "<div><img src=\"assets/images/team.png\" /><p></p></div>";

            for (let i=0; i< 15; i++) {
                main.innerHTML += "<section><div>photo</div></section>";
                main.innerHTML += "<section><div>Prénom N. (lien)</div></section>";
            }
            break;
        case "about":
            main.innerHTML += "<div><img src=\"assets/images/wild.png\" /><p></p></div>";
            main.innerHTML += "<section><div>Développeur web et web mobile</div></section>";
            main.innerHTML += "<section><div>Actuellement en formation, notre équipe va devenir la meilleure équipe de développement web de l'entreprise.</div></section>";
            main.innerHTML += "<section><div>La team pain au chocolat</div></section>";
            main.innerHTML += "<section><div>Contrairement à nos confrères de Marseille, notre équipe ne mange que des pains au chocolat certifié 100% non chocolatine.</div></section>";
            main.innerHTML += "<section><div>Notre école: La Wild Code School @Nantes</div></section>";
            main.innerHTML += "<section><div>Gg Map ici...</div></section>";
            break;
        case "contact_us":
            main.innerHTML += "<div><img src=\"assets/images/contact-us.jpeg\" /><p></p></div>";
            main.innerHTML += "<section><div>La team pain au chocolat</div></section>";
            main.innerHTML += "<section><div>Contrairement à leurs confrères de Marseille, notre équipe ne mange que des pains au chocolat certifié 100% non chocolatine.</div></section>";
            main.innerHTML += "<section><div>Notre école</div></section>";
            main.innerHTML += "<section><div>Gg Map ici...</div></section>";
            break;
        case "home":
        default:
            main.innerHTML += "<div><img src=\"assets/images/petit-lu.png\" /><p></p></div>";
            
            main.innerHTML += "<section><div>photo</div></section>";
            main.innerHTML += "<section><div>Prénom N. (lien)</div></section>";
            main.innerHTML += "<section><div>photo</div></section>";
            main.innerHTML += "<section><div>Prénom N. (lien)</div></section>";
            main.innerHTML += "<section><div>photo</div></section>";
            main.innerHTML += "<section><div>Prénom N. (lien)</div></section>";
            main.innerHTML += "<section><div>photo</div></section>";
            main.innerHTML += "<section><div>Prénom N. (lien)</div></section>";
            break;
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
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
    burgerButtonClick();
    loadContent("home");
});