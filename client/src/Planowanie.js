import Navbar from './Navbar';
import logo from './Logo.png';
import PlanowanieMenu from './Planowanie_Menu';
import { Link } from 'react-router-dom';
const Planowanie    = () => {
    return ( 
        <div className="Planowanie">
             {/* <div className='LeftSlider'>
          <Navbar />
          <Link to = "/Kalendarz"><h2 className="Marked">Kalendarz</h2></Link>
          <Link to = "/Wyszukiwarka"><h2>Wyszukiwarka</h2></Link>
          <Link to = "/Planowanie"><h2>Planowanie</h2></Link>
          <Link to = "/Ustawienia"><h2>Ustawienia</h2></Link>
          <h2>Wyloguj</h2>
        </div>  */}
        <header>
          <Link to='/' className = 'logo'><img src={logo} alt="Logo"/></Link>
        </header>
        
        <PlanowanieMenu />
        
      </div>
      
     );
}
 
export default Planowanie;