import express from 'express';
import renderRoot from './executions/renderRoot';
import run from './run';
import renderWriteArticle from './executions/renderWriteArticle';
import renderArticle from './executions/renderArticle';
import renderTagArticles from './executions/renderTagArticles';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use(function(req, res, next) {
  next();
});

app.get('/', run(renderRoot));

app.get('/drafts/:displayName/:draftKey', run(renderWriteArticle));
app.get('/tags/:tag', run(renderTagArticles));

app.get('/articles/:displayName', (req, res) => {});

app.get('/articles/:displayName/:articleName', run(renderArticle));

export default app;
