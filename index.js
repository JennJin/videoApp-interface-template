/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates playing a Video, on Echo Show, built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).

 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'Space Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'American Space Facts',
        },
    },
    'en-GB': {
        translation: {

            SKILL_NAME: 'British Space Facts',
        },
    },
    'de': {
        translation: {
            SKILL_NAME: 'Weltraumwissen auf Deutsch',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('playVideo');
    },

    // Example of Video Playback 
    'playVideo' : function () {
         
        // Required
        var videoURL = "<Your Video URL>";
        
        //Optional - Set to empty if not used
        var videoTitle = "<Video Title>";
        var videoSubtitle = "<Video Subtitle>";
        
        if(supportsDisplay.call(this)||isSimulator.call(this)) {
          console.log("has display:"+ supportsDisplay.call(this));
          console.log("is simulator:"+isSimulator.call(this));
          var content = {
                "url" : videoURL,
                "title" : videoTitle,
                "subtitle" : videoSubtitle,
                "templateToken" : "VideoPlayTemplate",
          };
          renderTemplate.call(this, content);
        } else {
            
            // Message if user tries to play a video on a device that doesn't support video.
            var message = "Sorry, video playback is not supported on this device.";
            this.response.speak(message);
        }
     },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.response.speak(speechOutput).listen(reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
       this.response.speak(this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    // Prints Request Event in CloudWatch Logs
    console.log("===EVENT=== \n" + JSON.stringify(event));
    
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


//==============================================================================
//=========================== Helper Functions  ================================
//==============================================================================

function supportsDisplay() {
  var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

  return hasDisplay;
}

function isSimulator() {
  var isSimulator = !this.event.context; //simulator doesn't send context
  return isSimulator;
}

function renderTemplate (content) {

  //
  //Example of sending a VideoApp.Launch Request.
  //
  //https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/videoapp-interface-reference


   switch(content.templateToken) {
       case "VideoPlayTemplate":
          // for reference, here's an example of the content object you'd
          // pass in for this template.
          //  var content = {
          //     "hasDisplaySpeechOutput" : "display "+speechOutput,
          //     "url" : videoURL,
          //     "title" : videoTitle,
          //     "subtitle" : videoSubtitle,
          //     "templateToken" : "VideoPlayTemplate",
          //  };

          
           // VideoApp Launch - Plays a Video
          
           var response = {
             "version": "1.0",
             "response": {
                "directives": [
                  {
                    "type": "VideoApp.Launch",
                    "videoItem": {
                      "source": content.url,
                       "metadata": {
                         "title": content.title,
                         "subtitle": content.subtitle
                         }
                    }
                  }
                ],
                "outputSpeech": null,
             },
            "sessionAttributes": {}
           };
           this.context.succeed(response);
           break;

       default:
        this.response.speak(this.t('STOP_MESSAGE'));
   }

}
