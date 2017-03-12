export const FOOBAR = 'rn-groceries/test/FOOBAR';

export const fooBar = foo => {
  return {
    type: FOOBAR,
    payload: {
      foo
    }
  }
}