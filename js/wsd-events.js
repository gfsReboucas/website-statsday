/* Get the query strings from the URL  ----------------------------------------- */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* Filtering by country, international organisation and other organisations ------ */
$(function () {
    /* Read all posts in the JSON file  */
    $.getJSON('js/events.json', function (data) {
        var template = $('#events-template').html();
        var events = data.events;
        
        /* Call function getParameterByName to get the query strings and assign them to a variable [array] */
        /* Location  */
        var l = getParameterByName('l');
        /* Tag */
        var t = getParameterByName('t');
        /* Event type */
        var ty = getParameterByName('ty');
               
        /* If location */
        if (l !== '') {
            /* Get all events by location */
            events = _.where(data.events, { 'city': l });
        }
        
        /* If tag */
        if (t !== '') {
            /* Get all events by tag */
            events = _.where(data.events, { 'tags': [t] });
        }
        
        /* If location */
        if (ty !== '') {
            /* Get all events by location */
            events = _.where(data.events, { 'type': ty });
        }
       
        var items = Mustache.to_html(template, events);
        $('#events').html(items);        
    });
});
        
        