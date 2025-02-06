// Función para manejar el desplazamiento de la ventana
function windowScroll() {
    var navbar = document.getElementById("navbar-custom");
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
        navbar?.classList.add("nav-sticky");
    } else {
        navbar?.classList.remove("nav-sticky");
    }
}

// Inicializa Feather Icons
feather.replace();

// Añade un evento de desplazamiento a la ventana
window.addEventListener("scroll", e => {
    e.preventDefault();
    windowScroll();
});

// Configuración de las pestañas y los colapsables
var triggerTabList = [].slice.call(document.querySelectorAll("#tab-menu a"));
triggerTabList.forEach(function (tab) {
    var bootstrapTab = new bootstrap.Tab(tab);
    tab.addEventListener("click", function (e) {
        e.preventDefault();
        bootstrapTab.show();
        document.body.classList.remove("enlarge-menu");
    });
});

var collapses = document.querySelectorAll(".navbar-nav .collapse");
collapses.forEach(collapse => {
    var bootstrapCollapse = new bootstrap.Collapse(collapse, { toggle: false });

    collapse.addEventListener("show.bs.collapse", e => {
        e.stopPropagation();
        var parentCollapse = collapse.parentElement.closest(".collapse");
        if (parentCollapse) {
            parentCollapse.querySelectorAll(".collapse").forEach(innerCollapse => {
                var innerBootstrapCollapse = bootstrap.Collapse.getInstance(innerCollapse);
                if (innerBootstrapCollapse !== bootstrapCollapse) {
                    innerBootstrapCollapse.hide();
                }
            });
        }
    });

    collapse.addEventListener("hide.bs.collapse", e => {
        e.stopPropagation();
        collapse.querySelectorAll(".collapse").forEach(innerCollapse => {
            bootstrap.Collapse.getInstance(innerCollapse).hide();
        });
    });
});

// Manejo del evento de clic para el botón de menú
   /* let menu = document.getElementById("togglemenu")
    if(menu){
        document.getElementById("togglemenu").addEventListener("click", function (e) {
            e.preventDefault();
            console.log("togglemenu")
            document.body.classList.toggle("enlarge-menu");
        });

    }  */  
   

// Ajustes de clase según el ancho de la pantalla
function adjustBodyClasses() {
    var body = document.body;
    if (window.screen.width < 1025) {
        body.classList.add("enlarge-menu", "enlarge-menu-all");
    } else if (window.screen.width < 1340) {
        body.classList.remove("enlarge-menu-all");
        body.classList.add("enlarge-menu");
    }
}

adjustBodyClasses();
window.addEventListener("resize", adjustBodyClasses);

// Activar el menú según la URL actual
var leftbarTabs = document.querySelectorAll(".leftbar-tab-menu a");
var currentUrl = window.location.href.split(/[?#]/)[0];
leftbarTabs.forEach(tab => {
    if (tab.href === currentUrl) {
        tab.classList.add("active");

        var parentCollapse = tab.closest(".collapse");
        if (parentCollapse) {
            parentCollapse.classList.add("show");
            var parentLink = parentCollapse.parentElement.querySelector("a");
            if (parentLink) {
                parentLink.classList.remove("collapsed");
                parentLink.setAttribute("aria-expanded", "true");
            }
        }

        var tabPane = tab.closest(".tab-pane");
        if (tabPane) {
            tabPane.classList.add("active");
            document.querySelectorAll("a").forEach(anchor => {
                if (anchor.href.includes(tabPane.id)) {
                    anchor.classList.add("active");
                }
            });
        }
    }
});

// Inicializa los tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.forEach(function (tooltipTrigger) {
    new bootstrap.Tooltip(tooltipTrigger);
});

// Manejo de dropdowns
var dropdowns = document.querySelectorAll(".dropup, .dropend, .dropdown, .dropstart");
var events = ["click"];

function toggleDropdown(e, dropdown) {
    var dropdownMenu = dropdown.querySelector(".dropdown-menu");
    if (dropdownMenu) {
        e.preventDefault();
        e.stopPropagation();
        var allDropdowns = dropdown.closest(".dropdown-menu").querySelectorAll(".dropdown-menu");
        allDropdowns.forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.classList.remove("show");
            }
        });
        dropdownMenu.classList.add("show");
    }
}

function hideDropdowns(dropdown) {
    var dropdownMenu = dropdown.querySelector(".dropdown-menu");
    if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
    }
}

dropdowns.forEach(dropdown => {
    var toggleButton = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    if (toggleButton) {
        toggleButton.addEventListener(events[0], e => toggleDropdown(e, dropdown));
    } else {
        hideDropdowns(dropdown);
    }
});

// Activa el menú según la URL
function activateMenu() {
    var subMenuItems = document.getElementsByClassName("sub-menu-item");
    for (var i = 0; i < subMenuItems.length; i++) {
        if (subMenuItems[i].href === window.location.href) {
            var activeItem = subMenuItems[i];
            activeItem.classList.add("active");
            var closestLi = getClosest(activeItem, "li");
            if (closestLi) {
                closestLi.classList.add("active");
            }
            var closestParentMenuItem = getClosest(activeItem, ".parent-menu-item");
            if (closestParentMenuItem) {
                closestParentMenuItem.classList.add("active");
                var parentMenuLink = closestParentMenuItem.querySelector(".menu-item");
                if (parentMenuLink) {
                    parentMenuLink.classList.add("active");
                }
            }
        }
    }
}

// Activar el menú según la URL
activateMenu();

// Manejo de eventos para el navbar toggle
/*document.querySelector(".navbar-toggle").addEventListener("click", function (e) {
    e.target.classList.toggle("open");
});*/
