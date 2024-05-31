import React from "react"
import Signup from "./component/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch} from "react-router-dom"
import Dashboard from "./component/Dashboard"
import Login from "./component/Login"
import ForgotPassword from "./component/ForgotPassword"
import UpdateProfile from "./component/UpdateProfile"
import Twitter from "./pages/Twitter"
import GoogleNews from "./pages/GoogleNews"
import Reddit from "./pages/Reddit"
import PrivateRoute1 from "./component/PrivateRoute1"
import PrivateRoute2 from "./component/PrivateRoute2"
import Route from "./component/Route"
import SetPreferences from "./pages/SetPreferences"
import UpdatePreferences from "./component/UpdatePreferences"
function App() {
  return (
    <>
        <Router>
          <AuthProvider>
            <Switch> 
              <PrivateRoute1 path="/" component={Dashboard} exact />
              <PrivateRoute1 path="/update-profile" component={UpdateProfile} exact/>
              <Route path="/signup" component={Signup} exact/>
              <Route path="/login" component={Login} exact />
              <Route path="/forgot-password" component={ForgotPassword} exact />
              <PrivateRoute1 path="/tweets/" component={Twitter} exact/>
              <PrivateRoute1 path="/news/" component={GoogleNews} exact/>
              <PrivateRoute1 path="/reddit/" component={Reddit} exact/>
              <PrivateRoute2 path="/set-preferances/" component={SetPreferences} exact/>
              <PrivateRoute1 path="/update-preferances/" component={UpdatePreferences} exact/>
           </Switch>
        </AuthProvider>
        
        </Router>
  </>
  )
}
export default App
