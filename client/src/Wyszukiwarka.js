import Navbar from './Navbar';
import SearchBar from './COmponents/search';
import Header from './COmponents/Header';
import logo from './Logo.png';
import { Link } from 'react-router-dom';
const Planowanie    = () => {
    return (
         
        <div className="Planowanie">
          <Header> <Link to='/' className = 'logo'><img src={logo} alt="Logo"/></Link></Header>
            <div className='LeftSlider'>
          <Navbar />
          <Link to = "/Kalendarz"><h2 className="Marked">Kalendarz</h2></Link>
          <Link to = "/Wyszukiwarka"><h2>Wyszukiwarka</h2></Link>
          <Link to = "/Planowanie"><h2>Planowanie</h2></Link>
          <Link to = "/Ustawienia"><h2>Ustawienia</h2></Link>
          <h2>Wyloguj</h2>
        </div>
        <div className='Planowanie2'>
        <SearchBar/>
        <h2>Wyszukiwarka</h2>
        </div>

      </div>
      
     );
}
 
export default Planowanie;