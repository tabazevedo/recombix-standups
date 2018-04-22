const config = new Map();

config.set(
  'standup:message',
  "Hey, {{user}}! It's almost standup time. Please fill in the form!"
);

export default { get: k => config.get(k) };
