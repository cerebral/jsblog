import React from 'react';
import WriteArticle from '../../../components/WriteArticle';
import createSessionSequence from '../common/createSessionSequence';

function createResponse({ props, render }) {
  const user = props.user;

  return render(
    <WriteArticle />,
    createSessionSequence(props.session, [
      function({ state }) {
        state.set(
          'app.writeArticleValue',
          `# Hello there

What is happening? :)

\`\`\`js
const foo = "bar";
\`\`\``
        );
      },
    ])
  ).then(response => ({ response }));
}

export default createResponse;
