Bot built during a Microsoft Innovation Center session lead by `Nik Trogh`_ (`Nik blog`_), 2016-09-14 .

Bot allowing you "to book a train" built using `Microsoft Bot Framework`_ from zero to language understanding using Machine Learning capabilities of `LUIS`_. #NodeJS #Microsoft #BotFramework #AppInsights #LUIS #MachineLearning 

Several exercices have been coded: 

* Exercise 1: Creating a HelloWorld bot
* Exercise 2: Collecting input and building dialogs
* Exercise 3: Returning results
* Exercise 4: Determining Intent
* Exercise 5: Adding global actions
* Exercise 6: Integrating your bot with channels

Doing it yourself? https://aka.ms/handsonbots

===============================
Debug
===============================

* `node --debug-brk app.js`
    
===============================
Prerequisite
===============================

* ngrok
* NodeJS
* Visual Studio Code

===============================
.vscode/launch.json
===============================

ensure that you have the following content inside the launch.json file. Replace your keys inside the placeholders::

    "configurations": [
            {
                "name": "Launch",
                "type": "node",
                "request": "launch",
                "program": "${workspaceRoot}/app.js",
                "stopOnEntry": false,
                "args": [],
                "cwd": "${workspaceRoot}",
                "preLaunchTask": null,
                "runtimeExecutable": null,
                "runtimeArgs": [
                    "--nolazy"
                ],
                "env": {
                    "NODE_ENV": "development",
                    "MICROSOFT_APP_ID": "your_key",
                    "MICROSOFT_APP_PASSWORD": "your_password",
                    "LUIS_ENDPOINT": "https://api.projectoxford.ai/luis/v1/application?id=<your id>&subscription-key=<your key>",
                    "NGROK": "https://<your sub domain>.ngrok.io",
                    "APP_INSIGHT_INSTRUMENTATION_KEY": "<your key>"
                },
                "console": "internalConsole",
                "sourceMaps": false,
                "outDir": null
            }
            ...
        ]

===============================
Change logs
===============================

* 2016-09-14
    * Add Application Insight
        * `npm install applicationinsights --save`
    * Exercise 6: Integrating your bot with channels
        * Task 1 – Use the ChatConnector
        * Task 2 – Run the bot locally `ngrok http 3978`
        * Task 3 – Register the bot in the developer portal - `https://dev.botframework.com/bots?id=<name of the bot>`
        * Task 4: run the chatbot locally in VS Code
        * Task 5: Test the chatbot
    * Exercise 5: Adding global actions
    * Exercise 4: Determining Intent
        * Task 1 – Determine intent using regular expressions
        * Task 2 – Create a language model with LUIS
        * Task 3 – Determine intent using LUIS
    * Exercise 3: Returning results
        * Task 1 – Returning an image attachment
        * Task 2 – Creating a rich card
    * Exercise 2 Collecting input and building dialogs
        * Task 1 – Collecting basic input - what's your name? Hello <name provided>!
        * Task 2 – Adding dialogs and memory - what's your name? Hello <name provided>!
            *  users shares his train schedules, from/to location
    Exercise 1: Creating a HelloWorld bot
        * Task 1 – Installation
        * Task 2 – Create a HelloWorld bot
            * Answers Hello World, always
        * Task 3 – Debug locally with VSCode
            * `node --debug-brk app.js`

===============================
Legal
===============================

* Apache License Version 2.0 - see LICENSE.txt
* Copyright |copy| 2016 by ALT-F1 http://www.alt-f1.be, all rights reserved. 
* Microsoft bot framework preview - online services agreement: https://www.botframework.com/Content/Microsoft-Bot-Framework-Preview-Online-Services-Agreement.htm
* Developer code of conduct for bot framework: https://www.botframework.com/Content/Developer-Code-of-Conduct-for-Microsoft-Bot-Framework.htm


.. URL Links

.. _MIC: http://www.mic-brussels.be/en/home/
.. _Nik Trogh: https://github.com/ntrogh
.. _Nik blog: https://blogs.msdn.microsoft.com/nicktrog/
.. _LUIS: https://www.luis.ai/
.. _Microsoft Bot Framework: https://dev.botframework.com/

.. Replacements
.. |copy| unicode:: 0xA9 .. copyright sign