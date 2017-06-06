import { set, when } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';
import signInWithGithub from '../actions/signInWithGithub';
import { signOut } from '@cerebral/firebase/operators';
import writeUserCookie from '../actions/writeUserCookie';

export default [
  set(state`app.isChangingAuthentication`, true),
  when(state`app.isLoggedIn`),
  {
    true: [
      signOut(),
      set(state`app.user`, null),
      set(state`app.isLoggedIn`, false),
      writeUserCookie,
    ],
    false: [
      signInWithGithub,
      set(state`app.user`, props`user`),
      set(state`app.isLoggedIn`, true),
      writeUserCookie,
    ],
  },
  set(state`app.isChangingAuthentication`, false),
];
