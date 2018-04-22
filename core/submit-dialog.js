import { addSubmission } from './db';

export default function submitDialog(data) {
  const submission = {
    yesterday: data.submission.yesterday,
    today: data.submission.today,
    help: data.submission.help
  };

  addSubmission(data.user.id, submission);
}
