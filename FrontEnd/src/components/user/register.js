import React from 'react';

export default function Register(props) {
    let user = props.user;
  return (
    <form onSubmit={(event)=> props.onRegisterFormSubmit(event)}>
      <h1>Register</h1>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={props.user.name} onChange={(event) => props.onRegisterInputChange(event)} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" name="email" value={props.user.email} onChange={(event) => props.onRegisterInputChange(event)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={props.user.password} onChange={(event) => props.onRegisterInputChange(event)} />
      </div>
      <div>
        <input type="submit" value="Register" />
      </div>

    </form>
  );
}
