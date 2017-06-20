import registerSubscription from './registerSubscription';
import sendResponse from './sendResponse';

/*
  We simply insert the notifications token in the database. This could
  later be based on specific tags
*/
export default [registerSubscription, sendResponse];
