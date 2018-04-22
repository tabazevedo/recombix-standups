import slack from 'slack';
import config from './config';

export default function openDialog(triggerId) {
  return slack.dialog.open({
    token: config.get('slack:token'),
    trigger_id: triggerId,
    dialog: {
      callback_id: config.get('callback:submit_dialog'),
      title: 'Your standup entry',
      submit_label: 'Submit',
      elements: [
        {
          name: 'yesterday',
          type: 'textarea',
          label: 'What you did yesterday',
          hint: 'Yesterday I...'
        },
        {
          name: 'today',
          type: 'textarea',
          label: "What you'll do today",
          hint: 'Today I will...'
        },
        {
          name: 'help',
          type: 'textarea',
          label: 'How can the team help?',
          hint: 'Leave me alone'
        }
      ]
    }
  });
}
