import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 5,
    marginHorizontal: 15,
    // width: '50%',
  },
  track: {
    width: '100%',
    height: 5,
    backgroundColor: '#4666ff',
    borderRadius: 2,
    position: 'relative',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  circle: {
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
});
