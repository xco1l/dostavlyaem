import React from 'react';
import {Route, Switch} from 'react-router-dom';
import DevTools from 'mobx-react-devtools';

import {Home} from 'pages';
import {Auth} from 'pages';

const App: React.FC = () => {
  return (
    <div className="wrap">
      {process.env.NODE_ENV === 'DEVELOPMENT' && <DevTools />}
      <Switch>
        <Route exact path={'/'} render={() => <Home />} />
        <Route exact path={['/register', '/login']} render={() => <Auth />} />
      </Switch>
    </div>
  );
};

export default App;
