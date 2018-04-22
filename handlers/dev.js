import { addUser } from '../core/db';
import error from '../core/error';

// triggered by a slash command eventually?
export async function add_user(event, context) {
  const body = JSON.parse(event.body);
  const email = body.email;

  try {
    await addUser(email);
  } catch (e) {
    return error(e, `Could not add user ${email}`);
  }

  return {
    statusCode: 201,
    body: `Added user with email ${email} to standup members.`
  };
}
