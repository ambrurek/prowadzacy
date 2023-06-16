

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Planowanie from './Planowanie';
import Ustawienia from './Ustawienia';
import Kalendarz from './Kalendarz';
import Wyszukiwarka from './Wyszukiwarka';
import Kalendarz2 from './Sale';
function App() {

 
  return (
    
    <div className='App'>
        <div className='content'>
        <Router>
          <div className='route'>
           <Switch>
             <Route exact path="/">
               <Home />
             </Route>
             <Route path="/Kalendarz/:idteacher" component={Kalendarz}>
               <Kalendarz />
             </Route>
             <Route path="/Wyszukiwarka">
               <Wyszukiwarka />
             </Route>
             <Route path="/Planowanie">
               <Planowanie />
             </Route>
             <Route path="/Sale/:roomid">
               <Kalendarz2 />
             </Route>
             <Route path="/Ustawienia">
               <Ustawienia />
             </Route>
           </Switch>
         </div>
       </Router>
        </div>
        
    </div>
    
  );
}

export default App;
