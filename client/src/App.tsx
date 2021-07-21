import React from 'react';

import '@Styles/app.sass';

import { Toolbar } from '@Components/Toolbar';
import { SettingBar } from '@Components/SettingBar';
import { Canvas } from '@Components/Canvas';

function App () {
  return (
    <div className="app">
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
