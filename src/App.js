import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './view/Login';
import Detail from './view/Detail';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/detail" component={Detail} />
      </div>
    </Router>
  );
}
export default App;
