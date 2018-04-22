import qs from 'querystring';
import * as db from '../core/db';
import { standupStart } from '../core/internals';
import error from '../core/error';
import config from '../core/config';
import openDialog from '../core/open-dialog';
import submitDialog from '../core/submit-dialog';
import standupReminder from '../core/standup-reminder';
import standupEnd from '../core/standup-end';

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

export async function standup_end(event, context) {
  try {
    const submissions = await db.getSubmissions(new Date());
    await standupEnd(submissions);
  } catch (e) {
    return error(e, 'Could not end standup process.');
  }

  return {
    statusCode: 200
  };
}

export async function standup_reminder(event, context) {
  try {
    const users = await db.getUsersWithMissingSubmissionsToday();
    await standupReminder(users);
  } catch (e) {
    return error(e, 'Failed to run a standup reminder.');
  }

  return {
    statusCode: 200
  };
}

export async function post_standups(event, context) {
  const data = JSON.parse(qs.parse(event.body).payload);

  switch (data.callback_id) {
    case config.get('callback:open_dialog'):
      try {
        await openDialog(data.trigger_id);
      } catch (e) {
        return error(e, `Could not open standup info dialog.`);
      }

      return {
        statusCode: 200
      };
    case config.get('callback:submit_dialog'):
      try {
        await submitDialog(data);
      } catch (e) {
        return error(e, `Could not submit dialog.`);
      }

      return {
        statusCode: 200
      };
    default:
      return error(null, `Callback not recognised (${data.callback_id})`);
  }
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
