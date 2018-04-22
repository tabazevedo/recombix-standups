import config from './config';
import slack from 'slack';

export default async function standupStart(users = []) {
  return await Promise.all(
    users.map(async user => {
      const conversation = await slack.conversations.open({
        token: config.get('slack:token'),
        users: user.id
      });

      const post = await slack.chat.postMessage({
        text: '',
        token: config.get('slack:token'),
        channel: conversation.channel.id,
        attachments: [
          {
            text: config.get('standup:message'),
            callback_id: config.get('callback:open_dialog'),
            color: '#3AE3A3',
            attachment_type: 'default',
            actions: [
              {
                name: 'ok',
                text: 'Give my update',
                type: 'button',
                style: 'primary'
              }
            ]
          }
        ]
      });
    })
  );
}
