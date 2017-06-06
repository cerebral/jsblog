import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: '0 1 1000px',
    padding: '50px 0',
  },
  textarea: {
    flex: '2',
    border: '0',
    backgroundColor: 'transparent',
    fontFamily: '"Droid Sans Mono"',
    fontSize: '18px',
    color: 'inherit',
    resize: 'none',
    outline: 'none',
    width: '100%',
    minHeight: '400px',
    marginRight: '10px',
  },
  preview: {
    flex: '1',
    fontSize: '65%',
    marginLeft: '10px',
  },
});
