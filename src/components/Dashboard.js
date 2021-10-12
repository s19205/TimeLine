import React from "react";

function Dashbard(props) {
  const handleLogout = () => {
    props.history.push('/login');
  }

  return (
    <div>
      Welcome User!<br/><br/>
      <input type="button" onClick={handleLogout} value="Logout"/>
    </div>
  );
}

export default Dashbard;