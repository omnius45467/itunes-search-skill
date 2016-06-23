var alexa = require('alexa-app');
var itunes = require('itunes-search');
var app = new alexa.app();

/**
 * LaunchRequest.
 */
app.launch(function (request, response) {
    response.say('Search the iTunes store with your voice');
    response.card('Find that movie you have been trying to find');
    response.shouldEndSession(false);
});


/**
 * SearchIntentRequest.
 */
app.intent('MovieSearchIntent',
    {
        'slots': {'movie': 'MOVIES'},
        'utterances': ['find {movie}']
    },
    function (request, response) {
        var movie = request.slot('movie');
        var options = {
            media: "movie",
            entity: "movie",
            limit: 25
        };
        setTimeout(itunes.search(movie, options,
            function (res) {
                if(res.resultCount > 0){
                    // response.say('I found '+res.results.length+' for '+movie);
                    response.say(res.results[0].trackName+' is available on the iTunes store for '+res.results[0].trackPrice+' dollars');
                    response.card(res.results[0].trackName, res.results[0].longDescription, res.results[0].trackName, res.results[0].artworkUrl60);
                }else{
                    response.say("Excuse me? I Can't find that");
                    response.card("Excuse me? I Can't find that");
                }
                // response.say(res.results[0].trackName);
                response.shouldEndSession(false);
                response.send();
            }), 250);
        return false;
    });

/**
 * SearchIntentRequest.
 */
app.intent('TVShowSearchIntent',
    {
        'slots': {'tvshow': 'TVSHOWS'},
        'utterances': ['find {tvshow}']
    },
    function (request, response) {
        var tvShow = request.slot('tvshow');
        var options = {
            media: "tvShow",
            entity: "tvSeason",
            limit: 25
        };
        setTimeout(itunes.search(tvShow, options,
            function (res) {
                if(res.resultCount > 0){
                    // response.say('I found '+res.results.length+' for '+tvShow);
                    response.say('I found '+res.results[0].collectionName+' available on the iTunes store for '+res.results[0].collectionPrice+' dollars');
                    response.card(res.results[0].collectionName, res.results[0].longDescription, res.results[0].trackName, res.results[0].artworkUrl60);
                }else{
                    response.say("Excuse me? I Can't find that");
                    response.card("Excuse me? I Can't find that");
                }
                // response.say(res.results[0].trackName);
                response.shouldEndSession(false);
                response.send();
            }), 250);
        return false;
    });


/**
 * Error handler for any thrown errors.
 */
app.error = function (exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
