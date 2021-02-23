import "./App.css";
import { AuthState } from "./context/auth/authState";
import { BrowserRouter} from "react-router-dom";
import AppRoute from "./hoc/AppRoute";
import { ChatState } from "./context/chat/chatState";
import { useEffect } from "react";
import api from "./services/serverApi";

function App() {

  useEffect(() => {
    
  }, [])

  return (
    <AuthState>
      <ChatState>
      <div className="App">
        <BrowserRouter>
          <AppRoute/>
        </BrowserRouter>
      </div>
      </ChatState>
    </AuthState>
  );
}

export default App;
