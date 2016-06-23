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
app.intent('SearchIntent',
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
                    response.say(res.results[0].trackName+' is availible on the iTunes store for '+res.results[0].trackPrice+' dollars');
                    response.card(res.results[0].trackName, res.results[0].longDescription, res.results[0].trackName, res.results[0].artworkUrl60);
                }else{
                    response.say("I couldn't find "+movie);
                    response.card("Can't find "+movie);
                }
                // response.say(res.results[0].trackName);
                response.shouldEndSession(false);
                response.send();
            }), 250);
        return false;
    });

/**
 * IntentRequest w/ asynchronous response.
 */
app.intent('checkStatus',
    {
        'utterances': [
            'status check', 'what is the status', 'tell me the status'
        ]
    },
    function (request, response) {
        setTimeout(function () {		// simulate an async request

            // This is async and will run after a brief delay
            response.say('Status is operational, mam!');

            // Must call send to end the original request
            response.send();

        }, 250);

        // Return false immediately so alexa-app doesn't send the response
        return false;
    }
);


/**
 * Error handler for any thrown errors.
 */
app.error = function (exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
