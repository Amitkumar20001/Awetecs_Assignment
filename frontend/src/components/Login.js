import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Form() {

const navigate = useNavigate();    
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');

const loginUser = async(e) => {
  e.preventDefault();
  const res = await fetch("/api/users/signin",{
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email ,
                password
            })
        });

        const data = await res.json();
        
        if(res.status === 400 || !data )
        {
          alert('Invalid credentials');
        }
        else
        {
          alert('Successfully logged in');
          navigate('/');

        }
}
  return (
    <>
         <form method="POST"className="form" >
        <div className='form-heading'>
          <h1 style={{textAlign: 'center'}}>Login</h1>
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter email"

            autoComplete="on"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Enter password"
            autoComplete="on"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
       
        <div>
            <input type="submit" name="login" id="login" 
            className="submit-form" value="SUBMIT"
            onClick={loginUser} />
        </div>
        <div>
          <label />
          <div>
            New user? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </form>
    </>
  )
}






