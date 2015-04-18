/**
 * Created by Pierre on 18/04/15.
 */
Template.home.helpers({
    trajets: function () {
        return trajets.find( { user_id : { $ne : Meteor.userId() } , nombre_places : { $ne : 0 } } );
    },
    isUser: function (userId) {
        return userId == Meteor.userId();
    }
});



Template.home.events({
    "click #reserver": function(event, template)
    {
        event.preventDefault();

        var id = this._id;

        //trajet = trajets.find({user_id: Meteor.userId()});


        if(Meteor.userId() != null){
            var trajet = trajets.find({_id: id});

            trajet.forEach(function (t) {
                if(t.inscrit == undefined) t.inscrit = [];
                t.inscrit.push({
                    user_id : Meteor.userId()
                });
                trajets.update({ _id: id }, {$inc: { 'nombre_places': -1 }, $set: {'inscrit': t.inscrit}});
            });
        }

        //TODO: Bouton Réserver à désactiver après le click
        alert("Bouton Réserver à désactiver après le click");
        // Router.go('/resa');
    }
});