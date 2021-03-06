# pre-deployment steps

* Create an app for your Slack with the required OAuth scopes listed below
* Add a bot user for that application
* Create a `#standups` channel in your Slack

##### Required OAuth scopes

* `bot` (automatically added when you create the bot user)
* `incoming-webhook`
* `channels:read, channels:write`
* `chat:write:bot`
* `groups:write`
* `im:write`
* `mpim:write`
* `users:read, users:read.email`

# deploying

* Make sure you have AWS credentials set up correctly in `~/.aws/credentials` (or provide via env variables)
* Grab your _Bot User OAuth Access Token_ as you'll need it for the next step.
* Run `SLACK_OAUTH_TOKEN="bot-oauth-token" yarn deploy`

#### Keep a note of the POST /standups endpoint from the output of yarn deploy, as you'll need it in the next step

# post-deploy steps

* Turn 'Interactive Components' on in your created Slack app. Use the URL you made a note of from the previous step as the 'Request URL'
