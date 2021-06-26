import React from "react"
import Signup from "./component/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./component/Dashboard"
import Login from "./component/Login"
import PrivateRoute from "./component/PrivateRoute"
import ForgotPassword from "./component/ForgotPassword"
import UpdateProfile from "./component/UpdateProfile"
import Tweet from "./pages/tweet"
import News from "./pages/news"
import Reddit from "./pages/reddit"
import NavBar from "./NavBar"
function App() {
  return (
    <>
    <NavBar/>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
        <Router>
          <AuthProvider>
            <Switch> 
        <div className="w-100" style={{ maxWidth: "400px" }}>
              <PrivateRoute path="/" component={Dashboard} exact />
              <PrivateRoute path="/update-profile" component={UpdateProfile} exact/>
              <Route path="/signup" component={Signup} exact/>
              <Route path="/login" component={Login} exact />
              <Route path="/forgot-password" component={ForgotPassword} exact />
              <PrivateRoute path="/tweets/:id" component={Tweet} exact/>
              <PrivateRoute path="/news/:name" component={News} exact/>
              <PrivateRoute path="/reddit/:name" component={Reddit} exact/>
        </div> 
           </Switch>
        </AuthProvider>
        
        </Router>
      
    </Container>
    
  </>
  )
}
export default App
