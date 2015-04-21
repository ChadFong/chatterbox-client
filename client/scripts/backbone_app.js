
var Message = Backbone.Model.extend({
  url: 'object literal declaration',
  'a': 'object literal, string-key',
  'b': 'object literal, string-key.  Also being set',
  initialize: function(){
    this.set('b', 'set value'),
    this.set('being set', 20);
  },
  defaults: {
    'test': 'default declaration'
  }
},{
  'test-mk2': 'class property, string-to-string',
  'test-mk2-2': 'Another class property',
});

var Messages = Backbone.Collection.extend({
  model: Message

});
