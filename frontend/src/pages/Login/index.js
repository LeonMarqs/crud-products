import api from '../../api';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

async function loginUser({ user, pwd }) {

  try { 
    const response = await api.post('/login', {
    user,
    pwd,
  })
    return response.data.token;

  } catch(error) {
    console.error(error);
    if(error.status === 406) {
      return false;
    }
  } 
}


export default function Login({ setToken }) {
  
  const [user, setUser] = useState();
  const [pwd, setPwd] = useState();
  const [isError, setIsError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const tokenApi = await loginUser({user, pwd});

    if(tokenApi) {
      setToken(tokenApi); 
      setIsError(false);
    } else {
      setIsError(true);
    }
  } 

  return (
    <div className="background">
      <div className="form">
        <h1>Faça o login</h1>
        <form className="submit" onSubmit={handleSubmit}>
          <label>
            <p>Usuário</p>
            <input type="text" onChange={e => setUser(e.target.value)}/>
          </label>
          <label>
            <p>Senha</p>
            <input type="password" onChange={e => setPwd(e.target.value)}/>
          </label>
          <div className="button-div">
            <button type="submit">Login</button>
          </div>
          {isError && <p className="error">Usuário e/ou senha inválido(s)</p>}
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};