import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate
} from 'tiny-svg';

import {
  getRoundRectPath,
  getFillColor,
  getStrokeColor
} from 'bpmn-js/lib/draw/BpmnRenderUtil';


import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';  

import {
  isAny,
  getParent
} from '../../lib/features/modeling/util/ModelingUtil';

import { isNil } from 'min-dash';


const HIGH_PRIORITY = 1500,
      TASK_BORDER_RADIUS = 2,
      COLOR_GREEN = '#52B415',
      COLOR_RED = '#cc0000';

    var datastate_id;
    var risk_id;
    var quality_id;
    var offset_id;
    var start;
    var end;
    var prop;


export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer, pathMap) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
    this.pathMap=pathMap;
    this.eventBus = eventBus;
  }

  canRender(element) {

    // ignore labels
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);

    var pathMap = this.pathMap;

    var eventBus = this.eventBus;

    const datastate_score = this.getDataState(element);



   /* if(datastate_id != '' || risk_id != '' || quality_id != '' || offset_id != '') {

      start = '< ';
      end = ' >';

    }

    else {

      start = '';
      end = '';
    }*/


   



    if(is(getBusinessObject(element), "bpmn:StartEvent") && getBusinessObject(element).icon==1) {

      var arrowPathData = "M26.718 10.922c-0.477-0.651-1.142-1.412-1.873-2.142s-1.491-1.396-2.142-1.873c-1.108-0.813-1.646-0.907-1.953-0.907h-10.656c-0.948 0-1.719 0.771-1.719 1.719v18.563c0 0.948 0.771 1.719 1.719 1.719h15.813c0.948 0 1.719-0.771 1.719-1.719v-13.406c0-0.308-0.094-0.845-0.907-1.953zM23.873 9.752c0.66 0.66 1.177 1.255 1.559 1.748h-3.308v-3.307c0.494 0.382 1.089 0.9 1.748 1.559zM26.25 26.281c0 0.186-0.157 0.344-0.344 0.344h-15.813c-0.186 0-0.344-0.157-0.344-0.344v-18.563c0-0.186 0.157-0.344 0.344-0.344 0 0 10.655-0 10.656 0v4.813c0 0.38 0.308 0.688 0.688 0.688h4.813v13.406z";

      var path = svgCreate('path');



          const color = this.getColor(datastate_score);
          svgAttr(path, { d:  arrowPathData });
        //svgAttr(path, { strokeWidth: 1 });
        svgAttr(path, {strokeWidth: 1});
        svgAttr(path, {height: 10});
        svgAttr(path, {width:  10});
        svgAttr(path, {stroke:  color}); 
        svgAttr(path, {fill:  'black'});   

        svgAppend(parentNode, path);
      }


    


     if((is(getBusinessObject(element), "bpmn:DataObjectReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && element.businessObject.noAlternative == 1) {

         var text = svgCreate('text'); 

      if((is(getBusinessObject(element), "bpmn:DataObjectReference"))) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(22, 46)'
      }); }

      if((is(getBusinessObject(element), "bpmn:DataStoreReference"))) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(35, 46)'
      }); }

      svgClasses(text).add('djs-label'); 
      
      svgAppend(text, document.createTextNode("X")); 
      
    
      svgAppend(parentNode, text); }



    if(is(getBusinessObject(element), "bpmn:DataObjectReference") && (getBusinessObject(element).fatherr !== undefined && getBusinessObject(element).fatherr != 1)) {

     /*var attrs = {
        strokeDasharray: '6.5',
        strokeDashoffset: 5.5
      };
      var pathData = pathMap.getScaledPath('DATA_OBJECT_PATH', {
        xScaleFactor: 1,
        yScaleFactor: 1,
        containerWidth: element.width,
        containerHeight: element.height,
        position: {
          mx: 0.474,
          my: 0.296
        }
      }); */

       var attrs = {
        strokeDasharray: "2.5",
        strokeWidth: "6"
      };


      var pathData = pathMap.getScaledPath('DATA_OBJECT_PATH', {
        xScaleFactor: 1,
        yScaleFactor: 1,
        containerWidth: element.width,
        containerHeight: element.height,
        position: {
          mx: 0.474,
          my: 0.296
        }
      });



      var path = svgCreate('path');
    svgAttr(path, { d: pathData });
    svgAttr(path, {stroke:  'white'}); 
    svgAttr(path, {fill:  'white'}); 
    svgAttr(path, attrs);


    if((is(getBusinessObject(element), "bpmn:DataObjectReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && element.businessObject.noAlternative == 1) {

         var text = svgCreate('text'); 

      if((is(getBusinessObject(element), "bpmn:DataObjectReference"))) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(22, 46)'
      }); }

      if((is(getBusinessObject(element), "bpmn:DataStoreReference"))) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(35, 46)'
      }); }

      svgClasses(text).add('djs-label'); 
      
      //svgAppend(text, document.createTextNode("X")); 

      svgAppend(parentNode, path);
      
    
      svgAppend(parentNode, text);

     

     }

     else {

      
    
      svgAppend(parentNode, path); }
    



    }


    if(is(getBusinessObject(element), "bpmn:DataStoreReference") && (getBusinessObject(element).fatherr !== undefined && getBusinessObject(element).fatherr != 1)) {

     /*var attrs = {
        strokeDasharray: '6.5',
        strokeDashoffset: 5.5
      };
      var pathData = pathMap.getScaledPath('DATA_OBJECT_PATH', {
        xScaleFactor: 1,
        yScaleFactor: 1,
        containerWidth: element.width,
        containerHeight: element.height,
        position: {
          mx: 0.474,
          my: 0.296
        }
      }); */

       var attrs = {
        strokeDasharray: "3",
        strokeWidth: "2"
      };


      var pathData = pathMap.getScaledPath('DATA_STORE', {
        xScaleFactor: 1,
        yScaleFactor: 1,
        containerWidth: element.width,
        containerHeight: element.height,
        position: {
          mx: 0,
          my: 0.133
        }
      });



      var path = svgCreate('path');
    svgAttr(path, { d: pathData });
    svgAttr(path, {stroke:  'black'}); 
    svgAttr(path, {fill:  'white'}); 
    svgAttr(path, attrs);


    if((is(getBusinessObject(element), "bpmn:DataStoreReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && element.businessObject.noAlternative == 1) {

         var text = svgCreate('text'); 

      if((is(getBusinessObject(element), "bpmn:DataObjectReference"))) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(22, 46)'
      }); }

      if((is(getBusinessObject(element), "bpmn:DataStoreReference"))) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(35, 46)'
      }); }

      svgClasses(text).add('djs-label'); 
      
      //svgAppend(text, document.createTextNode("X")); 

      svgAppend(parentNode, path);
      
    
      svgAppend(parentNode, text);

     

     }

     else {

      
    
      svgAppend(parentNode, path); }
    



    }




    if (is(getBusinessObject(element), "bpmn:DataObjectReference")) {

        if (is(getBusinessObject(element).fatherr,'bpmn:DataObjectReference')) {

         getBusinessObject(element).offset=100; 

         if(getBusinessObject(element).quality!=undefined) { 


           if(getBusinessObject(element).boss.quality!= undefined) {

           var quality_boss = getBusinessObject(element).boss.quality; }

           else {quality_boss = 100;}
           
           var off = quality_boss - getBusinessObject(element).quality;

           getBusinessObject(element).offset=off;

        }


        var text = svgCreate('text'); 

      if(off < 10) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-10,15)'
      }); }

      else if(off < 100) {

        svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-17,15)'
      }); }

      else  {

        svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-27,15)'
      }); }

      }

      
      
      


        if (!is(getBusinessObject(element).boss,'bpmn:DataObjectReference')) {

         getBusinessObject(element).offset=0; 

      var text = svgCreate('text'); 

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-10,15)'
      }); }

      svgClasses(text).add('djs-label'); 
      
      svgAppend(text, document.createTextNode(getBusinessObject(element).offset)); 

      
    
      //svgAppend(parentNode, text);
 }


/*if((is(getBusinessObject(element), "bpmn:DataObjectReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && getBusinessObject(element).recoverable==0 && (getBusinessObject(element).child==null || getBusinessObject(element).child==undefined)) {


        var text = svgCreate('text'); 
        var textt = svgCreate('text'); 
        var texttt = svgCreate('text');

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(3, 46)'
      });

      svgAttr(textt, {
        fill: 'red',
        fontWeight: 'bolder',
        transform: 'translate(3, 46)'

      });

      svgAttr(texttt, {
        fill: 'red',
        fontWeight: 'bolder',
        transform: 'translate(3, 46)'

      });

      svgClasses(text).add('djs-label'); 
      svgClasses(textt).add('djs-label');
      svgClasses(texttt).add('djs-label');  
      
      svgAppend(text, document.createTextNode("R")); 
      svgAppend(textt, document.createTextNode("//")); 
      svgAppend(texttt, document.createTextNode("//")); 
      
    
      svgAppend(parentNode, text); 
      svgAppend(parentNode, textt); 
      svgAppend(parentNode, texttt); 


      }*/



  if((is(getBusinessObject(element), "bpmn:DataObjectReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && getBusinessObject(element).recoverable==1 && (getBusinessObject(element).boss==1 || getBusinessObject(element).boss == undefined)) {


        var text = svgCreate('text'); 
        var textt = svgCreate('text'); 
        var texttt = svgCreate('text');

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(3, 46)'
      });

      svgAttr(textt, {
        fill: 'red',
        fontWeight: 'bolder',
        transform: 'translate(3, 46)'

      });

      svgAttr(texttt, {
        fill: 'red',
        fontWeight: 'bolder',
        transform: 'translate(3, 46)'

      });

      svgClasses(text).add('djs-label'); 
      svgClasses(textt).add('djs-label');
      svgClasses(texttt).add('djs-label');  
      
      svgAppend(text, document.createTextNode("R")); 
      svgAppend(textt, document.createTextNode("//")); 
      svgAppend(texttt, document.createTextNode("//")); 
      
    
      svgAppend(parentNode, text); 



      }


  if (is(getBusinessObject(element), "bpmn:DataStoreReference")) {

        if (is(getBusinessObject(element).fatherr,'bpmn:DataStoreReference')) {

         getBusinessObject(element).offset=100; 

         if(getBusinessObject(element).quality!=undefined) { 


           if(getBusinessObject(element).boss.quality!= undefined) {

           var quality_boss = getBusinessObject(element).boss.quality; }

           else {quality_boss = 100;}
           
           var off = quality_boss - getBusinessObject(element).quality;

           getBusinessObject(element).offset=off;

        }


        var text = svgCreate('text'); 

      if(off < 10) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-10,15)'
      }); }

      else if(off < 100) {

        svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-17,15)'
      }); }

      else  {

        svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-27,15)'
      }); }

      }


        if (!is(getBusinessObject(element).boss,'bpmn:DataStoreReference')) {

         getBusinessObject(element).offset=0; 

      var text = svgCreate('text'); 

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-10,15)'
      }); }

      svgClasses(text).add('djs-label'); 
      
      svgAppend(text, document.createTextNode(getBusinessObject(element).offset)); 

     // offset_id = getBusinessObject(element).offset;
      
    
      //svgAppend(parentNode, text);
 }




 




    if ((is(getBusinessObject(element), "bpmn:DataObjectReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && (getBusinessObject(element).quality!=undefined)) {

      //const rect = drawRect(parentNode, 25, 15, TASK_BORDER_RADIUS, "");
  
     /* svgAttr(rect, {
        transform: 'translate(+10, +35)'
      });*/

      var text = svgCreate('text'); 

      var quality = getBusinessObject(element).quality;

      if(quality < 10) {

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-10,45)'
      }); }

      else if(quality < 100) {

        svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-17,45)'
      }); }

      else  {

        svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(-27,45)'
      });

      }

      svgClasses(text).add('djs-label'); 
      
      svgAppend(text, document.createTextNode(quality)); 

     // quality_id = quality;
      
    
      //svgAppend(parentNode, text);


    }

    if ((is(getBusinessObject(element), "bpmn:DataObjectReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && (getBusinessObject(element).risk==1)) {

      //const rect = drawRect(parentNode, 25, 15, TASK_BORDER_RADIUS, "");
  
     /* svgAttr(rect, {
        transform: 'translate(+10, +35)'
      });*/

      var text = svgCreate('text'); 


      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(12,-3)'
      });

      svgClasses(text).add('djs-label'); 

      
      svgAppend(text, document.createTextNode("L")); 
      
    
      //svgAppend(parentNode, text);


    }

    if ((is(getBusinessObject(element), "bpmn:DataObjectReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && (getBusinessObject(element).risk==2)) {

      //const rect = drawRect(parentNode, 25, 15, TASK_BORDER_RADIUS, "");
  
     /* svgAttr(rect, {
        transform: 'translate(+10, +35)'
      });*/

      var text = svgCreate('text'); 

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(9, -3)'
      });

      svgClasses(text).add('djs-label'); 
      
      svgAppend(text, document.createTextNode("M")); 

      //risk_id = "M ";
      
    
      //svgAppend(parentNode, text);


    }

    if ((is(getBusinessObject(element), "bpmn:DataObjectReference") || is(getBusinessObject(element), "bpmn:DataStoreReference")) && (getBusinessObject(element).risk==3)) {

      //const rect = drawRect(parentNode, 25, 15, TASK_BORDER_RADIUS, "");
  
     /* svgAttr(rect, {
        transform: 'translate(+10, +35)'
      });*/

      var text = svgCreate('text'); 

      svgAttr(text, {
        fill: '#000',
        height: '50px',
        transform: 'translate(12, -3)'
      });

      svgClasses(text).add('djs-label'); 
      
      svgAppend(text, document.createTextNode("H")); 
      
      //risk_id = "H ";
    
      //svgAppend(parentNode, text);


    }
  

    if (is(getBusinessObject(element), "bpmn:DataObjectReference") && getBusinessObject(element).isInput==true) {


    	/*const rect = drawRect(parentNode, 25, 15, TASK_BORDER_RADIUS, "");
  
      svgAttr(rect, {
        transform: 'translate(+10, +35)'
      }); */

      ////DAQUIIII

      /*var text = svgCreate('text'); 

      svgAttr(text, {
        fill: '#000',
        transform: 'translate(+2, +67)'
      });

      svgClasses(text).add('djs-label'); 
    	
      svgAppend(text, document.createTextNode("input")); 
      
    
      svgAppend(parentNode, text);*/

      var arrowPathData = 'm 5,9 9,0 0,-3 5,5 -5,5 0,-3 -9,0 z';


      
        var path = svgCreate('path');

        if (datastate_score==1) {
          const color = this.getColor(datastate_score);
          svgAttr(path, { d:  arrowPathData });
        //svgAttr(path, { strokeWidth: 1 });
        svgAttr(path, {strokeWidth: 1});
        svgAttr(path, {height: 61});
        svgAttr(path, {width:  51});
        svgAttr(path, {stroke:  'black'}); 
        svgAttr(path, {fill:  'white'}); 

        }
      


        else{
        svgAttr(path, { d:  arrowPathData });
        //svgAttr(path, { strokeWidth: 1 });
        svgAttr(path, {strokeWidth: 1});
        svgAttr(path, {height: 61});
        svgAttr(path, {width:  51});
        svgAttr(path, {fill:  'white'});
        svgAttr(path, {stroke:  'black'}); }
        

        svgAppend(parentNode, path);


    }

    if (is(getBusinessObject(element), "bpmn:DataObjectReference") && getBusinessObject(element).isOutput==true) {


    	/*const rect = drawRect(parentNode, 25, 15, TASK_BORDER_RADIUS, "");
  
      svgAttr(rect, {
        transform: 'translate(+10, +35)'
      });*/

     /* var text = svgCreate('text'); 

      svgAttr(text, {
        fill: '#000',
        transform: 'translate(-2, +67)'
      });

      svgClasses(text).add('djs-label'); 
    	
      svgAppend(text, document.createTextNode("output")); 
      
    
      svgAppend(parentNode, text);*/

      //var arrowPathData ="M 823.66,960.46 C 823.66,960.46 1038.36,745.71 1038.36,745.71 1038.36,745.71 1065.90,773.27 1065.90,773.27 1065.90,773.27 832.11,1007.14 832.11,1007.14 828.44,1010.79 823.49,1012.85 818.32,1012.85 817.31,1012.84 816.31,1012.75 815.30,1012.60 809.11,1011.60 803.78,1007.67 800.99,1002.07 800.99,1002.07 762.02,924.11 762.02,924.11 762.02,924.11 796.90,906.69 796.90,906.69 796.90,906.69 823.66,960.46 823.66,960.46 Z M 796.90,906.69M 623.49,895.92 C 623.49,734.46 754.33,603.58 915.75,603.58 1077.16,603.58 1208.00,734.46 1208.00,895.92 1208.00,1057.36 1077.16,1188.26 915.75,1188.26 754.41,1188.06 623.68,1057.29 623.49,895.92 Z M 662.45,895.92 C 662.45,1035.84 775.85,1149.27 915.75,1149.27 1055.63,1149.27 1169.04,1035.84 1169.04,895.92 1169.04,755.99 1055.63,642.56 915.75,642.56 775.92,642.72 662.61,756.06 662.45,895.92 Z M 915.75,642.56M 506.58,915.40 C 506.58,915.40 584.51,915.40 584.51,915.40 584.51,915.40 584.51,876.43 584.51,876.43 584.51,876.43 506.58,876.43 506.58,876.43 506.58,876.43 506.58,915.40 506.58,915.40 Z M 506.58,876.43M 331.23,915.40 C 331.23,915.40 467.61,915.40 467.61,915.40 467.61,915.40 467.61,876.43 467.61,876.43 467.61,876.43 331.23,876.43 331.23,876.43 331.23,876.43 331.23,915.40 331.23,915.40 Z M 331.23,876.43M 331.23,837.46 C 331.23,837.46 584.51,837.46 584.51,837.46 584.51,837.46 584.51,798.47 584.51,798.47 584.51,798.47 331.23,798.47 331.23,798.47 331.23,798.47 331.23,837.46 331.23,837.46 Z M 331.23,798.47M 306.03,753.78 C 306.03,753.78 256.54,803.28 256.54,803.28 284.24,845.13 275.74,901.16 236.89,932.92 198.04,964.67 141.44,961.83 105.97,926.34 70.50,890.85 67.65,834.25 99.40,795.39 131.14,756.52 187.16,748.02 229.00,775.73 229.00,775.73 278.49,726.22 278.49,726.22 278.49,726.22 306.03,753.78 306.03,753.78 Z M 233.81,856.94 C 233.78,848.25 231.78,839.69 227.96,831.89 227.96,831.89 189.13,870.70 189.13,870.70 189.13,870.70 161.58,843.15 161.58,843.15 161.58,843.15 200.39,804.31 200.39,804.31 192.59,800.49 184.04,798.50 175.35,798.47 143.07,798.47 116.90,824.64 116.90,856.94 116.90,889.23 143.07,915.40 175.35,915.40 207.64,915.40 233.81,889.23 233.81,856.94 Z M 175.35,915.40M 701.42,603.58 C 701.42,603.58 779.35,603.58 779.35,603.58 779.35,603.58 779.35,564.60 779.35,564.60 779.35,564.60 701.42,564.60 701.42,564.60 701.42,564.60 701.42,603.58 701.42,603.58 Z M 701.42,564.60M 506.58,681.54 C 506.58,681.54 662.45,681.54 662.45,681.54 662.45,681.54 662.45,642.56 662.45,642.56 662.45,642.56 506.58,642.56 506.58,642.56 506.58,642.56 506.58,681.54 506.58,681.54 Z M 506.58,642.56M 331.23,681.54 C 331.23,681.54 467.61,681.54 467.61,681.54 467.61,681.54 467.61,642.56 467.61,642.56 467.61,642.56 331.23,642.56 331.23,642.56 331.23,642.56 331.23,681.54 331.23,681.54 Z M 331.23,642.56M 331.23,603.58 C 331.23,603.58 662.45,603.58 662.45,603.58 662.45,603.58 662.45,564.60 662.45,564.60 662.45,564.60 331.23,564.60 331.23,564.60 331.23,564.60 331.23,603.58 331.23,603.58 Z M 331.23,564.60M 306.03,519.92 C 306.03,519.92 256.54,569.42 256.54,569.42 284.24,611.27 275.74,667.29 236.89,699.05 198.04,730.81 141.44,727.96 105.97,692.47 70.50,656.99 67.65,600.39 99.40,561.52 131.14,522.66 187.16,514.16 229.00,541.86 229.00,541.86 278.49,492.36 278.49,492.36 278.49,492.36 306.03,519.92 306.03,519.92 Z M 233.81,623.07 C 233.78,614.38 231.78,605.83 227.96,598.03 227.96,598.03 189.13,636.83 189.13,636.83 189.13,636.83 161.58,609.28 161.58,609.28 161.58,609.28 200.39,570.45 200.39,570.45 192.59,566.63 184.04,564.63 175.35,564.60 143.07,564.60 116.90,590.78 116.90,623.07 116.90,655.36 143.07,681.54 175.35,681.54 207.64,681.54 233.81,655.36 233.81,623.07 Z M 175.35,681.54M 701.42,369.71 C 701.42,369.71 896.26,369.71 896.26,369.71 896.26,369.71 896.26,330.74 896.26,330.74 896.26,330.74 701.42,330.74 701.42,330.74 701.42,330.74 701.42,369.71 701.42,369.71 Z M 701.42,330.74M 506.58,447.67 C 506.58,447.67 779.35,447.67 779.35,447.67 779.35,447.67 779.35,408.69 779.35,408.69 779.35,408.69 506.58,408.69 506.58,408.69 506.58,408.69 506.58,447.67 506.58,447.67 Z M 506.58,408.69M 331.23,447.67 C 331.23,447.67 467.61,447.67 467.61,447.67 467.61,447.67 467.61,408.69 467.61,408.69 467.61,408.69 331.23,408.69 331.23,408.69 331.23,408.69 331.23,447.67 331.23,447.67 Z M 331.23,408.69M 331.23,369.71 C 331.23,369.71 662.45,369.71 662.45,369.71 662.45,369.71 662.45,330.74 662.45,330.74 662.45,330.74 331.23,330.74 331.23,330.74 331.23,330.74 331.23,369.71 331.23,369.71 Z M 331.23,330.74M 306.03,286.05 C 306.03,286.05 256.54,335.55 256.54,335.55 284.24,377.39 275.74,433.43 236.89,465.18 198.04,496.94 141.44,494.09 105.97,458.60 70.50,423.12 67.65,366.51 99.40,327.66 131.14,288.79 187.16,280.29 229.00,307.99 229.00,307.99 278.49,258.49 278.49,258.49 278.49,258.49 306.03,286.05 306.03,286.05 Z M 233.81,389.20 C 233.78,380.51 231.78,371.96 227.96,364.16 227.96,364.16 189.13,402.96 189.13,402.96 189.13,402.96 161.58,375.40 161.58,375.40 161.58,375.40 200.39,336.58 200.39,336.58 192.59,332.76 184.04,330.77 175.35,330.74 143.07,330.74 116.90,356.91 116.90,389.20 116.90,421.49 143.07,447.67 175.35,447.67 207.64,447.67 233.81,421.49 233.81,389.20 Z M 175.35,447.67M 77.94,213.81 C 77.94,213.81 974.19,213.81 974.19,213.81 974.19,213.81 974.19,174.82 974.19,174.82 974.19,174.82 77.94,174.82 77.94,174.82 77.94,174.82 77.94,213.81 77.94,213.81 Z M 77.94,174.82M 233.81,135.85 C 233.81,135.85 272.78,135.85 272.78,135.85 272.78,135.85 272.78,96.88 272.78,96.88 272.78,96.88 233.81,96.88 233.81,96.88 233.81,96.88 233.81,135.85 233.81,135.85 Z M 233.81,96.88M 155.87,135.85 C 155.87,135.85 194.84,135.85 194.84,135.85 194.84,135.85 194.84,96.88 194.84,96.88 194.84,96.88 155.87,96.88 155.87,96.88 155.87,96.88 155.87,135.85 155.87,135.85 Z M 155.87,96.88M 77.94,135.85 C 77.94,135.85 116.90,135.85 116.90,135.85 116.90,135.85 116.90,96.88 116.90,96.88 116.90,96.88 77.94,96.88 77.94,96.88 77.94,96.88 77.94,135.85 77.94,135.85 Z M 77.94,96.88M 0.00,973.87 C 0.00,973.87 0.00,116.36 0.00,116.36 0.07,62.56 43.65,18.98 97.42,18.91 97.42,18.91 954.71,18.91 954.71,18.91 1008.49,18.98 1052.07,62.56 1052.14,116.36 1052.14,116.36 1052.14,564.60 1052.14,564.60 1052.14,564.60 1013.16,564.60 1013.16,564.60 1013.16,564.60 1013.16,116.36 1013.16,116.36 1013.16,84.06 987.00,57.89 954.71,57.89 954.71,57.89 97.42,57.89 97.42,57.89 65.14,57.89 38.97,84.06 38.97,116.3 38.97,116.36 38.97,973.87 38.97,973.87 38.97,1006.16 65.14,1032.34 97.42,1032.34 97.42,1032.34 604.00,1032.34 604.00,1032.34 604.00,1032.34 604.00,1071.32 604.00,1071.32 604.00,1071.32 97.42,1071.32 97.42,1071.32 43.65,1071.25 0.07,1027.66 0.00,973.87 Z M 97.42,1071.32";

      var arrowPathData = 'm 5,9 9,0 0,-3 5,5 -5,5 0,-3 -9,0 z';


        var path = svgCreate('path');

        if (datastate_score==1) {

          const color = this.getColor(datastate_score);
          svgAttr(path, { d:  arrowPathData });
        //svgAttr(path, { strokeWidth: 1 });
        svgAttr(path, {strokeWidth: 1});
        svgAttr(path, {height: 1});
        svgAttr(path, {width:  1});
        svgAttr(path, {fill:  'black'}); 

        }

        else {
        svgAttr(path, { d:  arrowPathData });
        //svgAttr(path, { strokeWidth: 1 });
        svgAttr(path, {strokeWidth: 1});
        svgAttr(path, {height: 5});
        svgAttr(path, {width:  5});
        svgAttr(path, {fill:  'black'}); }


        svgAppend(parentNode, path);


    }

    if ((datastate_score==1) && is(getBusinessObject(element), "bpmn:DataObjectReference") && getBusinessObject(element).isOutput!=true && getBusinessObject(element).isInput!=true) {
      const color = this.getColor(datastate_score);

      /*const rect = drawRect(parentNode, 10, 5, TASK_BORDER_RADIUS, 'red');
  
      svgAttr(rect, {
        transform: 'translate(+3, 3)'
      });*/

    }

     if ((datastate_score==1) && is(getBusinessObject(element), "bpmn:DataStoreReference")) {
      const color = this.getColor(datastate_score);

     /* const rect = drawRect(parentNode, 10, 5, TASK_BORDER_RADIUS, 'red');
  
      svgAttr(rect, {
        transform: 'translate(+3, 27)'
      });*/

    }

     if((is(getBusinessObject(element), "bpmn:DataObjectReference"))) {

      var text = svgCreate('text'); 

      var len = (getBusinessObject(element).name).length;

      var ceil = Math.ceil(len / 14);

     /* console.log(len);
      console.log(Math.ceil(len / 14));*/

      var x = 0;

      if(ceil == 0) { x = '65';}
      if(ceil == 1) { x = '80';}
      else {
        x = 65 + (ceil * 15);
      }

      x = String(x);

      


      if(getBusinessObject(element).available == 1) {
        datastate_id = "True,"; }
      else {
        datastate_id = "";
      }
      

      if( getBusinessObject(element).risk == 1) {
        risk_id = "L";
      }
      else if( getBusinessObject(element).risk == 0) {
        risk_id = "N";
      }
      else if( getBusinessObject(element).risk == 2) {
        risk_id = "M";
      }
      else if( getBusinessObject(element).risk == 3) {
        risk_id = "H";
      }
      else {
        risk_id = "U";
      }

      if( getBusinessObject(element).quality == 1) {
        quality_id = "L";
      }
      else if( getBusinessObject(element).quality == 0) {
        quality_id = "N";
      }
      else if( getBusinessObject(element).quality == 2) {
        quality_id = "M";
      }
      else if( getBusinessObject(element).quality == 3) {
        quality_id = "H";
      }
      else {
        quality_id = "U";
      }
      

      /*if(getBusinessObject(element).quality != undefined) {
        quality_id = ", " + getBusinessObject(element).quality + '%';
      }
      else {
        quality_id = '';
      }*/

    
      offset_id = getBusinessObject(element).offset + '%';


      if(quality_id == '') {
            svgAttr(text, {
              fill: '#000',
              fontSize: '12.5px',
              transform: 'translate(-13,' + x + ')'
            }); }

      else {
        svgAttr(text, {
              fill: '#000',
              fontSize: '12.5px',
              transform: 'translate(-27,' + x + ')'
            });
      }

      svgClasses(text).add('djs-label'); 


     
      prop = '< ' + datastate_id + ' ' + risk_id  + ', ' + quality_id + ' ' + ' >';
     

      if(getBusinessObject(element).available == 1) {
      svgAppend(text, document.createTextNode(prop)); 
    
      svgAppend(parentNode, text); }


    }



  if((is(getBusinessObject(element), "bpmn:DataStoreReference"))) {

      var text = svgCreate('text'); 

      var len = (getBusinessObject(element).name).length;

      var ceil = Math.ceil(len / 14);

     /* console.log(len);
      console.log(Math.ceil(len / 14));*/

      var x = 0;

      if(ceil == 0) { x = '65';}
      if(ceil == 1) { x = '80';}
      else {
        x = 65 + (ceil * 15);
      }

      x = String(x);

      


      if(getBusinessObject(element).available == 1) {
        datastate_id = "True,"; }
      else {
        datastate_id = "";
      }
      

      if( getBusinessObject(element).risk == 1) {
        risk_id = "L";
      }
      else if( getBusinessObject(element).risk == 2) {
        risk_id = "M";
      }
      else if( getBusinessObject(element).risk == 3) {
        risk_id = "H";
      }
      else if( getBusinessObject(element).risk == 0) {
        risk_id = "N";
      }
      else {
        risk_id = "U";
      }

      if( getBusinessObject(element).quality == 1) {
        quality_id = "L";
      }
      else if( getBusinessObject(element).quality == 0) {
        quality_id = "N";
      }
      else if( getBusinessObject(element).quality == 2) {
        quality_id = "M";
      }
      else if( getBusinessObject(element).quality == 3) {
        quality_id = "H";
      }
      else {
        quality_id = "U";
      }
      

      /*if(getBusinessObject(element).quality != undefined) {
        quality_id = ", " + getBusinessObject(element).quality + '%';
      }
      else {
        quality_id = '';
      }*/

    
      offset_id = getBusinessObject(element).offset + '%';


      if(quality_id == '') {
            svgAttr(text, {
              fill: '#000',
              fontSize: '12.5px',
              transform: 'translate(-5,' + x + ')'
            }); }

      else {
        svgAttr(text, {
              fill: '#000',
              fontSize: '12.5px',
              transform: 'translate(-18,' + x + ')'
            });
      }

      svgClasses(text).add('djs-label'); 


     
      prop = '< ' + datastate_id + ' ' + risk_id  + ', ' + quality_id + ' ' + ' >';
     

      if(getBusinessObject(element).available == 1) {
      svgAppend(text, document.createTextNode(prop)); 
    
      svgAppend(parentNode, text); }


    }

    return shape;
  }

  getShapePath(shape) {
    if (is(shape, 'bpmn:Task')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS);
    }

    return this.bpmnRenderer.getShapePath(shape);
  }

  getDataState(element) {
    const businessObject = getBusinessObject(element);
  
    const { available } = businessObject;

    return Number.isFinite(available) ? available : null;
  }

  getIsInput(element) {
    const businessObject = getBusinessObject(element);
  
    const { isInput } = businessObject;

    return isInput;
  }

  getColor(datastate_score) {
    if (datastate_score == 1) {
      return COLOR_GREEN;
    } else if (datastate_score == 0) {
      return COLOR_RED;
    }

    return "";
  }
}

CustomRenderer.$inject = [ 'eventBus', 'bpmnRenderer', 'pathMap' ];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color) {
  const rect = svgCreate('rect');

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: color,
    strokeWidth: 2,
    fill: color
  });

  svgAppend(parentNode, rect);

  return rect;
}


