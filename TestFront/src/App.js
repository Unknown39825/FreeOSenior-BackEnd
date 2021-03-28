import react from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import AllBlogs from './components/AllBlogs';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Switch>
          <Route path="/" component={AllBlogs} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;