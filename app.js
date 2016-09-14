var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session, results, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        }
        else {
            next();
        }
    }, function (session, results) {
        builder.Prompts.text(session, 'Hi '+ session.userData.name + '. Where do you want to leave from?');
    },
    function (session, results){
        session.userData.departure = results.response;

    builder.Prompts.choice(session, 'Where do you want to go?', ['Brussels', 'Antwerp', 'Ghent']);
    },
    function(session, results){
        // Store the arrival location
        session.userData.arrival = results.response.entity;
        builder.Prompts.time(session, 'When do you want to leave');
    },
    function(session, results){
        // Store the departure time
        session.userData.departureTime = builder.EntityRecognizer.resolveTime([results.response]);
        session.send('Thanks for travelling with us from ' + session.userData.departure + ' to ' + session.userData.arrival + '!');
    }

]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?')
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);