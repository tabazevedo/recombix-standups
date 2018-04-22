import * as db from '../core/db';
import { standupStart } from '../core/internals';
import error from '../core/error';

export async function start_standup(event, context) {
  let users;

  try {
    users = await db.getUsers();
  } catch (e) {
    return error(e, 'Failed to get users from database.');
  }

  try {
    await standupStart(users);
  } catch (e) {
    return error(e, 'Could not start standup process.');
  }

  return {
    statusCode: 200
  };
}

// triggered by a slash command eventually?
export async function add_user(event, context) {
  const body = JSON.parse(event.body);
  const email = body.email;

  try {
    await db.addUser(email);
  } catch (e) {
    return error(e, `Could not add user ${email}`);
  }

  return {
    statusCode: 201,
    body: `Added user with email ${email} to standup members.`
  };
}
