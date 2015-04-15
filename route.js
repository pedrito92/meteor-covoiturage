Router.route('/', function () {
  this.render('home');
});

Router.route('/create', function () {
  this.render('create');
});

Router.route('/covoiturage/:_id', function () {
  this.render('covoiturage', {
    data: function () {
      // set the reactive state variable "postId" with a value
      // of the id from our url
      this.state.set('_id', this.params._id);
      // this.render();
    }
  });
});

Router.route('/profil/:_id/annonces', function () {
  this.render('covoiturage', {
    data: function () {
      // set the reactive state variable "postId" with a value
      // of the id from our url
      this.state.set('_id', this.params._id);
      // this.render();
    }
  });
});

Router.route('/profil/:_id/resa', function () {
  this.render('covoiturage', {
    data: function () {
      // set the reactive state variable "postId" with a value
      // of the id from our url
      this.state.set('_id', this.params._id);
      // this.render();
    }
  });
});



if (Meteor.isClient) {

  Template.covoiturage.helpers({
    _id: function () {
      controller = Iron.controller();
      return controller.state.get('_id');
    },
    nom: "Axel"
  });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
}

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
