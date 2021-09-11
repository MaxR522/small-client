import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Homepage from '../src/pages/homepage/homepage';
import Register from '../src/pages/register/register';
import Login from '../src/pages/Login/login';
import Car from '../src/pages/car/car';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>

        <Route exact path='/register'>
          <Register />
        </Route>

        <Route exact path='/login'>
          <Login />
        </Route>

        <Route exact path='/car/:id'>
          <Car />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
