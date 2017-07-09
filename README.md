# Video Interface Skill for Echo Show

## What you will learn
This sample modifies the node.js Fact skill sample to:
- Detect a request from an Echo Show (which supports the [videoapp directive](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/videoapp-interface-reference) or the Echo Show renderer simulator
- Use the [VideoApp.Launch](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/videoapp-interface-reference) directive to launch Video on Echo Show.

## Install Steps
### Create Video Sample Skill

 * Build the skill using [this tutorial](https://github.com/alexa/alexa-cookbook/videoApp-directive)
 * Be sure to run ```npm install``` to get the lastest node SDK. You need version 1.0.11

### On your Skill Information cover page, click Render Template = Yes and save

### Replace your Lambda function code with the provided ```index.js```

 * Open your Lambda Function, select all the code, delete, and paste in the contents of [index.js](index.js) and save.

### Test Your Skill
  You can test your skill using:

  - Your Echo Show
  - The new Simulator panel on the very bottom of the Test page of your skill in developer.amazon.com
  - The AWS Lambda console using the sample unit test requests found in the [test_events](test_events) folder

**Highlighted changes**

- ```supportsDisplay()``` returns true if the device supports the Display directive
- ```isSimulator()``` returns true if the request is from the simulator


**See Also**
- [Build for Echo Show](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/build-skills-for-echo-show)
- [Display Interface Reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference)
- [Design Guide Videos for Echo Show](https://developer.amazon.com/designing-for-voice/what-alexa-says/)
- [Design Guide on Choosing the Right Template](https://developer.amazon.com/designing-for-voice/what-alexa-says/#choose-the-right-template-on-echo-show)
- [Announce Post](https://developer.amazon.com/blogs/alexa/post/50d2ed06-6a81-415c-a842-b335c7f967df/build-skills-for-echo-show-new-alexa-skills-kit-features-for-display-and-video-interfaces)
