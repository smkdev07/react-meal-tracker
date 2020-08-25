import React, { Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, CircularProgress } from '@material-ui/core';

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
  const fallback = <CircularProgress />;
  return (
    <Container maxWidth="xl" className={classes.containerMain}>
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
                  <Suspense fallback={fallback}>
                    <Home {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/About"
                exact
                render={(props) => (
                  <Suspense fallback={fallback}>
                    <About {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/Dashboard"
                exact
                render={(props) => (
                  <Suspense fallback={fallback}>
                    <Dashboard {...props} />
                  </Suspense>
                )}
              />
              <Route
                path="/SignIn"
                exact
                render={(props) => (
                  <Suspense fallback={fallback}>
                    <SignIn {...props} />
                  </Suspense>
                )}
              />
              <Route
                render={(props) => (
                  <Suspense fallback={fallback}>
                    <Home {...props} />
                  </Suspense>
                )}
              />
            </Switch>
          </Main>
        </Grid>
        <Grid item>
          <Footer>
            © SMK {new Date().getFullYear()}. All Rights Reserved.
          </Footer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
