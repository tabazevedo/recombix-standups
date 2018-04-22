import slack from 'slack';
import config from './config';

export default function standupReminder(users = []) {
  return Promise.all(
    users.map(async user => {
      const conversation = await slack.conversations.open({
        token: config.get('slack:token'),
        users: user.id
      });

      const post = await slack.chat.postMessage({
        text: config.get('standup:reminder'),
        token: config.get('slack:token'),
        channel: conversation.channel.id
      });
    })
  );
}
