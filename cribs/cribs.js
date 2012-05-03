// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players."



Dorms = new Meteor.Collection("dorms");
Reviews = new Meteor.Collection("reviews");


if (Meteor.is_client) {
	"use strict";
	Session.set('dorm_id', null);
	//Session.set('any_dorm_selected',null);
	var any_dorm_selected = function(){
  		return !Session.equals('dorm_id', null);
	};
	Template.dormslist.any_dorm_selected = any_dorm_selected;
	
	/*Will refactor later*/
	Template.dormslist.dorm1 = function () {
		var dormCount = Dorms.find({}).count();
		var listCount = dormCount/3;
		var dormlist = Dorms.find({}).fetch();
		return dormlist.slice(0,listCount);
	};
	Template.dormslist.dorm2 = function () {
		var dormCount = Dorms.find({}).count();
		var listCount = dormCount/3;
		var dormlist = Dorms.find({}).fetch();
		return dormlist.slice(listCount,listCount*2);
	};

	Template.dormslist.dorm3 = function () {
		var dormCount = Dorms.find({}).count();
		var listCount = dormCount/3;
		var dormlist = Dorms.find({}).fetch();
		return dormlist.slice(listCount*2,dormCount);
	};


	Template.dormslist.dorms = function () {
		return Dorms.find({});
	};
	
	
	Template.dorm.selected = function(){
 		return Session.equals("selected_dorm",this._id)?"selected":'';
	};
	Template.dorm.hidden = function(){
 		return Session.equals("hide_dorms",true) ? "hidden": '';
	};
	Template.dormreview.any_dorm_selected = any_dorm_selected;
	Template.dorm.events = {
		'mousedown':function(evt){
			Session.set("selected_dorm", this._id);
			Session.set("dorm_id",this._id);
			Router.setDorm(this._id);
	  	},
	  	'click':function(){
			Session.set("dorm_id",this._id);
			Session.set("selected_dorm", this._id);
			Router.setDorm(this._id);
		},
		'dblclick':function(){
			Session.set("dorm_id",this._id);
			Session.set("hide_dorms", true);
		}  		
	};
  	
	Meteor.subscribe('dorms', function(){
		if(!Session.get('dorm_id')){
			alert("Please select a dorm!");
			var dorm = Dorms.findOne({}, {sort: {name :1 }});
			if(dorm){
				Router.setDorm(dorm._id);
			}
		}
	});

  	
	Meteor.autosubscribe(function(){
		var dorm_id = Session.get('dorm_id');
		if(dorm_id){
			Meteor.subscribe('reviews', dorm_id);
		}
	});
	var DormsRouter = Backbone.Router.extend({
		routes: {
			":dorm_id": "main"
		},
		main: function(dorm_id){
			Session.set("dorm_id", dorm_id);
		},
		setDorm: function(dorm_id){
			this.navigate(dorm_id, true);
		}
	});
	Router = new DormsRouter;
	Meteor.startup(function (){
		Backbone.history.start({pushState: true});
	});
}



// On server startup, create some players if the database is empty.
if (Meteor.is_server) {
	Meteor.startup(function () {
	if (Dorms.find().count() === 0) {
	Meteor.publish('dorms', function(){
    	return Dorms.find();
	});
	Meteor.publish('reviews', function(dorm_id){
    	return Reviews.find({dorm_id:dorm_id});
	});
	var dorms = ["Claremont",
		"548 W 113th", 
		"600 West 113th",
		"Broadway",
		"Brownstones",
		"Carman",
		"East Campus",
		"Furnald", 
		"Harmony",
		"Hartley",
		"Hogan",
		"John Jay",
		"McBain",
		"River",
		"Ruggles",
		"Schapiro", 
		"Wallach",
		"Watt",
		"Wein",
		"Woodbridge",
		"Hewitt Hall",
		"Brooks Hall",
		"Reid Hall",
		"Sulzberger Hall", 
		"600 West 116th Street",
		"616 West 116th Street",
		"620 West 116th Street",
		"601 West 110th Street",
		"Cathedral Gardens",
		"Elliot Hall",
		"Sulzberger Tower",
		"Plimpton Hall"];
	for (var i = 0; i < dorms.length; i++){
		var dorm_id = Dorms.insert({name: dorms[i]});
		Reviews.insert({dorm_id:dorm_id, overall:4, review_contents:[{text:"This is such an amazing dorm!", video_url:"http://youtube.com", img_url:"http://imgur.com"}]});
        }
}
});
}
