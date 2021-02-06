
function symbolOverride_extension(hypeDocument, element, event) {
  /*
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
  
   This Extension will run on Symbol Load (HypeSymbolLoad).
  
   Although Hype Symbol instances share all the same HTML properties, child elements , timelines etc.
  
   It is often the case that you want each Symbol's instance to use different parameters when they appear on scene.
  
   For example you may be using a Symbol to display images and text but want different images and text in each..
  
   Individual Symbol instance properties can be overriden to allow each instance of the symbol to  be displayed differently and behave differently from each other at load time.
  
  
  
  Each Symbol's Child element can be assigned dataset key names  [data-bindingName] and [Property] names.
  
  When a Parent  Symbol 'Instance' element  has a matching 'data-bindingName' and is given a 'value' the child element will use the 'value' to overide it's targeted
  property
  
  Each 'data-bindingName'  must only be used per child element.
  
   The Child element must use its own unique 'data-bindingNames'.
  For example, You may want to change the 'Left' and 'Top' of 'Rectangle 1' and 'Rectangle 2'.
  You could use the 'data-bindingName's.
  
   'data-rect1left' and   'data-rect1top'
  &
  'data-rect2left' and 'data-rect2top'
  
  
  
   The names are entirely up to you but must start with 'data-' and should reflect the target element and property name for easy understanding of intent and when looking back at it at a later time.
  
  
  ============
    ##Tip:
   For readability : You may want to add an Underscore between the element ref and property ref in a data-bindingName.
   
   For example. instead of 'data-react1bgimage' use 'data-react1_bgimage Or you can use camel Hump  syntax. 'data-react1InnerText'
   But note at run time the Capped letters are changed to lowercase. This is not an issue for this extension but may if you ever wanted to access the datasets from outside of it's scope should be noted.'
  ============
  
   The overriden properties can be normal **css** properties, **hypeDocument.setElementProperty**() properties or **Element** HTML  properties that can normally be set with javascript.

   A Symbol Instance is an instance of a single Symbol on a scene and there can be many instances of the same Symbol on a scene.

   You only have to set up a Symbol Instance and the Symbol child elements once but you can add a new data-bindingName and value at any time.

    A Symbol's child elements may have data-bindingNames and property names  but the Symbol Instance parent itself does not have to ;  have , use any or all of them.
   If a Child Element's data-bindingName is to be used then there must be a matching data-bindingName in the Parent Symbol Instance for this to happen.
  
  
   #### A Symbol instance element:  data-bindingName: `value`
  
   #How Symbol Instance 'data-bindingNames' and 'values' are set to override Symbol Instance child elements.
  The data-bindingNames  and values are entered  in the 'Additional HTML Attributes' in Hype's Identity
   
   ##constructions explained
  
  data-bindingName | value
  data-bindingName | value,duration
  
  
   ###### The data-bindingName
  
   data-     : All names must start with this.
  
   bindingName : The arbitry name you give to refence an element. this does not have to match any real id you have given to the element.  But should reflect in some part the symbols target child element and real world property name so its intent is clear.
  
   ###The Value
  
   •value              :  The property value to pass in for the override.
  
   •duration         :   The duration value for a hype API setElementProperty.
  
   This comes after the value and is separated by a comma.
  
   The duration value is here for completeness in reflection of the hypeDocument.setElementProperty() API usage.
  
   In most cases you will do any animaions on elements using the normal means within hype.
  
   But adding a duration here will also allow for the same type of animation afforded to using the hypeDocument.setElementProperty() in an Hype function.
    
    
   ####Some Examples of Symbol instance element data-bindingNames and values
  
   | data-bindingName           | Value                                                        |
   | :------------------------- | :----------------------------------------------------------- |
   | data-rectbgimage           | ${resourcesFolderName}/foo.png                               |
   | data-textbgcolor           | pink                                                         |
   | data-rect1width            | 400                                                          |
   | data-rect1height           | 400                                                          |
   | data-rect1bgimage          | ${resourcesFolderName}/foo2.png                              |
   | data-rect1backgroundsize   | contain                                                      |
   | data-rect1backgroundrepeat | no-repea                                                     |
   | data-rectrotatez           | 20                                                           |
   | data-text2innertext        | foo other string  or words                                   |
   | data-rect1scalex           | 2,8                                                          |
   | data-rect1scaley           | 2,8                                                          |
   | data-textcolor             | rgb(233, 205, 85)                                            |
   | data-textinnerhtml         | `<span style="color:gold;font-weight:bold">Skateboarding</span>` |
   | data-text2innerhtml        | Hello my lovely world                                        |
   | data-squarezindex          | -20                                                          |
   | data-textinnertext         | foo some string or words                                     |
  
  
  
  
  ==========================================
   
  
  
   ####The symbols  > Child Elements  : data-bindingName  : property
  How Child Element's  data-bindingNames  and  property  names are set to ACCEPT an override from it's parent Symbol Instance
  The data-bindingNames  and property names are entered  in the **Additional HTML Attributes** in Hype's Identity Panel as shown here
  
   
  ##Constructions explained
  
   data-bindingName | PropertyType: property
   
   
   ##An element's data-bindingName Property names

   ( The Parent Symbol Instance   would need to include the same data-bindingName as this child's  data-bindingName  if required for that instance's use )

    

   PropertyType:                         :  Use  the property type at the beginning followed by a colon  ':'

   For an element's property that a hypeDocument.setElementProperty() API  can be used to set it, use:

    hype:

   For an element's **css**  property, ones that the hypeDocument.setElementProperty() API  can not set use:

    css:

   For a element's  property, like innerHtml  use:

   element:
  
  
  
        'Examples.
             
  
   | data-bindingName           | Property type : Value   |
   | :------------------------- | :---------------------- |
   | data-rectbgimage           | hype : background-image |
   | data-textbgcolor           | css : backgroundColor   |
   | data-rect1width            | hype: width             |
   | data-rect1height           | hype: height            |
   | data-rect1bgimage          | hype: background-image  |
   | data-rect1backgroundsize   | css: background-size    |
   | data-rect1backgroundrepeat | css: background-repeat  |
   | data-rectrotatez           | hype: rotateZ           |
   | data-text2innertext        | element: innerText      |
   | data-rect1scalex           | hype: scaleX            |
   | data-rect1scaley           | hype: scaleY            |
   | data-textcolor             | css: color              |
   | data-textinnerhtml         | element: innerHTML      |
   | data-text2innerhtml        | eleement: innerHTML     |
   | data-squarezindex          | hype: z-index           |
   | data-textinnertext         | element: innerText      |
  
  
  
  ##Error handling
  
   An error will occur if there is a mismatch in the data-bindingName  being used.
  
   An error will be thrown in the console giving details and info to help find the mismatch.
        Data for each error overide in a Symbol instance will be shown.
        •Symbol ID
        •Mismatched *data-bindingName
        •Completed overrides** data-bindingnames and values accepted  by the children elements
        Symbol Instance Overrides Expected sent from** the Symbol to the children elements
 
   
   ==================
   
  •If  print_debug  is on ( set to  true ) the console will give the following data.  The default is false.
   

   This is handy if you are not getting the values where you expect.
   
  •Data for each fully Completed overide for a Symbol instance will be shown.
   Symbol ID
   Completed override data accepted by the children [object]
   Symbol Instance Overrides Expected sent from the Symbol to the children. [object]
  
   The print_debug can be either turned on/off by going into the code and changeing the line

   print_debug = false
   
   to
   print_debug = true
   
 
   Alternatively you can add a special Hype Function to your project (Not inside a symbol)

   The hype functions MUST be named stem

   Inside the stem() function you can add the line

   print_debug = true

   You do not need to set the stem() function to run via any action. The Hype Symbol Override Extension will run the stem function for each symbol instance if the stem() function exists.

   ###Hype stem function

   // element - DOMHTMLElement that triggered this function being called

   // event - event that triggered this function being called*

   function stem(hypeDocument, element, event) {

    
       print_debug = true

   }
  
  */
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    
         
     //----- turn DEBUGGER true = ON or false = OFF ----
     
           print_debug = false
  
  
  
  
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
      var property_array = property_string.split(':')
    
   
      var property_type = property_array[0].trim();//-- hype,style,src
       if (typeof property_value != "undefined"){
    property_type = property_array[0].trim()
  }
   
      
      var property_value = property_array[1]
   if (typeof property_value != "undefined"){
    property_value = property_array[1].trim()
  }
   switch( property_type) {
   
   //+++ CSS STYLE  TYPE ATTRIBUTES
            case 'css'  :
    thisElement.style[property_value] = theDataSet[key]
                  
            hype_api = false
            css_ = true
            element_ = false
                   
  
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
                     var propName = property_type
                     
              //-- We may or may not have a specified hype type , but want to catch them as well as hype types here. Sow e only ever use Hype API for these.
            //-- wee need to swap around  property_value & property_type
                    if (property_type == "hype"){
                          propName =  property_value
                       }
                   
                    
                    var value  = splitValues[0]
                    var duration  = splitValues[1]
                    var timingFunctionNameOrMathEquationFunction  = splitValues[2]
                    
                            
                             hypeDocument.setElementProperty( thisElement, propName, value,duration,timingFunctionNameOrMathEquationFunction)
                             
                             hype_api = true
                             css_ = false
                             element_ =false
           break;
     case 'element'  :
  
            thisElement[property_value]  = theDataSet[key]
              
               hype_api = false
            css_ = false
            element_ = true
            
            break;
            default:
           //+++ OTHER GENERAL TYPE ATTRIBUTES
           
           console.log(property_string)
           
          thisElement[property_string]  = theDataSet[key]
              
   
  }
  
      //+++++++++ STEMMING FUNCTION ++++++
    if (typeof  hypeDocument.functions().stem == 'function') {
      hypeDocument.functions().stem(hypeDocument, { 'theDataSet':theDataSet,'key':key,'thisElement':thisElement,'property_string':property_string,'property_type':property_type}, event)
     
  
    }
  
  
  
  //+++++++++ DEBUG DATA ++++++
  
  loadDebugDataTransfer(thisElement,key,theDataSet,property_type,property_value,splitValues,hype_api,propName,value,duration,timingFunctionNameOrMathEquationFunction)
  
  
  
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
    
    Symbol_Instance_Overrides_expected.push( theDataSet)
  
  
  }
  
  
  //++++ DEBUG LOGS
  function debug(){
  
   
   
               console.log('DEBUG: Symbol overriden : ' + element.id ,{'Symbol_Instance_Overrides_expected':  Symbol_Instance_Overrides_expected, 'overrides_completed': overrides_completed},'Appears complete')
     
  
  reset ()
  }
  
  
  //+++ ERROR LOGS
  function thrown(err ){
  
  
  console.log( err.name  + ' - Symbol override Extension May have a mismatch in ' , 'Symbol - ' + element.id,{'Error with  Override : data-bindingName ':key, 'override property ':  property_type ,'override  property value ':  property_value ,  Symbol_Instance_Overrides_expected,'overrides_completed': overrides_completed}  )
    
   
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
  }
  
  
  function loadDebugDataTransfer(thisElement,key,theDataSet,property_type,property_value,splitValues,hype_api,propName,value,duration,timingFunctionNameOrMathEquationFunction){
      
  
  overrides_completed.push({
  
     "Element id": thisElement.id,
    "Element Key":key,
   
  
    "Element target value":theDataSet[key],
    "css Type property" :css_,
    "property_type ":property_type,
    "property_value": property_value,
    "splitValues": splitValues,
    "hype_api Type property": hype_api,
     "hype_api propName": propName ,
    "hype_api value": value ,
     "hype_api duration": duration ,
    "hype_api timing": timingFunctionNameOrMathEquationFunction,
     "element Type property" :element_
     
    })
  }
  
  function reset(){
  
          key =""
            property_type = undefined
          property_value = undefined
            splitValues = undefined
            propName = undefined
            value = undefined
            duration = undefined
            timingFunctionNameOrMathEquationFunction = undefined
            
          hype_api =false
          css_ = false
          element_ = false
  
  }
    
  
  
  
   return true;
  }
  
  if("HYPE_eventListeners" in window === false) {
  window.HYPE_eventListeners = Array();
  }
  window.HYPE_eventListeners.push({"type":"HypeSymbolLoad", "callback":symbolOverride_extension});
  
  
