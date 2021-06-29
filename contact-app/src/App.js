import React from "react"
import Signup from "./component/Signup"

import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./component/Dashboard"
import Login from "./component/Login"
import PrivateRoute from "./component/PrivateRoute"
import ForgotPassword from "./component/ForgotPassword"
import UpdateProfile from "./component/UpdateProfile"
import Tweets from "./pages/tweet"
import News from "./pages/news"
import Reddit from "./pages/reddit"
import NavPrivateRoute from "./component/NavPrivateRoute"
import DivRoute from "./component/DivRoute"
function App() {
  return (
    <>
   
    
        <Router>
          <AuthProvider>
            <Switch> 
        
              <PrivateRoute path="/" component={Dashboard} exact />
              <PrivateRoute path="/update-profile" component={UpdateProfile} exact/>
              <DivRoute path="/signup" component={Signup} exact/>
              <DivRoute path="/login" component={Login} exact />
              <Route path="/forgot-password" component={ForgotPassword} exact />
              <NavPrivateRoute path="/tweets/" component={Tweets} exact/>
              <NavPrivateRoute path="/news/" component={News} exact/>
              <NavPrivateRoute path="/reddit/" component={Reddit} exact/>
   
           </Switch>
        </AuthProvider>
        
        </Router>
      
 
    
  </>
  )
}
export default App
