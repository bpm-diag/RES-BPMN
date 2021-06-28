import inherits from 'inherits';


var BpmnFactory = require('../../lib/features/modeling/BpmnFactory');

function CustomFactory(moddle) {
    BpmnFactory.call(this);


  this._model = moddle;
}

inherits(CustomFactory, BpmnFactory);

CustomFactory.$inject = [ 'moddle' ];

CustomFactory.prototype.createAlternative = function(attrs) {

    attrs = attrs || {};
  
    if (!attrs.definitionRef) {
  
      attrs = assign({
        definitionRef: this.create('bpmn:AlternativeCase')
      }, attrs);

    }
  

    return this.create('bpmn:AlternativeCase', attrs);
  
  };