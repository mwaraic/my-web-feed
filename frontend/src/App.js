import React, { Fragment } from "react";
import Signup from "./component/signup/signup";
import { AuthProvider } from "./firebase/authContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./component/dashboard/dashboard";
import Login from "./component/login/login";
import ForgotPassword from "./component/forgotPassword/forgotPassword";
import UpdateProfile from "./component/updateProfile/updateProfile";
import Twitter from "./pages/twitter/twitter";
import GoogleNews from "./pages/googleNews/googleNews";
import Reddit from "./pages/reddit/reddit";
import PrivateRoute1 from "./component/privateRouteOne/privateRouteOne";
import PrivateRoute2 from "./component/privateRouteTwo/privateRouteTwo";
import PublicRoute from "./component/publicRoute/publicRoute";
import SetPreferences from "./component/setPreferences/setPreferences";
import UpdatePreferences from "./component/updatePreferences/updatePreferences";

function App() {
  return (
    <Router>
      <Fragment>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute1 />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/update-profile" element={<PrivateRoute1 />}>
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Route>
            <Route path="/signup" element={<PublicRoute />}>
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/login" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/forgot-password" element={<PublicRoute />}>
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route path="/tweets" element={<PrivateRoute1 />}>
              <Route path="/tweets" element={<Twitter />} />
            </Route>
            <Route path="/news" element={<PrivateRoute1 />}>
              <Route path="/news" element={<GoogleNews />} />
            </Route>
            <Route path="/reddit" element={<PrivateRoute1 />}>
              <Route path="/reddit" element={<Reddit />} />
            </Route>
            <Route path="/update" element={<PrivateRoute1 />}>
              <Route path="/update" element={<UpdatePreferences />} />
            </Route>
            <Route path="/set" element={<PrivateRoute2 />}>
              <Route path="/set" element={<SetPreferences />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </Fragment>
    </Router>
  );
}

export default App;
