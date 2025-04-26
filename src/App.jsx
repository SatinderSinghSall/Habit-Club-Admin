import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Dashboard/Overview";
import Admins from "./pages/Dashboard/Admins";
import Users from "./pages/Dashboard/Users";
import Habits from "./pages/Dashboard/Habits";
import Contacts from "./pages/Dashboard/Contacts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="admins" element={<Admins />} />
          <Route path="users" element={<Users />} />
          <Route path="habits" element={<Habits />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
