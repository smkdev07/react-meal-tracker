import React, { useEffect, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, CircularProgress } from '@material-ui/core';

import { NavigationLink } from '../components/Header';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { RootState } from '../store/reducers/index';
import { authCheckState } from '../store/actions/index';

const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const SignIn = React.lazy(() => import('./SignIn'));
const SignOut = React.lazy(() => import('./SignOut'));

const useStyles = makeStyles((theme) => ({
  containerMain: {
    height: '100vh',
  },
  gridMain: {
    height: '100%',
  },
  fallback: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
  },
}));

const APP_LINKS: NavigationLink[] = [
  { path: '/Home', name: 'Home', showMode: 'signout' },
  { path: '/About', name: 'About', showMode: 'always' },
  { path: '/Dashboard', name: 'Dashboard', showMode: 'signin' },
  { path: '/SignIn', name: 'Sign In', showMode: 'signout' },
  { path: '/SignOut', name: 'Sign Out', showMode: 'signin' },
];

interface AppProps extends PropsFromRedux {}

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles();
  const fallback = (
    <div className={classes.fallback}>
      <CircularProgress />
    </div>
  );

  useEffect(() => {
    props.autoSignIn();
  }, [props]);

  const signedInRoutes = (
    <Switch>
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
        path="/SignOut"
        exact
        render={(props) => (
          <Suspense fallback={fallback}>
            <SignOut {...props} />
          </Suspense>
        )}
      />
      <Route
        render={(props) => (
          <Suspense fallback={fallback}>
            <About {...props} />
          </Suspense>
        )}
      />
    </Switch>
  );
  const signedOutRoutes = (
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
        path="/SignUp"
        exact
        render={(props) => (
          <Suspense fallback={fallback}>
            <SignIn {...props} />
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
  );

  return (
    <Container maxWidth="xl" className={classes.containerMain}>
      <Grid
        container
        direction="column"
        justify="space-between"
        className={classes.gridMain}
      >
        <Grid item>
          <Header
            title="Meal Tracker"
            links={
              props.signedIn
                ? APP_LINKS.filter((appLink) => appLink.showMode !== 'signout')
                : APP_LINKS.filter((appLink) => appLink.showMode !== 'signin')
            }
          />
        </Grid>
        <Grid item>
          <Main>{props.signedIn ? signedInRoutes : signedOutRoutes}</Main>
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

const mapState = (state: RootState) => ({
  signedIn: state.auth.token !== null,
});

const mapDispatch = {
  autoSignIn: () => authCheckState(),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
