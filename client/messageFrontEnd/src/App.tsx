import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import LogIn from "./pages/logIn";
import Register from "./pages/register";
import UserHome from "./layouts/userHome";
import Contacts from "./pages/Contacts";

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
      </Route>

    </Routes>
  );
}

export default App;
