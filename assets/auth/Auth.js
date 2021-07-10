import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

// I can maybe refractor the navigation now that I have learned about this type of context!
export const AuthC = React.createContext();

// Creates a context for the user so that userdata can be easily accessed anywhere
function Auth({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return <AuthC.Provider value={{ user }}>{children}</AuthC.Provider>;
}

export default Auth;
