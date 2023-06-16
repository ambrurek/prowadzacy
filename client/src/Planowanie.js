import Navbar from './Navbar';
import logo from './Logo.png';
import Kalendarz2 from './COmponents/kalendarz2';
import { Link } from 'react-router-dom';
import Header from './COmponents/Header';


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from './cgf'

const Planowanie = () => {
  const API_URL = config.API_URL;
  const [user, setUser] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {

    const getUser = async () => {
      try {
        const url = `${API_URL}/auth/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        setUser(data);
        
        // Sprawdzanie, czy użytkownik jest zalogowany
        if (data) {
          // Wykonaj zapytanie do teachers/byId, aby uzyskać ID na podstawie imienia i nazwiska
          const firstName = data.user.given_name
          const lastName = data.user.family_name

          const teacherUrl = `${API_URL}/teacher/byId?firstName=${firstName}&lastName=${lastName}`;
          const response = await axios.get(teacherUrl);
          const { id } = response.data;
          setTeacherId(id);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);
    return ( 
      <div className="Planowanie">
      <Header>
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
      </Header>
      <div className="LeftSlider">
        <Navbar />
        <Link to="/Wyszukiwarka">
          <h2>Wyszukiwarka</h2>
        </Link>
        <Link to="/Planowanie">
          <h2>Planowanie</h2>
        </Link>
      </div>
      <div className="Planowanie2">
        <Kalendarz2 idteacher={teacherId}/>
      </div>
    </div>
  );

}
 
export default Planowanie;