/**
 * Created by Pierre on 18/04/15.
 */
Template.home.helpers({
    trajets: function () {
        return trajets.find( { user_id : { $ne : Meteor.userId() } , nombre_places : { $ne : 0 } } );
    },
    isUser: function (userId) {
        return userId == Meteor.userId();
    },
    isInscrit: function () {
        var trajet = trajets.find({_id : this._id, inscrit:{ $elemMatch: { user_id:  Meteor.userId() }}});

        return trajet.count() > 0;
    }
});



Template.home.events({
    "click #reserver": function(event, template)
    {
        event.preventDefault();

        var id = this._id;

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
    },
    "submit .search": function (event, template) {
//        var text = event.target.text.value;
        var depart = event.target.depart.value,
            arrivee = event.target.arrivee.value,
            date = event.target.date.value;

        console.log(depart, arrivee, date);
        // Prevent default form submit
        return false;
    }
});