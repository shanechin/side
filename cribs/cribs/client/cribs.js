"use strict";

var Dorms = new Meteor.Collection('dorms');

if (Meteor.isClient) {


	Template.dormlist.dorms = function(){
		return Dorms.find({},{});
	};

	//Bind a click handler to clicked dorm
	Template.dorm.events({
		'click':function(){
			console.log("dorm clicked!" + this._id + this.name);
		}
	})

}
