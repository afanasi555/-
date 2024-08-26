import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Room from './pages/Room';
import Profile from './components/Profile';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/room/:id" component={Room} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
}

export default App;
