import { FunctionTree } from 'function-tree';
import { Provider as FirebaseProvider } from '@cerebral/firebase-admin';
import RenderProvider from './providers/Render';
import serviceAccount from '../../serviceAccount.json';
import Devtools from 'function-tree/devtools';

const ft = new FunctionTree([
  RenderProvider,
  FirebaseProvider({
    serviceAccount,
    databaseURL: 'https://gblog-f47ee.firebaseio.com',
  }),
]);

if (process.env.NODE_ENV !== 'production') {
  const devtools = new Devtools({
    host: 'localhost:8989',
  });

  devtools.add(ft);
}

function run(tree) {
  return function handleRequest(req, res) {
    ft
      .run(req.path, tree, {
        req,
        res,
      })
      .catch(error => {
        res.status(500).send(error.message);
      });
  };
}

export default run;
