import React from 'react';

const LoginPage = () => {
  return (
    <div className="login-container">
      <form>
        <label>Email</label>
        <input name="email" type="text" />
        <label>Password</label>
        <input name="password" type="text" />
        <input name="submit" type="submit">Submit</input>
      </form>
    </div>
  );
}

export default LoginPage