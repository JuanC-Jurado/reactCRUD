import { useState } from 'react'
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Home from './components/Home/Home'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import firebaseApp from './credenciales'

const auth = getAuth(firebaseApp)

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    if(firebaseUser){
      setUser(firebaseUser)
    } else{
      setUser(null)
    }
  })

  return (
    <div className="App">
      {user ? <Home  userEmail={user ? user.email : ''} /> : <LoginRegister />}
    </div>
  );
}

export default App;
