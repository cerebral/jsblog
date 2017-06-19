function components(updateTerminal) {
  updateTerminal([
    '### Components',
    'Wrap components in **marksy** code language',
    '- <Image src="somefile.png" width="100%" height="auto" align="center" float="none"/>  - *Display image*',
    '- <Twitter text="Some text to tweet" hashtags="foo,bar"/>  - *Display a tweet section, when clicked redirect to tweet page*',
    '- <Youtube url="https://www.youtube.com/watch?v=uhuLxs8-zP4" width="100%" height="315px" align="center" float="none"/>  - *Display a youtube clip*',
    '- <Codesandbox url="https://codesandbox.io/s/15nzVq3Z"/>  - *Display a codebox sandbox*',
  ]);
}

export default components;
