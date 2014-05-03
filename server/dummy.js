if (Votes.find().count() === 0) { 
	Votes.insert({
		creator: "Anonymous",
		title: "My first survey",
		createdAt: new Date(),
		details: [ 
			{ 
				question: "Best phone of 2013",
				optionCount: [
			     {option: "iPhone 5S", count: 12},
				   {option: "HTC One", count: 5},
				   {option: "Galaxy S4", count: 3} 
				]
			},
			{ 
				question: "Which OS you're using",
				optionCount: [
			     {option: "iOS", count: 12},
				   {option: "Android", count: 14},
				   {option: "Windows OS", count: 2},
				]
			}
		]
	});
}