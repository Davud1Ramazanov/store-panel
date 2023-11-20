import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/App.css';

export default function App() {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  var item_value = sessionStorage.getItem("token");
  sessionStorage.setItem("token", item_value);

  const Authenticate = () => {
    axios({
      method: 'post',
      url: 'http://bibizan12-001-site1.ctempurl.com/api/Authenticate/login',
      data: {
        "userName": login,
        "password": password
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      sessionStorage.setItem('token', data['data']['token'])
      navigate("/panelMenu");
    }).catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className="App">
      <div className='authorize-block'>
        <h1>Authorize in system</h1>
        <div className='authorize-elements'>
          <label>Login</label>
          <input type='text' placeholder='Enter your login' value={login} onChange={(e) => { setLogin(e.target.value) }} />
          <label>Password</label>
          <input type='password' placeholder='Enter your password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <label>Confirm Password</label>
          <input type='password' placeholder='Confirm your password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
          <button type='button' onClick={Authenticate}>Enter</button>
        </div>
      </div>
    </div>
  );
}
