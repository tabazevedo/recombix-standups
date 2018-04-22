import * as db from '../core/db';
import { standupStart } from '../core/internals';

export async function start_standup(event, context, callback) {
  let users;

  try {
    users = await db.getUsers();
  } catch (e) {
    return callback(e);
  }

  try {
    await standupStart(users);
  } catch (e) {
    return callback(e);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Standups successfully started'
    })
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
