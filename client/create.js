/**
 * Created by Pierre on 18/04/15.
 */
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