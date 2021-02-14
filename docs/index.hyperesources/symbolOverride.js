/*
  
                  ++++++ SYMBOL OVERRIDE EXTENSION    ++++++
                  
                  By Mark Hunte 2021
                  Versions: 1.1.0
                  MIT License
                  Copyright (c) Mark Hunte 2021
                  
                  Permission is hereby granted, free of charge, to any person obtaining a copy
                  of this software and associated documentation files (the "Software"), to deal
                  in the Software without restriction, including without limitation the rights
                  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                  copies of the Software, and to permit persons to whom the Software is
                  furnished to do so, subject to the following conditions:
                  
                  The above copyright notice and this permission notice shall be included in all
                  copies or substantial portions of the Software.
                  
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                  SOFTWARE.
                  ===============================================================================
  
   This Extension will run on Symbol Load (HypeSymbolLoad).
  
  Hype Symbol instances share all the same HTML properties, child elements , timelines etc.
  
   It is often the case that you want each Symbol's instance to use different parameters when they appear on scene.
  
   For example you may be using a Symbol to display images and text but want different images and text in each..
  
   Individual Symbol instance properties can be overriden to allow each instance of the symbol to  be displayed differently and behave differently from each other at load time.
   
  
  Each Symbol's Child element can be assigned dataset key names  [data-bindingName] and [Property] names.
  
  When a Parent  Symbol 'Instance' element  has a matching 'data-bindingName' and is given a 'value' the child element will use the 'value' to overide it's targeted property
 
 Symbol elements can also share the same data-bindingName and will be overriden with the same value.
 
 For full documentation and guide go to :
    https://github.com/markhunte/Hype_Symbol_Override_Extension
 */


if('symbolOverride' in window === false) window['symbolOverride'] = (function() {
 
                                                                     
                                                                   
 

  function symbolOverride_extension(hypeDocument, element, event) {




//----- turn DEBUGGER true = ON or false = OFF ----
print_debug = false




//======================================  DO NOT EDIT BELOW ======================================\

//-- THIS SYMBOL
print_debugdemand = true  //-- for on demand logging from hype function and using inside:  hypeDocument.printDebugList()
var thisSymbol = hypeDocument.getSymbolInstanceById(element.id)
var theDataSet = element.dataset


//+++++++++ For debug function  ++++++>
addIDtoChildFordebugger()

//--- ITERATE OVER SYMBOL DATASET

for( var key in theDataSet){


//+++++++++ For debug function  ++++++>
setDefaultsOnPropertyTypes()
//+++++++++<


//++++++ MAIN CODE FOR DATA SETS
try {


    var theseElements = element.querySelectorAll('[data-' + key + ']')
      if (theseElements.length == 0){
            throw '[data-' + key + '] was not a found';
         }
         
         var i;
         for (i = 0; i < theseElements.length; i++) {
             var thisElement  = theseElements[i]


if (typeof thisElement != "undefined"){

var property_string = thisElement.dataset[key]

    
    var property_array = property_string.split(':')
    var caseCondition = property_array[0].trim()
    
     // and the last will be the value
     var property_ = property_array[(property_array.length - 1)].trim()
    
  
    //++ TEST if a CSS property

    var result =  CSS.supports(property_ + " : " + theDataSet[key]);
    
   /*++ The setElementPropety API properties will resolve as css type if they have the css: type name
    
    Some setElementPropety API Properties will always resolve as css even with the Hype anme or not so we treat them as a special cases below.
    */
     
    if (result){
        
        
        
        var property_Ar  = ['opacity','z-index']
       /* Special cases, Will resolve as css always if we do not check here and Not as Hype API.
        Must explicitly name type as css: to override with CSS
        */
        if (! property_Ar.includes(property_)  ){

            caseCondition = "css"
               }
    }
    
    
switch( caseCondition) {

//+++ CSS STYLE  TYPE ATTRIBUTES
case 'css'  :
 if (property_ == 'z-index'  ) {
           
          //-- The css needs to z-index the container
           thisElement.parentNode.style[property_] = theDataSet[key]
       
        } else {
           
            thisElement.style[property_] = theDataSet[key]
       }
       


hype_api = false
css_ = true
element_ = false
general_element = false


break;

//+++ HYPE API TYPE ATTRIBUTES

case 'hype':
case 'top':
case 'left':
case 'width':
case 'height':
case 'rotateZ':
case 'scaleX':
case 'scaleY':
case 'opacity':
case 'z-index':
case 'background-image':

     


var splitValues = theDataSet[key].split(',')
var propName = caseCondition

//-- We may or may not have a specified hype type , but want to catch them as well as hype types here. Sow e only ever use Hype API for these.
//-- wee need to swap around  property_ & caseCondition
if (caseCondition == "hype"){
propName =  property_
}


var value  = splitValues[0]
var duration  = splitValues[1]
var timingFunctionNameOrMathEquationFunction  = splitValues[2]


hypeDocument.setElementProperty( thisElement, propName, value,duration,timingFunctionNameOrMathEquationFunction)
 
hype_api = true
css_ = false
element_ =false
general_element = false
break;
case 'element'  :

thisElement[property_]  = theDataSet[key]

hype_api = false
css_ = false
element_ = true
general_element = false

break;
default:
//+++ OTHER GENERAL TYPE ATTRIBUTES
 
thisElement[property_string]  = theDataSet[key]

        
        hype_api = false
        css_ = false
        element_ = false
        general_element = true
}

//+++++++++ STEMMING FUNCTION ++++++
if (typeof  hypeDocument.functions().stem == 'function') {
    
hypeDocument.functions().stem(hypeDocument, { 'theDataSet':theDataSet,'key':key,'thisElement':thisElement,'property_string':property_string,'caseCondition':caseCondition}, event)
 
}



//+++++++++ DEBUG DATA ++++++

loadDebugDataTransfer(thisElement,key,theDataSet,caseCondition,property_,splitValues,hype_api,propName,value,duration,timingFunctionNameOrMathEquationFunction)

 

}
}
    //--reset
    reset ()
}

catch(err) {

print_debug = false
print_debugdemand = false
thrown(err  )


}



}//--end for





//================================================================ Debug -- logging below ====
if ( print_debug  ){

debug()

}
debugondemand()

//--DEBUG PRINT OUT SETUP

function debugBuild(elementID,theDataSet){


overrides_completed.push("Symbol id  : " +   elementID )

Symbol_Instance_Overrides_expected.push( theDataSet)


}


//++++ DEBUG LOGS
function debug(){
//===+++ if we change print_debug to true within extension
    console.log({"DEBUG: Symbol overriden  " :element.id,'Symbol_Instance_Overrides_expected':  Symbol_Instance_Overrides_expected, 'overrides_completed': overrides_completed})


reset ()
                                                                    
}
      
      
function debugondemand(){
    //===+++ if we use hypeDocument.printDebugList()  from a normal Hype function
    if (print_debugdemand){
    debuglist.push({"DEBUG: Symbol overriden  " :element.id,'Symbol_Instance_Overrides_expected':  Symbol_Instance_Overrides_expected, 'overrides_completed': overrides_completed})
     Symbols_Overriden =  debuglist

    }
      }


//+++ ERROR LOGS
function thrown(err ){

    console.log( err )
    console.log( err.name  + ' - Symbol override Extension May have a mismatch in ' , 'Symbol - ' + element.id,{'Error with  Override : data-bindingName ':key, 'override property ':  caseCondition ,'override  property ':  property_ ,  Symbol_Instance_Overrides_expected,'overrides_completed': overrides_completed}  )


reset ()

}







function addIDtoChildFordebugger(){
//--Add a dataset key/value to the symbol child element
//-- We will use this late for thrown errors and debug to get symbol instance id

var symbChildren =        element.querySelectorAll('.HYPE_element')

for (i = 0; i < symbChildren.length; ++i) {

symbChildren[i].dataset.childSymbEl_ = 'childSymbEl_' +  element.id
}


overrides_completed =[]
Symbol_Instance_Overrides_expected =[]
debugBuild(element.id,theDataSet)



}


function  setDefaultsOnPropertyTypes(){
hype_api = false
css_ = false
element_ = false
general_element = false
}


function loadDebugDataTransfer(thisElement,key,theDataSet,caseCondition,property_,splitValues,hype_api,propName,value,duration,timingFunctionNameOrMathEquationFunction){


overrides_completed.push({
                         
                         "Element id": thisElement.id,
                         "Element Key":key,
                         
                         
                         "Element target value":theDataSet[key],
                         "css Type property" :css_,
                         "caseCondition ":caseCondition,
                         "property_": property_,
                         "splitValues": splitValues,
                         "hype_api Type property": hype_api,
                         "hype_api propName": propName ,
                         "hype_api value": value ,
                         "hype_api duration": duration ,
                         "hype_api timing": timingFunctionNameOrMathEquationFunction,
                         "element Type property" :element_,
                        "General element Type property" :general_element,
    
                         
                         })
}

function reset(){

key =""
caseCondition = undefined
property_ = undefined
splitValues = undefined
propName = undefined
value = undefined
duration = undefined
timingFunctionNameOrMathEquationFunction = undefined

hype_api =false
css_ = false
element_ = false
general_element = false

}




return true;
}

    var debuglist = []
    var  Symbols_Overriden  = {}

                                                                       
   var printDebugList = function(hypeDocument){

       if (Symbols_Overriden.length > 0){
           
           Symbols_Overriden.forEach(element => console.log('DEBUG: Symbol overriden',element));
           
       }
    
   };
    
//////////////
function HypeDocumentLoad (hypeDocument, element, event) {
                                                                    
 hypeDocument.printDebugList = function(hypeDocument){
 printDebugList();
 }

}


///////////////

if("HYPE_eventListeners" in window === false) {
window.HYPE_eventListeners = Array();
}
window.HYPE_eventListeners.push({"type":"HypeSymbolLoad", "callback":symbolOverride_extension});
window.HYPE_eventListeners.push({"type":"HypeSceneLoad", "callback":HypeDocumentLoad});

return {
  'printDebugList' : printDebugList
};

})();
