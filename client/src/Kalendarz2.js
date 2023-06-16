import Navbar from './Navbar';
import logo from './Logo.png';
import Kalendarz2 from './COmponents/kalendarz2';
import { Link } from 'react-router-dom';
import Header from './COmponents/Header';
const Planowanie    = () => {
    return ( 
        <div className="Planowanie">
          <Header> <Link to='/' className = 'logo'><img src={logo} alt="Logo"/></Link></Header>
          <div className='LeftSlider'>
          <Navbar />
          <Link to = "/Wyszukiwarka"><h2>Wyszukiwarka</h2></Link>
          <Link to = "/Planowanie"><h2>Planowanie</h2></Link>
        </div>
    <div className='Planowanie2'>
    </div>
            <Kalendarz2/>
      </div>
      
     );
}
 
export default Planowanie;