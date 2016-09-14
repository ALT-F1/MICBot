var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();

bot.dialog('/', intents);

intents.matches(/^travel/i, '/travel');

intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.onDefault([
    function (session) {
        session.send("Sorry. I didn't understand. Either type 'travel' or 'change name'.");
    },
]);

bot.dialog('/travel', [
    function (session, results, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        }
        else {
            next();
        }
    }, function (session, results) {
        builder.Prompts.text(session, 'Hi ' + session.userData.name + '. Where do you want to leave from?');
    },
    function (session, results) {
        session.userData.departure = results.response;

        builder.Prompts.choice(session, 'Where do you want to go?', ['Brussels', 'Antwerp', 'Ghent']);
    },
    function (session, results) {
        // Store the arrival location   
        session.userData.arrival = results.response.entity;
        // Display the results
        builder.Prompts.time(session, 'When do you want to leave');


    },
    function (session, results) {
        // Store the departure time
        session.userData.departureTime = builder.EntityRecognizer.resolveTime([results.response]);
        session.beginDialog('/picture');
        session.beginDialog('/cards');

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

bot.dialog('/picture', [
    function (session) {
        session.send("This train will bring you to your destination");
        var msg = new builder.Message(session).attachments([{
            contentType: "image/jpeg",
            contentUrl: "https://i.ytimg.com/vi/P07FchevFqE/hqdefault.jpg"
        }]);
        session.endDialog(msg);
    }
]);

bot.dialog('/cards', [
    function (session) {
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("9h15 -> 10h11")
                    .subtitle("0 changes")
                    .text(session.userData.departure + " -> " + session.userData.arrival)
                    .tap(builder.CardAction.openUrl(session, "https://i.ytimg.com/vi/P07FchevFqE/hqdefault.jpg")),
                new builder.HeroCard(session)
                    .title("9h37 -> 10h59")
                    .subtitle("1 change")
                    .text(session.userData.departure + " -> " + session.userData.arrival)
                    .tap(builder.CardAction.openUrl(session, "https://i.ytimg.com/vi/P07FchevFqE/hqdefault.jpg"))
            ]);
        session.endDialog(msg);
    }
]);