// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {

  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var newUser = {id, name, room};
    this.users.push(newUser);
    return newUser;
  }

  getUser(id) {
    var usersObjects = this.users.filter((oneUser) => {
      return oneUser.id === id;
    });

    return usersObjects[0];
  }

  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((oneID) => {
        return oneID.id !== id;
      });
    }
    return user;
  }

  getUserList(room) {
    var usersArray = this.users.filter((oneUser) => {
      return oneUser.room === room;
    });

    // Convert the array of objects to an array of strings
    var namesArray = usersArray.map((oneUserObject) => {
      return oneUserObject.name;
    });

    return namesArray;
  }

  returnArrayOfData() {
    return this.users;
  }
}


module.exports = {Users};
