import React, { useState } from 'react';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        Email: email,
        Password: password,
      });
      if (response.data.message === "success") {
        navigate('/'); // Redirect to the home page
        console.log("Login successful");
        // Redirect or update state here
      } else {
        // Handle other responses
        console.log(response.data.message);
        // Show error message to the user
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Login error:', error.response.data.message);
        // Display error message to the user
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className=''>
      <div className="section max-h-full">
        <div className="container max-h-full">
          <div className="row max-h-full">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3 pt-5"><span>Log In </span><span>Sign Up</span></h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input 
                              type="email" 
                              className="form-style" 
                              placeholder="Email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input 
                              type="password" 
                              className="form-style" 
                              placeholder="Password" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button className="btn mt-4" onClick={handleLogin}>Login</button>
                          <p className="mb-0 mt-4 text-center"><a href="" className="link">Forgot your password?</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-3 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input type="text" className="form-style" placeholder="Full Name"/>
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="tel" className="form-style" placeholder="Phone Number"/>
                            <i className="input-icon uil uil-phone"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="email" className="form-style" placeholder="Email"/>
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" className="form-style" placeholder="Password"/>
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <a href="" className="btn mt-4">Register</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
