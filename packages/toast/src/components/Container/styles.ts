import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    width: '100%',
  },
  defaultSuccess: {
    backgroundColor: '#e6f4e7',
    borderColor: '#81c885',
    borderLeftWidth: 5
  },
  defaultError: {
    backgroundColor: '#ffe7e1',
    borderColor: '#fc8a64',
    borderLeftWidth: 5
  },
  defaultInfo: {
    backgroundColor: '#e1edfb',
    borderColor: '#61abe9',
    borderLeftWidth: 5
  },
  defaultWarn: {
    backgroundColor: '#fff2dc',
    borderColor: '#feb74d',
    borderLeftWidth: 5
  },
});
