function createSessionSequence(session, sequence = []) {
  const isLoggedIn = session ? session.isLoggedIn : null;
  const theme = session ? session.theme : 'hund';

  return [
    function setSession({ state }) {
      state.set('app.isLoggedIn', isLoggedIn);
      state.set('app.theme', theme);
    },
    sequence,
  ];
}

export default createSessionSequence;
