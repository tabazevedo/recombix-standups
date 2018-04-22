import slack from 'slack';
import config from './config';

export default async function standupEnd(submissions = []) {
  const channelsResponse = await slack.channels.list({
    token: config.get('slack:token'),
    exclude_archived: true,
    exclude_members: true
  });

  const chan = channelsResponse.channels.find(
    c => c.name === config.get('slack:standups_channel')
  );

  if (chan) {
    await slack.chat.postMessage({
      token: config.get('slack:token'),
      text: config.get('standup:end'),
      channel: chan.id
    });

    return Promise.all(
      submissions.map(sub =>
        slack.chat.postMessage({
          token: config.get('slack:token'),
          text: `*User:* ${sub.userId}\n\t*Yesterday:* ${
            sub.submission.yesterday
          }\n\t*Today:* ${sub.submission.today}\n\t*How can you help?* ${
            sub.submission.help
          }`,
          channel: chan.id
        })
      )
    );
  }

  throw new Error(
    `Could not find standup channel (${config.get('slack:standups_channel')})`
  );
}
