export default function error(e, message) {
  console.log(message);
  console.error(e);

  return {
    statusCode: 500,
    body: message
  };
}
