import React from 'react';

const SignupPage = () => (
  <div className="sign-up-container">
    <form>
      <label>Email</label>
      <input name="email" type="text" />
      <label>Password</label>
      <input name="password" type="text" />
      <label>Confirm Password</label>
      <input name="confirm-password" type="text" />
      <input name="submit" type="submit">Submit</input>
    </form>
  </div>
);

export default SignupPage;
