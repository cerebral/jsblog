import React from 'react';
import TagArticles from '../../../components/TagArticles';
import createSessionSequence from '../common/createSessionSequence';

function createResponse({ props, render }) {
  return render(
    <TagArticles />,
    createSessionSequence(props.session, [
      function({ state }) {
        state.set('app.articles', [
          {
            datetime: Date.now(),
            title: 'React is pretty awesome',
            author: 'christianalfoni',
            readCount: 5,
            recommendationCount: 2,
            href: '/articles/christianalfoni/123',
          },
          {
            datetime: Date.now() - 2503430843,
            title: 'React is coming',
            author: 'christianalfoni',
            readCount: 50,
            recommendationCount: 10,
            href: '/articles/christianalfoni/123',
          },
        ]);
      },
    ])
  ).then(response => ({ response }));
}

export default createResponse;
