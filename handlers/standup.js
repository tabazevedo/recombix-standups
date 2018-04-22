import {
  getUsers,
  getSubmissions,
  getUsersWithMissingSubmissionsToday
} from '../core/db';

import error from '../core/error';
import config from '../core/config';
import standupStart from '../core/standup-start';
import standupReminder from '../core/standup-reminder';
import standupEnd from '../core/standup-end';

export async function start(event, context) {
  let users;

  try {
    users = await getUsers();
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

export async function end(event, context) {
  try {
    const submissions = await getSubmissions(new Date());
    await standupEnd(submissions);
  } catch (e) {
    return error(e, 'Could not end standup process.');
  }

  return {
    statusCode: 200
  };
}

export async function reminder(event, context) {
  try {
    const users = await getUsersWithMissingSubmissionsToday();
    await standupReminder(users);
  } catch (e) {
    return error(e, 'Failed to run a standup reminder.');
  }

  return {
    statusCode: 200
  };
}
