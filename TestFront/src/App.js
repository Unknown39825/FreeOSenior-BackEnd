
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventUpdate from './components/EventUpdate';
import admin from './components/admin';
import UpdateWorkshop from './components/UpdateWorkshop';
import UpdateHomecard from './components/UpdateHomeCard';
import Updatetutorial from './components/UpdateTutorial';
import Updatecontributor from './components/UpdateContributors';
import UpdateProjectCard from './components/UpdateProjectCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          
          <Route path="/event/:id" component={EventUpdate} />
          <Route path="/workshop/:id" component={UpdateWorkshop} />
          <Route path="/homecard/:id" component={UpdateHomecard} />
          <Route path="/tutorial/:id" component={Updatetutorial} />
          <Route path="/contributor/:id" component={Updatecontributor} />
          <Route path="/projectcard/:id" component={UpdateProjectCard} />
          <Route path="/" component={admin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;