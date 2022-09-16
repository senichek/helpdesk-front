import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/actions';
import "./App.css";
import Login from "./components/login";
import Signup from "./components/signUp";
import Navbar from "./components/navbar";
import HelperChat from "./components/chatHelper";
import UserChat from "./components/chatUser";

function App() {

  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user);

  useEffect(() => {
    // During the signup the user gets storred in the localStorage.
    // See auth middleware.
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Put the user in the state
    if (loggedInUser) {
      dispatch(setUser(loggedInUser));
  }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {loggedInUser.role === 'helper' &&
          <Route path="/helperchat" element={<HelperChat />} />
        }
        {loggedInUser.role === 'user' &&
          <Route path="/userchat" element={<UserChat />} />
        }
      </Routes>
    </div>
  );
}

export default App;
