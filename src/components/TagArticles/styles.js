import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  wrapper: {
    padding: '50px 0',
  },
  table: {
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '5px',
  },
  tr: {
    border: '1px solid rgb(175, 198, 199)',
    cursor: 'pointer',
    ':hover td': {
      opacity: 1,
    },
  },
  td: {
    padding: '5px 10px',
    opacity: 0.8,
    transition: 'opacity 0.2s ease-in-out',
  },
  datetime: {
    fontSize: '14px',
  },
  title: {
    fontSize: '20px',
  },
  titleLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  readCount: {
    fontSize: '18px',
    textAlign: 'right',
  },
  recommendationCount: {
    fontSize: '18px',
    textAlign: 'right',
  },
});
