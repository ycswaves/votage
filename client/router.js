Router.configure({
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

// var filters = {
//   isLoggedIn: function() {
//     if (!(Meteor.loggingIn() || Meteor.user())) {
//       this.redirect('home');
//       this.stop();
//     }
//   }
// }

// Router.before(filters.isLoggedIn, {except: ['home','signup']});


Router.map(function () {
  // this.route('home',{
  // 	path: '/',
  // 	template: 'createForm'
  // });

  this.route('createvote',{
    path: '/createvote',
    template: 'createVote'
  });

  this.route('vote',{
  	path: '/vote/:_id',
  	template: 'vote',
    onBeforeAction: function () {
      var handle = Meteor.subscribe('votes');
      if (handle.ready()) {
        NProgress.done();
      } else {
        NProgress.start();
        this.stop();
      }
    },
    // waitOn: function () {
    //   return Meteor.subscribe('bills');
    // },
    data: function () {
      //_id: "ZDENYPRYdfyCYPL75"
      var theVote = Votes.findOne({_id: this.params._id});
      if(undefined != theVote){
        for(var i=0; i<theVote.details.length; i++){
          var totalCount = 0;
          for(var j=0; j<theVote.details[i].optionCount.length; j++){
            totalCount += theVote.details[i].optionCount[j].count;
          }
          theVote.details[i].total = totalCount;
        }
        console.log(theVote);
      }else{
        return null;
      }
      templateData = {
        vote: theVote
      };
      return templateData;
    }
  });
  // matches all urls but doesn't get called until all previous routes have been tested
  // so in this case for invalid url
  this.route('notFound', {path: '*'});
});