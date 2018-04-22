import dynamodb from 'serverless-dynamodb-client';

export async function getUsers() {
  const client = dynamodb.doc;

  const res = await client.scan({ TableName: 'usersTable' }).promise();

  return res.Items.map(item => item.name);
}
