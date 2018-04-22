export function receiveMessage(user, message, done) {
  // check which question the user is answering
  // store this in the database
  // reply accordingly with next question in the flow
}

export function standupStart(users) {
  // message users with first standup question
}

export function standupReminder(users) {
  // message users with a standup reminder
}

export function standupEnd(users) {
  // end the standup, looking at all users' state for today and post the results to a channel
}
