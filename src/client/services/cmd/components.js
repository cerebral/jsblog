function components(updateTerminal) {
  updateTerminal([
    '### Components',
    'Wrap components in **marksy** code language',
    '- <Image src="somefile.png" width="100%" height="auto" align="center" float="left"/>  - *Display image*',
    '- <Twitter text="Some text to tweet" hashtags="foo,bar"/>  - *Display a tweet section, when clicked redirect to tweet page*',
  ]);
}

export default components;
