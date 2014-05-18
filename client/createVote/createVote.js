Votes_local = new Meteor.Collection('votes_local', {connection: null});

Template.createVote.helpers({
  questions: function(){
    return Votes_local.find();
  }
});


Template.createVote.events({
	'click #addOpt': function(e,t){
		e.preventDefault();
		var addOption = t.find('input[name="option"]');
		if(undefined == this.opl){
			this.optList = t.find('#optList');
		}
    if(addOption.value.trim().length > 0){
  		var dismissBtn = '<span class="glyphicon glyphicon-remove removeOpt" style="cursor: pointer; margin-left:10px"></span>';
  		$(optList).append('<li><span class="optVal">'+addOption.value.trim()+'</span>'+dismissBtn+'</li>');
  		$(addOption).val('');
    }
	},

	'click .removeOpt': function(e,t){
		$(e.target).parent().remove();
	},

  'click #addQn': function(e,t){
    e.preventDefault();
    if(undefined == this.opl){
      this.optList = t.find('#optList');
    }
    var optionCountList = [];
    $('li span.optVal',this.optList).each(function(){
      optionCountList.push({
        option: $(this).text(),
        count: 0
      })
    });

    var qnSelector = 'textarea[name="question"]'
      , qnContent = t.find(qnSelector);
    //todo: validate qnContent and questionObj
    if(false == checkInput(qnSelector)){
      return false;
    }

    var errDiv = $('input[name="option"]').parent().siblings('.form-error');
    if(optionCountList.length < 1){
      errDiv.show();
      return false;
    }
    else{
      errDiv.hide();
    }
    var questionObj = {
          question: qnContent.value.trim(),
          optionCount: optionCountList
        };



    Votes_local.insert(questionObj,function(err, result){
      if(err){
        return console.log(err.stack);
        //todo: handle err
      }
      $('#optList').html('');
      qnContent.value = '';
    });
  },

	'click #submitVote': function(e,t){
		e.preventDefault();
		if(undefined == this.opl){
			this.optList = t.find('#optList');
		}
		var optionCountList = [];
		//var listTxt = $('li span',this.optList).text().trim();
		$('li span.optVal',this.optList).each(function(){
			optionCountList.push({
				option: $(this).text(),
				count: 0
			})
		});
		var qnContent = t.find('textarea[name="question"]').value.trim()
			, surveyTitle = t.find('input[name="title"]').value.trim();

		//TODO: do validation at this point

		var vote = {
			creator: 'anonymous',
			title: surveyTitle,
			createdAt: new Date(),
			details:[{
				question: qnContent,
				optionCount: optionCountList
			}],
		}
		var newVoteID = Votes.insert(vote, function(err, result){
			if(err){
				var errList = Votes.simpleSchema().namedContext().invalidKeys();
				console.log(errList);
				//todo: handle err
			}
		});
		if(undefined != newVoteID){
			Router.go('vote', {_id: newVoteID});
		}
	}
});

function checkInput(selector){
  var input = $('#createVote '+selector);
  if(input.val().trim().length <= 0){
    input.parent().find('.form-error').show();
    return false;
  }
  input.parent().find('.form-error').hide();
  return true;
}

