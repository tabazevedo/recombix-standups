import qs from 'querystring';

import config from '../core/config';
import error from '../core/error';
import openDialog from '../core/open-dialog';
import submitDialog from '../core/submit-dialog';

export async function post(event, context) {
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
