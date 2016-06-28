# Search iTunes Skill

Install the Alexa Skill to be able to search for iTunes media.

## Setup

To get started simple use `npm install` to install all dependencies.

## Deploying to Amazon Lambda

To deploy your skill you will need to use the `grunt lambda_package` command to zip up the file and drop into Lambda.

## The iTunes Skill

Check out `index.js` for the boilerplate Alexa app. Examples of how to define an intent handler, build sample utterences and schema, and response asynchronously are all included. You can also see example projects located in the `examples/` directory.

## Creating you Lambda function

Each Alexa skill requires a Lambda function. 

1. Log into the [AWS Lambda Console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions) and making sure your region is set to `us-east-1`
2. Click "Create Lambda Function"
3. Choose to skip the "Select blueprint" phase
4. Give your function a name and description.
5. Set the role and create your function.
6. Using the `grunt lambda_package` command upload the zip file from the newly created `dist` directory.
