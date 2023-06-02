import Navbar from './Navbar';
import logo from './Logo.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
const Planowanie = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `http://localhost:5000/auth/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Planowanie</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
        </div>
      )}
      {!user && (
        <div>
          <p>Nie jesteś zalogowany. <Link to="/">Zaloguj się</Link>.</p>
        </div>
      )}
    </div>
  );
};

export default Planowanie;