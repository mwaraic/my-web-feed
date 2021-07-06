import React from "react"
import Signup from "./component/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch} from "react-router-dom"
import Dashboard from "./component/Dashboard"
import Login from "./component/Login"
import ForgotPassword from "./component/ForgotPassword"
import UpdateProfile from "./component/UpdateProfile"
import Tweets from "./pages/tweet"
import News from "./pages/news"
import Reddit from "./pages/reddit"
import NavPrivateRoute from "./component/NavPrivateRoute"
import NavPrivateRoute2 from "./component/NavPrivateRoute2"
import DivRoute from "./component/DivRoute"
import MyComponent from "./pages/set-preferance"
import UpdatePreferances from "./component/update-preferances"
function App() {
  return (
    <>
        <Router>
          <AuthProvider>
            <Switch> 
              <NavPrivateRoute path="/" component={Dashboard} exact />
              <NavPrivateRoute path="/update-profile" component={UpdateProfile} exact/>
              <DivRoute path="/signup" component={Signup} exact/>
              <DivRoute path="/login" component={Login} exact />
              <DivRoute path="/forgot-password" component={ForgotPassword} exact />
              <NavPrivateRoute path="/tweets/" component={Tweets} exact/>
              <NavPrivateRoute path="/news/" component={News} exact/>
              <NavPrivateRoute path="/reddit/" component={Reddit} exact/>
              <NavPrivateRoute2 path="/set-preferances/" component={MyComponent} exact/>
              <NavPrivateRoute path="/update-preferances/" component={UpdatePreferances} exact/>
           </Switch>
        </AuthProvider>
        
        </Router>
  </>
  )
}
export default App
