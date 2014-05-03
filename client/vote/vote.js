Template.vote.perc = function (total, opt) {
	var perc = (opt/total)*100;
  return perc.toFixed(0);
};

Template.vote.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  }
});


