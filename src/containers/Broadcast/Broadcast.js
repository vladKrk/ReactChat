import classes from "./Broadcast.module.scss";
import React, { useContext, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { ChatContext } from "../../context/chat/chatContext";
import api from "../../services/serverApi";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";

const Broadcast = () => {
  const chat = useContext(ChatContext);
  const auth = useContext(AuthContext);

  const roomName = document.location.pathname.slice(11);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const videoGrid = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (chat.chatState.selectSuccess) {
      let activeUsersInChat = chat.chatState.activeRoom.users.filter((user) => {
        return chat.chatState.activeUsers.includes(user);
      });
      navigator.mediaDevices
        .getUserMedia({
          video: { width: "300px", height: "300px" },
          audio: true,
        })
        .then((stream) => {
          localVideoRef.current.srcObject = stream;
          initConnection(stream);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      history.push('/chat/' + roomName)
    }
  });

  const initConnection = (stream, name) => {
    let localConnection;
    let remoteConnection;

    api.socket.on("other-users", (otherUsers) => {
      localConnection = new RTCPeerConnection();
      const socketName = otherUsers[0];
      stream
        .getTracks()
        .forEach((track) => localConnection.addTrack(track, stream));

      localConnection.onicecandidate = ({ candidate }) => {
        candidate && api.socket.emit("candidate", socketName, candidate);
      };

      localConnection.ontrack = ({ streams: [stream] }) => {
        remoteVideoRef.current.srcObject = stream;
      };

      localConnection
        .createOffer()
        .then((offer) => localConnection.setLocalDescription(offer))
        .then(() => {
          api.socket.emit(
            "offer",
            socketName,
            localConnection.localDescription
          );
        });

      api.socket.on("offer", (socketId, description) => {
        remoteConnection = new RTCPeerConnection();

        stream
          .getTracks()
          .forEach((track) => remoteConnection.addTrack(track, stream));

        remoteConnection.onicecandidate = ({ candidate }) => {
          candidate && api.socket.emit("candidate", socketId, candidate);
        };

        remoteConnection.ontrack = ({ streams: [stream] }) => {
          remoteVideoRef.current.srcObject = stream;
        };

        remoteConnection
          .setRemoteDescription(description)
          .then(() => remoteConnection.createAnswer())
          .then((answer) => remoteConnection.setLocalDescription(answer))
          .then(() => {
            api.socket.emit(
              "answer",
              socketId,
              remoteConnection.localDescription
            );
          });
      });
    });

    api.socket.on("answer", (description) => {
      localConnection.setRemoteDescription(description);
    });

    api.socket.on("candidate", (candidate) => {
      const conn = localConnection || remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  return (
    <div className={classes.Broadcast}>
      <Header
        title={
          'Video chat in "' +
          (chat.chatState.selectSuccess
            ? chat.chatState.activeRoom.name
            : roomName) +
          '" room'
        }
      />
      <div className={classes.Broadcast__MembersVideo}>
        <div
          className={classes.Broadcast__MembersVideo__Videos}
          ref={videoGrid}
        >
          <video playsInline autoPlay muted ref={localVideoRef}></video>
        </div>
      </div>
      <div className={classes.Broadcast__LowPanel}>
        <button onClick = {
          () => {history.push('/chat/' + roomName)}
        }>Drop</button>
      </div>
    </div>
  );
};

export default Broadcast;
