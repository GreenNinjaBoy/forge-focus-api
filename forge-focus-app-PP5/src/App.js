import React from 'react';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom/cjs/react-router-dom.min';
import './api/axiosDefaults';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SuccessMessage from './components/SuccessMessage';
import Footer from './components/Footer';
import SignIn from './pages/auth/Signin';
import Organise from './pages/organise/Organise';
import Miscellaneous from './pages/organise/Miscellaneous';
import Refine from './pages/refine/Refine';
import Refinement from './pages/refine/RefineCreate';
import TakeSteps from './pages/steps/TakeSteps';
import NotFound from './NotFound';
import { useEffect, useState } from 'react';
import { useCurrentUser } from './context/CurrentUserContext';
import styles from './App.css';


function App() {
  
  const currentUser = useCurrentUser();
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [tokensChecked, setTokensChecked] = useState(false);

  useEffect(() => {
    const checkTokens = () => {
      const refreshTokenTimeStamp = localStorage.getItem('refreshTokenTimestamp');
      if (refreshTokenTimeStamp) {
        setAuthenticatedUser(true);
      } else {
        setAuthenticatedUser(false);
      }
      setTokensChecked(true);
    };
    checkTokens();
  }, [currentUser])

  return (
    <div className={styles.App}>
      <div>
          {tokensChecked ? (
          <Router className={styles.App}>
          <NavBar />
          <SuccessMessage />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/signin" render={() => <SignIn />} />
            <Route exact path="/organise" render={() => (
              authenticatedUser ? ( <Organise /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route exact path="/orgasnise" render={() => (
              authenticatedUser ? ( <Miscellaneous /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route exact path="/refine/create" render={() => (
              authenticatedUser ? ( <Refinement /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route exact path="/refine/:id" render={() => (
              authenticatedUser? ( <Refine /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route exact path="/steps" render={() => (
              authenticatedUser ? ( <TakeSteps /> ) : ( <Redirect to={{pathname: "/signin"}} />)
            )} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Router>
              ) : (
                <div>
                  Just checking authentication status ....
                </div>
              )}
          <Footer />
        </div>
      </div>
    );
  }

export default App;