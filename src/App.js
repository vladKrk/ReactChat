import "./App.css";
import Auth from "./containers/Auth/Auth";
import Chat from "./containers/Chat/Chat";
import Layout from "./containers/Layout/Layout";
import { AuthState } from "./context/auth/authState";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <AuthState>
      <div className="App">
        <BrowserRouter>
          <Layout style={{ width: "40%", height: "40%" }}>
            <Auth />
          </Layout>
          {/* <Layout>
      <Chat/>
    </Layout> */}
        </BrowserRouter>
      </div>
    </AuthState>
  );
}

export default App;
