var builder = require('botbuilder');
var restify = require('restify');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
// var connector = new builder.ConsoleConnector().listen();
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// var recognizer = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=<input your id>&subscription-key=<input your key>');
var recognizer = new builder.LuisRecognizer(process.env.LUIS_ENDPOINT);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });
var bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());

bot.dialog('/', intents);

intents.matches('travel', '/travel');

intents.matches('changeName', [
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

// Global actions
bot.beginDialogAction('help', '/help', { matches: /^help/i });
bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });

// Help dialog
bot.dialog('/help', [
    function (session) {
        session.send("I'm the transportation bot. You can ask me when your next train is or ask me to change your name.");
        session.endDialog();
    }
]);
