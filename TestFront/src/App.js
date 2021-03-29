import react from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import AllEvents from './components/AllEvents';
import AllWorkshops from './components/AllWorkshops';
import EventTable from './components/EventTable';
import EventUpdate from './components/EventUpdate';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/Events" component={AllEvents} />
          <Route path="/workshops" component={AllWorkshops} />
          <Route path="/workshop/:id" component={EventUpdate} />
          <Route path="/" component={EventTable} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;