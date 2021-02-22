module.exports = class Room {

    constructor(name, users, messages) {
        this.name = name;
        this.users = users;
        this.messages = messages;
    }

    hasUser = (name) => {
        return this.users.includes(name);
    }

    deleteUser = (name) => {
        return this.users.splice(this.users.indexOf(name), 1);
    }
}