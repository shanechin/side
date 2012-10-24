Dorms = new Meteor.Collection('dorms');
Reviews = new Meteor.Collection("reviews");

Meteor.publish('dorms', function(){
	return Dorms.find({});
});

Meteor.startup(function(){

	/* Create dormslist if empty*/
	if(Dorms.find().count() === 0){
		Dorms.insert({
			name:'Claremont',				
		});
		Dorms.insert({
			name:'Broadway',				
		});
		Dorms.insert({
			name:'Brownstones',				
		});
	}
});