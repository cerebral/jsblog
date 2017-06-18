function help(updateTerminal) {
  updateTerminal([
    '### Welcome to JSBlog (BETA)',
    '- jsblog new  - *write new article*',
    '- jsblog tag  - *tag article*',
    '- jsblog publish  - *publish article*',
    '- jsblog edit  - *edit article*',
    '- jsblog upload *filename* - *Upload a file to use in article*',
    '- jsblog components - *list possible components*',
    '- jsblog theme - *list possible themes*',
    '- jsblog theme *sometheme* - *activate a new theme*',
    '- jsblog help - *this welcome*',
  ]);
}

export default help;
