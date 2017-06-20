import { FunctionTree } from 'function-tree';
import { Provider as FirebaseProvider } from '@cerebral/firebase-admin';
import RenderProvider from './providers/Render';
import CacheProvider from './providers/Cache';
import Devtools from 'function-tree/devtools';

/*
  This is where we instantiate the function-tree with its possible side effects
  to be run
*/
export default function createRun(admin) {
  const ft = new FunctionTree([
    RenderProvider,
    FirebaseProvider({}, admin),
    CacheProvider,
  ]);

  if (process.env.NODE_ENV !== 'production') {
    const devtools = new Devtools({
      host: 'localhost:8989',
    });

    devtools.add(ft);
  }

  // The runner takes a execution to run and returns an express
  // middleware function which runs the tree passing in the request
  // and response object
  function run(tree) {
    return function handleRequest(req, res) {
      ft
        .run(req.path, tree, {
          req,
          res,
        })
        .catch(error => {
          console.error(error.message);
          console.error(error.stack);
          res.status(500).send(error.message);
        });
    };
  }

  return run;
}
