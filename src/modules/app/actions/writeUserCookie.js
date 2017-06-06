function writeUserCookie({ app, state }) {
  app.writeCookie({
    isLoggedIn: Boolean(state.get('app.user')),
    theme: state.get('app.theme'),
  });
}

export default writeUserCookie;
