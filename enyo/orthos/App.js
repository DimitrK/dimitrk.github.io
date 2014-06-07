enyo.kind({
  name: "App",
  kind: "FittableRows",
  fit: true,
  components: [
    { kind: "onyx.Toolbar",  components:[
        {layoutKind: "enyo.FittableColumnsLayout", classes: "full-row", components: [
            {content: "OrthosJS Validation Library" },
            {classes: "centered", fit: true, components: [
                {kind: "onyx.RadioGroup", onActivate:"activateLink", controlClasses: "onyx-tabbutton", components: [
                    {name: "analysis", content: "Code Analysis"},
                    {name: "coverage", content: "Code Coverage"}
                ]}
            ]}
        ]}
    ]},
    {fit: true, touch:true,
        name: "iframe", src:"",
        tag: "iframe", classes: "frame", onload: "frameload",
        attributes: {onload: enyo.bubbler}
    }
  ],
    activateLink: function(inSender, inEvent) {
        var links = {
            analysis: "./plato/index.html",
            coverage: "./istanbul/index.html"
        };
        var originator = inEvent.originator;
        if ( originator.getActive() ) {
            this.$.iframe.setSrc(links[originator.getName()]);
        }

    },
});
