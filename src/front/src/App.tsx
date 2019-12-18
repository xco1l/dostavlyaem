import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'mobx-react';
import {observable, action} from 'mobx';
import DevTools from 'mobx-react-devtools';

import {Home} from 'pages';
import {Auth} from 'pages';
import {axios} from 'core';

const stores = observable({
  navLinks: [],
});

const App: React.FC = () => {
  const getLinks = action(async () => {
    const links = await axios.get('/navlinks');
    stores.navLinks = links.data;
  });

  useEffect(() => {
    getLinks();
  });

  return (
    <div className="wrap">
      <Provider stores={stores}>
        {process.env.NODE_ENV === 'DEVELOPMENT' && <DevTools />}
        <Switch>
          <Route exact path={'/'} render={() => <Home />} />
          <Route exact path={['/register', '/login']} render={() => <Auth />} />
        </Switch>
      </Provider>
    </div>
  );
};

export default App;
