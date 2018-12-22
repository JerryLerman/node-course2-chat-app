const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message', () => {
    var message = generateMessage('Jerry','Test Message');
    expect(message.from).toBe('Jerry');
    expect(message.text).toBe('Test Message');
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var locationMessage = generateLocationMessage('Jerry','123','456');
    expect(locationMessage.from).toBe('Jerry');
    expect(locationMessage.url).toBe('https://www.google.com/maps?q=123,456');
    expect(typeof locationMessage.createdAt).toBe('number');
  });
});
