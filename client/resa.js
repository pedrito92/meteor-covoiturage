/**
 * Created by Pierre on 18/04/15.
 */
Template.resa.helpers({
    trajets : function () {
        return trajets.find({inscrit:{ $elemMatch: { user_id:  Meteor.userId() }}});
    }
});

Template.myTrajects.helpers({
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

Template.myTrajects.events({
    'click .cancel': function (){
        trajets.update({_id: this._id},{$pull: {inscrit: {user_id: Meteor.userId() }},$inc: { 'nombre_places': +1 }});
    }
});