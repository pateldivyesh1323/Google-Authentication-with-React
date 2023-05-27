import { useEffect, useState } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
function App() {
  const [user, setUser] = useState({});

  const handleCallBack = (response) => {
    const user1 = jwtDecode(response.credential);
    setUser(user1);
    document.getElementById('signin').hidden = true;
  }

  const handleSignOut = (e) => {
    setUser({});
    document.getElementById('signin').hidden = false;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "389241942006-3auh0rqqvbqu1914v5mg3833oq4facvh.apps.googleusercontent.com",
      callback: handleCallBack
    })
    google.accounts.id.renderButton(
      document.getElementById('signin'),
      { theme: "outline", size: "large" }
    )
    google.accounts.id.prompt();
  }, [user])


  return (
    <div className="App" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div id="signin" />
      {user &&
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}><img src={user.picture} alt="" />
          <h3 style={{textAlign:"start"}}>{user.name}</h3></div>}
      {Object.keys(user).length !== 0 &&
        <button style={{marginTop:"10px",height:"30px" ,width:"60px"}}onClick={(e) => {handleSignOut(e)}}>SignOut</button>
      }
    </div>
  );
}

export default App;
