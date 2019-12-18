import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {Home, Auth} from 'pages';
import {LinksStore} from 'stores';

const stores = {
  linksStore: new LinksStore(),
};

const App: React.FC = () => {
  return (
    <div className="wrap">
      <Provider {...stores}>
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
