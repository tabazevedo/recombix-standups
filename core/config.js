const config = new Map();

config.set(
  'standup:message',
  "Hey! It's almost standup time. Please fill in the form!"
);

config.set('slack:token', process.env.SLACK_OAUTH_TOKEN);

export default { get: k => config.get(k) };
