/**
 * Created by Pierre on 18/04/15.
 */

Template.annonces.helpers({
    trajets: function () {
        return trajets.find({user_id : Meteor.userId()});
    }
});

Template.inscrit.helpers({
    getUser: function (userId) {
        if (userId) {
            var user = Meteor.users.find({_id : userId}),
                username = '';
            user.forEach(function (u) {
                username = u.username;
            });

            return username;
        }
    }
});

Template.trajet.events({
    'click .remove': function (event,template){
        var parentID = template.data._id;
        trajets.update({_id: parentID},{$pull: {inscrit: {user_id: this.user_id }},$inc: { 'nombre_places': +1 }});
    }
});