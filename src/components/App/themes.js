import { StyleSheet } from 'aphrodite';

export default {
  default: {
    prism: {
      default: '#EAEAEA',
      comment: 'rgba(175, 198, 199, 0.3)',
      punctuation: '#999',
      tag: 'rgb(0,197,199)',
      string: 'rgb(193,177,0)',
      operator: '#EAEAEA',
      keyword: 'rgb(0,197,199)',
      function: 'rgb(0,195,0)',
      variable: 'rgb(0,197,199)',
    },
    App: StyleSheet.create({
      wrapper: {
        backgroundColor: 'rgb(4,5,6)',
        color: 'rgb(175, 198, 199)',
      },
    }),
    Logo: StyleSheet.create({
      jsWrapper: {
        color: 'rgb(4,5,6)',
        backgroundColor: 'rgb(175, 198, 199)',
      },
      blogWrapper: {
        color: 'rgb(175, 198, 199)',
      },
    }),
    Write: StyleSheet.create({
      button: {
        border: '2px solid rgb(175, 198, 199)',
        color: 'rgb(175, 198, 199)',
      },
    }),
    Login: StyleSheet.create({
      button: {
        border: '2px solid rgb(175, 198, 199)',
        color: 'rgb(175, 198, 199)',
      },
    }),
  },
  hund: {
    highlight: {
      default: '#CCC',
      comment: '#666',
      tag: '#42717B',
      string: '#BDE077',
      // operator: '#42717B',
      keyword: '#FEA63C',
      function: '#42717B',
      variable: '#FEA63C',
      type: '#42717B',
      regexp: '#BDE077',
      symbol: '#D23D3D',
      built_in: '#BDE077',
      meta: '#666',
    },
    App: StyleSheet.create({
      wrapper: {
        color: '#CCC',
        backgroundColor: '#161616',
      },
    }),
    Logo: StyleSheet.create({
      jsWrapper: {
        color: '#161616',
        backgroundColor: '#CCC',
      },
      blogWrapper: {
        color: '#CCC',
      },
    }),
    Write: StyleSheet.create({
      button: {
        border: '2px solid #CCC',
        color: '#CCC',
      },
    }),
    Login: StyleSheet.create({
      button: {
        border: '2px solid #CCC',
        color: '#CCC',
      },
    }),
  },
};
