import dynamodb from 'serverless-dynamodb-client';
import slack from 'slack';
import config from './config';

const client = dynamodb.doc;

export async function getUsers() {
  const res = await client.scan({ TableName: 'usersTable' }).promise();

  return res.Items;
}

export async function addUser(email) {
  const userLookup = await slack.users.lookupByEmail({
    token: config.get('slack:token'),
    email: email
  });

  if (userLookup.ok) {
    return await client
      .put({
        TableName: 'usersTable',
        Item: {
          id: userLookup.user.id,
          email: email
        }
      })
      .promise();
  }

  throw new Error(`Could not fetch user with email: ${email}`);
}
