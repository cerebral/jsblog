import { StyleSheet } from 'aphrodite';

const blink = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

export default StyleSheet.create({
  button: {
    position: 'fixed',
    fontFamily: 'monospace',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '20px',
    cursor: 'pointer',
    opacity: 1,
    transition:
      'opacity 0.2s ease-in-out, width 0.2s ease-in-out, height 0.2s ease-in-out',
    ':hover': {
      opacity: 0.8,
    },
  },
  loading: {
    animationName: [blink],
    animationTimingFunction: 'ease-in-out',
    animationDuration: '0.75s',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    width: 0,
    padding: 0,
    height: 0,
  },
});
