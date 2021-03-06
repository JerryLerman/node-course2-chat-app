const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(123)).toBeFalsy();
  });
  it('should reject a string with only spaces', () => {
    expect(isRealString('    ')).toBeFalsy();
  });
  it('should allow a string with non-space characters', () => {
    expect(isRealString('  Now is the time ')).toBeTruthy();
  });
});
