const config = new Map();

config.set(
  'standup:message',
  "Hey! It's almost standup time. Please fill in the form!"
);

config.set('slack:token', process.env.SLACK_OAUTH_TOKEN);
config.set('callback:open_dialog', 'callback:open_dialog');
config.set('callback:submit_dialog', 'callback:submit_dialog');

export default { get: k => config.get(k) };
