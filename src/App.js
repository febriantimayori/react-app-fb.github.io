import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Products from './components/Products';
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Redirect
} from 'react-router-dom'
import { SignUp } from './SignUp'
import { Login } from './Login'
import { AuthContextProvider, useAuthState } from './firebase'

const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`AuthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  )
}

const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`)
  return (
    <Route
      {...props}
      render={routeProps =>
        !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  )
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="row">
          <div className="col-md-8 offset-md-2">
              <AuthenticatedRoute exact path="/" component={Products} />
            </div>
        </div>
        <UnauthenticatedRoute exact path="/signup" component={SignUp} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
      </Router>
    </AuthContextProvider>
  )
}

export default App;