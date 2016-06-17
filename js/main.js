
console.log("JS IS BEING READ");

// _.templateSettings = {
//   interpolate: /\{\{(.+?)\}\}/g
// };

var app={}, newLabelObj=[], newCodeObj=[], textInput='', noSpaceRe=/[|1-9%!@#$&^?()\r\t\f]/g;

app.TodoModel = Backbone.Model.extend({});

app.TodosCollection = Backbone.Collection.extend({
  model: app.TodoModel,
  comparator: 'cid',
});

app.todosCollection = new app.TodosCollection();

app.TodoMainView = Backbone.View.extend({
  el: '#my-app',
  template: _.template('<h1><br /><i class="fa fa-cutlery"></i> Parse Away</h1>' +
    '<form class="pure-form pure-form-stacked" id="todo-form">' +
      '<fieldset>' +
        '<div class="pure-control-group">' +
        '</div>' +
        '<div class="pure-control-group">' +
          '<label for="data-input"><strong><h3>Garbage In</h3></strong></label>' +
          '<textarea id="codeArea" name="codeArea" rows="10" cols="10">Da1t345um Cod3es</textarea>' + '<textarea id="textArea" name="textarea" rows="10" cols="50">Line One\nLine Two\nLine Three</textarea>' +
        '</div>' +
        '<div class="pure-controls">' +
        '<br>' +
          '<button id="do-it" class="pure-button">Do It</button>' +
        '</div>' +
       '</fieldset>' +
    '</form>' +
    '<br>' +
    '<h3>Clean Out</h3>' +
    '<hr />' +
    '<div id="data-output">' +
    '</div>'),
    render:function(){
    	// console.log("main view render functions started");
    	this.$el.html(this.template);
    	app.todoInputView = new app.TodoInputView({collection: this.collection});
    	app.todoListView = new app.TodoListView({collection: this.collection});
    	app.todoListView.render();
    }
});

app.TodoInputView = Backbone.View.extend({
	el: "#todo-form",
	events: { 'click #do-it' : 'DoIt'},

	DoIt: function(event){
		event.preventDefault();

    //----DATUM LABEL INPUT TEXT-----
		var $textArea = $(this.el).find('#textArea');
    var $correctedText = $textArea.val().toLowerCase();
    var $splitLabel = $correctedText.split('\n');
    // console.log('63 ', $splitLabel);
    $splitLabel.forEach(function(i){newLabelObj[i] = i + '</datum>';});
    // console.log("67 ", newLabelObj);

   //-----DATUM CODE INPUT TEXT-----
    var $codeArea = $(this.el).find('#codeArea');
    var $codeCorrected = $codeArea.val();
    var $regexCode = $codeCorrected.replace(noSpaceRe, '')
    var $newCode = $regexCode.toLowerCase();
    var $splitCode = $newCode.split('\n');
    $splitCode.forEach(function(i){
      newCodeObj[i]='<datum code="' + i + '">'
    });
     //console.log('74 ', newCodeObj);


//----GRAB THE KEY VALUES, CONCAT, AND AND TO COLLECTION----
     for(var key in newLabelObj){
       if (newLabelObj.hasOwnProperty(key)){
        //  console.log(key + " - > " + newLabelObj[key]);
        for(var key2 in newCodeObj){
          if(newCodeObj.hasOwnProperty(key2)){
          this.collection.add({dataList: (newCodeObj[key2] + newLabelObj[key])});
          }
        }
       }
     }

		$textArea.val('');
    $codeArea.val('');
	},

});

app.TodoListView = Backbone.View.extend({
  el: '#data-output',
  initialize: function () {
    this.collection.on('add', this.render, this);

  },
  render: function () {
    var outputHtml = '';
    var compiledTemplate = _.template('<%- dataList %> <br />');
    console.log('collection' , this.collection.models);
    this.collection.models.forEach(function (item) {
      item.dataList = item.get('dataList');
      // console.log('item ', item)pyt
      outputHtml += compiledTemplate(item);
    });

    $(this.el).html(outputHtml);

  }
});

$(function(){
	app.TodoMainView = new app.TodoMainView({collection: app.todosCollection});
	app.TodoMainView.render();
})




$('#my-app').on("click", function(){
  event.preventDefault();
  console.log("HELLO WORLD")

})
