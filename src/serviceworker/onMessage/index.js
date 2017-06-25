import reset from './reset';
import update from './update';

function message(event) {
  const message = JSON.parse(event.data);

  switch (message.type) {
    case 'reset':
      return reset();
    case 'update':
      return update(message);
  }
}

export default message;
