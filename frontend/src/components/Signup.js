import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Form() {

const navigate = useNavigate();    
const [user,setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

let name, value;    
const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value });

}
const Signup = async(e) =>{
    e.preventDefault();
    const {name,email,password} = user;
    const res = await fetch("/api/users/register",{
        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            name,email,password
        })
    });
    await res.json();
    if(!name || !email || !password){
        alert("Please fill all the required fields");
    }else if(res.status === 400){
        alert("Email already exist");
    }else{
        alert(`Awesome ${name} , You have successfully registered`);
        navigate('/');
    }

}
  return (
    <>
         <form className="form" >
        <div className='form-heading'>
          <h1 style={{textAlign: 'center'}}>Signup</h1>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            placeholder="Enter name"
            autoComplete="on"
            required
            onChange={handleInputs}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            placeholder="Enter email"
            autoComplete="on"
            required
            onChange={handleInputs}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            placeholder="Enter password"
            autoComplete="on"
            required
            onChange={handleInputs}
          ></input>
        </div>
       
        <div>
            <input type="submit" name="signup" id="submit" 
            className="submit-form" value="SUBMIT"
            onClick={Signup} />
        </div>
        <div>
          <label />
          <div>
            Existing user? <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </>
  )
}
