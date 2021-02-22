import io from "socket.io-client";

class serverApi {
  constructor() {
    this.socket = null;
  }

  connect = (url) => {
    this.socket = io(url);
  };

  // Params:
  //  data = {name}
  // return:
  //  {status: 'success', message: 'User created'/'User entered'}
  signUp = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "registration",
        {
          name: data.name,
        },
        (res) => {
          console.log("signUp: ", res);
          return resolve(JSON.parse(res));
        }
      );
    });
  };

  // Params:
  //  data = {name}
  // return:
  //  {status: 'success', message: rooms}  //Only your rooms//
  fetchRooms = (data) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "fetchRooms",
        {
          name: data.name,
        },
        (res) => {
          console.log("fetchRooms: ", res);
          return resolve(JSON.parse(res));
        }
      );
    });
  };

  fetchRoom = (data) => {
    return new Promise((resolve, reject) => {
        this.socket.emit(
          "fetchRoom",
          {
            name: data.name,
            roomName: data.roomName,
          },
          (res) => {
            console.log("fetchRoom: ", res);
            return resolve(JSON.parse(res));
          }
        );
      });
  }
}

const api = new serverApi();
export default api;