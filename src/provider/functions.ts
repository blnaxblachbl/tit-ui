export const functions = (state: any, action: any) => {
  if (action.type === 'setState') {
    const keys = Object.keys(action.data);
    let changed = false;
    if (keys.length > 0) {
      const _state = {...state};
      for (let key of keys) {
        if (Object.keys(_state).includes(key)) {
          if (_state[key] !== action.data[key]) {
            changed = true;
            _state[key] = action.data[key];
          }
        } else {
          console.warn(`key "${key}" not found on state`);
          break;
        }
      }
      if (changed) {
        return _state;
      }
    }
  }
  return state;
};
