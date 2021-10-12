import React, { useState } from "react";

function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    props.history.push('/dashboard');
  }

  return (
    <div>
      Login<br/><br/>
      <div>
        Username<br/>
        <input type="text" {...username} placeholder="Enter login" autoComplete="new-password"/>
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br/>
        <input type="password" {...password} placeholder="Enter password" autoComplete="new-password"/>
      </div>
      {error && <><small style={{ color: 'red'}}>{error}</small><br/></>}<br/>
      <button type="submit" className="btn btn-primary btn-block" onClick={handleLogin}>Submit</button>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  }
}

export default Login;
