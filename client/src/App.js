import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
            <MenuBar />
            <Route exact path='/' component={Home} />
            <AuthRoute exact path='/register' component={Register} />
            <AuthRoute exact path='/login' component={Login} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
