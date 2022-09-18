import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setRecipient } from './store/actions';
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

      // By the default the recipient = ID of the logged-in user. All the
      // users join their own room by default (room = userId)
      dispatch(setRecipient(loggedInUser.id));
  }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/helperchat" element={loggedInUser.role === 'helper' && <HelperChat />}/>
        <Route path="/userchat" element={loggedInUser.role === 'user' && <UserChat />}/>
      </Routes>
    </div>
  );
}

export default App;
