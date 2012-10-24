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
	if(Reviews.find().count() === 0){
		
		var claremont_id = Dorms.findOne({name:"Claremont"})._id;
		
		Reviews.insert({
			'dorm_id':claremont_id,
			'review':"horrible place to live"
		});
	}
});