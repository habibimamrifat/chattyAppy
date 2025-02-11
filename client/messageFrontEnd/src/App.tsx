import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import LogIn from "./pages/logIn";
import UserHome from "./layouts/userHome";
import Contacts from "./pages/Contacts";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";
import AllFriends from "./pages/AllFriends";
import PeopleToKnow from "./pages/PeopleToKnow";
import Register from "./pages/Register";
import LogOutUser from "./pages/LogOutUser";





function App() {
  return (
    <Routes>

      {/* dash */}
      <Route element={<DefaultLayout/>} path="/">
      <Route element={<LogIn/>} index />
      <Route element={<Register/>} path="register" />
      </Route>

      {/* user home  */}
      <Route element={<UserHome/>} path="/userHome">
      <Route element={<Contacts/>} index />
      <Route element={<Requests/>} path="requests" />
      <Route element={<Profile/>} path="viewMyProfile" />
      <Route element={<AllFriends/>} path="viewAllFriends" />
      <Route element={<PeopleToKnow/>} path="viewAllUser" />
      <Route element={<LogOutUser/>} path="logOut" />
      
      </Route>

    </Routes>
  );
}

export default App;
