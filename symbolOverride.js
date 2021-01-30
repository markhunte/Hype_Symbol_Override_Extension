
function symbolOverride_extension(hypeDocument, element, event) {
/**
                ++++++ SYMBOL OVERRIDE EXTENSION    ++++++
                
                By Mark Hunte 2021
                Versions: 1.0.0
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

This Extension will run on Symbol Load.

Although Hype Symbol instances share all the same HTML properties, childrencelements , timelines etc.

It is often the case that you want each instance to use different parameters  when they appear on scene

Individual Symbol instance properies can be overriden to allow each instance of the symbol to  be displayed differently and behave differently from each other at load time.

Each Symbol Instance can be assign dataset key names  (*data-elementRef_*) and values.

Any Symbol Instance's children that have the matching dataset key name will use the value to overide it's properties

Each dataset key name must only be used per child element. Any child element must have its own unique dataset key name.
The overriden properties can be noramal css properties, hypeDocument.setElementProperty() properties or other proberties that can normally be set with javascript.

A Symbol Instance is an instance of a single Symbol on a scene . There can be many instances of the same Symbol on a scene.

You only have to set up the Symbol and its childrens elements once.
You can add a new dataset key name and value at any time.

A Symbol's child elements  may have a  dataset key names (*data-elementRef_*) and values  but the Symbol itself does not have to have, use any or all of them.
Element dataset key names (*data-elementRef_*)   that are used, must match in the Parent Symbol


•You then can change any of an instance on scene's value.
•You can add a new dataset key name and value at any time.
•You do not have to use all the dataset key names and value in a given Symbol instance.
•dataset key names Must match from Parent Symbol to the targeted child.


Symbol data attribute:

@desc dataset name and value to use for an override from the parent Symbol Instance
@param   data-                    : Must start with 'data-'
@param   elementRef_                : Must end with a _ underscore.
                                The arbitry name you give to refence an element. this does not have to match any real id you have given the element.
                                
@param   @param  propertyTag        : Must start with '_'  ( underscore). The name of the property.
                                    This Should refect in some part the real world property name so its intent is clear.
@param  value                        : The property value to pass in for the override.
@param duration                     : The duration value for a hype API setElementProperty. This comes after the value and separated by a comma.

   @construction   data-elementRef_propertyTag | value
   @construction   data-elementRef_propertyTag | value,duration
  
  
  
    *Examples.
       
| data-elementRef_propertyTag | Value                                                        |
| :-------------------------- | :----------------------------------------------------------- |
| data-rect_url               | ${resourcesFolderName}/foo.png                               |
| data-text_bgcolor           | pink                                                         |
| data-rect1_width            | 400                                                          |
| data-rect1_height           | 400                                                          |
| data-rect1_url              | ${resourcesFolderName}/foo2.png                              |
| data-rect1_backgroundsize   | contain                                                      |
| data-rect1_backgroundrepeat | no-repea                                                     |
| data-rect_rotatez           | 20                                                           |
| data-text2_innertext        | foo other string  or words                                   |
| data-rect1_scalex           | 2,8                                                          |
| data-rect1_scaley           | 2,8                                                          |
| data-text_color             | rgb(233, 205, 85)                                            |
| data-text_innerhtml         | `<span style="color:gold;font-weight:bold">Skateboarding</span>` |
| data-text2_innerhtml        | Hello my lovely world                                        |
| data-square_zindex          | -20                                                          |
| data-text_innertext         | foo some string or words                                     |
    


==========================================

/**  Elemnet data attribute:

@desc dataset name and value to use to ACCEPT an override from the parent Symbol Instance
@param  data-elementRef_propertyTag   : This must match a Parent Symbol's override name.
@param  style                          : Use the 'style' property name at the beginning if the target property is a native css property.
@param  value                          : This value should be the real css property name ,hype-api property name or property name you wish to target.
  
@construction   data-elementRef_propertyTag | value
@construction   data-elementRef_propertyTag | style.value



*Examples.


      *Examples.
           

| data-elementRef_propertyTag | Value                   |
| :-------------------------- | :---------------------- |
| data-rect_url               | background-image        |
| data-text_bgcolor           | style.backgroundColor   |
| data-rect1_width            | width                   |
| data-rect1_height           | height                  |
| data-rect1_url              | background-image        |
| data-rect1_backgroundsize   | style.background-size   |
| data-rect1_backgroundrepeat | style.background-repeat |
| data-rect_rotatez           | rotateZ                 |
| data-text2_innertext        | innerText               |
| data-rect1_scalex           | scaleX                  |
| data-rect1_scaley           | scaleY                  |
| data-text_color             | style.color             |
| data-text_innerhtml         | innerHTML               |
| data-text2_innerhtml        | innerHTML               |
| data-square_zindex          | z-index                 |
| data-text_innertext         | innerText               |



•An error will occur if there is a mismatch.
•An error will be thrown in the console giving details and info to help find the mismatch.
 Data for each error overide in a Symbol instance will be shown.
 Symbol ID
 Mismatched key name
 Completed override data accepted by the children [object]
 Expected overrides sent from the Symbol to the children. [object]

•You can also change  print_debug  to true to give debug data in the console. This is handy if you are not getting the values where you expect.
•Data for each fully Completed overide for a Symbol instance will be shown.
 Symbol ID
 Completed override data accepted by the children [object]
 Expected overrides sent from the Symbol to the children. [object]



*/

       
   //----- turn DEBUGGER true = ON or false = OFF ----
   
         print_debug = true




//======================================  DO NOT EDIT BELOW ======================================\

//-- THIS SYMBOL
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
 
 
var thisElement = element.querySelector('[data-' + key + ']')
    
    

if (typeof thisElement != "undefined"){

    var property_string = thisElement.dataset[key]
 
 
  var property_value_type = property_string.split('.')[0]

   
 var css_style_property = property_string.split('.')[1]
 
 switch( property_value_type) {
 
 //+++ CSS STYLE  TYPE ATTRIBUTES
          case 'style'  :
 
      
                thisElement.style[css_style_property] = theDataSet[key]
                
                css_style = true
                 

      break;
         //+++ HYPE API TYPE ATTRIBUTES
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
        var propName =property_value_type
        var value  = splitValues[0]
        var duration  = splitValues[1]
        var timingFunctionNameOrMathEquationFunction  = splitValues[2]
        
                
                 hypeDocument.setElementProperty( thisElement, propName, value,duration,timingFunctionNameOrMathEquationFunction)
                 
                 hype_api = true
                  
   break;

          default:
         //+++ GENERAL TYPE ATTRIBUTES
                thisElement[property_string]  = theDataSet[key]
            
 
}




//+++++++++ DEBUG DATA ++++++

loadDebugDataTransfer(thisElement,key,theDataSet,property_value_type,css_style_property,splitValues,hype_api,propName,value,duration,timingFunctionNameOrMathEquationFunction)



//--reset
    reset ()
  
      }

}
 
catch(err) {
    
print_debug = false
thrown(err  )


}
 


}//--end for





//================================================================ Debug -- logging below ====
if ( print_debug  ){

   debug()
    
   }

 
//--DEBUG PRINT OUT SETUP

function debugBuild(elementID,theDataSet){

  
 overrides_completed.push("Symbol id  : " +   elementID )
  
  overrides_expected.push( theDataSet)


}


//++++ DEBUG LOGS
function debug(){

// var thisChild = hypeDocument.getElementById( overrides_completed[1]['Element id'])
  
 
/// var iterator = thes.values();

        // if  ("childSymbEl_" in thisChild.dataset)  {
            // var value = thisChild.dataset.childSymbEl_
             console.log('DEBUG: Symbol overriden : ' + element.id ,{'overrides_expected':  overrides_expected, 'overrides_completed': overrides_completed},'Appears complete')
           
       
        // }
         
      
// }

reset ()
}


//+++ ERROR LOGS
function thrown(err ){

console.log( err.name  + ' - Symbol override Extension May have a mismatch in ' , 'Symbol - ' + element.id,{'Mismatched: dataset key ':key, overrides_expected,'overrides_completed': overrides_completed}  )
  
 
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
            overrides_expected =[]
            debugBuild(element.id,theDataSet)
    
  
  
}


function  setDefaultsOnPropertyTypes(){
    hype_api = false
    css_style = false
}


function loadDebugDataTransfer(thisElement,key,theDataSet,property_value_type,css_style_property,splitValues,hype_api,propName,value,duration,timingFunctionNameOrMathEquationFunction){
    

overrides_completed.push({

   "Element id": thisElement.id,
  "Element Key":key,
 

  "Element target value":theDataSet[key],
  "css_style" :css_style,
  "property_value_type ":property_value_type,
  "css_style_property": css_style_property,
  "splitValues": splitValues,
  "hype_api": hype_api,
   "hype_api propName": propName ,
  "hype_api value": value ,
   "hype_api duration": duration ,
  "hype_api timing": timingFunctionNameOrMathEquationFunction
   
  })
}

function reset(){

        key =""
          property_value_type = undefined
        css_style_property = undefined
          splitValues = undefined
          propName = undefined
          value = undefined
          duration = undefined
          timingFunctionNameOrMathEquationFunction = undefined
          
        hype_api =false
         css_style = false


}
  



 return true;
}

if("HYPE_eventListeners" in window === false) {
window.HYPE_eventListeners = Array();
}
window.HYPE_eventListeners.push({"type":"HypeSymbolLoad", "callback":symbolOverride_extension});


