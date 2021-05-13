import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import './App.css';

import Login from './pages/Login';
import Main from './pages/Main';

import useToken from './components/useToken';


function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/login" exact>
          {token ? <Redirect to ="/" /> : <Login setToken={setToken} />}
        </Route>
        <Route component={Main} path="/" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
