import express from 'express';
import renderRoot from './executions/renderRoot';
import run from './run';
import renderWriteArticle from './executions/renderWriteArticle';
import renderArticle from './executions/renderArticle';
import renderTagArticles from './executions/renderTagArticles';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.get('/', run(renderRoot));

app.get('/write', run(renderWriteArticle));
app.get('/tags/:tag', run(renderTagArticles));

app.get('/articles/:username', (req, res) => {});

app.get('/articles/:username/:article', run(renderArticle));

export default app;
