import loginClicked from './signals/loginClicked';
import initialized from './signals/initialized';
import writeArticleValueChanged from './signals/writeArticleValueChanged';

export default {
  state: {
    title: 'JS Blog',
    theme: 'default',
    article: null,
    articles: [],
    isChangingAuthentication: false,
    isLoggedIn: false,
    user: null,
    writeArticleValue: '',
  },
  signals: {
    loginClicked,
    initialized,
    writeArticleValueChanged,
  },
  provider(context) {
    context.app = {
      writeCookie(content) {
        document.cookie = `jsblog=${JSON.stringify(
          content
        )}; expires=expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
      },
    };

    return context;
  },
};
