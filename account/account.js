/**
 * Created by Pierre on 15/04/15.
 */



Router.route('/login', function () {
    this.render('login'
        //,
    //    {
    //    data: function () { return Items.findOne({_id: this.params._id}); }
    //}
    );
});

if(Meteor.isClient){
    Template.login.helpers({
        userid : function () {
            return Meteor.userId();
        }
    });
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });
}


if(Meteor.isServer){
    Meteor.startup(function () {
        //Accounts.ui.config({
        //    passwordSignupFields: "USERNAME_ONLY"
        //});
        //.log(Meteor.user());
    });


}



//if(users == undefined) users = new Mongo.Collection("users");
//Template.login.helpers({
//    users: function () {
//        console.log(Meteor.users());
//    }
//});