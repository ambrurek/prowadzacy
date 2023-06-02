

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Planowanie from './Planowanie';
import Ustawienia from './Ustawienia';
import Kalendarz from './Kalendarz';
import Kalendarz2 from './Kalendarz2'
import Wyszukiwarka from './Wyszukiwarka';
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
             <Route path="/kalendarz2/:idteacher" component={Kalendarz2}>
               <Kalendarz2 />
             </Route>
             <Route path="/Wyszukiwarka">
               <Wyszukiwarka />
             </Route>
             <Route path="/Planowanie">
               <Planowanie />
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
