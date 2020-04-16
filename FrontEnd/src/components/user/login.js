import React from 'react'

 const Login = (props) => {
    return (
        <div>
            <h1>Login</h1>
            <label>Email</label>
            <input type="text"/>
            <label>Password</label>
            <input type="password"/>
            <button onClick={()=> {props.onUserLogin()}}>Login</button>
        </div>
    )
}

export default Login