/*
 * Loads an HTML component and adds it to the current page
 */
function loadComponent(name) {
    // Some simple console.log tests
    console.log("loadComponent");
    console.log($("#"+name));
    
    var path = "resources/components/";
    var filename = name + ".html";
    
        $("#"+name).load(path + filename);
}

/*
 * Loads a standard set of components
 */
function loadFramework() {
    loadComponent("titlebar");
    loadComponent("menu");
    loadComponent("footer");
}

loadFramework();