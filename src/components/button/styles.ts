import {StyleSheet} from 'react-native';

import { normalize } from "../../functions/normalize";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#4666ff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 12,
    height: normalize(42),
    borderWidth: 2,
    borderColor: 'transparent',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginHorizontal: normalize(6),
  },
  disabled: {
    opacity: 0.7,
  },
});
