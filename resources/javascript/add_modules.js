/*
 * Javascript module loader, courtesy Anthony Corbelli
 * http://www.htmlgoodies.com/beyond/javascript/article.php/3770326
 */
var cHead = document.getElementsByTagName("head");
var hHead = cHead[0];
function addModule(mFileName)
{
    var sTag = document.createElement("script"); //Create a SCRIPT tag
    sTag.setAttribute("src", mFileName); //Set the SCRIPT src=mFileName
    sTag.setAttribute("type", "text/javascript"); //set the SCRIPT type="text/javascript"
    hHead.appendChild(sTag); //Add it to your header section (parsed and run immediately)
}