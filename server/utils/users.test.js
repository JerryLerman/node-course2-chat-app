const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();

    var userData = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];

    for (var i=0; i < userData.length; i++) {
      users.addUser(userData[i].id, userData[i].name, userData[i].room);
    }
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Jerry',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Julie']);
  });

  it('should return names for React course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });

  it('should find a user', () => {
    var user = users.getUser('2');
    expect(user.name).toEqual('Jen');
    user = users.getUser('3');
    expect(user.name).toEqual('Julie');
  });

  it('should not find a user', () => {
    var user = users.getUser('9');
    expect(user).toBeFalsy();
  });

  it('should remove a user', () => {
    var removedUser = users.removeUser('3');
    expect(removedUser.id).toEqual('3');
    removedUser = users.getUser('3');
    expect(removedUser).toBeFalsy();
    var userObject = users.returnArrayOfData();
    expect(userObject.length).toBe(2);
  });

  it('should not remove a user', () => {
    var removedUser = users.removeUser('9');
    expect(removedUser).toBeFalsy();
    userObject = users.returnArrayOfData();
    expect(userObject.length).toBe(3);
  });
});
