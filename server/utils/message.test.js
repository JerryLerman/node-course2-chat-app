const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message', () => {
    var message = generateMessage('Jerry','Test Message');
    expect(message.from).toBe('Jerry');
    expect(message.text).toBe('Test Message');
    expect(typeof message.createdAt).toBe('number');
  });
});
