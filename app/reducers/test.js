import { FOOBAR } from 'actions/test';

export const defaultState = {
  foo: 'bar'
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (typeof state === 'undefined') {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch(action.type) {
    case FOOBAR:
      return {
        ...state,
        foo: action.payload.foo
      };
    break;

    default:
      return state;
    break;
  }
};