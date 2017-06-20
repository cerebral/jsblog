import express from 'express';
import renderRoot from './executions/renderRoot';
import createRun from './createRun';
import renderWriteArticle from './executions/renderWriteArticle';
import renderArticle from './executions/renderArticle';
import renderTagArticles from './executions/renderTagArticles';
import subscribe from './executions/subscribe';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

/*
  Our express application
*/
export default function(admin) {
  // The function-tree runner
  const run = createRun(admin);
  const app = express();

  // We need cookie parser to handle the token cookie
  // to identify authentication state
  app.use(cookieParser());

  // We use the body parser to handle the subscribe request
  app.use(bodyParser.json());

  app.get('/', run(renderRoot));
  app.get('/drafts/:displayName/:draftKey', run(renderWriteArticle));
  app.get('/tags/:tag', run(renderTagArticles));
  app.get('/articles/:displayName', (req, res) => {});
  app.get('/articles/:displayName/:articleName', run(renderArticle));

  app.post('/subscribe', run(subscribe));

  return app;
}
