import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import '@Styles/app.sass';

import { Toolbar } from '@Components/Toolbar';
import { SettingBar } from '@Components/SettingBar';
import { Canvas } from '@Components/Canvas';

function App () {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/:id">
            <Toolbar />
            <SettingBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date()).toString(16)}`} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
