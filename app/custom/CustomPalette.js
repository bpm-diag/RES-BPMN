export default class CustomPalette {
  constructor(create, elementFactory, palette, translate, modeling) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.modeling=modeling;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      create,
      elementFactory,
      translate,
      modeling
    } = this;

    function createSubprocess(event) {
      var modeling = this.modeling;
      const element = elementFactory.createShape({ type: 'bpmn:SubProcess' });

     element.businessObject.di.isExpanded=true;
     element.collapsed=false;
     element.height=200;
     element.width=350;
                  

      create.start(event, element);
    }

    function createErrorDataDriven(event) {
      var modeling = this.modeling;
      const element = elementFactory.createShape({ type: 'bpmn:StartEvent' });

     element.businessObject.icon=1;
                  

      create.start(event, element);
    }

    return {
     'create.subprocess-expanded': {
      group: 'activity',
      className: 'bpmn-icon-subprocess-expanded',
      title: translate('Create expanded SubProcess'),
      action: {
        click: createSubprocess
      } 
    },
    'create.start-eventt': {
      group: 'collaboration',
      className: 'bpmn-icon-data-error-driven',
      title: translate('Create expanded SubProcess'),
      action: {
        click: createErrorDataDriven
      } 
    }
    }
  }
}

CustomPalette.$inject = [
  'create',
  'elementFactory',
  'palette',
  'translate',
  'modeling'
];