Router.route('/', function () {
  this.render('home');
});

Router.onBeforeAction(function () {
    if(!Meteor.user()){
        this.render('home');
        console.log(this.url);
        //this.go('/');
    }
    else{
        this.next();
    }
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

Router.route('/annonces', function () {
  this.render('annonces', {
    data: function () {
      // set the reactive state variable "postId" with a value
      // of the id from our url
      this.state.set('_id', this.params._id);
      // this.render();
    }
  });
});

Router.route('/resa', function () {
  this.render('resa', {
    data: function () {
      // set the reactive state variable "postId" with a value
      // of the id from our url
      this.state.set('_id', this.params._id);
      // this.render();
    }
  });
});

trajets = new Mongo.Collection("trajets");


if (Meteor.isClient) {

  Template.covoiturage.helpers({
    _id: function () {
      controller = Iron.controller();
      return controller.state.get('_id');
    },
    nom: "Axel"
  });

    Template.home.helpers({
        trajets: function () {
            return trajets.find( { user_id : { $ne : Meteor.userId() } , nombre_places : { $ne : 0 } } );
        }
    });

    Template.annonces.helpers({
        trajets: function () {
            return trajets.find({user_id : Meteor.userId()});
        },
        getUser: function (userId) {
            if (userId) {
                var user = Meteor.users.find({_id : userId}),
                    username;
                user.forEach(function (u) {
                    username = u.username;
                });

                return username;
            }
        }
    });

  Template.home.events({
    "click #reserver": function(event, template)
    {
      event.preventDefault();

      var id = this._id;

      trajet = trajets.find({user_id: Meteor.userId()});

      //console.log(trajet);

        if(Meteor.userId() != null){
          trajets.update
          (
            { _id: id },
            {
              $inc : { nombre_places: -1 },
              $set :
              {
                inscrit : [
                            {
                              user_id : Meteor.userId()
                            }
                          ]
              }
            }
          );
        }else{
            console.log("false");
            //alert("Vous devez être connecté pour pouvoir réserver un voyage.");
        }

      // Router.go('/resa');
    }
  });


  Template.create.events({
    "click #submit_trajet": function(event, template)
    {
      event.preventDefault();

      var depart = template.find('#depart').value;
      var arrivee = template.find('#arrivee').value;
      var date = template.find('#date').value;
      var prix = template.find('#prix').value;
      var heure = template.find('#heure').value;
      var nombre_places = template.find('#nombre_places').value;

      if (depart != '' && arrivee != '' && date != '' && prix != '' && heure != '' && nombre_places != '') {
        trajets.insert({user_id: Meteor.userId(), depart:depart, arrivee:arrivee, date:date, prix: prix, heure:heure, nombre_places:parseInt(nombre_places) });
        Router.go('/');
      }
    }
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
