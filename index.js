'use strict'

require('./setup.js') // pull in setup code, jquery etc.

var Backbone = require('backbone')

var SmallThing = Backbone.Model.extend({
  defaults: {
    value: ''
  }
})

var ThingCollection = Backbone.Collection.extend({
  model: SmallThing
})

var SmallView = Backbone.View.extend({
  template: _.template('<%= value %>'),
  initialize: function (options) {
    this.bigView = options.bigView
  },
  events: {
    'click': 'handleClick'
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()))
    return this
  },
  handleClick: function (target) {
    this.$el.toggleClass('hit') // turn the class off and on
    this.bigView.doAlert(this)  // notify the "bigView"
  }
})

var BigView = Backbone.View.extend({
  doAlert: function (aSmallView) {
    $('#log').append('<p>I got a value: ' + aSmallView.model.get('value') + '</p>')
  },
  template: require('./table.html'),
  render: function () {
    this.$el.html(this.template()) // get the table structure in place
    var that = this                  // save "this" in a closure var called 'that'
    this.collection.each(function (anItem) {
      var viewEl = that.$('#cell' + anItem.get('id'))
      var aSmallView = new SmallView({model: anItem, bigView: that, el: viewEl})
      aSmallView.render()
    })
    return this
  }
})

var things = new ThingCollection([
  {id: 0, value: 'O'},
  {id: 1, value: 'B'},
  {id: 2, value: 'A'},
  {id: 3, value: 'F'},
  {id: 4, value: 'G'},
  {id: 5, value: 'K'},
  {id: 6, value: 'M'},
  {id: 7, value: 'N'},
  {id: 8, value: 'P'}
])

var bView = new BigView({collection: things, el: $('#bigView')})
bView.render()
