import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  wrapper: {
    flex: '0 1 800px',
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
  },
  cloud: {},
  tag: {
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '0 3px',
    transition: 'opacity 0.2s ease-in-out',
    opacity: '1',
    color: 'inherit',
    textDecoration: 'none',
    margin: '5px',
    ':hover': {
      opacity: '0.8',
    },
  },
});
