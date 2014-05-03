//publish function first Params is used by subscription
Meteor.publish('votes', function(){
	return Votes.find();
});

