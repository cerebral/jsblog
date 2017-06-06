import { when, set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';
import { getUser } from '@cerebral/firebase/operators';
import firebase from 'firebase';
import writeUserCookie from '../actions/writeUserCookie';

export default [
  when(state`app.user`),
  {
    true: [],
    false: [
      getUser(),
      set(state`app.user`, props`user`),
      when(state`app.user`),
      {
        true: set(state`app.isLoggedIn`, true),
        false: set(state`app.isLoggedIn`, false),
      },
      writeUserCookie,
    ],
  },
];
