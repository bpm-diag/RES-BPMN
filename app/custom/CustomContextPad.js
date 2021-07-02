/*import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  assign,
  forEach,
  isArray
} from 'min-dash';

export default class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, injector, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }


  getContextPadEntries(element) {
    const {
      autoPlace,
      create,
      elementFactory,
      translate
    } = this;

    var businessObject = element.businessObject;

    /*function appendServiceTask(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({ type: 'bpmn:ServiceTask' });
  
        autoPlace.append(element, shape);
      } else {
        appendServiceTaskStart(event, element);
      }
    }

    function appendServiceTaskStart(event) {
      const shape = elementFactory.createShape({ type: 'bpmn:ServiceTask' });
  
      create.start(event, shape, element);
    }

    var dataState=0


    if (is(businessObject, 'bpmn:DataObjectReference')) {

    return {
      'append.service-task': {
        group: 'model',
        className: 'bpmn-icon-service-task',
        title: translate('Append ServiceTask'),
        action: {
          click: function(event, element) {
            console.log("ok");
          }
        }
      }
    }; }

    else {
      return {

    };
    }
  }
}


CustomContextPad.$inject = [
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
];
*/

import dsExtension from '/resources/ds';


import {
  assign,
  forEach,
  isArray
} from 'min-dash';

import {
  is,
  getBusinessObject
} from '../../lib/util/ModelUtil';

import {
  isExpanded,
  isEventSubProcess
} from '../../lib/util/DiUtil';

import {
  isAny,
  getParent
} from '../../lib/features/modeling/util/ModelingUtil';

import {
  getChildLanes
} from '../../lib/features/modeling/util/LaneUtil';

import {
  hasPrimaryModifier
} from '../../node_modules/diagram-js/lib/util/Mouse';

import BpmnModdle from 'bpmn-moddle';


/**
 * A provider for BPMN 2.0 elements context pad
 */
export default function CustomContextPad(
    config, injector, eventBus,
    contextPad, modeling, elementFactory,
    connect, create, popupMenu,
    canvas, rules, translate, elementRegistry) {

  config = config || {};

  contextPad.registerProvider(this);

  this._contextPad = contextPad;

  this._modeling = modeling;
  this._elementFactory = elementFactory;
  this._connect = connect;
  this._create = create;
  this._popupMenu = popupMenu;
  this._canvas = canvas;
  this._rules = rules;
  this._translate = translate;
  this.eventBus=eventBus;
  this._elementRegistry = elementRegistry;

  if (config.autoPlace !== false) {
    this._autoPlace = injector.get('autoPlace', false);
  }

  eventBus.on('create.end', 250, function(event) {
    var context = event.context,
        shape = context.shape;

    if (!hasPrimaryModifier(event) || !contextPad.isOpen(shape)) {
      return;
    }

    var entries = contextPad.getEntries(shape);

    if (entries.replace) {
      entries.replace.action.click(event, shape);
    }
  });
}

CustomContextPad.$inject = [
  'config.contextPad',
  'injector',
  'eventBus',
  'contextPad',
  'modeling',
  'elementFactory',
  'connect',
  'create',
  'popupMenu',
  'canvas',
  'rules',
  'translate',
  'elementRegistry'
];


CustomContextPad.prototype.getContextPadEntries = function(element) {

  var contextPad = this._contextPad,
      modeling = this._modeling,
      moddle = this.moddle,
      elementFactory = this._elementFactory,
      connect = this._connect,
      create = this._create,
      popupMenu = this._popupMenu,
      canvas = this._canvas,
      rules = this._rules,
      autoPlace = this._autoPlace,
      translate = this._translate,
      elementRegistry = this._elementRegistry;

  var actions = {};

  if (element.type === 'label') {
    return actions;
  }

  var businessObject = element.businessObject;
  

  function startConnect(event, element) {
    connect.start(event, element);
  }

  function removeElement(e) {
 
    

    businessObject = getBusinessObject(element);

    if(is(businessObject,'bpmn:DataObjectReference')) {

        if(businessObject.isAlternative==1 && businessObject.$parent.artifacts.length<2) {
            businessObject.$parent.artifacts[0].sourceRef.isParent=0;

        }

        if(businessObject.child!=null) {

           var a=[];
           var tmp=getBusinessObject(element);

          while(tmp.child!=null) {


              var elements = elementRegistry.filter(function(element) {
                if(is(element, 'bpmn:DataObjectReference') && is(tmp.child, 'bpmn:DataObjectReference')) {
                  
                    if(getBusinessObject(element).id==tmp.child.id) {

                        a.push(element);
                        tmp=getBusinessObject(element);
                    
                    } 

                }

          }); 
          

           //modeling.removeElements([a]);



          }

           for (let i=0; i<a.length; i++) {

              modeling.removeElements([a[i]]);
           }



        } }



        if(is(businessObject,'bpmn:DataStoreReference')) {

        if(businessObject.isAlternative==1 && businessObject.$parent.artifacts.length<2) {
            businessObject.$parent.artifacts[0].sourceRef.isParent=0;

        }

        if(businessObject.child!=null) {

           var a=[];
           var tmp=getBusinessObject(element);

          while(tmp.child!=null) {


              var elements = elementRegistry.filter(function(element) {
                if(is(element, 'bpmn:DataStoreReference') && is(tmp.child, 'bpmn:DataStoreReference')) {
                  
                    if(getBusinessObject(element).id==tmp.child.id) {

                        a.push(element);
                        tmp=getBusinessObject(element);
                    
                    } 

                }

          }); 
          

           //modeling.removeElements([a]);



          }

           for (let i=0; i<a.length; i++) {

              modeling.removeElements([a[i]]);
           }



        } }







 var del = getBusinessObject(element);

 var elements = elementRegistry.filter(function(element) {
                if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {


                  if(getBusinessObject(element).boss!==undefined && getBusinessObject(element).boss!=1 && del.fatherr!==undefined) {

                   if(getBusinessObject(element).id==del.fatherr.id) {

                       modeling.updateProperties(element, {
                          child: null
                         
                        });
                    } }

                  if(del.fatherr !== undefined) {

                    if(del.fatherr.boss==1 && getBusinessObject(element).id == del.fatherr.id) {


                    modeling.updateProperties(element, {
                          child: null,
                          fatherr: 1,
                          boss: 1
                         
                        }); }
                  }

              }
              });



   
   modeling.removeElements([ element ]);

}


  function getReplaceMenuPosition(element) {

    var Y_OFFSET = 5;

    var diagramContainer = canvas.getContainer(),
        pad = contextPad.getPad(element).html;

    var diagramRect = diagramContainer.getBoundingClientRect(),
        padRect = pad.getBoundingClientRect();

    var top = padRect.top - diagramRect.top;
    var left = padRect.left - diagramRect.left;

    var pos = {
      x: left,
      y: top + padRect.height + Y_OFFSET
    };

    return pos;
  }


  function ordering(event, element) {

  console.log("x: ",element.x);
  console.log("y: ",element.y);

  modeling.updateProperties(element, {
                          x:300,
                          y: 300
                         
                        });


 

 


 }


function setDataState(event, element, result) {

 var businessObject = getBusinessObject(element);
 

  var result = result

  if (isNaN(result) || result==undefined ) {
    return;
  }

  businessObject.available = result;


    //businessObject.extensionElements.get('values').push(analysis);

 
    modeling.updateProperties(element, {
      available: result
     
    });

 }


 function setRisk(event, element, result) {

 var businessObject = getBusinessObject(element);
 

  var result = result

  if (isNaN(result) || result==undefined ) {
    return;
  }

  businessObject.risk = result;


    //businessObject.extensionElements.get('values').push(analysis);

 
    modeling.updateProperties(element, {
      risk: result
     
    });

 }

  function setQuality(event, element, result) {

 var businessObject = getBusinessObject(element);
 

  var result = result

  if (isNaN(result) || result==undefined ) {
    return;
  }

  businessObject.quality = result;


    //businessObject.extensionElements.get('values').push(analysis);

 
    modeling.updateProperties(element, {
      quality: result
     
    });

 }
  

  /**
   * Create an append action
   *
   * @param {string} type
   * @param {string} className
   * @param {string} [title]
   * @param {Object} [options]
   *
   * @return {Object} descriptor
   */
  function appendAction(type, className, title, options) {

    if (typeof title !== 'string') {
      options = title;
      title = translate('Append {type}', { type: type.replace(/^bpmn:/, '') });
    }

    function appendStart(event, element) {

      var shape = elementFactory.createShape(assign({ type: type }, options));
      create.start(event, shape, {
        source: element
      });
    }


    var append = autoPlace ? function(event, element) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      autoPlace.append(element, shape);
    } : appendStart;

    return {
      group: 'model',
      className: className,
      title: title,
      action: {
        dragstart: appendStart,
        click: append
      }
    };
  }

  function splitLaneHandler(count) {

    return function(event, element) {

      // actual split
      modeling.splitLane(element, count);

      // refresh context pad after split to
      // get rid of split icons
      contextPad.open(element, true);
    };
  }

    function getExtension(element, type) {
  if (!element.extensionElements) {
    return null;
  }

  return element.extensionElements.filter(function(e) {
    return e.$instanceOf(type);
  })[0];
}



  if (isAny(businessObject, [ 'bpmn:Lane', 'bpmn:Participant' ]) && isExpanded(businessObject)) {

    var childLanes = getChildLanes(element);
    var datastate_score = -1;

    assign(actions, {
      'lane-insert-above': {
        group: 'lane-insert-above',
        className: 'bpmn-icon-lane-insert-above',
        title: translate('Add Lane above'),
        action: {
          click: function(event, element) {
            modeling.addLane(element, 'top');
          }
        }
      }
    });

    if (childLanes.length < 2) {

      if (element.height >= 120) {
        assign(actions, {
          'lane-divide-two': {
            group: 'lane-divide',
            className: 'bpmn-icon-lane-divide-two',
            title: translate('Divide into two Lanes'),
            action: {
              click: splitLaneHandler(2)
            }
          }
        });
      }

      if (element.height >= 180) {
        assign(actions, {
          'lane-divide-three': {
            group: 'lane-divide',
            className: 'bpmn-icon-lane-divide-three',
            title: translate('Divide into three Lanes'),
            action: {
              click: splitLaneHandler(3)
            }
          }
        });
      }
    }

    assign(actions, {
      'lane-insert-below': {
        group: 'lane-insert-below',
        className: 'bpmn-icon-lane-insert-below',
        title: translate('Add Lane below'),
        action: {
          click: function(event, element) {
            modeling.addLane(element, 'bottom');
          }
        }
      }
    });

  }

  if (is(businessObject, 'bpmn:FlowNode')) {

    if (is(businessObject, 'bpmn:EventBasedGateway')) {

      assign(actions, {
        'append.receive-task': appendAction(
          'bpmn:ReceiveTask',
          'bpmn-icon-receive-task',
          translate('Append ReceiveTask')
        ),
        'append.message-intermediate-event': appendAction(
          'bpmn:IntermediateCatchEvent',
          'bpmn-icon-intermediate-event-catch-message',
          translate('Append MessageIntermediateCatchEvent'),
          { eventDefinitionType: 'bpmn:MessageEventDefinition' }
        ),
        'append.timer-intermediate-event': appendAction(
          'bpmn:IntermediateCatchEvent',
          'bpmn-icon-intermediate-event-catch-timer',
          translate('Append TimerIntermediateCatchEvent'),
          { eventDefinitionType: 'bpmn:TimerEventDefinition' }
        ),
        'append.condition-intermediate-event': appendAction(
          'bpmn:IntermediateCatchEvent',
          'bpmn-icon-intermediate-event-catch-condition',
          translate('Append ConditionIntermediateCatchEvent'),
          { eventDefinitionType: 'bpmn:ConditionalEventDefinition' }
        ),
        'append.signal-intermediate-event': appendAction(
          'bpmn:IntermediateCatchEvent',
          'bpmn-icon-intermediate-event-catch-signal',
          translate('Append SignalIntermediateCatchEvent'),
          { eventDefinitionType: 'bpmn:SignalEventDefinition' }
        )
      });
    } else

    if (isEventType(businessObject, 'bpmn:BoundaryEvent', 'bpmn:CompensateEventDefinition')) {

      assign(actions, {
        'append.compensation-activity':
            appendAction(
              'bpmn:Task',
              'bpmn-icon-task',
              translate('Append compensation activity'),
              {
                isForCompensation: true
              }
            )
      });
    } else

    if (!is(businessObject, 'bpmn:EndEvent') &&
        !businessObject.isForCompensation &&
        !isEventType(businessObject, 'bpmn:IntermediateThrowEvent', 'bpmn:LinkEventDefinition') &&
        !isEventSubProcess(businessObject)) {

      assign(actions, {
        'append.end-event': appendAction(
          'bpmn:EndEvent',
          'bpmn-icon-end-event-none',
          translate('Append EndEvent')
        ),
        'append.gateway': appendAction(
          'bpmn:ExclusiveGateway',
          'bpmn-icon-gateway-none',
          translate('Append Gateway')
        ),
        'append.append-task': appendAction(
          'bpmn:Task',
          'bpmn-icon-task',
          translate('Append Task')
        ),
        'append.intermediate-event': appendAction(
          'bpmn:IntermediateThrowEvent',
          'bpmn-icon-intermediate-event-none',
          translate('Append Intermediate/Boundary Event')
        )
      });
    }
  }

  if (!popupMenu.isEmpty(element, 'bpmn-replace')) {

    // Replace menu entry
    assign(actions, {
      'replace': {
        group: 'edit',
        className: 'bpmn-icon-screw-wrench',
        title: translate('Change type'),
        action: {
          click: function(event, element) {

            var businessObject=getBusinessObject(element);

            var newParent=businessObject.$parent;

            var children = newParent.get('flowElements');

            var position = assign(getReplaceMenuPosition(element), {
              cursor: { x: event.x, y: event.y }
            });

            popupMenu.open(element, 'bpmn-replace', position);
          }
        }
      }
    });
  }

  if (isAny(businessObject, [
    'bpmn:FlowNode',
    'bpmn:InteractionNode',
    'bpmn:DataObjectReference',
    'bpmn:DataStoreReference'
  ])) {

    assign(actions, {
      'append.text-annotation': appendAction('bpmn:TextAnnotation', 'bpmn-icon-text-annotation'),

      'connect': {
        group: 'connect',
        className: 'bpmn-icon-connection-multi',
        title: translate('Connect using ' +
                  (businessObject.isForCompensation ? '' : 'Sequence/MessageFlow or ') +
                  'Association'),
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      }
    });
  }

  if (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ])) {
    assign(actions, {
      'connect': {
        group: 'model',
        className: 'bpmn-icon-connection-multi',
        title: translate('Connect using DataInputAssociation'),
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      }
    });
  }

  function appendAlternative(event) {

      if (autoPlace) {

        var shape;

        if(is(getBusinessObject(element),'bpmn:DataObjectReference')) {
       
        shape = elementFactory.createShape({ type: 'bpmn:DataObjectReference'}); }

        if(is(getBusinessObject(element),'bpmn:DataStoreReference')) {
       
        shape = elementFactory.createShape({ type: 'bpmn:DataStoreReference'}); }


  
        autoPlace.append(element, shape);
        getBusinessObject(shape).available=1;
        getBusinessObject(element).offset=100;
        getBusinessObject(element).noAlternative=0;
        getBusinessObject(shape).recoverable=getBusinessObject(element).recoverable;

        modeling.updateProperties(shape, {
                  noAlternative: 0
                 
                });

        if(getBusinessObject(element).isInput==true) { 
          
                      getBusinessObject(shape).isInput=true;
                      getBusinessObject(shape).isOutput=false;

                      modeling.updateProperties(shape, {
                  isInput: true,
                  isOutput: false
                 
                });
        
        }
        
        else if(getBusinessObject(element).isOutput==true) { 

                            getBusinessObject(shape).isOutput=true;
                            getBusinessObject(shape).isInput=false;  

                            modeling.updateProperties(shape, {
                                isInput: false,
                                isOutput: true
                               
                              });
        }

        else {

            getBusinessObject(shape).isOutput=false;
            getBusinessObject(shape).isInput=false;

                      modeling.updateProperties(shape, {
                          isInput: false,
                          isOutput: false
                         
                        });

        }

      
        if(getBusinessObject(element).boss!=null && getBusinessObject(element).boss!=1) {  

           

              modeling.updateProperties(element, {
                  boss: getBusinessObject(element).boss,
                  child: getBusinessObject(shape)
                
                    });

              modeling.updateProperties(shape, {
                  boss: getBusinessObject(element).boss,
                  fatherr: getBusinessObject(element)
                
                    });


        }

        else {

              modeling.updateProperties(element, {
            boss: 1,
            child: getBusinessObject(shape)
          
              });

            modeling.updateProperties(shape, {
                  boss: getBusinessObject(element),
                  fatherr: getBusinessObject(element)
                
                    });

        }
    }

    else {
        var shape;

        if(is(getBusinessObject(element),'bpmn:DataObjectReference')) {
       
        shape = elementFactory.createShape({ type: 'bpmn:DataObjectReference'}); }

        if(is(getBusinessObject(element),'bpmn:DataStoreReference')) {
       
        shape = elementFactory.createShape({ type: 'bpmn:DataStoreReference'}); }

        create.start(event,shape);
  
      }
    }


  if (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ]) && businessObject.risk != 0 && businessObject.noAlternative!=1 &&  businessObject.available==1 && !(is(businessObject.child, [ 'bpmn:DataObjectReference']))  && !(is(businessObject.child, [ 'bpmn:DataStoreReference'])) ) {
    assign(actions, {
      'append.alternative': {
        group: 'model',
        className: 'bpmn-icon-alternative-data',
        title: translate('Create alternative data'),
        action: {
          click: appendAlternative,
          dragstart: appendAlternative
        }
      }
    });
  }


 /* if (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ]) && !(is(businessObject.child, [ 'bpmn:DataObjectReference'])) && !(is(businessObject.child, [ 'bpmn:DataStoreReference']))) {
    assign(actions, {
      'append.noAlternative': {
        group: 'edit',
        className: 'bpmn-icon-x',
        title: translate('No alternative'),
        action: {
          click: function(event,element) {

              if(getBusinessObject(element).noAlternative == 0 || getBusinessObject(element).noAlternative === undefined) {

              getBusinessObject(element).noAlternative = 1; 

              modeling.updateProperties(element, {
                  noAlternative: 1

          }); }

              else { getBusinessObject(element).noAlternative = 0; 

                modeling.updateProperties(element, {
                  noAlternative: 0

          }); 

              }
        }
      }

    }
    });
  }*/


 /* if (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ]) && businessObject.available==1 && !(is(businessObject.child, [ 'bpmn:DataObjectReference']))) {
    assign(actions, {
      'append.order': {
        group: 'edit',
        className: 'bpmn-icon-data-input',
        title: translate('Ordering'),
        action: {
          click: ordering

        }
      }
    });
  }*/


  if (   (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ]))  && (businessObject.fatherr==null || businessObject.fatherr==undefined || businessObject.fatherr==1) &&

   (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ]) &&  (businessObject.child==undefined || businessObject.child==null)) ) {
    assign(actions, {
       'append.dataState': {
        group: 'bo',
        className: 'bpmn-icon-data-state',
        title: translate('Set the data state'),
        action: {

          click: function(event, element) {

            var businessObject = getBusinessObject(element);


            if(businessObject.available == 0 || businessObject.available === undefined) {
            	datastate_score = 1;
             
               setDataState(event,element,datastate_score);	 }

            else{

                datastate_score = 0;
             
               setDataState(event,element,datastate_score);
            }
               
              
              return;  } } } }); }

  if (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ]) && businessObject.available==1) {
    assign(actions, {
       'append.risk': {
        group: 'bo',
        className: 'bpmn-icon-risk',
        title: translate('Set the risk'),
        action: {

          click: function(event, element) {

            if (getBusinessObject(element).risk==-1 || getBusinessObject(element).risk==undefined) {
             
               setRisk(event,element,0); 
               
               return;

            }

            if (getBusinessObject(element).risk== 0) {
             
               setRisk(event,element,1); 
               
               return;

            }

            if (getBusinessObject(element).risk== 1) {
             
               setRisk(event,element,2); 
               
               return;

            }


            if (getBusinessObject(element).risk==2) {
             
               setRisk(event,element,3); 
               
               return;

            }

            if (getBusinessObject(element).risk==3) {
             
               setRisk(event,element,-1); 
               
               return;

            }
            
          }
        }
      }
    });
  }

  if (isAny(businessObject, [ 'bpmn:DataObjectReference', 'bpmn:DataStoreReference' ]) && businessObject.available==1) {
    assign(actions, {
       'append.quality': {
        group: 'bo',
        className: 'bpmn-icon-quality',
        title: translate('Set the quality'),
        action: {

          click: function(event, element) {



           var quality = window.prompt("Set the quality of the data:", "Type a number!");

           var flag = isNaturalNumber(quality);

                if (flag) {

                  quality=parseInt(quality);

                  if(quality>0 && quality<101) {

                      setQuality(event,element,quality);

                      if(getBusinessObject(element).boss==1) {

                          var bo = getBusinessObject(element);

                          var elements = elementRegistry.filter(function(element) {
                            if(is(element, 'bpmn:DataObjectReference') || is(element, 'bpmn:DataStoreReference')) {


                              if(getBusinessObject(element).boss==bo) {

                                if(getBusinessObject(element).quality != undefined) {

                                var off = quality - getBusinessObject(element).quality;

                                getBusinessObject(element).offset=off;

                                   modeling.updateProperties(element, {
                                      offset: off
                                     
                                    }); } } } }); } }
                                
                    

                  else {

                    alert("The quality must be betweeen 0 and 100");} 
                }
               
                else {  alert('The quality must be a number!'); }
                

             /* var x = prompt("Enter a string of letters");

              if (parseInt(x)==5) {
                alert("You did not enter a string");
              }*/
          }
        }
      }
    });
  }

  if (is(businessObject, 'bpmn:Group')) {
    assign(actions, {
      'append.text-annotation': appendAction('bpmn:TextAnnotation', 'bpmn-icon-text-annotation')
    });
  }

  // delete element entry, only show if allowed by rules
  var deleteAllowed = rules.allowed('elements.delete', { elements: [ element ] });

  if (isArray(deleteAllowed)) {

    // was the element returned as a deletion candidate?
    deleteAllowed = deleteAllowed[0] === element;
  }

  if (deleteAllowed) {
    assign(actions, {
      'delete': {
        group: 'edit',
        className: 'bpmn-icon-trash',
        title: translate('Remove'),
        action: {
          click: removeElement
        }
      }
    });
  }

  return actions;
};


// helpers /////////

function isEventType(eventBo, type, definition) {

  var isType = eventBo.$instanceOf(type);
  var isDefinition = false;

  var definitions = eventBo.eventDefinitions || [];
  forEach(definitions, function(def) {
    if (def.$type === definition) {
      isDefinition = true;
    }
  });

  return isType && isDefinition;
}


function isNaturalNumber (str) {
                  var pattern = /^(0|([1-9]\d*))$/;
                  return pattern.test(str);
              }
