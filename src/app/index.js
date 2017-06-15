import express from 'express';
import renderRoot from './executions/renderRoot';
import createRun from './createRun';
import renderWriteArticle from './executions/renderWriteArticle';
import renderArticle from './executions/renderArticle';
import renderTagArticles from './executions/renderTagArticles';
import subscribe from './executions/subscribe';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default function(admin, webpush) {
  const run = createRun(admin, webpush);
  const app = express();

  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    next();
  });

  app.get('/', run(renderRoot));
  app.post('/subscribe', run(subscribe));
  app.get('/drafts/:displayName/:draftKey', run(renderWriteArticle));
  app.get('/tags/:tag', run(renderTagArticles));
  app.get('/articles/:displayName', (req, res) => {});
  app.get('/articles/:displayName/:articleName', run(renderArticle));

  return app;
}
