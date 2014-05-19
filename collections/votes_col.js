voteDetailSchema = new SimpleSchema({
	option:{
		type: String,
	},
	count:{
		type: Number,
	}
});

voteSetSchema = new SimpleSchema({
	question:{
		type: String,
	},
	optionCount:{
		type: [voteDetailSchema]
	}
});

voteSchema = new SimpleSchema({
	creator:{
		type: String,
		label: "id of the survey creator"
	},
	title:{
		type: String,
		label: "title of the survey"
	},
	createdAt:{
		type: Date,
		label: "date the survey is created"
	},
	details:{
		type: [voteSetSchema],
		label: "each option and their vote count"
	},
	// participants:{
	// 	type: [String],
	// 	label: "id of survey participant"
	// },
	deadline: {
        type: Date,
        label: "deadline of the survey",
        optional: true
  },
	isMultiSelect:{
		type: Boolean,
		label: "if the survey is multiple-choice",
		optional: true
	}
});

Votes = new Meteor.Collection("votes");
Votes.attachSchema(voteSchema);

Votes.allow({
	insert: function () {
		return true;
	},
	update: function () {
		return true;
	}
})