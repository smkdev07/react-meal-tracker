import React, { Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

import { NavigationLink } from '../components/Header';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';

const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const SignIn = React.lazy(() => import('./SignIn'));

const useStyles = makeStyles((theme) => ({
  containerMain: {
    height: '100vh',
  },
  gridMain: {
    height: '100%',
  },
}));

const APP_LINKS: NavigationLink[] = [
  { path: '/Home', name: 'Home' },
  { path: '/About', name: 'About' },
  { path: '/Dashboard', name: 'Dashboard' },
  { path: '/Sign', name: 'Sign In' },
];

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Container disableGutters maxWidth="xl" className={classes.containerMain}>
      <Grid
        container
        direction="column"
        justify="space-between"
        className={classes.gridMain}
      >
        <Grid item>
          <Header title="Meal Tracker" links={APP_LINKS} />
        </Grid>
        <Grid item>
          <Main>
            <Switch>
              <Route
                path="/Home"
                exact
                render={(props) => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Home {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/About"
                exact
                render={(props) => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <About {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/Dashboard"
                exact
                render={(props) => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/SignIn"
                exact
                render={(props) => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <SignIn {...props} />
                  </Suspense>
                )}
              />
              <Route
                render={(props) => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Home {...props} />
                  </Suspense>
                )}
              />
            </Switch>
          </Main>
        </Grid>
        <Grid item>
          <Footer>© SMK 2020. All Rights Reserved.</Footer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
