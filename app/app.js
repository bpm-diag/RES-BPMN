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
    console.log(businessObject)
     

  });
});


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
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

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


   var c=0

   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference')) {

      if(getBusinessObject(element).available==1 && !(getBusinessObject(element).isInput == true || getBusinessObject(element).isOutput == true)) {
        c=c+1; } } 

      }); 

   return c;  }

function checkQuality() {

   var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {
    
     if(getBusinessObject(element).boss==1 || getBusinessObject(element).boss==undefined) {

      if(getBusinessObject(element).quality == undefined) {
        d=d+1 } }  }

      }); 

   return d;  }


function checkRisk() {

   var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

    if(getBusinessObject(element).boss==1 || getBusinessObject(element).boss==undefined) {
    
      if(getBusinessObject(element).risk == undefined) {
        d=d+1 } } }

      }); 

   return d;  }


function check_X () {

  var count = 0;
  var tmp = 0;

  var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

    if((element.businessObject.boss==1 || element.businessObject.boss==undefined) && element.businessObject.available == 1 ) {

        count = count +1;

        if((element.businessObject.noAlternative==1) || (is(getBusinessObject(element).child, "bpmn:DataObjectReference") || is(getBusinessObject(element).child, "bpmn:DataStoreReference"))) {

          tmp = tmp +1;
        } } } });



  if(count == tmp) return 0;

  return 1; }


function checkQuality_child() {


var d=0
   
   var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {
    
     if(getBusinessObject(element).boss!=1 || getBusinessObject(element).boss!=undefined) {

      if(getBusinessObject(element).quality == undefined) {
        d=d+1 } }  }

      }); 

   return d;  }


  const dialog = document.getElementById('quality-assurance');
  const button = document.getElementById('hint');

  var a=0;
  var b=0;
  var c=0;
  var d=0; 

  

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

      document.getElementById("level1.2").innerHTML = "Connect all the the True Data using a DataAssociation";

    }

    else {
      document.getElementById("level1.2").innerHTML="";

      c = checkInputOutput();
      d = checkConnection_2();

      if(c!=0 && d!=0) {

          document.getElementById("level1.3").innerHTML = "Define input or output or connect to another activity";
      }

      else {

        document.getElementById("level1.3").innerHTML="";
      }

    }

    if(a+b+c==0 || a+b+d==0)  { document.getElementById("level1").innerHTML="Level 1: 100%"; 

      return 0;}


    else {

    var percent=100;

    if(b!=0) {percent=percent-50;}
    if(c!=0 && d!=0) {percent=percent-50;}

    document.getElementById("level1").innerHTML="Level 1: "+percent+"%" 
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

      document.getElementById("level2.1").innerHTML = "Set the quality for each data";

    }

    else {
      document.getElementById("level2.1").innerHTML="";
    }

    if(e!=0) {

      document.getElementById("level2.2").innerHTML = "Set the risk for each data";

    }

    else {
      document.getElementById("level2.2").innerHTML="";
    }

    if(d+e==0) { document.getElementById("level2").innerHTML="Level 2: 100%"; 

      return 0;}


    else {

    var percent=100;

    if(d!=0) {percent=percent-50;}
    if(e!=0) {percent=percent-50;}

    document.getElementById("level2").innerHTML="Level 2: "+percent+"%" 
    return 1; }


  }

  function checkLevel3() {

  var  f=check_X();
  var  g=checkQuality_child();
    
    if(f!=0) {

      document.getElementById("level3.1").innerHTML = "Set the Alternative Data";

    }

    else {
      document.getElementById("level3.1").innerHTML="";
    }

    if(g!=0) {

      document.getElementById("level3.2").innerHTML = "Set the quality for all the AlternativeData";

    }

    else {
      document.getElementById("level3.2").innerHTML="";
    }

    if(f+g==0) { document.getElementById("level3").innerHTML="Level 3: 100%"; 

      return 0;}


    else {

    var percent=100;

    if(f!=0) {percent=percent-50;}
    if(g!=0) {percent=percent-50;}

    document.getElementById("level3").innerHTML="Level 3: "+percent+"%" 
    return 1; }


  }

  function checkLevel4() {

  var  h=checkSubProcess();
    
    if(h!=0) {

      document.getElementById("level4.1").innerHTML = "Create a recovery stage where is possibile";

    }

    else {
      document.getElementById("level4.1").innerHTML="";
    }

    if(h==0) { document.getElementById("level4").innerHTML="Level 4: 100%"; 

      return 0;}


    else {

    var percent = "0";
    document.getElementById("level4").innerHTML="Level 4: "+percent+"%" 
    return 1; }


  }

 
  button.addEventListener("click", function(){ 

      var l1 = checkLevel1();
      var l2 = checkLevel2();
      var l3 = checkLevel3();

    if(l1!=0) { 

      document.getElementById("level2").innerHTML="Level 2: Complete level 1";
      document.getElementById("level2.1").innerHTML="";
      document.getElementById("level2.2").innerHTML="";

      document.getElementById("level3").innerHTML="Level 3: Complete level 2";
      document.getElementById("level3.1").innerHTML="";
      document.getElementById("level3.2").innerHTML="";

      document.getElementById("level4").innerHTML="Level 4: Complete level 3";
      document.getElementById("level4.1").innerHTML="";

    }
      
    else if(l2!=0) {

      document.getElementById("level3").innerHTML="Level 3: Complete level 2";
      document.getElementById("level3.1").innerHTML="";
      document.getElementById("level3.2").innerHTML="";

      document.getElementById("level4").innerHTML="Level 4: Complete level 3";
      document.getElementById("level4.1").innerHTML="";
    }

    else if(l3!=0){

      document.getElementById("level4").innerHTML="Level 4: Complete level 3";
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

/*function getExtension(element, type) {
  if (!element.extensionElements) {
    return null;
  }

  return element.extensionElements.filter(function(e) {
    return e.$instanceOf(type);
  })[0];
}


bpmnModeler.on('element.click', function(event) {
  var element = event.element,
      moddle = bpmnModeler.get('moddle'),

      // the underlaying BPMN 2.0 element
      businessObject = element.businessObject,
      analysis,
      score,
      message;

  analysis = getExtension(businessObject, 'ds:DataState');
  score = businessObject.available;

  if (isNaN(score)) {
    message = 'No suitability score yet, dblclick to assign one';
  } else {
    message = 'Diagram element has a suitability score of ' + score;
  }

  window.alert(message);
});





bpmnModeler.on('element.dblclick', function(event) {
 
 var element = event.element,
      moddle = bpmnModeler.get('moddle'),

 businessObject = element.businessObject,
      analysis,
      score,
      message;

  analysis = getExtension(businessObject, 'ds:DataState');

  var result = parseFloat(window.prompt('assign a new suitability score to ' + businessObject.id), 10);

  if (isNaN(result)) {
    return;
  }

  businessObject.available = result;

 if (!analysis) {
    analysis = moddle.create('qa:AnalysisDetails');

    if (!businessObject.extensionElements) {
      businessObject.extensionElements = moddle.create('bpmn:ExtensionElements');
    }

    businessObject.extensionElements.get('values').push(analysis);
  } 

}); */


function getRecoveryName() {

  var l =  [];

  var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {

    if(element.businessObject.recoverable==1 && (element.businessObject.boss==1 || element.businessObject.boss==undefined) && !l.includes(element.businessObject.name)) {

      l.push(element.businessObject.name);
    }


} }); return l;}


function checkSubProcess() {

var l = getRecoveryName();

var count = 0;
var flag = 0;
var a;

for(let i=0; i<l.length; i++) {

  var name = l[i];

  var elements = elementRegistry.filter(function(element) {
  if(is(element, 'bpmn:SubProcess') && getBusinessObject(element).di.isExpanded && getBusinessObject(element).name.includes(name)) {

    a  = checkInsideSubProcess(getBusinessObject(element));
    flag = flag + a;
    count = count + 1;
}


}); }


  if(count == l.length && flag == 0) { return 0; }

return 1;



}


function checkInsideSubProcess(businessObject) {

var array = businessObject.flowElements;
var arr = [];
var count=0;

if(array == undefined) return 1;

for(let i=0; i<array.length; i++) {

  arr.push(array[i].$type); }

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

