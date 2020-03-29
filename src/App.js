import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

import Hospitals from './components/Hospitals';
import Homepage from './components/Homepage';
import Header from './components/layout/Header';

function App() {
  return (
    <StickyContainer>
      <main className="Application">
        <Header />
        <div className="ab">
          <Switch>
            <Route exact path ="/" component = {Homepage} />
            <Route exact path ="/hospitals" component = {Hospitals} />
          </Switch>
        </div>
      </main>
    </StickyContainer>
  );
}

export default App;
