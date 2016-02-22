/*
 * Loads an HTML component and adds it to the current page
 *
 * onCromplete: The callback function when the component has loaded
 */
function loadComponent(name, onComplete) {
    var path = "resources/components/";
    var filename = name + ".html";
    
    $("#"+name).load(path + filename, onComplete);
}

/*
 * Loads a standard set of modules for each page to use
 *
 * onComplete: The callback function when all components have loaded
 */
function loadFramework(onComplete) {
    
    // The number of needed callback responses
    var numCallbacks = 0;
    // The number of successful callback responses
    var numComplete = 0;
    // True if all needed callbacks have been created, else false
    var allCallbacksCreated = false;
    
    // Runs onComplete if the necessary conditions are met
    function tryOnComplete() {
        if (numCallbacks == numComplete && allCallbacksCreated) {
            onComplete();
        }
    }
    
    // Adds to the count of total callbacks and returns a callback function
    function createCallback() {
        numCallbacks++;
        var callback = function() {
            numComplete++;
            tryOnComplete();
        }
        return callback;
    }
    
    // Called once all callbacks are created
    function onAllCallbacksCreated() {
        allCallbacksCreated = true;
        tryOnComplete();
    }
    
    // Loads the framework and calls onComplete when finished
    loadComponent("titlebar", createCallback());
    loadComponent("menu", createCallback());
    loadComponent("footer", createCallback());
    onAllCallbacksCreated();
}