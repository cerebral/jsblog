import React from 'react';
import Tags from '../../../components/Tags';
import createSessionSequence from '../common/createSessionSequence';

function createResponse({ props, render }) {
  return render(<Tags />, createSessionSequence(props.session), {
    defaultFont: true,
  }).then(response => ({ response }));
}

export default createResponse;
