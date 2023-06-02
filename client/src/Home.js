import logo from './Logo.png';
import { Link } from 'react-router-dom';
import SearchBar from './COmponents/SearchBar.js';
import Header from './COmponents/Header';
const Home = () => {
    return ( 
      <div className="Planowanie">
         <Header> <Link to='/' className = 'logo'><img src={logo} alt="Logo"/></Link></Header>
    <div className='Planowanie2'>
  

    <SearchBar/>
    <h2>Wyszukiwarka</h2>
    </div>

  </div>
        
     );
}
 
export default Home;