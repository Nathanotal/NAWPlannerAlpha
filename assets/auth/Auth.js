import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

// I can maybe refractor the navigation now that I have learned about this type of context!
export const AuthC = React.createContext();

// Creates a context for the user so that userdata can be easily accessed anywhere
function Auth({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const uRef = firebase.firestore().collection("users");
  const cRef = firebase.firestore().collection("challenges");

  // Load the challenges in one place!
  function getChallenges() {
    cRef.onSnapshot((querySnapshot) => {
      const items = [];
      let index = 0;
      querySnapshot.forEach((doc) => {
        const data = {
          index: index,
          isSelected: false,
          id: doc.id, // Wait, this is not necessay?
          ...doc.data(), // Nice :)
        };
        items.push(data);
        index++;
      });
      setChallenges(items);
      // setLoading(false);
    });
  }

  // Load the users in one place!
  function getUsers() {
    uRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUserData(items);
    });
  }

  function checkLoadingStatus() {
    // Attempt to not show isLoading while in loginscreen
    if (!(user == null)) {
      setLoading(true);
      if (!(userData.length === 0 || challenges.length === 0)) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  // Check isLoading status
  useEffect(() => {
    checkLoadingStatus();
    if (!(user == null) && (userData.length === 0 || challenges.length === 0)) {
      getChallenges();
      getUsers();
    }
  });
  return (
    <AuthC.Provider value={{ user, userData, challenges, isLoading }}>
      {children}
    </AuthC.Provider>
  );
}

export default Auth;
