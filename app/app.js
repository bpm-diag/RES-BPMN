import inherits from 'inherits';

//import customModule from './custom';

import BaseModeler from '/lib/BaseModeler';

import Viewer from '/lib/Viewer';
import NavigatedViewer from '/lib/NavigatedViewer';

import KeyboardMoveModule from '/node_modules/diagram-js/lib/navigation/keyboard-move';
import MoveCanvasModule from '/node_modules/diagram-js/lib/navigation/movecanvas';
import TouchModule from '/node_modules/diagram-js/lib/navigation/touch';
import ZoomScrollModule from '/node_modules/diagram-js/lib/navigation/zoomscroll';

import AlignElementsModule from '/node_modules/diagram-js/lib/features/align-elements';
import CustomRules from "/node_modules/bpmn-js/test/util/custom-rules/CustomRules";
//import AutoPlaceModule from '/lib/features/auto-place';
import AutoResizeModule from '/lib/features/auto-resize';
import AutoScrollModule from '/node_modules/diagram-js/lib/features/auto-scroll';
import BendpointsModule from '/node_modules/diagram-js/lib/features/bendpoints';
//import ConnectModule from '/node_modules/diagram-js/lib/features/connect';
//import ConnectionPreviewModule from '/node_modules/diagram-js/lib/features/connection-preview';
import ContextPadModule from '/lib/features/context-pad';
import CopyPasteModule from '/lib/features/copy-paste';
import CreateModule from '/node_modules/diagram-js/lib/features/create';
import DistributeElementsModule from '/lib/features/distribute-elements';
import EditorActionsModule from '/lib/features/editor-actions';
//import GridSnappingModule from '/lib/features/grid-snapping';
import InteractionEventsModule from '/lib/features/interaction-events';
import KeyboardModule from '/lib/features/keyboard';
import KeyboardMoveSelectionModule from '/node_modules/diagram-js/lib/features/keyboard-move-selection';
import LabelEditingModule from '/lib/features/label-editing';
import ModelingModule from '/lib/features/modeling';
import MoveModule from '/node_modules/diagram-js/lib/features/move';
import PaletteModule from '/lib/features/palette';
import ReplacePreviewModule from '/lib/features/replace-preview';
import ResizeModule from '/node_modules/diagram-js/lib/features/resize';
//import SnappingModule from '/lib/features/snapping';
import SearchModule from '/lib/features/search';

import {
  wrapForCompatibility
} from '/lib/util/CompatibilityUtil';

import {
  is,
  getBusinessObject
} from '/lib/util/ModelUtil';

import BpmnModeler from 'bpmn-js/lib/Modeler';

 import customControlsModule from './custom';

import diagramXML from '../resources/diagram.bpmn';

import dsExtension from '../resources/ds';

const HIGH_PRIORITY = 1500;

const containerEl = document.getElementById('container');

// create modeler
const bpmnModeler = new BpmnModeler({
  container: containerEl,
  additionalModules: [
    customControlsModule,
    AlignElementsModule,
    AutoScrollModule,
    AutoResizeModule,
    BendpointsModule,
    ContextPadModule,
    CopyPasteModule,
    CreateModule,
    DistributeElementsModule,
    EditorActionsModule,
    InteractionEventsModule,
    KeyboardModule,
    KeyboardMoveSelectionModule,
    LabelEditingModule,
    ModelingModule,
    MoveModule,
    PaletteModule,
    ReplacePreviewModule,
    ResizeModule,
    SearchModule,
    CustomRules
    //customModule
  ],
  moddleExtensions: {
    ds: dsExtension
  }
});

// import XML
bpmnModeler.importXML(diagramXML, (err) => {
  if (err) {
    console.error(err);
  }


  bpmnModeler.on('element.contextmenu', HIGH_PRIORITY, (event) => {
    event.originalEvent.preventDefault();
    event.originalEvent.stopPropagation();


    const { element } = event;

    // ignore root element
    if (!element.parent) {
      return;
    }

    var businessObject = getBusinessObject(element);

    console.log(businessObject);

});



bb.addEventListener("click", function(){ 

      var elements = elementRegistry.filter(function(element) {
        
        var businessObject = getBusinessObject(element);

        //businessObject.extensionElements = "ciao";

        




  });

      bpmnModeler.saveXML({ format: true }, function(err, xml) {
      // log the current xml content to the browser console
      //console.log(xml);

       // Start file download.
      download("diagram.bpmn",xml);


    });


     

});



});



imp.addEventListener("click", function(){ 

      document.getElementById('file').click();

    });


file.onchange = function(event) {
  
  handleFileSelect(event); }

function handleFileSelect(event) {
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
  openDiagram(event.target.result);
}



function openDiagram(diagram) {

  bpmnModeler.importXML(diagram, function(err) {
    if (err) {

      alert('could not import BPMN 2.0 XML, see console');
      return console.log('could not import BPMN 2.0 XML', err);
    }

    console.log('success!');

   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference') && (getBusinessObject(element).boss.$type=="bpmn:DataObjectReference" && getBusinessObject(element).boss.$type=="bpmn:DataStoreReference"))
    
      
      if(!getBusinessObject(element).boss)


      getBusinessObject(element).boss = 1;


      }); 


    bpmnModeler.get('canvas').zoom('fit-viewport');
  });
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}




var elementRegistry = bpmnModeler.get('elementRegistry');


//0 is ok !=0 is a problem
function checkDataState() {

   var a=0;
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference') && (getBusinessObject(element).boss==1 || getBusinessObject(element).boss==undefined)) {
    
      if(getBusinessObject(element).available == 0 || getBusinessObject(element).available == undefined) {
        a=a+1 } } 

      }); 

   return a;  }




function checkConnection_2() {

  var b = 0;
  var c = 0;

  var arr = [];
  var arrr = [];

  var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference')) {

      var businessObject = getBusinessObject(element);

      

      if (businessObject.available==1 && (!businessObject.isInput && !businessObject.isOutput) && (businessObject.boss==1 || businessObject.boss==undefined) && element.type != "label") {


        var incoming = element.incoming;
        var outgoing = element.outgoing;

        b=1;
        c=1;

      

        for (let i=0; i<element.outgoing.length; i++) {


            if(element.outgoing[i].type=="bpmn:DataInputAssociation") { 

              b=0;
            }

                
        } 


        for (let i=0; i<element.incoming.length; i++) {


            if(element.incoming[i].type=="bpmn:DataOutputAssociation") { 

              c=0;
             
            }

                
        }
        
      } 

      arr.push(b);
      arr.push(c);
  }  



  });  

  const isAllZero1 = arr.every(item => item === 0);
  const isAllZero2 = arrr.every(item => item === 0);

  if(isAllZero1 && isAllZero2) return 0;


  return 1; }




function checkConnection_1() {

  var b = 0;
  
  var arr = [];

  var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

      var businessObject = getBusinessObject(element);

      

      if (businessObject.available==1 && (businessObject.boss==1 || businessObject.boss==undefined) && element.type != "label") {


        var incoming = element.incoming;
        var outgoing = element.outgoing;

        b=1;

      

        for (let i=0; i<element.outgoing.length; i++) {


            if(element.outgoing[i].type=="bpmn:DataInputAssociation") { 

              b=0;
            }

                
        } 


        for (let i=0; i<element.incoming.length; i++) {


            if(element.incoming[i].type=="bpmn:DataOutputAssociation") { 

              b=0;
             
            }

                
        }
        
      } 

      arr.push(b);
  }  



  });  

  const isAllZero = arr.every(item => item === 0);

  if(isAllZero) return 0;


  return 1; }
        
        
    
function checkInputOutput() {


   var c=0;
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') && (getBusinessObject(element).isInput == true || getBusinessObject(element).isOutput == true) && getBusinessObject(element).available == 1 && (getBusinessObject(element).boss==1 || getBusinessObject(element).boss==undefined) && element.type != "label") {

      c=1;

      if(getBusinessObject(element).isInput == true) {

        for (let i=0; i<element.outgoing.length; i++) {

            if(element.outgoing[i].type=="bpmn:DataInputAssociation") { 

               c=0; 
            }
        } 
    }

      if(getBusinessObject(element).isOutput == true) {


        for (let i=0; i<element.incoming.length; i++) {

            if(element.incoming[i].type=="bpmn:DataOutputAssociation") { 

              c=0;  
            }
        } 

        }  


      }

      }); 

   console.log(c);

   return c;  }

/*function checkQuality() {

   var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {
    
     if(getBusinessObject(element).boss==1 || getBusinessObject(element).boss==undefined) {

      if(getBusinessObject(element).quality == undefined && getBusinessObject(element).available==1) {
        d=d+1 } }  }

      }); 

   return d;  }*/


function checkQuality() {

   var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

    if(getBusinessObject(element).boss==1 || getBusinessObject(element).boss==undefined) {
    
      if((getBusinessObject(element).quality == undefined || getBusinessObject(element).quality == -1)  && getBusinessObject(element).available==1) {
        d=d+1 } } }

      }); 

   return d;  }


function checkRisk() {

   var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

    if(getBusinessObject(element).boss==1 || getBusinessObject(element).boss==undefined) {
    
      if((getBusinessObject(element).risk == undefined || getBusinessObject(element).risk == -1)  && getBusinessObject(element).available==1) {
        d=d+1 } } }

      }); 

   return d;  }


function check_X () {

  var count = 0;
  var tmp = 0;

  var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

    if((element.businessObject.boss==1 || element.businessObject.boss==undefined) && element.businessObject.available == 1 && element.businessObject.risk != 0 && element.businessObject.quality != 3) {

        count = count +1;

        if((element.businessObject.noAlternative==1) || (is(getBusinessObject(element).child, "bpmn:DataObjectReference") || is(getBusinessObject(element).child, "bpmn:DataStoreReference"))) {

          tmp = tmp +1;
        } } } });



  if(count == tmp) return 0;

  return 1; }


/*function checkQuality_child() {


var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {
    
     if((getBusinessObject(element).boss!=1 || getBusinessObject(element).boss!=undefined) && getBusinessObject(element).available==1)  {

      if(getBusinessObject(element).quality == undefined) {
        d=d+1 } }  }

      }); 

   return d;  }*/


function checkQuality_child() {


var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {
    
     if((getBusinessObject(element).boss!=1 || getBusinessObject(element).boss!=undefined) && getBusinessObject(element).available==1) {

      if(getBusinessObject(element).quality == undefined || getBusinessObject(element).quality == -1) {
        d=d+1 } }  }

      }); 

   return d;  }


function checkRisk_child() {


var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {
    
     if((getBusinessObject(element).boss!=1 || getBusinessObject(element).boss!=undefined) && getBusinessObject(element).available==1) {

      if(getBusinessObject(element).risk == undefined || getBusinessObject(element).risk == -1) {
        d=d+1 } }  }

      }); 

   return d;  }


  const dialog = document.getElementById('quality-assurance');
  const button = document.getElementById('hint');

  var a=0;
  var b=0;
  var c=0;
  var d=0; 

  

  function checkLevel0() {

    document.getElementById("level0").innerHTML="True"; 
    document.getElementById("level0").style.color = "#0cab26";
  }
  

  //0 ok , 1 problem
  function checkLevel1() {

    // a=checkDataState();
    a=0;
    
    if(a!=0) {

      document.getElementById("level1.1").innerHTML = "Set a DataState for all the Data";

    }

    else {
      document.getElementById("level1.1").innerHTML="";
    }

    b=checkConnection_1();

    if(b!=0) {

      document.getElementById("level1.2").innerHTML = "Connect all the True Data using a DataAssociation";

    }

    else {
      document.getElementById("level1.2").innerHTML=""; }

  
    if(b==0) {

      c = checkInputOutput();
      d = checkConnection_2();

      if(c==0 && d==0) {

        
        document.getElementById("level1.3").innerHTML="";
      }

      else {

        document.getElementById("level1.3").innerHTML = "Define I/O or connect to another activity all the True Data";
      }

    }

    else {
      document.getElementById("level1.3").innerHTML="";
    }

    if(a+b+c+d==0)  { 

      document.getElementById("level1").innerHTML="True"; 
      document.getElementById("level1").style.color = "#0cab26";

      return 0;

    }


    else {

    /*var percent=50;

    if(b!=0) {percent=percent-50;}
    if(c!=0 && d!=0) {percent=50;}*/

    document.getElementById("level1").innerHTML="False" 
    document.getElementById("level1").style.color = "#c20a0a";

    return 1; }

  }

/*var a=checkLevel1();
    if(a!=0) {
      document.getElementById("level2").innerHTML="";
    }*/

  function checkLevel2() {

  var  d=checkQuality();
  var e = checkRisk();
    
    if(d!=0) {

      document.getElementById("level2.1").innerHTML = "Set the quality for each True Data";

    }

    else {
      document.getElementById("level2.1").innerHTML="";
    }

    if(e!=0) {

      document.getElementById("level2.2").innerHTML = "Set the risk for each True Data";

    }

    else {
      document.getElementById("level2.2").innerHTML="";
    }

    if(d+e==0) {

      document.getElementById("level2").innerHTML="True"; 
      document.getElementById("level2").style.color = "#0cab26";

      return 0;}


    else {

    /*var percent=100;

    if(d!=0) {percent=percent-50;}
    if(e!=0) {percent=percent-50;}*/

      document.getElementById("level2").innerHTML="False" 
      document.getElementById("level2").style.color = "#c20a0a";

    return 1; }


  }

  function checkLevel3() {

  var  f=check_X();
  var  g=checkQuality_child();
  var  h = checkRisk_child();
    
    if(f!=0) {

      document.getElementById("level3.1").innerHTML = "Define an Alternative Data where possible";

    }

    else {
      document.getElementById("level3.1").innerHTML="";
    }

    if(g!=0) {

      document.getElementById("level3.2").innerHTML = "Set the quality for each AlternativeData";

    }

    else {
      document.getElementById("level3.2").innerHTML="";
    }

    if(h!=0) {

      document.getElementById("level3.3").innerHTML = "Set the risk for each AlternativeData";

    }

    else {
      document.getElementById("level3.3").innerHTML="";
    }

    if(f+g+h==0) {

      document.getElementById("level3").innerHTML="True"; 
      document.getElementById("level3").style.color = "#0cab26"; 

      return 0;}


    else {

    /*var percent=99;

    if(f!=0) {percent=0;}
    else {
    percent = 100;
    if(g!=0) {percent=percent-50;}
    if(h!=0) {percent=percent-50;} }*/

    document.getElementById("level3").innerHTML="False" 
    document.getElementById("level3").style.color = "#c20a0a";

    return 1; }


  }

  function checkLevel4() {

  var  h=checkSubProcess();
    
    if(h!=0) {

      document.getElementById("level4.1").innerHTML = "Create a recovery stage where possible";

    }

    else {
      document.getElementById("level4.1").innerHTML="";
    }

    if(h==0) {

      document.getElementById("level4").innerHTML="True"; 
      document.getElementById("level4").style.color = "#0cab26";

      return 0;}


    else {

      var percent = "0";
      
      document.getElementById("level4").innerHTML="False" 
      document.getElementById("level4").style.color = "#c20a0a";

    return 1; }


  }

 
  button.addEventListener("click", function(){ 

      checkLevel0();

      var l1 = checkLevel1();
      var l2 = checkLevel2();
      var l3 = checkLevel3();

    if(l1!=0) { 

      document.getElementById("level2").innerHTML="Complete level 1";
      document.getElementById("level2").style.color = "#000000";
      document.getElementById("level2.1").innerHTML="";
      document.getElementById("level2.2").innerHTML="";

      document.getElementById("level3").innerHTML="Complete level 2";
      document.getElementById("level3").style.color = "#000000";
      document.getElementById("level3.1").innerHTML="";
      document.getElementById("level3.2").innerHTML="";
      document.getElementById("level3.3").innerHTML="";

      document.getElementById("level4").innerHTML="Complete level 3";
      document.getElementById("level4").style.color = "#000000";
      document.getElementById("level4.1").innerHTML="";

    }
      
    else if(l2!=0) {

      document.getElementById("level3").innerHTML="Complete level 2";
      document.getElementById("level3").style.color = "#000000";
      document.getElementById("level3.1").innerHTML="";
      document.getElementById("level3.2").innerHTML="";
      document.getElementById("level3.3").innerHTML="";

      document.getElementById("level4").innerHTML="Complete level 3";
      document.getElementById("level4").style.color = "#000000";
      document.getElementById("level4.1").innerHTML="";
    }

    else if(l3!=0){

      document.getElementById("level4").innerHTML="Complete level 3";
      document.getElementById("level4").style.color = "#000000";
      document.getElementById("level4.1").innerHTML="";
       
    }

    else {
      checkLevel4();
    }


    dialog.classList.remove('hidden');; });  



  window.addEventListener('click', (event) => {
  const { target } = event;

  if (target === button || button.contains(target)) {

    return;
  }

  dialog.classList.add('hidden');
});


function getRecoveryName() {

  var l =  [];
  var f = 0;

  var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

    if(element.businessObject.recoverable==1 && (element.businessObject.boss==1 || element.businessObject.boss==undefined) && (element.businessObject.name==undefined || element.businessObject.name=="")) {

      f = 1;
    }

    if(element.businessObject.recoverable==1 && (element.businessObject.boss==1 || element.businessObject.boss==undefined) && !l.includes(element.businessObject.name)) {

      l.push(element.businessObject.name.toLowerCase());
    }


} }); 

  if(f==1) { alert("Set a name for all the recoverable parent object!"); }

  return l;}


function checkSubProcess() {

var l = getRecoveryName();

var count = 0;
var flag = 0;
var a;

var f = 0;

for(let i=0; i<l.length; i++) {

  var name = l[i];

  var elements = elementRegistry.filter(function(element) {

  if(is(element, 'bpmn:SubProcess') && getBusinessObject(element).di.isExpanded && (getBusinessObject(element).name=="" || getBusinessObject(element).name==undefined)) {

    f=1;
  }

  else {

  if(is(element, 'bpmn:SubProcess') && getBusinessObject(element).di.isExpanded && getBusinessObject(element).name.toLowerCase() == name.toLowerCase() + ' recovery procedure') {

    a  = checkInsideSubProcess(getBusinessObject(element),name);
    console.log(getBusinessObject(element).name.toLowerCase());
    flag = flag + a;
    count = count + 1;
} }


}); }

  if(f==1) { alert("Set a name for the recovery procedure"); }


  if(count == l.length && flag == 0) { return 0; }

return 1;



}


function checkInsideSubProcess(businessObject,name) {

var array = businessObject.flowElements;
var arr = [];
var count=0;
var start_event_array = [];
console.log(name);

if(array == undefined) return 1;

for(let i=0; i<array.length; i++) {

  if(array[i].$type == "bpmn:StartEvent") {
  		start_event_array.push(array[i]);
  }

  arr.push(array[i].$type); }

if(start_event_array.length > 1) { 
    return 1; }
else {
	if(start_event_array[0].name == undefined || start_event_array[0].name == '') {
		alert("Set a name for the data driven error event");
		return 1;
	}
	else {
		console.log(start_event_array[0].name.toLowerCase());
		if(start_event_array[0].name.toLowerCase() != name + ' unreliable') {
			return 1;
		}
	}
}

if(arr.includes("bpmn:StartEvent")) {

  var index = arr.indexOf("bpmn:StartEvent");
  arr.splice(index, 1);
  count = count+1;
}

if(arr.includes("bpmn:SubProcess")) {

  var index = arr.indexOf("bpmn:SubProcess");
  arr.splice(index, 1);
  count = count+1;
}

if(arr.includes("bpmn:EndEvent")) {

  var index = arr.indexOf("bpmn:EndEvent");
  arr.splice(index, 1);
  count = count+1;
}

if(arr.includes("bpmn:SequenceFlow")) {

  var index = arr.indexOf("bpmn:SequenceFlow");
  arr.splice(index, 1);
  count = count+1;
}

if(arr.includes("bpmn:SequenceFlow")) {

  var index = arr.indexOf("bpmn:SequenceFlow");
  arr.splice(index, 1);
  count = count+1;
}


if(arr.length < 1 && count==5) { return 0; }

return 1;


}
