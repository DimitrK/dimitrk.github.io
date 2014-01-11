enyo.kind({
  name: "App",
  kind: "FittableRows",
  fit: true,
  components: [
    { kind: "onyx.Toolbar", content: " Enigma encoding / encryption library." },
    { kind: "enyo.Scroller", fit: true, components: [
      { style: "padding:10px;", components: [
        { kind: "enyo.FittableColumns", components: [
          { kind: "onyx.InputDecorator", components: [
            {kind: "onyx.Input", name: "encodeText", placeholder: "Enter text to encode", onchange: "encodeTextChanged"}
          ]},
          {kind: "onyx.PickerDecorator", components: [
            {kind: "onyx.PickerButton", name: "encodingButton", disabled: true, content: "Select encoding", style:"width:150px;"},
            {kind: "onyx.Picker", onChange: "encodingChanged", components: [
              {content: "Base64"},
              {content: "Hex"},
              {content: "UTF-8"},
              {content: "B-Endians"},
              {content: "L-Endians"}
            ]}
          ]}
        ]},
        { kind: "onyx.Groupbox", components: [
          { kind: "onyx.GroupboxHeader", content: "Enigma encoding result" },
          { name: "encodingResult", content: "No result yet", style: "padding: 8px;" }
        ]}
      ]},
      { style: "padding:10px;", components: [
        { kind: "enyo.FittableColumns", components: [
          { kind: "onyx.InputDecorator", components: [
            {kind: "onyx.Input", name: "encryptText", placeholder: "Enter text to encrypt", onchange: "encryptTextChanged"}
          ]},
          {kind: "onyx.PickerDecorator", components: [
            {kind: "onyx.PickerButton", name: "encryptingButton", disabled: true, content: "Select encryption", style:"width:150px;"},
            {kind: "onyx.Picker", onChange: "encryptingChanged", components: [
              {content: "SHA512"},
              {content: "SHA256"},
              {content: "RMD160"},
              {content: "MD5"}
            ]}
          ]}
        ]},
        { kind: "onyx.Groupbox", components: [
          { kind: "onyx.GroupboxHeader", content: "Enigma encryption result" },
          { name: "encryptingResult", content: "No result yet", style: "padding: 8px;" }
        ]}
      ]}
    ]},
    { components: [
      {tag: "span", content:"More info at "},
      {kind: enyo.Anchor , href: "https://github.com/DimitrK/enigma", content: "https://github.com/DimitrK/enigma"}
    ]}
  ],
  encodeTextChanged: function(inSender, inEvent) {
    this.$.encodingButton.setDisabled(!inSender.getValue().length);
  },
  encodingChanged: function(inSender, inEvent) {
    var choiceMap = {
      "Base64": enigma.encode.toBase64,
      "Hex": enigma.encode.toHex,
      "UTF-8": enigma.encode.toUtf8,
      "B-Endians": enigma.encode.toBigEndians,
      "L-Endians": enigma.encode.toLittleEndians
    };
    this.$.encodingResult.setContent(choiceMap[inSender.selected.getContent()].call(undefined,this.$.encodeText.getValue()));
  },
  encryptTextChanged: function(inSender, inEvent) {
    this.$.encryptingButton.setDisabled(!inSender.getValue().length);
  },
  encryptingChanged: function(inSender, inEvent) {
    var choiceMap = {
      "SHA512": enigma.sha512.hash,
      "SHA256": enigma.sha256.hash,
      "RMD160": enigma.rmd160.hash,
      "MD5": enigma.md5.hash
    };
    this.$.encryptingResult.setContent(choiceMap[inSender.selected.getContent()].call(undefined,this.$.encryptText.getValue()).value);
  }
});