import io from "socket.io-client";

class serverApi {
  constructor() {
    this.socket = null;
  }

  connect = (url) => {
    this.socket = io(url);
  };

  signUp = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "registration",
        {
          name: data.name,
        },
        (res) => {
          return resolve(JSON.parse(res));
        }
      );
    });
  };

  fetchRooms = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "fetchRooms",
        {
          name: data.name,
        },
        (res) => {
          return resolve(JSON.parse(res));
        }
      );
    });
  };

  checkingUser = (data) => {
    this.socket.emit("checkingUser", { name: data.name });
  };

  logout = (data) => {
    this.socket.emit("logout", {name: data.name});
  }

  fetchRoom = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "fetchRoom",
        {
          name: data.name,
          roomName: data.roomName,
        },
        (res) => {
          return resolve(JSON.parse(res));
        }
      );
    });
  };

  fetchActiveUsers = () => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "fetchActiveUsers",
        (res) => {
          return resolve(JSON.parse(res));
        }
      );
    });
  }

  sendMessage = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "sendMessage",
        {
          text: data.text,
          sender: data.sender,
          roomName: data.roomName,
        },
        (res) => {
          return resolve(JSON.parse(res));
        }
      );
    });
  };
}

const api = new serverApi();
export default api;
