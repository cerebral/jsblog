import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  button: {
    position: 'fixed',
    top: '-50px',
    fontFamily: 'monospace',
    right: '150px',
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
    textDecoration: 'none',
    transition: 'opacity 0.2s ease-in-out, top 0.2s ease-in-out',
    ':hover': {
      opacity: 0.8,
    },
  },
  visible: {
    top: '10px',
  },
});
