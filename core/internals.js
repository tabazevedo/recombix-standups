import config from './config';
import slack from 'slack';

export function receiveMessage(user, message, done) {
  // check which question the user is answering
  // store this in the database
  // reply accordingly with next question in the flow
}

export async function standupStart(users = []) {
  try {
    await Promise.all(
      users.map(async user => {
        conversation = await slack.conversations.open({
          token: config.get('slack:token'),
          users: [user]
        });

        const post = await slack.chat.postMessage({
          token: config.get('slack:token'),
          channel: conversation.channel.id,
          attachments: [
            {
              text: config.get('standup:message').replace('{{user}}', user),
              callback_id: 'standup_form_open',
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
  } catch (e) {
    console.log(e);
    throw new Error('Could not start standups: ', e);
  }
}

export function standupReminder(users) {
  // message users with a standup reminder
}

export function standupEnd(users) {
  // end the standup, looking at all users' state for today and post the results to a channel
}
