// --- Utility functions ---

function criticalWidth() {
    // The width at which the style sheet switch out
    return 700
}

function pageWidth() {
    return document.body.clientWidth
}

function currentScroll() {
    return document.body.scrollTop
}

function px(num) {
    // Returns the number formatted as a pixel measurement
    return ""+num+"px"
}

function iter(list, f) {
    // Iterates over a list
    for(var i=0; i<list.length; i++) {
        f(list[i])
    }
}

function contains(list, el) {
    iter(list, function(listEl) {
        console.log(listEl)
        if(el == listEl) {return true;}
    })
    return false;
}

function hasClass(el, className) {
    // Returns true if an element has className as a class
    return contains(el.classList, className)
}

function parseColor(input) {
    /* Parses a color from an "rgb(r, g, b)" string. Returns [r,g,b] if succeeded, [] if failed
     * Courtesy of StackOverflow: http://stackoverflow.com/questions/11068240
     */
    var m = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if(m) {
        return [m[1],m[2],m[3]];
    }
    return []
}

function rgbString(rgb) {
    // Converts a 3-element rgb array to a string
    return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")"
}

// --- Menu configuration - color changes, cursor styles ---

function changeColor(elem, field, fromColor, toColor, t) {
    /* Changes element elem's style field, field, from fromColor to toColor (3-element rgb arrays) in time t
     *
     * elem: The target element
     * field: The element's style field that will change color
     * fromColor: The starting color in the form [r,g,b]
     * toColor: The ending color in the form [r,g,b]
     * t: The total transition time
     */
    
    var timeStep = 20;
    var iterations = 0;
    var maxIterations = t / timeStep
    
    function transFunction() {
        iterations++;
        if (iterations > maxIterations) {
            clearInterval(transition);
        }
        
        var currColor = [0,0,0];
        for (var i=0; i<3; i++) {
            toRatio = Math.min(iterations / maxIterations, 1)
            fromRatio = 1 - toRatio
            
            currColor[i] += toColor[i] * toRatio
            currColor[i] += fromColor[i] * fromRatio
            currColor[i] = Math.round(currColor[i])
        }
        
        elem.style[field] = rgbString(currColor);
    }
    
    var transition = setInterval(transFunction, timeStep);
    return transition;
}

function addHighlighting(el) {
    // Adds highlighting to an element on mouseover
    
    var highlightTime = 100
    var deHighlightTime = 200
    var black = [0,0,0]
    var highlighted = [220,30,30]
    
    // Turns an element dark red on mouseover
    var mouseover = function() {
        if(this.mouseoutTransition) {clearInterval(this.mouseoutTransition);}
        this.mouseoverTransition = changeColor(this, "color", black, highlighted, highlightTime);
    }
    
    // Turns an element black on mouseout
    var mouseout = function() {
        if(this.mouseoverTransition) {clearInterval(this.mouseoverTransition);}
        this.mouseoutTransition = changeColor(this, "color", highlighted, black, deHighlightTime);
    }
    
    // Sets up mouseover/out behavior
    el.onmouseover = mouseover;
    el.onmouseout = mouseout;
}

function setCursor(el, value) {
    // Changes the cursor on nonlinking menu items to plain
    el.style.cursor = value
}

function configureMenu() {
    // Adds highlighting and configures cursor
    targetClass = "menu-item";
    iter(document.getElementsByClassName(targetClass), function(el) {
        addHighlighting(el)
        setCursor(el, "pointer")
        console.log()
    });
}
configureMenu()

// --- Submenu setup ---

function formatDropdown(submenu) {
    parent = submenu.parentElement
    bounds = parent.getBoundingClientRect()
    
    // Determines whether to align with the parent element's bottom or top
    alignBottom = (pageWidth() >= criticalWidth())
    
    if(alignBottom) {
        // Align bottom
        submenu.style.top = px(bounds.bottom + currentScroll())
        submenu.style.left = px(bounds.left)
    } else {
        // Align right
        submenu.style.top = px(bounds.top + currentScroll())
        submenu.style.left = px(bounds.right)
    }
}

function formatDropdowns() {
    iter(document.getElementsByClassName("submenu"), function(s) {
        formatDropdown(s)
    })
}
formatDropdowns();

function setupDropdowns() {
    // Forces formatDropdowns to run on mouseover
    iter(document.getElementsByClassName("submenu"), function(submenu) {
        parent = submenu.parentElement
        parent.onmouseover = function() {formatDropdown(submenu)}
    })
}
setupDropdowns()
