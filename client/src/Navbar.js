import { useState, useEffect } from 'react';
import config from "./cgf"
import axios from 'axios';

const API_URL = config.API_URL;

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const url = `${API_URL}/auth/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  // Jeśli użytkownik nie jest zalogowany, zwróć null
  if (!user) {
    return null;
  }

  const Login = {
    Imie: user.user ? user.user.family_name : 'Imie',
    Nazwisko: user.user ? user.user.given_name : 'Nazwisko',
  };


  return (
    <div className="navbar">
      <h1>{Login.Imie}</h1>
      <h1>{Login.Nazwisko}</h1>
    </div>
  );
};

export default Navbar;
