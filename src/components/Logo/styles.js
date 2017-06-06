import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  wrapper: {
    position: 'fixed',
    top: '10px',
    left: '10px',
    width: '50px',
    textDecoration: 'none',
    fontFamily: 'monospace',
  },
  jsWrapper: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '24px',
    alignItems: 'flex-end',
    height: '50px',
    fontWeight: 'bold',
    lineHeight: '16px',
    padding: '2px',
  },
  blogWrapper: {
    textAlign: 'center',
    fontSize: '18px',
  },
});
