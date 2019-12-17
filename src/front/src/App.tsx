import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {Home} from 'pages';
import {Auth} from 'pages';

const App: React.FC = () => {
  return (
    <div className="wrap">
      <Switch>
        <Route exact path={'/'} render={() => <Home />} />
        <Route exact path={['/register', '/login']} render={() => <Auth />} />
      </Switch>
    </div>
  );
};

export default App;
