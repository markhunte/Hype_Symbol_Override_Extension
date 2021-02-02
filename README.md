# Hype Symbol Override Extension
 Override Symbol Instance Properties

 <img src="README.assets/Screenshot 2021-01-29 at 20.55.38.jpeg" alt="Screenshot 2021-01-29 at 20.55.38" style="zoom:50%;" />

This Extension will run on Symbol Load (*HypeSymbolLoad*).



Although Hype Symbol instances share all the same HTML properties, child elements , timelines etc.

It is often the case that you want each Symbol's instance to use different parameters when they appear on scene.

For example you may be using a Symbol to display images and text but want different images and text in each.. 

<hr>

This extension gives you a way to easily override many of the Symbol instance's properties.



*Four instances of a single Symbol on a Scene.*

<img src="README.assets/Screenshot 2021-01-28 at 23.41.27.jpg" alt="Screenshot 2021-01-28 at 23.41.27" style="zoom:50%;" />

<hr>

With the Extension and on Symbol load.





<img src="README.assets/Screenshot 2021-01-29 at 21.24.58.jpg" alt="Screenshot 2021-01-29 at 21.24.58" style="zoom:50%;" />



 

<hr>


 Individual Symbol instance properties can be overriden to allow each instance of the symbol to  be displayed differently and behave differently from each other at load time.



Each Symbol's **child element** can be assigned dataset key names  [***data-bindingName***] and [**Property**] names. 

When a Parent  Symbol **Instance** element  has a matching ***data-bindingName*** and given a **value** the child element will use the **value** to overide it's targeted  **property**

Each *data-bindingName*  must only be used per child element. 

The Child element must use its own unique ***data-bindingNames***.

For example, You may want to change the *Left* and *Top* of ***Rectangle 1*** and **Rectangle 2**.

You could use the *data-bindingName*s.

 **data-rect1left** and   **data-rect1top**

&

**data-rect2left** and ***data-rect2top***



The names are entirely up to you but must start with 'data-' and should reflect the target element and property name for easy understanding of intent and when looking back at it at a later time.



***Tip:***

<hr>

> *For readability : You may want to add an Underscore between the element ref and property ref in a data-bindingName.*
>
> *For example.*
>
> *instead of **data-react1bgimage** use **data-react1_bgimage***
>
> *Or you can use camel Hump  syntax.* 
>
> ***data-react1InnerText***
>
> *But note at run time the Capped letters are changed to lowercase. This is not an issue for this extension but may if you ever wanted to access the datasets from outside of it's scope should be noted.*

<hr>



The overriden properties can be normal **css** properties, **hypeDocument.setElementProperty**() properties or **other HTML** properties that can normally be set with javascript.

A Symbol Instance is an instance of a single Symbol on a scene and there can be many instances of the same Symbol on a scene.

You only have to set up a Symbol Instance and the Symbol child elements once but you can add a new data-bindingName and value at any time.

 A Symbol's child elements may have data-bindingNames and property names  but the Symbol Instance parent itself does not have to ;  have , use any or all of them.
If a Child Element's data-bindingName is to be used then there must be a matching data-bindingName in the Parent Symbol Instance for this to happen.



<hr>

####  A Symbol instance element:  data-bindingName: `value`

*How Symbol Instance **data-bindingNames** and **values** are set to override Symbol Instance **child elements.***



The data-bindingNames  and values are entered  in the **Additional HTML Attributes** in Hype's Identity Panel as shown here







<img src="README.assets/Screenshot 2021-01-28 at 22.38.34.jpg" alt="Screenshot 2021-01-28 at 22.38.34" style="zoom:50%;" />



**constructions explained**

<hr>
*data-bindingName* | *value*

*data-bindingName | value,duration*

<hr>

###### The data-bindingName



**data-**    : All names must start with this.

**bindingName** : The arbitry name you give to refence an element. this does not have to match any real id you have given to the element.  But should reflect in some part the symbols target child element and real world property name so its intent is clear.



###### The **Value**:

**value**  			:  The property value to pass in for the override.

**duration** 		:   The duration value for a hype API setElementProperty. 

This comes after the value and is separated by a comma. 

The duration value is here for completeness in reflection of the setElementProperty API usage.

In most cases you will do any animaions on elements using the normal means within hype.

But adding a duration here will also allow for the same type of animation afforded to using the setElementProperty in an Hype function. 



​			

<hr>  	

####  Some Examples of Symbol instance element data-bindingNames and values



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



<hr>





#### *The symbols*  > **Child Elements**  : **data-bindingName  : property**



How Child Element's **data-bindingNames** and **property** names are set to ACCEPT an override from it's parent Symbol Instance

The data-bindingNames  and property names are entered  in the **Additional HTML Attributes** in Hype's Identity Panel as shown here



<img src="README.assets/Screenshot 2021-01-28 at 22.48.54.jpg" alt="Screenshot 2021-01-28 at 22.48.54" style="zoom:50%;" />

<hr>
An element's **data-bindingName**  **Property** names 

( The Parent Symbol **Instance**  would need to include the same *data-bindingName* as this child's *data-bindingName* if required for that instance's use )

 

**style**. 						 :  Add 'style' property name at the beginning using (.) syntax, if the target property is a native css property. ***Do not use it for Hype 's setElementProperty API properties***. 

**property** 	                     :  This value should be the real a Hype 's *setElementProperty* API property names ,a css property name or other HTML property name you wish to target. 



**value** 	                     :  This value should be the real Hype ***setElementProperty*** API property names , a real **css** property name or **other real HTML** property name you wish to target. 



**Constructions**  **explained** 

<hr>
*data-bindingName | property*

*data-bindingName | style.property*    

<hr>

####  Some Examples of  Symbol instance > Child element :  data-bindingName



| data-bindingNamepropertyTag | Value                   |
| :-------------------------- | :---------------------- |
| data-rectbgimage            | background-image        |
| data-textbgcolor            | style.backgroundColor   |
| data-rect1width             | width                   |
| data-rect1height            | height                  |
| data-rect1bgimage           | background-image        |
| data-rect1backgroundsize    | style.background-size   |
| data-rect1backgroundrepeat  | style.background-repeat |
| data-rectrotatez            | rotateZ                 |
| data-text2innertext         | innerText               |
| data-rect1scalex            | scaleX                  |
| data-rect1scaley            | scaleY                  |
| data-textcolor              | style.color             |
| data-textinnerhtml          | innerHTML               |
| data-text2innerhtml         | innerHTML               |
| data-squarezindex           | z-index                 |
| data-textinnertext          | innerText               |





<hr>



**Error handling.**

An error will occur if there is a mismatch in the data-bindingName  being used.

An error will be thrown in the console giving details and info to help find the mismatch.
 	Data for each error overide in a Symbol instance will be shown.<br>
 	**Symbol ID**<br>
 	**Mismatched *data-bindingName***<br>
 	**Completed overrides** data-bindingnames and values accepted  by the children elements<br>
 	**Expected overrides sent from** the Symbol to the children elements<br>

 <img src="README.assets/Screenshot 2021-01-29 at 01.15.52-1883496.jpg" alt="Screenshot 2021-01-29 at 01.15.52" style="zoom:50%;" />





**print_debug** 

If **print_debug**  is on ( set to **true** ) The console will give the following data.

This is handy if you are not getting the values where you expect.

  Data for each fully Completed overide for a Symbol instance will be shown.<br>
 	**Symbol ID**<br>
 	**Completed override** data-bindingnames and values accepted by the children elements<br>
 	**Expected overrides sent from** the Symbol to the children elements<br>

You can also change  **print_debug**  to **false**  to turn it off



<img src="README.assets/Screenshot 2021-01-29 at 01.14.18-1883315.jpg" alt="Screenshot 2021-01-29 at 01.14.18" style="zoom:50%;" />





<hr>



Code:

The code is placed in the Hype Documents Head file.

Place the **symbolOverride.js** file in the Hype resources panel, which will link it to the head 

Hype Example  included in download









