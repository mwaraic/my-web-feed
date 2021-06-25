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
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
     
        <Router>
          <AuthProvider>
            <Switch> 
        <div className="w-100" style={{ maxWidth: "400px" }}>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
        </div> 
           </Switch>
        </AuthProvider>
           
            <Switch>
              <Route path="/tweets/:id" component={Tweet}/>
              <Route path="/news/:name" component={News}/>
            </Switch>
         
        </Router>
      
    </Container>
  )
}
export default App
