/**
 * Created by Pierre on 18/04/15.
 */

Template.annonces.helpers({
    trajets: function () {
        return trajets.find({user_id : Meteor.userId()});
    },
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

Template.annonces.events({
    'click .remove': function () {
        console.log(this.user_id, this.parent._id);
        //TODO: Utilisateur à supprimer
        alert("Utilisateur à supprimer");
        //trajets.remove({user_id:this._id});
    }
});