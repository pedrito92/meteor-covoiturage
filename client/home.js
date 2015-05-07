/**
 * Created by Pierre on 18/04/15.
 */
Template.home.helpers({
    trajets: function () {
        if (Session.get('SearchTrajets') == undefined) {
            return trajets.find( { user_id : { $ne : Meteor.userId() } , nombre_places : { $ne : 0 } } );
        }
        else
        {
            searchTerms = Session.get('SearchTrajets');
            return trajets.find( { arrivee : searchTerms.arrivee, depart : searchTerms.depart, date : searchTerms.date , user_id : { $ne : Meteor.userId() } , nombre_places : { $ne : 0 } } );
        }
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
    "click #btnSearch": function (event, template) {
        var depart = template.find('#selDepart').value;
        var arrivee = template.find('#salArrivee').value;
        var date = template.find('#selDate').value;

        Session.set('SearchTrajets', {arrivee : arrivee, depart : depart, date : date });
    }
});